# Contact flow and data posture

## Main website contact

The main site uses direct `mailto:` links to `flourish@humanumhuis.com`.

## Human Readiness Mirror: contact-lead flow

The 12-question Mirror calculates the archetype, Ladder position and five readiness gaps in the visitor’s browser. Completing the Mirror — including reaching the result screen — does not send, store or notify anyone about a response.

At the result screen, a visitor can:

- **Save / print as PDF**: generated locally in their browser. Nothing is transmitted.
- **Request a conversation**: the only path that transmits anything.

A contact request requires:

1. A valid email address.
2. An explicit checkbox asking Humanum Huis to contact the visitor about the result.
3. A deliberate click on **Request a conversation**.

Only then does the site send the following to the private Google Sheet: email, optional name and organization, answer pattern, result summary, gap scores, source URL, version and submission time. No anonymous Mirror results are stored.

## Notification

For every valid contact request, the bound Google Apps Script:

1. Creates one lead row in the private `Responses` sheet.
2. Sends one notification to `flourish@humanumhuis.com`.
3. Sets the email reply-to address to the visitor’s address.
4. Includes name, organization, archetype, Ladder level, primary gap and executive summary in the notification.

It does not email Flourish when a person merely reaches a result page, enters an email but does not submit, or completes the Mirror anonymously.

## Retention and visitor information

The public `privacy.html` page explains the data flow, deletion route and a 12-month maximum retention target. Review it if Humanum Huis’s legal entity, storage, access, or retention practice changes.

## Technical boundary

The Google Sheet, Google Apps Script permissions, email-sending authority and spreadsheet ID remain inside Apps Script. The public website has only the public web-app URL in `mirror-config.js`; it contains no credential.
