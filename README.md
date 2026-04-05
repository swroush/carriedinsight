# Carried Insight — carriedinsight.com

Executive coaching website for Sharon Roush / Carried Insight.

---

## Deploying to GitHub Pages (step-by-step)

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and log in
2. Click **New repository** (+ icon, top right)
3. Name it exactly: `carriedinsight.com`
   - Or name it anything — the name doesn't affect your custom domain
4. Set to **Public**
5. Click **Create repository**

---

### Step 2 — Upload site files

**Option A — via GitHub web UI (simplest)**

1. In your new repo, click **Add file → Upload files**
2. Upload all files maintaining the folder structure:
   ```
   index.html
   css/main.css
   js/main.js
   README.md
   ```
3. Click **Commit changes**

**Option B — via Git CLI**

```bash
cd /path/to/carriedinsight
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/carriedinsight.com.git
git push -u origin main
```

---

### Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings → Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Branch: `main` / Folder: `/ (root)`
4. Click **Save**

GitHub will publish your site at:
`https://YOUR_USERNAME.github.io/carriedinsight.com/`

---

### Step 4 — Connect your custom domain (carriedinsight.com)

**In your repo:**

1. In **Settings → Pages**, under **Custom domain**, enter: `carriedinsight.com`
2. Click **Save** — GitHub will create a `CNAME` file automatically

**In your DNS provider (GoDaddy, Namecheap, Cloudflare, etc.):**

Add these DNS records:

| Type  | Name | Value                 |
|-------|------|-----------------------|
| A     | @    | 185.199.108.153       |
| A     | @    | 185.199.109.153       |
| A     | @    | 185.199.110.153       |
| A     | @    | 185.199.111.153       |
| CNAME | www  | YOUR_USERNAME.github.io |

3. Check **Enforce HTTPS** once DNS propagates (can take 24–48 hours)

---

### Step 5 — Contact form (optional)

The form currently simulates submission. To make it functional:

**Option A — Formspree (free, no code required)**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form → copy your endpoint URL
3. In `index.html`, replace the `<form id="inquiryForm"...>` tag with:
   ```html
   <form id="inquiryForm" action="https://formspree.io/f/YOUR_ID" method="POST" class="contact-form">
   ```
4. In `js/main.js`, the fetch simulation can be replaced with a real POST

**Option B — Netlify Forms (if you later move to Netlify)**
Add `netlify` attribute to the form tag.

---

## File structure

```
carriedinsight/
├── index.html          # Main site (single page)
├── css/
│   └── main.css        # All styles
├── js/
│   └── main.js         # Animations, nav, form
└── README.md           # This file
```

---

## Updating content

All content is in `index.html`. Key sections:

| Section      | ID in HTML     | What to update |
|-------------|----------------|----------------|
| Hero         | `#hero`        | Headline, subtext, CTA |
| Thesis       | `#thesis`      | Core positioning quote |
| The Practice | `#practice`    | 3 practice cards |
| Approach     | `#approach`    | Methodology text + list |
| Who It's For | `#clients`     | 4 archetype cards |
| About        | `#about`       | Bio, pull quote, credentials |
| Engagement   | `#engagement`  | Timeline phases |
| Perspectives | `#perspectives`| Articles (add links as published) |
| Contact      | `#contact`     | Form + intro copy |

---

## Brand system

| Token       | Value     | Usage |
|-------------|-----------|-------|
| `--black`   | `#090909` | Page background |
| `--gold`    | `#C9A864` | Accent, headings, borders |
| `--cream`   | `#F2EBD9` | Primary text |
| `--slate`   | `#8A8A8A` | Secondary text |
| Display font | Cormorant Garamond | Headlines, quotes |
| Body font    | Jost | Navigation, body, labels |
| Mono font    | DM Mono | Tags, section numbers, labels |
