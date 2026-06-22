# Humanum Huis website

The public website for **Humanum Huis**, a human-readiness practice for the AI age, based in Amsterdam.

Production domain: **https://humanumhuis.com**

## What this repository contains

This is a static GitHub Pages website. There is no build step, database, CMS, analytics platform, tracking script, booking service, or server-side application.

The complete website, including the in-page **Human Readiness Mirror**, lives in `index.html`. CSS and JavaScript are intentionally self-contained. Google Fonts are the only runtime dependency.

```
index.html        Complete public site and Human Readiness Mirror
404.html          Branded GitHub Pages fallback
CNAME             Custom domain: humanumhuis.com
.nojekyll         Prevents GitHub Pages from applying Jekyll processing
README.md         Repository overview and maintenance notes
DEPLOYMENT.md     GitHub Pages, domain, DNS and HTTPS instructions
ROUTES.md         Current section map and legacy-anchor handling
CONTACT_FLOW.md   Contact and Mirror data-handling behavior
TODO.md           Real remaining assets and links to confirm
```

## Site structure

The public site is a single narrative page with normal in-page anchors:

- `#human-readiness` — The Human Readiness Gap
- `#building` — What Humanum Huis is building
- `#method` — Mirror / Dream / Compass
- `#work` — The Human Readiness Journey
- `#ladder` — Five levels of human-AI maturity
- `#patterns` — Patterns across organizations
- `#start` — Self-selected starting points
- `#about` — Founder and ecosystem
- `#contact` — Final contact call to action

On small screens, the primary navigation becomes an accessible menu toggle.

## The Human Readiness Mirror

The Mirror is a 12-question, in-page self-assessment. It calculates the archetype, Ladder position and readiness-gap profile in the visitor's browser. In this deployment, no responses are transmitted or stored.

The source has optional support for `window.HRM_ENDPOINT`, but no endpoint is configured. If an endpoint is added later, the code only sends a request when the visitor has explicitly opted in. See `CONTACT_FLOW.md` before changing this behavior.

## Preview locally

No build tools are necessary. From the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Editing the site

- Content, styling and browser-side interactions live in `index.html`.
- The site uses inline CSS tokens near the top of `index.html`.
- Do not remove `CNAME`, `.nojekyll`, or `404.html`.
- Keep all public links relative or canonical; do not introduce Claude artifact or preview URLs.

## Deployment

Push changes to `main`. GitHub Pages publishes the repository root. For the custom-domain and DNS steps, read `DEPLOYMENT.md`.
