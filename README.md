# K Nails

A responsive React + TypeScript website for K Nails in North Hollywood, California.

## Business details

- Address: 12650 Sherman Way, Suite 2, North Hollywood, CA 91605
- Phone: (818) 764-3088
- Google Maps: https://maps.app.goo.gl/VNqh8QbVGU9fU5ZG7
- Services referenced on the site: manicure, pedicure, nail art, dipping powder and waxing

The site intentionally does not publish unverified prices, appointment links or business hours. Visitors are directed to call the salon for current details.

## Stack

- React 19 + TypeScript
- Vite
- Framer Motion
- Lucide icons
- Responsive custom CSS
- Sharp-generated responsive WebP images

## Local development

Install dependencies with npm install, then run npm run dev.

Create a production build with npm run build and preview it with npm run preview.

## Deployment

GitHub Actions builds the Vite app and deploys the dist directory to GitHub Pages on every push to main.

The Vite base path is configured for this repository: /nails/.

Original source photographs remain in /assets. The optimization script writes responsive WebP variants to public/optimized and regenerates src/assets.generated.ts.
