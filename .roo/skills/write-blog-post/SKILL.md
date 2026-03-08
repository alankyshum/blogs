---
name: write-blog-post
description: Bootstrap, critique, and publish Hugo technical blog posts using a scaffold-first workflow. Provides a concrete 7-section framework, TODO-guided draft templates, ruthless HN-style review, and publish verification. Use when asked to start, review, critique, or ship a blog post.
---

# Critical Rules
- **MUST** select phase from user trigger before any action.
- **MUST** use `memory` first for prior context retrieval.
- **MUST** use `chisel` patterns for targeted search/read/edit.
- **MUST** target Hugo posts path: `blogs/content/posts/`.
- **MUST** scaffold first; **NEVER** ghostwrite full posts in bootstrap.
- **MUST** preserve blog config expectations:
  - Base URL: `https://alankyshum.github.io/blogs/`
  - Taxonomies: `tags`, `categories`
  - Permalink pattern: `/posts/:slug/`
- **NEVER** publish fluff, vague hype, or unsubstantiated claims.
- **NEVER** skip constraints, trade-offs, costs, or failure modes.
- **MUST** run Content Audit (Phase 2.5) before publishing; **NEVER** skip claim verification.

# Trigger → Phase Mapping

| Trigger intent | Phase | Primary output |
|---|---|---|
| "write a blog post about X", "start a blog post about X" | Phase 1: Bootstrap | Draft scaffold with TODO placeholders |
| "review my blog post", "critique my draft" | Phase 2: Review & Critique | Line-by-line editorial feedback + rewrites |
| "audit my blog post", "check my claims", "fact check" | Phase 2.5: Content Audit | Contradiction report + industry-divergent claims report |
| "publish my blog post", "ship it" | Phase 3: Publish | Draft false + cover image JSON + build verify + git push + URL |

If ambiguous, default to **Phase 1 (Bootstrap)**.

# User Topic Context (Prioritize)

| Area | Topic examples |
|---|---|
| AI-Augmented Engineering | Roo skills, agent memory, deterministic compute + LLM interpretation, AI-assisted review |
| Staff Engineer Playbook | IC4 growth, I-LEC, PR discipline, engineering strategy |
| Systematic Personal Workflows | PRM, reflection systems, knowledge graphs, learning pipelines |
| Startup Research | Auto shop SaaS, Mom Test interviews, RainbowLab |
| Chinese Metaphysics Computing | ZWDS/QMDJ pipelines, fengshui systems, SQLite knowledge graphs |
| Bilingual Technical Content | Traditional Chinese OCR, Cantonese technical analysis |

# Shared Preflight (All Phases)
1. Search memory for relevant prior facts, drafts, and decisions.
2. Scan `INBOX/` for recent notes and concrete incidents.
3. Check existing posts in `blogs/content/posts/` for overlap.
4. Choose response language from user input (English or Traditional Chinese).
5. Apply user writing style: structured headings, bullets/tables, code snippets, actionable ending.

# The Blog Post Framework (7 Sections)

## 1) The Hook (2–3 sentences)
- Painful technical problem encountered
- Why an HN reader should care now
- Start with specific pain; no generic intros

## 2) Context & Constraints
- Existing system/situation
- Constraints: team size, budget, timeline, legacy debt
- Rejected alternatives with explicit reasons

## 3) The Approach
- What was built/done
- System overview / architecture shape
- Key decisions + trade-off analysis

## 4) The Implementation (Show, Don’t Tell)
- Critical snippets only (not full files)
- High-impact config
- Non-obvious hard parts

## 5) Results & Numbers
- Before/after metrics
- Performance/cost/time impact
- What exceeded expectations vs what failed

## 6) Lessons Learned (Real Value)
- What would be done differently
- Surprises and broken assumptions
- Mental model shifts

## 7) What’s Next
- Open technical questions
- Known breakdown points / limits
- Specific feedback request to readers

# Phase 1 — Bootstrap Scaffold (No Ghostwriting)
1. Gather evidence from memory + `INBOX/` + overlap check.
2. Generate frontmatter and scaffold file at `blogs/content/posts/<slug>.md` with `draft: true`.
3. Pre-fill frontmatter fields: `title`, `date`, `description`, `tags`, `categories`, `slug`, `draft`.
4. Create all 7 sections with guiding prompts in HTML comments:

```markdown
## 1) The Hook
<!-- TODO: What exact incident hurt? Include concrete symptom/error in 1 sentence. -->
<!-- TODO: Why should an HN reader care? Add one specific stake (latency, cost, reliability, velocity). -->

## 2) Context & Constraints
<!-- TODO: Describe starting architecture and business constraints (team/time/budget/debt). -->
<!-- TODO: List at least 2 alternatives rejected and why. -->
```

5. End bootstrap response with: `Draft scaffold created. Fill in your content, then ask me to review it.`

# Phase 2 — Review & Critique (HN Filter)
Adopt ruthless HN/YC editor stance: brutally honest, concise, constructive.

## Communication Style Directives
- Be direct; attack ideas, not people.
- Cut fluff and buzzwords immediately.
- Flag every unsubstantiated claim.
- Challenge complexity: "Can this be cheaper, faster, simpler?"
- Demand evidence: code, trade-offs, numbers, failure cases.
- Prioritize technical truth over tone-polish.

## Review Checklist
1. Verify hook specificity and pain-point sharpness.
2. Validate constraints and rejected alternatives.
3. Challenge architectural decisions and hidden complexity.
4. Ensure implementation includes meaningful snippets/config.
5. Require quantified outcomes (or explicit missing-data callout).
6. Force real lessons (no platitudes).
7. Detect weak ending; require precise open question.

## Output Contract
- Provide line-by-line feedback with concrete rewrites.
- Produce 3–5 factual, non-clickbait title alternatives.
- End with **exactly one** critical defense question.

# Phase 2.5 — Content Audit (Fact & Consistency Check)
Run after Phase 2 editorial pass, before publish.

## Analysis 1: Internal Contradictions
Scan for claims that conflict within the post.

| Check | Action |
|---|---|
| Numeric consistency | Verify same metric isn't cited with different values across sections |
| Capability claims vs evidence | Ensure claimed tool/model usage matches examples shown |
| Scope contradictions | Flag when general claims conflict with scoped qualifiers |

For each finding, report:
- **Location**: Conflicting sections
- **Claim A vs B**: The two statements
- **Severity**: High (factually impossible) / Medium (tension) / Low (minor)
- **Fix**: Concrete resolution

## Analysis 2: Industry-Divergent Claims
Flag assertions that conflict with current industry consensus.

**MUST** use `perplexity-search` skill to verify:
- Model capability comparisons (e.g., "X is better than Y at Z")
- Platform feature claims (e.g., context window sizes, pricing)
- Architectural pattern superiority claims (e.g., "multi-agent > single-agent")
- Any quantitative performance claims without methodology

For each finding, report:
- **Location**: Section and approximate quote
- **The claim**: What the post asserts
- **Industry consensus**: What evidence/practitioners say
- **Risk**: High (HN will call out immediately) / Medium (debatable) / Low (defensible minority view)
- **Fix**: Qualify, add evidence, or rephrase

## Output Contract
- Two tables: contradictions + industry-divergent claims
- Severity/risk ratings for prioritization
- Concrete fix suggestions (not vague "consider revising")
- End with net editorial recommendation: case study vs benchmark framing

# Phase 3 — Publish
1. Update frontmatter `draft: false`.
2. Run final SEO checks:
   - Description concise and specific
   - Reasonable tag count
   - Slug format valid
3. Cover Image Generation:
   - Summarize the blog post in 2–3 sentences capturing core theme, audience, and visual mood.
   - Generate an image prompt for a technical blog cover illustration (clean, modern, minimal) with:
     - No text/words/letters in the image
     - Visual metaphors representing the core concept
     - Composition guidance (e.g., isometric, flat lay, hero banner 16:9)
     - Color palette guidance aligned with tech blog aesthetics
   - Output JSON for image generation APIs:

```json
{
  "summary": "<2-3 sentence blog summary>",
  "prompt": "<the full image generation prompt>",
  "negative_prompt": "text, words, letters, watermark, signature, blurry, low quality, photorealistic faces",
  "aspect_ratio": "16:9",
  "style": "digital illustration",
  "suggested_filename": "cover.png"
}
```

   - After user provides the generated image:
     - Save as `cover.png` in the page bundle directory: `blogs/content/posts/<slug>/cover.png`
     - Update frontmatter:

```yaml
cover:
  image: "cover.png"
  alt: "<descriptive alt text based on blog title>"
  caption: "<blog post title>"
```

4. Build verification in `blogs/`:

```bash
hugo --minify
```

5. Git publish flow in `blogs/`:

```bash
git add content/posts/<slug>.md
git commit -m "feat(blog): publish <post title>"
git push
```

6. Report live URL: `https://alankyshum.github.io/blogs/posts/<slug>/`.

# Frontmatter Template

```yaml
---
title: "<post title>"
date: <ISO datetime>
description: ""
tags: []
categories: []
slug: "<slug>"
draft: true
cover:
  image: "cover.png" # Populated during publish workflow
  alt: ""
  caption: ""
ShowToc: true
TocOpen: false
---
```

# Image Organization

## Critical Rules
- **MUST** store images in a post-specific subdirectory: `blogs/content/posts/<slug>/`
- **MUST** use descriptive, kebab-case filenames (e.g., `orchestrator-todo-list-tracking.png`, NOT `image-3.png`)
- **MUST** include meaningful alt text in markdown references (NOT `![alt text]`)
- **NEVER** leave generic image names (`image.png`, `image-1.png`, `Screenshot...`) in the final post

## Cover Images
- **MUST** name cover image exactly `cover.png` in the page bundle directory
- **MUST NOT** include text/words/letters in cover images (AI generation limitation)
- **MUST** write alt text that describes the blog post topic, not a literal pixel-level description of the image

## Naming Convention
- Format: `<short-descriptive-name>.png` (kebab-case, lowercase)
- Name should describe what the image shows, not its position in the post
- Examples:
  - ✅ `roo-code-marketplace-custom-agents.png`
  - ✅ `orchestrator-prompt-token-usage.png`
  - ❌ `image.png`
  - ❌ `screenshot-2025-03-03.png`

## Directory Structure
```
blogs/content/posts/
├── my-blog-post.md
└── my-blog-post/
    ├── feature-architecture-diagram.png
    ├── before-after-metrics.png
    └── terminal-output-example.png
```

## Markdown Reference Format
```markdown
![Descriptive alt text explaining what the image shows](<slug>/descriptive-filename.png)
```

## Workflow (All Phases)
- **Phase 1 (Bootstrap)**: If the user provides images, rename and organize them during scaffold creation
- **Phase 2 (Review)**: Flag any generic image names or missing alt text as review findings
- **Phase 3 (Publish)**: Verify all images exist at their referenced paths before build

# Tooling References
- Use `memory` skill first for continuity.
- Use `chisel` workflow for efficient discovery and minimal diffs.

# Mode Compatibility
- Works in **code** mode (file edits, build, git publish).
- Works in **orchestrator** mode (research → scaffold → critique → publish).