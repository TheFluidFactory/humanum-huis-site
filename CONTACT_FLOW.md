# Contact flow and data posture

## Contact

The main website uses direct `mailto:` links to `flourish@humanumhuis.com`. There is no server-side contact form.

## Human Readiness Mirror

The 12-question Mirror calculates its archetype, Ladder position and five readiness gaps in the visitor’s browser. Completing the Mirror does not automatically send or store answers.

At the result screen, visitors can:

- **Save / print as PDF** — generated locally in their browser.
- **Save this reflection with Humanum Huis** — available only after the Google Apps Script endpoint is configured. This is opt-in and requires an explicit storage-consent checkbox.

The optional saved fields are name, organization, email, answer pattern, result summary, readiness-gap scores, source URL and version. Name, organization and email are optional. If an email is supplied, the visitor gives permission for Humanum Huis to follow up about that submitted reflection.

The capture endpoint writes to the private Google Sheet documented in `MIRROR_CAPTURE_SETUP.md`. The spreadsheet ID and Google permissions are kept inside Apps Script, never in website code.

Visitors are told they can ask for deletion through `flourish@humanumhuis.com`. Before broad promotion, define a data-retention period and incorporate it into Humanum Huis’s public privacy information.
