# Routes and links

## Pages

| File | Purpose |
|---|---|
| `index.html` | Entire public website and Human Readiness Mirror |
| `404.html` | Branded GitHub Pages fallback |

The site is a single-page experience. Sections use normal fragment URLs rather than separate page routes.

## Current anchors

| Anchor | Section | Purpose |
|---|---|---|
| `(top)` | Hero | Opening statement and entry to the Mirror |
| `#human-readiness` | The Gap | Defines the Human Readiness Gap |
| `#building` | What We Are Building | Public intelligence, practical capacity and support |
| `#method` | Method | Mirror / Dream / Compass |
| `#work` | Work With Us | Human Readiness Journey and related offers |
| `#ladder` | The Ladder | Five levels of human-AI maturity |
| `#patterns` | Patterns | Observations that recur across organizations |
| `#start` | Start Here | Entry points for teams, individuals and institutions |
| `#about` | About | Founder-led, ecosystem-strengthened practice |
| `#contact` | Final CTA | Contact invitation and direct email path |

## Human Readiness Mirror

The Mirror opens in an in-page overlay. It is not a separate URL. Buttons labelled **Open the Door** launch it without leaving the page.

## Contact links

All contact actions use `mailto:` links to:

```
flourish@humanumhuis.com
```

Subjects label intent, including `Begin with the Mirror`, `Book a conversation`, `Partnership`, `Inviting Parker to speak`, `Human Readiness Diagnostic`, and `Humanum Huis`.

## Legacy links

The previous site used these anchors:

| Previous anchor | Current behavior |
|---|---|
| `#philosophy` | Redirects to `#human-readiness` |
| `#ladder` | Preserved directly |
| `#services` | Redirects to `#work` |
| `#diagnostic` | Opens the Human Readiness Mirror |
| `#about-us` | Redirects to `#about` |
| `#contact` | Preserved directly |

The alias behavior is handled in `index.html`, so older shared links remain useful.

## Link hygiene

- No `claude.ai` artifact URLs are present.
- No temporary preview, Netlify or external backend URLs are present.
- No fake social or resource links are present.
- Google Fonts is the only external runtime dependency.
