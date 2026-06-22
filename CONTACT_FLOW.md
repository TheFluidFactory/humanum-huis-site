# Contact flow and data posture

## Contact

The site has no server-side contact form. Every call to action opens the visitor's email client through a direct `mailto:` link.

Contact address:

```
flourish@humanumhuis.com
```

The pre-filled subject changes by intent, so messages can arrive labelled as Mirror, partnership, speaking, diagnostic or general Humanum Huis enquiries. The visitor writes and sends the message from their own email account. The website itself does not receive or store contact data.

This is deliberate: a static GitHub Pages deployment must not imply that it can submit a form to a server when no endpoint exists.

## Human Readiness Mirror

The 12-question Mirror runs in the browser.

- Answers, readiness gaps, Ladder position and archetype are calculated locally.
- In the current production configuration, no answers are sent, stored, logged or transmitted.
- No name, email address, IP address or identifying detail is requested by the Mirror.
- The optional consent checkbox is unchecked by default. In this static version it does not enable collection; it reserves explicit consent for a future aggregate-study version.
- The visitor receives the same complete result whether the checkbox is checked or not.

## Optional future endpoint

The source supports an optional `window.HRM_ENDPOINT` only for a future, real endpoint. It is not configured in this repository.

Before enabling it:

1. Use a genuine endpoint with an explicit data policy and lawful basis.
2. Keep the client-side consent gate intact: the code must only POST when the visitor has opted in.
3. Do not store any response when consent is absent.
4. Update the visible Mirror copy and privacy documentation to describe the actual data flow.

A future endpoint is not required for the current site to work.
