# SEO data puller

Pulls **Google Search Console** + **GA4** data via a service account and writes an
opportunities report to `scripts/seo/output/` (gitignored).

The report is built around *what to do*, not raw rows:

- **Brand vs non-brand** — how much traffic is discovery vs people who already know the place
- **Striking distance** — non-brand queries ranking 5–20 with real impressions (push to page 1)
- **Title/meta rewrites** — high impressions but CTR below what the position should earn
- **Content gaps** — demand exists but only the homepage ranks, or the best page sits past #15
- **Movers** — biggest click swings vs the previous equal window
- **Top queries / pages** and **GA4 channels / devices / landing pages** for context

## Setup

This reuses the `seo-reader@exit1-dev.iam.gserviceaccount.com` service account (the
GCP project already has the Search Console API and Analytics Data API enabled). The key
lives at `scripts/seo/.keys/seo-reader.json` and is gitignored.

Grant that service-account email read access to both properties:

- **Search Console** (search.google.com/search-console) → `sanktknuds.dk` →
  **Settings → Users and permissions → Add user** → paste the SA email → **Restricted** is enough.
- **GA4** (analytics.google.com) → **Admin → Property → Property access management → +** →
  paste the SA email → **Viewer**.
- Grab the **GA4 numeric property ID**: Admin → Property → **Property details** (a number like
  `123456789`). This is *not* the `G-XXXXXXX` measurement id.

Then fill in `.env.local`:

```
GOOGLE_APPLICATION_CREDENTIALS=scripts/seo/.keys/seo-reader.json
GSC_SITE_URL=sc-domain:sanktknuds.dk
GA4_PROPERTY_ID=123456789
# optional
SEO_DAYS=28
SEO_COUNTRY=dnk
SEO_MIN_IMPR=10
```

> `GSC_SITE_URL` is `sc-domain:sanktknuds.dk` for a Domain property, or the exact URL-prefix
> (e.g. `https://sanktknuds.dk/`) if that's how the property was added in Search Console.

## Run

```
pnpm seo
```

Writes `scripts/seo/output/seo-YYYY-MM-DD.md` and prints a summary. Either source is optional —
set only `GSC_SITE_URL` or only `GA4_PROPERTY_ID` to pull just one.

## Tuning for a small site

Defaults are scaled for a local restaurant, not a SaaS blog: `SEO_MIN_IMPR` (default 10) is the
impressions floor for striking-distance, and the CTR/gap buckets derive from it. If tables come
back empty, lower it; if they're noisy, raise it.

Brand detection uses a regex over the query (`sankt knud`, `sanktknuds`, `skt knud`, `st knud`).
Override with `SEO_BRAND_REGEX` if it misses variants.
