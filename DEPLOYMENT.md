# Deployment

## Publishing model

The site is a static GitHub Pages deployment from the repository root on the `main` branch. There is no build step.

In the repository, set **Settings → Pages → Build and deployment** to:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

Every push to `main` republishes the site.

## Custom domain

Production domain: `humanumhuis.com`

The root `CNAME` file contains this domain and must stay in the repository. It preserves the custom-domain association for branch deployments, but it does **not** replace the GitHub Pages setting itself.

In **Settings → Pages → Custom domain**, enter `humanumhuis.com` and save it. If this site is replacing an existing GitHub Pages site in the same repository, retain the existing custom-domain setting and leave the `CNAME` file in place.

If GitHub says the domain is already in use, remove it from the old GitHub Pages repository first, then add it here.

## DNS

At the DNS provider for `humanumhuis.com`, the apex domain should point to GitHub Pages with these A records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www`, use a CNAME to the GitHub Pages host for the account that owns this repository:

```
www → <github-owner>.github.io
```

The owner is deliberately not hard-coded here. Confirm it in GitHub Pages before changing any active DNS records.

## HTTPS

Once GitHub Pages shows the domain as verified, enable **Enforce HTTPS** in **Settings → Pages**. GitHub provisions the certificate automatically after DNS validation.

## Deploy a change

```bash
git add .
git commit -m "Update Humanum Huis website"
git push origin main
```

GitHub Pages normally republishs shortly after the push. Confirm the final page at `https://humanumhuis.com` and test the 404 page at a clearly nonexistent path.

## Keep these files

- `CNAME` — preserves `humanumhuis.com` for branch publishing.
- `.nojekyll` — makes GitHub Pages serve this static site without Jekyll processing.
- `404.html` — branded fallback.

## Deliberate non-features

This repository does not deploy a backend, form service, analytics tracker, cookie banner, database, CMS or booking service. Do not add one implicitly while making routine site updates.
