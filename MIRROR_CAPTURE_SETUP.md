# Mirror contact-lead setup — one-time update

This version deliberately stores **only people who ask Humanum Huis to contact them**. It does not collect anonymous Mirror results for trend analysis.

For every valid contact request, it writes a single private Sheet row and sends an email to `flourish@humanumhuis.com`. The email uses the visitor’s address as Reply-To, so Parker can simply reply.

## Already prepared

- The site’s public endpoint URL is already present in `mirror-config.js`.
- The private response Sheet already exists and will automatically update its own headers when the first real lead is saved.
- `MIRROR_CAPTURE_APPS_SCRIPT.gs` contains the complete replacement script.

## Do these steps once

### 1. Replace the Apps Script code

1. Open the private response Sheet:
   `https://docs.google.com/spreadsheets/d/1sJ4BNBubDBdvG7qui-iU6aMfghMyIplYhAsGNrFs280/edit`
2. Choose **Extensions → Apps Script**.
3. Open `Code.gs`.
4. Replace everything in it with the full content of `MIRROR_CAPTURE_APPS_SCRIPT.gs` from this update.
5. Click **Save**.

### 2. Publish the new script version

1. Click **Deploy → Manage deployments**.
2. Open the existing **Web app** deployment and click **Edit**.
3. Under **Version**, select **New version**.
4. Keep **Execute as: Me** and **Who has access: Anyone**.
5. Click **Deploy** and approve the new permission request. The new MailApp permission is required so the script can send lead notifications.

Keep the existing `/exec` URL. A new deployment version updates the service behind it; it does not require changing `mirror-config.js`.

### 3. Upload the website files

Upload the changed/new files in this package to the root of `TheFluidFactory/humanum-huis-site`, replacing files with the same name:

```text
index.html
mirror-config.js
MIRROR_CAPTURE_APPS_SCRIPT.gs
MIRROR_CAPTURE_SETUP.md
CONTACT_FLOW.md
README.md
TODO.md
privacy.html
```

Commit to `main` and wait for GitHub Pages to republish.

### 4. Send one test notification

1. Return to Apps Script.
2. In the function selector near the top, choose `sendTestNotification`.
3. Click **Run**.
4. Approve permissions if Google asks.
5. Confirm that `flourish@humanumhuis.com` receives the test email.

### 5. Test the real visitor flow in an incognito window

1. Open `https://humanumhuis.com` in an incognito/private window.
2. Complete the Mirror.
3. Check that the result page appears without any new Sheet row or email notification.
4. Click **Request the Diagnostic** or **Start a conversation**.
5. Enter a test email, tick the consent checkbox, and click **Request a conversation**.
6. Confirm all three outcomes:
   - one new row appears in the Sheet;
   - its follow-up status is `New`;
   - `flourish@humanumhuis.com` receives one notification with Reply-To set to the test email.
7. Click **Save / print as PDF** to confirm the local PDF option still works.

## What should never create a Sheet row or notification

- Completing the questions.
- Viewing the result.
- Typing into the contact form without submitting.
- Submitting without an email address.
- Submitting without the consent checkbox.
- An obvious bot filling the hidden Website field.

## If something fails

- **No email arrives:** In Apps Script, open **Executions**. The notification status in the Sheet will show whether the email step failed.
- **No Sheet row appears:** Confirm the web app deployment is the latest version and still allows **Anyone**.
- **The site says it sent but the Sheet is empty:** Clear cache or open the page in an incognito window, then confirm `mirror-config.js` still has the `/exec` URL.
- **Do not change the deployment to run as the visitor.** It must run as the owner so anonymous public visitors are not asked to authorize Google access.
