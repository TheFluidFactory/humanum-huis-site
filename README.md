# Humanum Huis — Placeholder Site

A single-page placeholder for **humanumhuis.com**, deployable on GitHub Pages with no build step.

## What's in this folder

| File | Purpose |
|------|---------|
| `index.html` | The landing page. Self-contained — all CSS inline, one Google Font, no JS dependencies. |
| `404.html`   | Branded 404 fallback. |
| `CNAME`      | Custom-domain config for GitHub Pages. **Edit before deploy** if the domain isn't `humanumhuis.com`. |
| `.nojekyll`  | Tells GitHub Pages to skip Jekyll processing (faster, fewer surprises). |
| `README.md`  | This file. |

## Editing before deploy

Open `CNAME` and confirm the domain on line 1. If it's not `humanumhuis.com`, replace it with the correct apex domain (e.g. `humanumhuis.nl`) and save.

Optionally, update the contact email in `index.html` — search for `hello@humanumhuis.com` and replace if needed.

---

## Deploy step-by-step (GitHub web UI, ~15 min)

### 1. Create the repository
1. Sign in to GitHub.
2. Click **+** (top right) → **New repository**.
3. Name it `humanum-huis-site` (or any name — the name doesn't affect the custom domain).
4. Set it to **Public**.
5. Don't tick "Add a README" — we already have one.
6. Click **Create repository**.

### 2. Upload the files
1. On the empty repo page, click **uploading an existing file** (the link inside the quick-setup box).
2. Drag this entire folder's contents (or select all files) into the upload area.
   - Make sure `index.html`, `404.html`, `CNAME`, `.nojekyll`, and `README.md` are all listed.
   - Note: `.nojekyll` may appear hidden depending on your OS — show hidden files if needed.
3. Scroll down → commit message: "Initial placeholder".
4. Click **Commit changes**.

### 3. Enable GitHub Pages
1. In the repo, click **Settings** (top tab).
2. Left sidebar → **Pages**.
3. Under "Build and deployment" → **Source**: select **Deploy from a branch**.
4. Under **Branch**: select `main` and `/ (root)`. Click **Save**.
5. Wait ~1 minute. Refresh. You'll see a green box with a URL like `https://<your-username>.github.io/humanum-huis-site/` — the site is live.

### 4. Connect the custom domain
1. Still in **Settings → Pages**, find **Custom domain**.
2. Enter `humanumhuis.com` (or whichever apex domain). Click **Save**.
   - GitHub will start a DNS check — it will fail until step 5 is done. That's expected.

### 5. Add DNS records at the domain registrar
Log in wherever the domain is registered (e.g. TransIP, Namecheap, GoDaddy, Cloudflare, Wix Domains) and open the DNS settings for `humanumhuis.com`.

Add these records. **Delete any conflicting A/CNAME records on the same hostnames first.**

**For the apex (`humanumhuis.com`)** — four A records, all with the same host (`@` or blank, depending on registrar):

| Type | Host | Value             | TTL    |
|------|------|-------------------|--------|
| A    | @    | 185.199.108.153   | Auto/3600 |
| A    | @    | 185.199.109.153   | Auto/3600 |
| A    | @    | 185.199.110.153   | Auto/3600 |
| A    | @    | 185.199.111.153   | Auto/3600 |

**For `www.humanumhuis.com`** — one CNAME (replace `<your-username>` with your GitHub username):

| Type  | Host | Value                       | TTL    |
|-------|------|-----------------------------|--------|
| CNAME | www  | `<your-username>.github.io` | Auto/3600 |

Save. DNS usually propagates within 10–30 minutes (sometimes longer).

### 6. Verify and enforce HTTPS
1. Back in **Settings → Pages**, the DNS check should turn green within ~30 min.
2. Tick **Enforce HTTPS**. (May be greyed out for up to an hour while GitHub provisions the SSL certificate — wait and refresh.)
3. Visit `https://humanumhuis.com` — done.

---

## Updating the site later

Two easy options:

**Web UI**: Open `index.html` in the repo → pencil icon → edit → "Commit changes". Live within ~1 min.

**VS Code / local**: Clone the repo, edit, commit, push. Standard git flow.

## Notes

- The single page uses anchor links (`#contact`, `#philosophy`) so nav items don't 404 — they scroll to the relevant section. Fine for a placeholder.
- All copy from the original artifact is preserved (the "small fraternity" line, footer columns, tagline).
- Font: EB Garamond via Google Fonts. Open-source, matches the artifact's classical serif feel.
- Colors are defined as CSS variables at the top of `index.html` — easy to tweak.
- No tracking, no JS dependencies, ~6 KB HTML uncompressed.
