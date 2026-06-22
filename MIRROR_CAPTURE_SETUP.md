# Mirror response capture — one-time setup

The website now has two independent result actions:

1. **Save / print as PDF** works immediately in the visitor’s browser.
2. **Save this reflection** appears after the free Google Apps Script endpoint is connected. It saves only visitors who explicitly opt in, including their optional email address.

## What has already been created

A Google Sheet is ready for responses:

https://docs.google.com/spreadsheets/d/1sJ4BNBubDBdvG7qui-iU6aMfghMyIplYhAsGNrFs280/edit

It has a `Responses` tab and columns for consent, optional contact details, archetype, ladder level, gap scores, answer summary, result summary, source URL and Mirror version.

## Your four manual steps

### 1. Open the sheet and its script editor

1. Open the Google Sheet above while signed in to the Google Workspace account that should own the data.
2. Click **Extensions → Apps Script**.
3. In the editor, open `Code.gs`, select all existing code, delete it, and paste the full contents of `MIRROR_CAPTURE_APPS_SCRIPT.gs` from this package.
4. Press **Save**. Name the Apps Script project `Humanum Huis Mirror capture` when Google asks.

### 2. Deploy it as the receiving endpoint

1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear icon next to **Select type**, then choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**. This must allow visitors who are not signed into Google.
5. Click **Deploy**, review/approve Google’s permissions, then copy the URL that ends in `/exec`.

Do not use the `/dev` URL. It only works for editors and will fail for real visitors.

If Google Workspace does not offer **Anyone**, the Workspace admin has disabled public Apps Script web apps. Do not weaken Drive sharing; instead use an n8n webhook or ask the admin to permit this one web app.

### 3. Put the endpoint URL in the website

1. In the GitHub repository, open `mirror-config.js`.
2. Replace the empty string in this line with the copied `/exec` URL:

```js
window.HRM_SUBMISSION_ENDPOINT = "PASTE_WEB_APP_URL_HERE";
```

It should end up looking like this:

```js
window.HRM_SUBMISSION_ENDPOINT = "https://script.google.com/macros/s/EXAMPLE/exec";
```

3. Commit the file to `main`.

The URL is allowed to be public. It is an endpoint address, not a password; the spreadsheet ID and Google account permissions remain inside Apps Script.

### 4. Test once before telling anyone

1. Open the site in a private/incognito browser window.
2. Complete the Mirror.
3. On the result page, select **Save this reflection**.
4. Tick the storage consent, enter a test email, and save.
5. Confirm that a new row appears in the `Responses` sheet.
6. Check that **Save / print as PDF** opens a printer dialog where a visitor can choose **Save as PDF**.

## Data posture used in the site

- The Mirror still runs locally; nothing is stored automatically.
- A response is saved only after the visitor ticks the explicit storage consent box.
- Name, organization and email are optional.
- An email is treated as permission for Humanum Huis to follow up about that submitted reflection.
- The website does not send an automated email. This avoids a misleading sender address and keeps the setup simple.
- Visitors are told they can request deletion through `flourish@humanumhuis.com`.

Before promoting the tool widely, decide internally how long submissions should be retained and include that in Humanum Huis’s public privacy information.
