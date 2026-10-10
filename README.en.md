# Ariel Febrian's Portfolio

[Bahasa Indonesia](README.md) | **English**

A resume and writing website in Indonesian and English, with a local editor for writing articles without editing files manually.

[Open the website](https://arielf98.github.io/my-portofolio/) | [Indonesian website](https://arielf98.github.io/my-portofolio/id/)

## Start Here

Install **Node.js version 22.12 or newer**, npm, and Git. Open a terminal in this project's folder.

The first time you use the project, install its dependencies:

```sh
npm install
```

Then choose the command you need:

| I want to... | Run |
| --- | --- |
| Write or edit an article | `npm run editor` |
| View the website and resume locally | `npm run dev` |
| Build the website | `npm run build` |
| View the latest build | `npm run preview` |

Open the address printed in the terminal. The editor uses a random port, so its address can change each time you start it. Keep the terminal open; press `Ctrl+C` to stop the server.

The editor and the local website are separate pages. To open both, run `npm run editor` in one terminal and `npm run dev` in another.

> **Save, commit, and push are different.** Saving writes the article to your computer. A commit records changes in Git history. Pushing sends commits to GitHub; the website updates only after deployment succeeds.

The editor's controls currently use Indonesian labels. This guide keeps those labels so you can find the right buttons.

## Write A New Article

1. Run `npm run editor` and open the editor address printed in the terminal.
2. Click **Artikel baru** (New article) and choose the article's language.
3. Enter the title, subtitle, publication date, and article content.
4. Check **Slug / nama file** (Slug / filename). For example, `learning-odoo`; use lowercase letters, numbers, and hyphens.
5. Add tags if needed. Separate them with commas, for example `Engineering, Odoo`.
6. Check the **Pratinjau** (Preview) panel on the right.
7. Click **Simpan artikel** (Save article) and wait for the success message.

The preview updates automatically shortly after you type. You do not need to save first. Scrolling the writing area also moves the preview proportionally, rather than matching each paragraph exactly. Choose **Markdown** to see the source that will be saved.

Articles use Markdown. The buttons above the writing area add headings, bold text, italic text, and links. A simple example:

```md
## What I learned

This is a regular paragraph with **bold text** and *italic text*.

- First note
- Second note

[Open a link](https://example.com)
```

### Save A Draft

Check **Simpan sebagai draft** (Save as draft) if the article is not ready for the website. Drafts remain saved and editable in the editor, but do not appear on the website.

To publish a draft, load it again, uncheck the draft option, save it, then commit and push.

Drafts are not a place for secrets. In a public repository, committed and pushed draft files can still be read on GitHub.

### Add Photos

| What you need | Steps |
| --- | --- |
| An article's main image | Choose a file under **Foto cover** (Cover photo), then click **Unggah cover** (Upload cover). Enter a photo description before saving the article. |
| A photo inside the article | Place the cursor where you want the image, choose a photo, then click **Unggah & sisipkan** (Upload & insert). |

Use PNG, JPG, or WebP files up to **20 MB**. The editor compresses photos to WebP, or JPEG if your browser does not support WebP.

**Photos are center-cropped to a 3:2 ratio at 1536 x 1024.** Choose images whose important details are near the center. Uploaded files are stored in `src/content/blog/images/`.

Uploading a photo does not save the article content. Click **Simpan artikel** after adding your photos.

### Articles In Two Languages

Indonesian and English articles are stored separately; the editor does not translate content automatically.

Create both versions with the same **Kunci terjemahan** (Translation key), for example `learning-odoo`. The website's language switcher can then connect the two articles.

## Edit Or Delete An Article

To edit:

1. Choose the article's language.
2. Select its title under **Tulisan yang sudah ada** (Existing articles).
3. Click **Muat artikel** (Load article), then edit the content.
4. Click **Simpan perubahan** (Save changes).

To delete an article, load it first, click **Hapus artikel** (Delete article), then review and confirm the dialog. Related photos are deleted only if no other article uses them.

Deletion changes local files immediately. The editor has no undo button for deletion; commit any history you want to keep before deleting. Commit and push the deletion for it to take effect on the website too.

> Do not close or reload the tab while you have unsaved writing. The editor does not have autosave yet.

## Commit And Push From The Editor

For everyday use:

1. Save the article first.
2. In the **Git** panel, check the active branch and open the list of changed files.
3. Enter a **Pesan commit** (Commit message), for example `Add an article about Odoo`.
4. Click **Commit & Push**, then confirm.
5. Once it succeeds, open the **Actions** tab on GitHub and wait for the **Deploy to GitHub Pages** workflow to finish.

| Button | What it does |
| --- | --- |
| **Commit** | Records changes on your computer without sending them to GitHub. |
| **Commit & Push** | Creates a commit, then sends commits on the active branch to GitHub. |
| **Push** | Sends existing commits without creating a new commit. |
| **Perbarui status Git** (Refresh Git status) | Reads the current branch and local file changes again. |

**A commit includes all repository changes**, not just articles: this includes code, new files, and deleted files. Git-ignored files are excluded. Review the file list, especially before sending private data or changes unrelated to your article.

Push sends all unpushed commits on the active branch to the branch with the same name on the `origin` remote, without force-pushing. If the commit succeeds but the push fails, the commit is still saved. Resolve the cause of the failure, then use **Push** to try again.

### Set Up Git

Your Git identity and GitHub access must already be configured on your computer. If Git does not know your name and email, run these commands in the project folder:

```sh
git config user.name "Your Name"
git config user.email "your-email@example.com"
```

Make sure the `origin` remote points to the correct repository. Use SSH authentication or a credential helper according to your local Git configuration; the editor does not provide a GitHub login form. Pushing requires internet access and write permission to the repository.

### Switch Branches

Select an existing branch under **Branch lokal** (Local branch), then click **Pindah branch** (Switch branch).

Before switching, all file changes must be committed or otherwise resolved, and there must be no active merge, rebase, or conflict. If you have unsaved writing, the dialog warns that switching will discard it.

The editor does not create branches, stash changes, pull, or fetch automatically. Ahead/behind counts use remote references stored on your computer, so they may not reflect the latest state on GitHub.

Save your writing before switching branches in the terminal. If the branch has already changed, the editor refuses to save to a different branch: copy your unsaved writing somewhere safe before reloading the editor. If the new branch changes the editor's code, stop the editor server and run `npm run editor` again.

## Update Your Resume And Contact Details

| What to change | File or location |
| --- | --- |
| Name, summary, experience, education, projects, certifications, skills, and social links | `src/data/profile.ts`, in the `id` and `en` sections |
| Email and WhatsApp above the navigation bar | `src/components/SiteHeader.astro` |
| Additional email link at the bottom of the resume | The `email` property in `src/data/profile.ts` |
| Downloadable CV | Add a PDF to `public/`, then set the `cvPdf` property in the corresponding language profile |

For example, for `public/cv-id.pdf`, set `cvPdf: 'cv-id.pdf'` in the Indonesian profile. After editing profile data, open the local website to see the result. Commit and push when you are ready to publish the changes.

## Publish The Website

The editor runs only on your local computer; it is not part of the public website on GitHub Pages.

You only need to configure GitHub Pages once:

1. Open the repository on GitHub.
2. Go to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.

These settings follow the [GitHub Pages guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow).

This repository already has a workflow in `.github/workflows/deploy.yml`. **Pushing to the repository's default branch** builds and publishes the website. Pushing to another branch does not automatically publish it; the changes must reach the default branch first. You can also run the workflow manually from the **Actions** tab.

To build and view the website locally:

```sh
npm run build
npm run preview
```

The build output is stored in `dist/`. These commands do not send changes to GitHub.

## Troubleshooting

| Problem | What to do |
| --- | --- |
| The editor will not open | Make sure `npm run editor` is still running and use the latest address from the terminal, not an old port. |
| Preview or fonts do not reflect changes | Save your writing first, then reload the editor tab to load the latest CSS. |
| An article does not appear on the website | Check its draft status, whether saving and pushing succeeded, and the workflow result in GitHub Actions. |
| Commit says the article is not saved | Click **Simpan artikel** or **Simpan perubahan**, then try committing again. |
| Push fails | Check internet access, GitHub authentication, write permission, and the `origin` remote. If the branch is behind or has conflicts, resolve them in the terminal; the editor does not pull automatically. |
| Switching branches is blocked | Check all file changes and finish any Git operation still in progress. |
| Deployment fails with a 404 status | Check that **Settings > Pages > Source** is set to **GitHub Actions**, then rerun the workflow. |
| The web server reports a content cache error | Avoid multiple `npm run dev` instances for the same project. Stop and restart the web server; protect unsaved writing before reloading the editor. |

## File Reference

| Location | Contents |
| --- | --- |
| `src/content/blog/id/` | Indonesian articles |
| `src/content/blog/en/` | English articles |
| `src/content/blog/images/` | Article photos |
| `src/styles/global.css` | Public website and article preview styles |
| `tools/writing-editor.html` | Editor interface and interactions |
| `tools/writing-editor.mjs` | Local editor server, file operations, and Git operations |
| `src/pages/404.astro` | The page shown for an address that cannot be found |
| `AGENTS.md` | Project design and testing rules |

The public website follows a Substack-inspired design. Editor controls follow Ant Design v6; the article preview uses public website styles. Website article tags use Ant Design v6 styling according to the project rules.

### Write Directly In Markdown

If you do not use the editor, create a file such as `src/content/blog/en/learning-notes.md`:

```md
---
title: "Learning notes"
description: "What I learned this week."
pubDate: 2026-10-10
tags: ["Engineering", "Odoo"]
lang: en
draft: false
---

## First note

Write your article here.
```

Use `lang: id` for the `id/` folder and `lang: en` for the `en/` folder. Add the same `translationKey` to both language versions if you want to connect them. `updatedDate`, `cover`, and `coverAlt` are optional; when using a cover, include its description too.

### Custom Domain

For your own domain, configure the domain and DNS through GitHub Pages settings. In repository variables, set `ASTRO_SITE` to the full domain URL and `ASTRO_BASE` to `/`. Official instructions are available in the [GitHub Pages custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

For a standard GitHub Pages address, `astro.config.mjs` determines the URL and base path from `GITHUB_REPOSITORY`; you do not need to change that configuration just to write articles.
