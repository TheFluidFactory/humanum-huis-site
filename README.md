# Humanum Huis website

The public website for **Humanum Huis**, a human-readiness practice for the AI age, based in Amsterdam.

Production domain: **https://humanumhuis.com**

## What this repository contains

This is a static GitHub Pages website. There is no build step, database, CMS, analytics platform, tracking script, booking service, or server-side application.

The complete site and the in-page **Human Readiness Mirror** live in `index.html`. CSS and JavaScript are intentionally self-contained. Google Fonts are the only runtime dependency.

```text
index.html                         Public site and Mirror
404.html                           Branded GitHub Pages fallback
CNAME                              Custom domain: humanumhuis.com
.nojekyll                          Prevents GitHub Pages from applying Jekyll
privacy.html                       Public Mirror contact-request privacy notice
mirror-config.js                   Public Apps Script endpoint address; no credentials
MIRROR_CAPTURE_APPS_SCRIPT.gs      Bound Google Apps Script source
MIRROR_CAPTURE_SETUP.md            One-time contact-lead setup and test steps
CONTACT_FLOW.md                    Contact and data-handling behavior
DEPLOYMENT.md                      GitHub Pages, domain, DNS and HTTPS instructions
ROUTES.md                          Current section map and legacy-anchor handling
TODO.md                            Real remaining assets and links to confirm
```

## Human Readiness Mirror

The Mirror is a 12-question in-page reflection. It calculates the archetype, Ladder position and readiness-gap profile in the browser.

- Completing the Mirror does not send or store answers.
- The PDF result is generated locally in the browser.
- The only data capture path is an explicit **Request a conversation** action with a required email address and consent checkbox.
- Every valid request creates one private Google Sheet lead row and sends one notification to `flourish@humanumhuis.com`.
- Anonymous results are not stored.

See `MIRROR_CAPTURE_SETUP.md` before changing the contact endpoint or Apps Script.

## Preview locally

No build tools are necessary. From the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Editing the site

- Content, styling and browser-side interactions live in `index.html`.
- The response endpoint address lives in `mirror-config.js` and is public by design; never put passwords, API tokens or spreadsheet credentials there.
- Contact storage/notification code lives in `MIRROR_CAPTURE_APPS_SCRIPT.gs` and must stay in the private bound Apps Script project.
- Review `privacy.html` if the data, retention or contact flow changes.
- Do not remove `CNAME`, `.nojekyll`, or `404.html`.

## Deployment

Push changes to `main`. GitHub Pages publishes the repository root. For domain and DNS steps, read `DEPLOYMENT.md`.
