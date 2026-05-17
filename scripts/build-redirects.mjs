#!/usr/bin/env node
// Fetches the live sitemap from blog.alanshum.org, then emits a static redirect
// shell under dist/ for every known old URL on alankyshum.github.io/blogs/.
//
// URL mapping (per PLAN.md §2):
//   /                       → https://blog.alanshum.org/
//   /posts/<slug>/          → https://blog.alanshum.org/<slug>/
//   /tags/<tag>/            → https://blog.alanshum.org/tags/<tag>/
//   /index.xml              → https://blog.alanshum.org/rss.xml
//
// Runs with Node 20 built-ins only (no npm deps).

import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';

const NEW_BLOG = 'https://blog.alanshum.org';
const SITEMAP_URL = `${NEW_BLOG}/sitemap.xml`;
const DIST = new URL('../dist', import.meta.url).pathname;

function redirectHtml(newUrl) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=${newUrl}">
  <link rel="canonical" href="${newUrl}">
  <title>Moved to blog.alanshum.org</title>
  <script>window.location.replace("${newUrl}");</script>
</head>
<body>
  <p>This page has moved to <a href="${newUrl}">${newUrl}</a>.</p>
</body>
</html>
`;
}

function emit(relPath, newUrl) {
  // relPath is the old path without leading slash, e.g. "posts/hello-world/"
  // We emit dist/<relPath>/index.html
  const dir = join(DIST, relPath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), redirectHtml(newUrl));
  console.log(`  ${relPath}/index.html → ${newUrl}`);
}

function emitFile(relPath, content) {
  const full = join(DIST, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  console.log(`  ${relPath}`);
}

// Parse <loc> entries from a sitemap XML string (handles both sitemap index and urlset)
function parseLocs(xml) {
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    locs.push(m[1].trim());
  }
  return locs;
}

// Recursively fetch a sitemap (handles sitemap indexes)
async function fetchAllLocs(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const xml = await res.text();

  // Is this a sitemap index?
  if (xml.includes('<sitemapindex')) {
    const childUrls = parseLocs(xml);
    const nested = await Promise.all(childUrls.map(fetchAllLocs));
    return nested.flat();
  }
  return parseLocs(xml);
}

async function main() {
  console.log('Fetching sitemap…');
  let locs;
  try {
    locs = await fetchAllLocs(SITEMAP_URL);
    console.log(`  Found ${locs.length} URL(s) in sitemap`);
  } catch (err) {
    console.warn(`  Warning: could not fetch sitemap (${err.message})`);
    console.warn('  Falling back to known post slugs from source content.');
    locs = [];
  }

  mkdirSync(DIST, { recursive: true });

  // Collect old→new URL pairs
  const pairs = new Map(); // oldRelPath → newUrl

  // Always include root
  pairs.set('', `${NEW_BLOG}/`);

  // Always include feed alias
  pairs.set('index.xml', `${NEW_BLOG}/rss.xml`);
  pairs.set('feed', `${NEW_BLOG}/rss.xml`);

  // Process sitemap locs
  for (const loc of locs) {
    if (!loc.startsWith(NEW_BLOG)) continue;
    const path = loc.slice(NEW_BLOG.length).replace(/^\//, '').replace(/\/$/, '');

    if (path === '' || path === 'rss.xml') {
      // root already handled
      continue;
    }

    if (path.startsWith('tags/')) {
      // /tags/<tag>/ → same shape
      pairs.set(`tags/${path.slice(5)}`, `${NEW_BLOG}/${path}/`);
    } else {
      // post page: /slug/ → old path was /posts/slug/
      pairs.set(`posts/${path}`, `${NEW_BLOG}/${path}/`);
    }
  }

  // Fallback: hardcode known slugs if sitemap returned nothing
  if (locs.length === 0) {
    const knownPosts = [
      'hello-world',
      'roo-code-orchestrator-token-efficiency-checklist-completion',
    ];
    const knownTags = [
      'hugo', 'github-pages', 'blogging', 'ai-workflow', 'seo',
      'roo-code', 'orchestrator', 'multi-agent', 'token-efficiency', 'developer-productivity',
    ];
    for (const slug of knownPosts) {
      pairs.set(`posts/${slug}`, `${NEW_BLOG}/${slug}/`);
    }
    for (const tag of knownTags) {
      pairs.set(`tags/${tag}`, `${NEW_BLOG}/tags/${tag}/`);
    }
    console.log(`  Fallback: emitting ${knownPosts.length} posts + ${knownTags.length} tag redirects`);
  }

  // Emit all redirect pages
  console.log('\nEmitting redirect pages:');
  for (const [relPath, newUrl] of pairs) {
    if (relPath === 'index.xml') {
      // Special: emit as a directory AND as a raw file
      // Directory form catches /index.xml/ (with trailing slash)
      const dir = join(DIST, 'index.xml');
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, 'index.html'), redirectHtml(newUrl));
      // Also emit a plain file at dist/feed.xml as an alias
      writeFileSync(join(DIST, 'index.xml.html'), redirectHtml(newUrl));
      console.log(`  index.xml/index.html → ${newUrl}  (note: bare /index.xml served as XML by GH Pages)`);
    } else {
      emit(relPath, newUrl);
    }
  }

  // robots.txt
  emitFile('robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://blog.alanshum.org/sitemap.xml\n');

  // No CNAME — original repo had no custom domain
  // (alankyshum.github.io/blogs/ is the serving URL, no CNAME needed)

  // .nojekyll so GH Pages doesn't try to process underscore dirs
  emitFile('.nojekyll', '');

  console.log('\nDone. dist/ contents:');
}

main().catch(err => { console.error(err); process.exit(1); });
