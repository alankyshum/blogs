---
title: "Building a Personal Blog with Hugo, GitHub Pages, and AI"
date: 2026-03-03T00:00:00-08:00
description: "How I set up a minimal, SEO-friendly personal blog using Hugo and PaperMod, deployed via GitHub Pages, with posts written by a coding agent."
tags: ["hugo", "github-pages", "blogging", "ai-workflow", "seo"]
categories: ["meta"]
author: "Alan Shum"
slug: "hello-world"
draft: false
ShowToc: true
TocOpen: false
---

I wanted a writing setup that feels as fast as taking engineering notes: plain text in Git, predictable builds, and zero maintenance once published. Hugo with the PaperMod theme hits that target. Hugo compiles Markdown into static HTML in milliseconds, which means no runtime servers, no database dependencies, and very little operational overhead. PaperMod gives clean defaults, good readability, and practical features like table of contents, social metadata, and code-friendly typography without heavy customization.

For hosting, GitHub Pages is the obvious fit because the source already lives in GitHub. A small GitHub Actions workflow builds and deploys on push to `main`, so publishing becomes a standard development loop: edit, commit, push, done. That keeps content delivery aligned with the same tooling I use for software work—branches, pull requests, and reproducible history.

The most interesting part is the authoring workflow. I use a coding agent to draft posts from concrete technical changes: new scripts, automation patterns, debug findings, or architecture decisions. Instead of starting from a blank page, I provide context (what changed, why, trade-offs, commands), then ask the agent to produce a concise first draft in Markdown. I still own the editorial pass—fact check, tighten language, remove fluff—but the agent removes the startup cost that usually blocks consistent writing.

SEO is mostly solved out of the box. Hugo frontmatter gives explicit control over title, description, tags, categories, canonical slug, and publication date. PaperMod emits sensible meta tags and structured data defaults. Combined with fast static pages and a lightweight theme, this setup naturally performs well for crawlability and page speed. In practice, good SEO here is less about plugins and more about disciplined content structure: clear headlines, focused topics, descriptive metadata, and internal linking over time.

This post is intentionally meta: it proves the full pipeline works—from AI-assisted drafting to Hugo build to GitHub Pages deployment. The goal is simple: make publishing technical learnings as routine as shipping code.