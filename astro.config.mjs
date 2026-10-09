import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkImageSize from './tools/remark-image-size.mjs';

const [owner, repository] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const explicitSite = process.env.ASTRO_SITE || undefined;
const explicitBase = process.env.ASTRO_BASE || undefined;
const isOwnerSite = Boolean(owner && repository?.toLowerCase() === `${owner.toLowerCase()}.github.io`);
const site = explicitSite ?? (owner ? `https://${owner}.github.io` : undefined);
const base = explicitBase === '/'
  ? undefined
  : explicitBase ?? (explicitSite ? undefined : repository && !isOwnerSite ? `/${repository}` : undefined);

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    processor: unified({ remarkPlugins: [remarkImageSize] }),
  },
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
});
