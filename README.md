# K Nails

A responsive React + TypeScript website for K Nails in North Hollywood, California.

## Business details

- Address: 12650 Sherman Way, Suite 2, North Hollywood, CA 91605
- Phone: (818) 764-3088
- Google Maps: https://maps.app.goo.gl/VNqh8QbVGU9fU5ZG7
- Services referenced on the site: manicure, pedicure, nail art, dipping powder and waxing

The site intentionally does not publish unverified prices, appointment links or business hours. Visitors are directed to call the salon for current details.

## Photography

The old `assets/` directory is not used by the site or build process. The website uses fresh, externally hosted photographs from Unsplash under the Unsplash License. They are presented as general nail/beauty inspiration, not as photographs of K Nails premises, technicians, or customer work.

- [Chelson Tamares — light pink manicure](https://unsplash.com/photos/hand-with-light-pink-manicured-nails-vtQHwU4F13s)
- [Designecologist — pink manicure](https://unsplash.com/photos/selective-focus-photography-of-womans-pink-manicure-r-Ej0NQmFlQ)
- [Giorgio Trovato — salon manicure](https://unsplash.com/photos/a-woman-getting-her-nails-done-at-a-nail-salon-gb6gtiTZKB8)
- [Anna Keibalo — manicure at a salon](https://unsplash.com/photos/a-woman-getting-her-nails-done-at-a-salon-refgCopwymo)

The Unsplash License permits free use for commercial and non-commercial purposes. Attribution is included on the website as a courtesy.

## Stack

- React 19 + TypeScript
- Vite
- Framer Motion
- Lucide icons
- Responsive custom CSS

## Local development

Install dependencies with `npm install`, then run `npm run dev`.

Create a production build with `npm run build` and preview it with `npm run preview`.

## Deployment

GitHub Actions builds the Vite app and deploys the `dist` directory to GitHub Pages on every push to `main`.

The Vite base path is configured for this repository: `/nails/`. The asset preparation script only writes the Unsplash image manifest and never reads from the removed `assets/` folder.
