# Genuine open items

## Production assets

- [ ] **Social preview image.** Metadata is prepared for a 1200×630 image at `/assets/og-image.png`.
- [ ] **Favicon / app icon.** Add a real favicon and Apple touch icon when ready.
- [ ] **Founder image, only if wanted.** The presentation is intentionally text-led.

## External links

- [ ] **Social or publication links.** Add only real, approved destinations.

## Optional technical decisions

- [ ] **Self-host fonts.** Google Fonts is the only third-party runtime dependency.
- [ ] **Analytics.** None is installed. Add a privacy-respecting option only after deciding what should be measured and updating privacy information.

## Already settled

- Custom domain: `humanumhuis.com`.
- Static GitHub Pages deployment from `main` root.
- Main contact address: `flourish@humanumhuis.com`.
- Mirror: local browser computation until a visitor actively requests a conversation.
- Lead capture: private Google Sheet row plus one notification email to Flourish for each valid contact request.
- Retention target: delete or anonymise submitted contact requests after 12 months from the last meaningful contact, unless earlier deletion is requested or a legal obligation applies.

## Before broad promotion

- [ ] Replace the bound Apps Script code, deploy its new version and run `sendTestNotification`.
- [ ] Complete the end-to-end incognito test in `MIRROR_CAPTURE_SETUP.md`.
- [ ] Confirm that the public `privacy.html` notice still matches Humanum Huis’s legal entity, access rules and actual retention practice.
