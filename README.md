# Outskirt Cafe & Restaurant: website demo

Static site (HTML, CSS, vanilla JS). No build step, no backend. This is a **demo proposal**, not an official site.

## Replace before presenting as official
All in `script.js` > `CONFIG`:
- `whatsapp` (digits with country code, e.g. `91XXXXXXXXXX`) and `phoneDisplay`: until set, WhatsApp buttons stay disabled with a demo notice.
- `hours`, `dining`: shown as "To be confirmed" until filled.
- `mapsListingUrl`: the cafe's real Google Maps link (enables the review button).
- `instagram`: profile URL.
- `menu` items, prices, veg/non-veg tags; then set `menuIsSample: false`.
- Gallery/menu/hero photos are temporary Unsplash samples, not photos of this cafe. Replace with real photos (put files in an `images/` folder and change the `img()` helper / hero URL in `style.css`).
- In `index.html`: canonical URL (`YOUR-DOMAIN-HERE`) and the `og:image`.
- Rating (4.4) and review count (269) come from the supplied reference; confirm on Google.

## Local preview
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## GitHub upload
1. Create a new repository on github.com.
2. Upload `index.html`, `style.css`, `script.js`, `README.md` (Add file > Upload files), then commit.

## Deploy on Vercel
1. Sign in at vercel.com with GitHub and click **Add New > Project**.
2. Import the repository.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty.
4. Click **Deploy**. Vercel gives you a live URL.

The QR code is generated from the live URL of whichever site it is opened on, so it automatically uses your final domain. Download it from the live site, not from localhost.

## Notes
Needs internet for Google Fonts, the QR library (cdnjs), sample images and the map embed. No Google ranking or indexing is promised.
