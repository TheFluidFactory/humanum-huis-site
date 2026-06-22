# Genuine open items

## Production assets

- [ ] **Social preview image.** The metadata is prepared for a 1200×630 image at `/assets/og-image.png`, but the asset does not yet exist. Add it and uncomment the `og:image` metadata in `index.html` when ready.
- [ ] **Favicon / app icon.** The current inlined SVG fallback works, but a real favicon and Apple touch icon would be better for bookmarks and home-screen use.
- [ ] **Founder image, only if wanted.** The existing founder presentation is intentionally text-led. Add a real image only when Parker chooses the asset and its placement.

## External links

- [ ] **Social or publication links.** No LinkedIn, Instagram, Substack, writing or partner URLs are included because no verified URLs were supplied. Add only real, approved destinations.

## Optional technical decisions

- [ ] **Self-host fonts.** Google Fonts is the only third-party runtime dependency. Self-host Cormorant Garamond, Cormorant SC and Raleway if full third-party independence is desired.
- [ ] **Analytics.** None is installed. Add a privacy-respecting option only after deciding what should be measured and documenting its data implications.

## Already settled

- Custom domain: `humanumhuis.com`.
- Static GitHub Pages deployment from `main` root.
- Contact flow: direct `mailto:` to `flourish@humanumhuis.com`.
- Mirror: local browser computation, no backend configured.

## Mirror capture

- [ ] Deploy the bound Google Apps Script web app and add its `/exec` URL to `mirror-config.js`. See `MIRROR_CAPTURE_SETUP.md`.
- [ ] Decide a retention period for opted-in Mirror submissions before broad promotion.
