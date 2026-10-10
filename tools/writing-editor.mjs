import { randomBytes } from 'node:crypto';
import { execFile } from 'node:child_process';
import { access, lstat, mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { basename, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import remarkImageSize from './remark-image-size.mjs';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const blogRoot = join(root, 'src', 'content', 'blog');
const imagesRoot = join(blogRoot, 'images');
const html = await readFile(new URL('./writing-editor.html', import.meta.url));
const host = '127.0.0.1';
const maxRequestBytes = 12 * 1024 * 1024;
const maxImageBytes = 8 * 1024 * 1024;
const markdownRenderer = await createMarkdownProcessor({ remarkPlugins: [remarkImageSize] });
const execFileAsync = promisify(execFile);
let repositoryBusy = false;

const sendJson = (res, status, value) => {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  res.end(JSON.stringify(value));
};

const error = (status, message) => Object.assign(new Error(message), { status });

async function runGit(args, timeout = 15_000) {
  try {
    const { stdout } = await execFileAsync('git', ['--no-optional-locks', ...args], {
      cwd: root, timeout, maxBuffer: 4 * 1024 * 1024,
      env: {
        ...process.env, LC_ALL: 'C', GIT_TERMINAL_PROMPT: '0',
        GIT_SSH_COMMAND: process.env.GIT_SSH_COMMAND || 'ssh -o BatchMode=yes -o ConnectTimeout=15',
      },
    });
    return stdout;
  } catch (err) {
    const message = err.killed
      ? 'Operasi Git melewati batas waktu. Perbarui status sebelum mencoba lagi.'
      : (err.stderr?.trim() || err.message).slice(0, 4000);
    throw error(409, message);
  }
}

async function gitStatus() {
  const [rawStatus, rawRefs, remotes, gitDir, currentBranch] = await Promise.all([
    runGit(['status', '--porcelain=v1', '-z', '--untracked-files=all']),
    runGit(['for-each-ref', '--format=%(refname)', 'refs/heads', 'refs/remotes/origin']),
    runGit(['remote']),
    runGit(['rev-parse', '--git-dir']),
    runGit(['branch', '--show-current']),
  ]);
  const records = rawStatus.split('\0');
  const changes = [];
  for (let index = 0; index < records.length; index++) {
    if (!records[index]) continue;
    const code = records[index].slice(0, 2);
    const path = records[index].slice(3);
    const originalPath = /[RC]/.test(code) ? records[++index] : '';
    changes.push({ code, path, originalPath });
  }
  const refs = rawRefs.trim().split('\n').filter(Boolean);
  const branch = currentBranch.trim();
  const branches = refs.filter((ref) => ref.startsWith('refs/heads/')).map((ref) => ref.slice('refs/heads/'.length));
  if (branch && !branches.includes(branch)) branches.push(branch);
  const operations = await Promise.all(['MERGE_HEAD', 'CHERRY_PICK_HEAD', 'REVERT_HEAD', 'rebase-merge', 'rebase-apply', 'sequencer'].map(async (name) => {
    try { await access(join(resolve(root, gitDir.trim()), name)); return true; }
    catch (err) { if (err.code === 'ENOENT') return false; throw err; }
  }));
  const inProgress = operations.some(Boolean) || changes.some(({ code }) => ['DD', 'AU', 'UD', 'UA', 'DU', 'AA', 'UU'].includes(code));
  let ahead = null;
  let behind = null;
  if (branch && refs.includes(`refs/remotes/origin/${branch}`)) {
    const counts = (await runGit(['rev-list', '--left-right', '--count', `refs/remotes/origin/${branch}...HEAD`])).trim().split(/\s+/).map(Number);
    [behind, ahead] = counts;
  }
  return { branch, branches, changes, inProgress, ahead, behind, hasOrigin: remotes.trim().split('\n').includes('origin') };
}

async function readyGit(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw error(400, 'Permintaan Git tidak valid.');
  const state = await gitStatus();
  if (!state.branch) throw error(409, 'HEAD tidak berada pada branch lokal. Pilih branch melalui terminal terlebih dahulu.');
  if (data.expectedBranch !== state.branch) throw error(409, 'Branch sudah berubah. Perbarui status Git lalu coba lagi.');
  if (state.inProgress) throw error(409, 'Selesaikan merge, rebase, atau konflik Git melalui terminal terlebih dahulu.');
  return state;
}

async function commitChanges(data) {
  const state = await readyGit(data);
  const message = textField(data.message, 'Pesan commit', 200, true);
  if (message.includes('\0')) throw error(400, 'Pesan commit mengandung karakter yang tidak valid.');
  if (!state.changes.length) throw error(409, 'Tidak ada perubahan repository untuk di-commit.');
  await runGit(['add', '-A', '--', '.']);
  await runGit(['commit', '--only', '-m', message, '--', '.'], 120_000);
  const hash = (await runGit(['rev-parse', '--short', 'HEAD'])).trim();
  return { hash, message: `Commit ${hash} dibuat pada branch ${state.branch}.` };
}

async function pushBranch(data) {
  const state = await readyGit(data);
  if (!state.hasOrigin) throw error(409, 'Remote origin belum dikonfigurasi.');
  await runGit(['push', '--porcelain', '--set-upstream', 'origin', `HEAD:refs/heads/${state.branch}`], 120_000);
  return { message: `Branch ${state.branch} dipush ke origin/${state.branch}.` };
}

async function switchBranch(data) {
  const state = await readyGit(data);
  if (typeof data.branch !== 'string' || !state.branches.includes(data.branch)) throw error(400, 'Pilih branch lokal yang tersedia.');
  if (data.branch === state.branch) return { message: `Sudah berada pada branch ${state.branch}.` };
  if (state.changes.length) throw error(409, 'Masih ada perubahan file. Commit atau rapikan perubahan melalui terminal sebelum berpindah branch.');
  await runGit(['switch', '--no-guess', '--no-overwrite-ignore', '--', data.branch]);
  return { message: `Berpindah ke branch ${data.branch}.` };
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxRequestBytes) throw error(413, 'Request is too large.');
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw error(400, 'Invalid JSON request.');
  }
}

function localeDirectory(lang) {
  if (lang !== 'en' && lang !== 'id') throw error(400, 'Choose English or Indonesian.');
  return join(blogRoot, lang);
}

function validateSlug(slug) {
  if (typeof slug !== 'string' || slug.length > 80 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw error(400, 'Slug must use lowercase letters, numbers, and hyphens.');
  }
  return slug;
}

function imageNames(markdown) {
  return [...markdown.matchAll(/\.\.\/images\/([a-z0-9][a-z0-9._-]*\.(?:png|jpe?g|webp))/gi)].map(([, name]) => name);
}

function textField(value, label, maxLength, required = false) {
  if (typeof value !== 'string' || value.length > maxLength || (required && !value.trim())) {
    throw error(400, `${label} is required and must be under ${maxLength} characters.`);
  }
  return value.trim();
}

function validDate(value, label, optional = false) {
  if (optional && !value) return '';
  let parsed;
  try { parsed = new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10); } catch { parsed = ''; }
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || parsed !== value) {
    throw error(400, `${label} must be a valid date in YYYY-MM-DD format.`);
  }
  return value;
}

function quoteYaml(value) {
  return JSON.stringify(value);
}

function parseTitle(markdown) {
  const value = markdown.match(/^title:\s*(.+)$/m)?.[1]?.trim();
  if (!value) return '';
  try { return JSON.parse(value); } catch { return value.replace(/^['"]|['"]$/g, ''); }
}

async function readImageName(name) {
  if (typeof name !== 'string' || basename(name) !== name || !/^[a-z0-9][a-z0-9._-]*\.(png|jpe?g|webp)$/i.test(name)) {
    throw error(400, 'Invalid image name.');
  }
  return readFile(join(imagesRoot, name));
}

function markdownFrom(data) {
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const fields = [
    '---',
    `title: ${quoteYaml(data.title)}`,
    `description: ${quoteYaml(data.description)}`,
    `pubDate: ${data.pubDate}`,
  ];
  if (data.updatedDate) fields.push(`updatedDate: ${data.updatedDate}`);
  fields.push(`tags: ${JSON.stringify(tags)}`, `lang: ${data.lang}`);
  if (data.translationKey) fields.push(`translationKey: ${quoteYaml(data.translationKey)}`);
  if (data.cover) {
    fields.push(`cover: ${data.cover}`, `coverAlt: ${quoteYaml(data.coverAlt)}`);
  }
  if (data.draft) fields.push('draft: true');
  return `${fields.join('\n')}\n---\n\n${data.body.trim()}\n`;
}

async function renderPreview(data) {
  localeDirectory(data.lang);
  const body = textField(data.body, 'Article content', 500_000);
  const tags = Array.isArray(data.tags) ? data.tags : [];
  if (tags.length > 12 || tags.some((tag) => typeof tag !== 'string' || !tag.trim() || tag.length > 40)) {
    throw error(400, 'Use up to 12 tags, each under 40 characters.');
  }

  let coverName = '';
  const cover = textField(data.cover ?? '', 'Cover path', 240);
  if (cover) {
    coverName = cover.replace(/^\.\.\/images\//, '');
    try { await readImageName(coverName); } catch { throw error(400, 'The selected cover image was not found in the project.'); }
    textField(data.coverAlt, 'Cover photo description', 240);
  }

  const { code } = await markdownRenderer.render(body);
  return { html: code, coverName };
}

async function savePost(data) {
  const lang = data.lang;
  const directory = localeDirectory(lang);
  const slug = validateSlug(data.slug);
  const title = textField(data.title, 'Title', 160, true);
  const description = textField(data.description, 'Subtitle', 300, true);
  const pubDate = validDate(data.pubDate, 'Publication date');
  const updatedDate = validDate(data.updatedDate, 'Updated date', true);
  const translationKey = data.translationKey ? validateSlug(data.translationKey) : '';
  const body = textField(data.body, 'Article content', 500_000, true);
  const tags = Array.isArray(data.tags) ? data.tags : [];
  if (tags.length > 12 || tags.some((tag) => typeof tag !== 'string' || !tag.trim() || tag.length > 40)) {
    throw error(400, 'Use up to 12 tags, each under 40 characters.');
  }

  let cover = '';
  let coverAlt = '';
  if (data.cover) {
    const coverName = data.cover.replace(/^\.\.\/images\//, '');
    try { await readImageName(coverName); } catch { throw error(400, 'The selected cover image was not found in the project.'); }
    cover = `../images/${coverName}`;
    coverAlt = textField(data.coverAlt, 'Cover photo description', 240, true);
  }

  const target = join(directory, `${slug}.md`);
  try {
    const info = await lstat(target);
    if (info.isSymbolicLink() || !info.isFile()) throw error(400, 'The target must be a regular Markdown file.');
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
  try {
    await writeFile(target, markdownFrom({ title, description, pubDate, updatedDate, tags: tags.map((tag) => tag.trim()), lang, translationKey, cover, coverAlt, draft: Boolean(data.draft), body }), {
      encoding: 'utf8',
      flag: data.overwrite ? 'w' : 'wx',
    });
  } catch (err) {
    if (err.code === 'EEXIST') throw error(409, 'A writing file with this slug already exists. Load it before replacing it.');
    throw err;
  }
  return `src/content/blog/${lang}/${slug}.md`;
}

async function deletePost(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw error(400, 'Invalid delete request.');
  const lang = data.lang;
  const directory = localeDirectory(lang);
  const slug = validateSlug(data.slug);
  const target = join(directory, `${slug}.md`);
  let info;
  try { info = await lstat(target); } catch (err) {
    if (err.code === 'ENOENT') throw error(404, 'Article not found.');
    throw err;
  }
  if (info.isSymbolicLink() || !info.isFile()) throw error(400, 'The target must be a regular Markdown file.');

  const markdown = await readFile(target, 'utf8');
  const candidates = new Set(imageNames(markdown));
  const referencedElsewhere = new Set();
  for (const locale of ['en', 'id']) {
    const files = await readdir(join(blogRoot, locale), { withFileTypes: true });
    for (const file of files) {
      if (!file.isFile() || !file.name.endsWith('.md') || (locale === lang && file.name === `${slug}.md`)) continue;
      for (const name of imageNames(await readFile(join(blogRoot, locale, file.name), 'utf8'))) {
        referencedElsewhere.add(name.toLowerCase());
      }
    }
  }

  await unlink(target);
  const cleanupErrors = [];
  for (const name of candidates) {
    if (referencedElsewhere.has(name.toLowerCase())) continue;
    try {
      const image = join(imagesRoot, name);
      const imageInfo = await lstat(image);
      if (!imageInfo.isSymbolicLink() && imageInfo.isFile()) await unlink(image);
    } catch (err) {
      if (err.code !== 'ENOENT') cleanupErrors.push(name);
    }
  }
  return { path: `src/content/blog/${lang}/${slug}.md`, cleanupErrors };
}

async function saveImage(data) {
  if (typeof data.dataUrl !== 'string' || data.dataUrl.length > maxRequestBytes) throw error(400, 'Choose an image under 8 MB.');
  const match = data.dataUrl.match(/^data:image\/(png|jpeg|webp);base64,([a-z\d+/]+=*)$/i);
  if (!match) throw error(400, 'Use a PNG, JPG, or WebP image.');
  const bytes = Buffer.from(match[2], 'base64');
  if (!bytes.length || bytes.length > maxImageBytes) throw error(400, 'Choose an image under 8 MB.');

  const extension = match[1].toLowerCase() === 'jpeg' ? 'jpg' : match[1].toLowerCase();
  const originalName = typeof data.name === 'string' ? basename(data.name, extname(data.name)) : 'photo';
  const stem = originalName.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'photo';
  const filename = `${stem}-${Date.now().toString(36)}-${randomBytes(2).toString('hex')}.${extension}`;
  await mkdir(imagesRoot, { recursive: true });
  await writeFile(join(imagesRoot, filename), bytes, { flag: 'wx' });
  return { filename, path: `../images/${filename}` };
}

const server = createServer(async (req, res) => {
  try {
    const port = server.address().port;
    if (![`${host}:${port}`, `localhost:${port}`].includes(req.headers.host)) throw error(403, 'Gunakan alamat editor lokal yang ditampilkan di terminal.');
    const requestUrl = new URL(req.url, `http://${req.headers.host ?? host}`);
    if (req.method === 'GET' && requestUrl.pathname === '/') {
      res.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
        'content-security-policy': "default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob:; connect-src 'self'; frame-src 'self' about:; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
      });
      res.end(html);
      return;
    }
    if (req.method === 'GET' && requestUrl.pathname === '/api/site.css') {
      res.writeHead(200, { 'content-type': 'text/css; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
      res.end(await readFile(new URL('../src/styles/global.css', import.meta.url)));
      return;
    }
    if (req.method === 'GET' && requestUrl.pathname === '/api/git/status') {
      sendJson(res, 200, await gitStatus());
      return;
    }
    if (req.method === 'GET' && requestUrl.pathname === '/api/posts') {
      const directory = localeDirectory(requestUrl.searchParams.get('lang'));
      const files = (await readdir(directory, { withFileTypes: true })).filter((entry) => entry.isFile() && entry.name.endsWith('.md'));
      const posts = await Promise.all(files.map(async (file) => {
        const markdown = await readFile(join(directory, file.name), 'utf8');
        return { slug: file.name.slice(0, -3), title: parseTitle(markdown) };
      }));
      sendJson(res, 200, posts.sort((a, b) => a.title.localeCompare(b.title)));
      return;
    }
    if (req.method === 'GET' && requestUrl.pathname === '/api/post') {
      const directory = localeDirectory(requestUrl.searchParams.get('lang'));
      const slug = validateSlug(requestUrl.searchParams.get('slug'));
      const markdown = await readFile(join(directory, `${slug}.md`), 'utf8');
      sendJson(res, 200, { markdown });
      return;
    }
    if (req.method === 'GET' && requestUrl.pathname === '/api/image') {
      const name = requestUrl.searchParams.get('name');
      const bytes = await readImageName(name);
      const ext = extname(name).toLowerCase();
      const contentType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
      res.writeHead(200, { 'content-type': contentType, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
      res.end(bytes);
      return;
    }
    if (req.method === 'POST' && ['/api/save', '/api/delete', '/api/image', '/api/preview', '/api/git/commit', '/api/git/push', '/api/git/switch'].includes(requestUrl.pathname)) {
      const expectedOrigin = `http://${req.headers.host}`;
      if (req.headers.origin !== expectedOrigin) throw error(403, 'Requests must come from this local editor.');
      if (!/^application\/json\b/i.test(req.headers['content-type'] || '')) throw error(415, 'Gunakan permintaan JSON.');
      const data = await readJson(req);
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw error(400, 'Permintaan tidak valid.');
      if (requestUrl.pathname === '/api/preview') {
        sendJson(res, 200, await renderPreview(data));
        return;
      }
      if (repositoryBusy) throw error(409, 'Operasi lain masih berjalan. Tunggu hingga selesai lalu coba lagi.');
      repositoryBusy = true;
      try {
        if (!requestUrl.pathname.startsWith('/api/git/') && data.expectedBranch !== undefined && data.expectedBranch !== (await runGit(['branch', '--show-current'])).trim()) {
          throw error(409, 'Branch telah berubah. Perbarui editor sebelum menyimpan perubahan.');
        }
        if (requestUrl.pathname === '/api/git/commit') {
          sendJson(res, 200, await commitChanges(data));
        } else if (requestUrl.pathname === '/api/git/push') {
          sendJson(res, 200, await pushBranch(data));
        } else if (requestUrl.pathname === '/api/git/switch') {
          sendJson(res, 200, await switchBranch(data));
        } else if (requestUrl.pathname === '/api/save') {
          const path = await savePost(data);
          sendJson(res, 200, { path });
        } else if (requestUrl.pathname === '/api/delete') {
          sendJson(res, 200, await deletePost(data));
        } else {
          sendJson(res, 201, await saveImage(data));
        }
      } finally { repositoryBusy = false; }
      return;
    }
    sendJson(res, 404, { error: 'Not found.' });
  } catch (err) {
    if (res.headersSent) return res.destroy();
    const status = err.status ?? (err.code === 'ENOENT' ? 404 : 500);
    sendJson(res, status, { error: err.message ?? 'Local editor error.' });
  }
});

server.listen(0, host, () => {
  const { port } = server.address();
  console.log(`Local writing editor: http://${host}:${port}`);
  console.log('Only this computer can connect. Press Ctrl+C to stop.');
});
