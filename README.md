# SK Studio — Creative Events website

Single-page Next.js 16 site (App Router) + Tailwind CSS v4 + Framer Motion.

## Run it

```bash
npm install
npm run fetch-stock   # one time: saves the free stock photos into public/images/stock
npm run dev           # http://localhost:3000
npm run build && npm start
```

## Page structure (all on the home page)

| Navbar link | Section id | Component |
| --- | --- | --- |
| Home | `#home` | `ScrollHero.jsx` (scroll-driven diagonal photo wipes) |
| About Us | `#about` | `About.jsx` (founder, reasons, team photo) |
| Services | `#services` | `ServicesShowcase.jsx` (bento grid, everything visible) |
| (no nav link) | `#why-us` | `WhyUs.jsx` (crest with six reasons) |
| Gallery | `#gallery` | `Gallery.jsx` (all birthday photos, even 4:3 grid + viewer) |
| (no nav link) | `#reels` | `Reels.jsx` (muted looping videos gliding past) |
| (no nav link) | `#surprise` | `SurpriseSpotlight.jsx` (surprise video with sound toggle) |
| Contact | `#contact` | `ContactSection.jsx` (WhatsApp form, details, Google Map) |

Old URLs `/services`, `/gallery`, `/contact`, `/about` redirect to these sections.

## Where to edit

Everything lives in `src/config/site.js`:

- `founder` — owner name, role, quote
- `contact` — phone, WhatsApp, email, address, `mapQuery` (exact address for the map)
- `birthdayPhotos` — every photo shown in the gallery
- `heroSlides` — hero photos in scroll order
- `services`, `reasons`, `steps`, `testimonials`

## Adding new birthday photos

1. Put the photo in `public/images/birthdays/` (eg. `birthday-31.jpg`, ~1800px wide JPG).
2. Add a line to `birthdayPhotos` in `site.js`, with the real width and height:
   `{ src: "/images/birthdays/birthday-31.jpg", w: 1800, h: 1350 },`

## Stock photos

Wedding stages in the hero and most service images are free-licence photos (Pexels, one Unsplash).
They load online until you run `npm run fetch-stock`, which downloads them into `public/images/stock/`
and the site switches to the local copies automatically.
Replace them with SK Studio's own wedding/service photos when available.

## Videos

Compressed, muted 18-second clips live in `public/videos/` (`reel-01.mp4` ... with a `.jpg` poster each).
To add one, compress it first (needs ffmpeg):

```bash
ffmpeg -ss 1 -t 18 -i input.mp4 -an -vf "scale=480:-2,fps=24" -c:v libx264 -crf 30 -pix_fmt yuv420p -movflags +faststart public/videos/reel-05.mp4
ffmpeg -ss 1.5 -i public/videos/reel-05.mp4 -frames:v 1 public/videos/reel-05.jpg
```

then add it to `reels` in `site.js`.
