# alankyshum/blogs — archived

This repo previously hosted a Hugo blog at `https://alankyshum.github.io/blogs/`.
The blog has moved to **https://blog.alanshum.org/**.

This repo is now a redirect-only GitHub Pages shell. Every legacy URL
(`/posts/<slug>/`, `/tags/<tag>/`, `/index.xml`, `/`) 301-equivalent redirects
(meta-refresh + canonical + JS replace) to the new canonical URL.

The pre-rewrite snapshot is preserved at tag `pre-archive-snapshot`
(SHA `a6f79d7b52f060b925750cb879123d013cf8d03c`) and branch `pre-redirect-snapshot`.

To regenerate redirects after the new blog's sitemap changes, push to main —
`.github/workflows/deploy.yml` runs `scripts/build-redirects.mjs` against the live
sitemap and republishes the shell.
