import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "assets");
const outputDir = path.join(root, "public", "optimized");
const generatedFile = path.join(root, "src", "assets.generated.ts");
const publicBase = "/nails/optimized/";

const sources = [
  {
    id: "IMG_0288",
    file: "IMG_0288.PNG",
    alt: "Glossy soft-pink French manicure with a delicate satin detail",
    label: "Soft pink details",
    role: "hero",
  },
  {
    id: "IMG_0285",
    file: "IMG_0285.PNG",
    alt: "Sculpted milky-white manicure photographed against dark satin",
    label: "Milky finish",
    role: "studio",
  },
  {
    id: "IMG_0284",
    file: "IMG_0284.PNG",
    alt: "Long sculpted nails with colorful graphic details and fine shimmer",
    label: "Art in every detail",
    role: "gallery",
  },
  {
    id: "IMG_0286",
    file: "IMG_0286.PNG",
    alt: "A detailed nail design with a glossy finish",
    label: "A signature look",
    role: "gallery",
  },
];

const heroArtwork = [
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1200'>",
  "<defs>",
  "<linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#fff8fa'/><stop offset='.56' stop-color='#f7dce5'/><stop offset='1' stop-color='#e9b2c2'/></linearGradient>",
  "<linearGradient id='glass' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#f5c2d0'/><stop offset='.45' stop-color='#c96f8d'/><stop offset='1' stop-color='#80364f'/></linearGradient>",
  "<linearGradient id='cap' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#382631'/><stop offset='.55' stop-color='#171116'/><stop offset='1' stop-color='#5c3547'/></linearGradient>",
  "<linearGradient id='shine' x1='0' y1='0' x2='1' y2='0'><stop stop-color='#fff' stop-opacity='.75'/><stop offset='1' stop-color='#fff' stop-opacity='0'/></linearGradient>",
  "<filter id='shadow' x='-40%' y='-30%' width='180%' height='180%'><feGaussianBlur stdDeviation='24'/></filter>",
  "</defs>",
  "<rect width='900' height='1200' fill='url(#bg)'/>",
  "<circle cx='730' cy='220' r='230' fill='#fff' opacity='.24'/><circle cx='130' cy='1010' r='260' fill='#c76e8c' opacity='.11'/>",
  "<path d='M0 760 C190 650 260 950 470 835 S770 690 900 820 V1200 H0Z' fill='#fff' opacity='.23'/>",
  "<circle cx='450' cy='590' r='300' fill='none' stroke='#fff' stroke-opacity='.32' stroke-width='2'/>",
  "<circle cx='450' cy='590' r='330' fill='none' stroke='#a64f6e' stroke-opacity='.12' stroke-width='1'/>",
  "<ellipse cx='450' cy='1000' rx='225' ry='48' fill='#663246' opacity='.18' filter='url(#shadow)'/>",
  "<g transform='translate(450 570) rotate(-7)'>",
  "<rect x='-83' y='-270' width='166' height='145' rx='30' fill='url(#cap)'/>",
  "<rect x='-95' y='-160' width='190' height='92' rx='25' fill='#3c2834' stroke='#e7b0c2' stroke-opacity='.45' stroke-width='3'/>",
  "<rect x='-178' y='-95' width='356' height='475' rx='78' fill='url(#glass)' stroke='#fff' stroke-opacity='.8' stroke-width='5'/>",
  "<path d='M-132 -20 Q-160 25 -150 140 V265 Q-150 320 -110 340' fill='none' stroke='url(#shine)' stroke-width='20' stroke-linecap='round'/>",
  "<path d='M90 -55 Q145 -25 150 60 V240' fill='none' stroke='#fff' stroke-opacity='.18' stroke-width='8' stroke-linecap='round'/>",
  "<rect x='-115' y='65' width='230' height='155' rx='8' fill='#fff8fa' fill-opacity='.93'/>",
  "<text x='0' y='145' text-anchor='middle' font-family='Georgia,serif' font-size='76' fill='#29202a'>K</text>",
  "<text x='0' y='184' text-anchor='middle' font-family='Arial,sans-serif' font-size='18' letter-spacing='7' fill='#9b536e'>NAILS</text>",
  "</g>",
  "<g fill='#fff' opacity='.88'><path d='m173 235 10 29 29 10-29 10-10 29-10-29-29-10 29-10Z'/><path d='m720 510 7 20 20 7-20 7-7 20-7-20-20-7 20-7Z'/><path d='m690 910 5 15 15 5-15 5-5 15-5-15-15-5 15-5Z'/></g>",
  "<g fill='none' stroke='#fff' stroke-opacity='.55' stroke-width='2'><path d='M160 475h38m-19-19v38'/><path d='M740 750h32m-16-16v32'/></g>",
  "<text x='450' y='1090' text-anchor='middle' font-family='Georgia,serif' font-size='25' letter-spacing='8' fill='#7d4057'>A LITTLE LUXURY</text>",
  "<text x='450' y='1132' text-anchor='middle' font-family='Arial,sans-serif' font-size='12' letter-spacing='6' fill='#9d6679'>K NAILS · NORTH HOLLYWOOD</text>",
  "</svg>"
].join("\n");

const studioArtwork = [
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1200'>",
  "<defs>",
  "<linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#fffdfd'/><stop offset='.55' stop-color='#f5e0e7'/><stop offset='1' stop-color='#d998ad'/></linearGradient>",
  "<linearGradient id='skin' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#f2c8bb'/><stop offset='.55' stop-color='#dca391'/><stop offset='1' stop-color='#b97872'/></linearGradient>",
  "<linearGradient id='nail' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#fff'/><stop offset='.52' stop-color='#f9dce5'/><stop offset='1' stop-color='#df9daf'/></linearGradient>",
  "<filter id='blur'><feGaussianBlur stdDeviation='28'/></filter>",
  "</defs>",
  "<rect width='900' height='1200' fill='url(#bg)'/>",
  "<circle cx='760' cy='260' r='220' fill='#fff' opacity='.34'/><circle cx='120' cy='970' r='280' fill='#b85f7e' opacity='.1'/>",
  "<ellipse cx='450' cy='900' rx='275' ry='105' fill='#96566c' opacity='.18' filter='url(#blur)'/>",
  "<g transform='translate(0 45) rotate(-12 450 620)'>",
  "<path d='M250 1030 C220 910 240 770 285 670 C320 592 350 550 365 500 C382 450 374 390 380 300 C383 248 427 230 451 270 C469 300 457 435 467 493 C480 535 498 545 510 500 C520 455 512 300 523 245 C533 194 581 198 595 244 C606 282 579 445 594 491 C609 532 630 526 640 473 C648 426 638 315 658 277 C679 237 722 257 723 301 C724 347 687 490 695 540 C704 589 737 587 753 536 C768 486 779 411 807 395 C839 378 867 412 856 451 C839 514 800 637 783 717 C755 856 738 989 676 1072 C562 1220 340 1178 250 1030Z' fill='url(#skin)' stroke='#b77773' stroke-opacity='.35' stroke-width='4'/>",
  "<g fill='url(#nail)' stroke='#fff' stroke-width='5'>",
  "<path d='M380 305 Q383 240 415 232 Q451 233 454 287 L451 350 Q414 370 380 345Z'/>",
  "<path d='M523 255 Q530 190 560 190 Q595 191 598 245 L590 320 Q552 333 520 306Z'/>",
  "<path d='M660 290 Q669 235 698 237 Q731 240 729 291 L717 355 Q682 366 654 339Z'/>",
  "<path d='M800 422 Q814 378 840 387 Q867 397 854 444 L830 497 Q800 501 780 477Z'/>",
  "</g>",
  "<g fill='none' stroke='#fff' stroke-opacity='.65' stroke-width='8' stroke-linecap='round'><path d='M399 267q22-20 42-2'/><path d='M543 226q22-17 42 0'/><path d='M678 267q22-17 40 0'/></g>",
  "</g>",
  "<circle cx='160' cy='250' r='5' fill='#b55c7c'/><circle cx='735' cy='950' r='6' fill='#fff'/>",
  "<path d='m170 390 9 26 26 9-26 9-9 26-9-26-26-9 26-9Z' fill='#fff' opacity='.9'/>",
  "<path d='m755 185 7 20 20 7-20 7-7 20-7-20-20-7 20-7Z' fill='#fff' opacity='.8'/>",
  "<text x='450' y='1110' text-anchor='middle' font-family='Georgia,serif' font-size='28' letter-spacing='8' fill='#793d55'>THE ART OF SELF-CARE</text>",
  "</svg>"
].join("\n");

const galleryArtwork = [
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1200'>",
  "<defs>",
  "<linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#221820'/><stop offset='.55' stop-color='#543242'/><stop offset='1' stop-color='#a95f79'/></linearGradient>",
  "<linearGradient id='nail' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#fff'/><stop offset='.45' stop-color='#f9dce5'/><stop offset='1' stop-color='#d9829e'/></linearGradient>",
  "<linearGradient id='gold' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#fff0bf'/><stop offset='1' stop-color='#c69a57'/></linearGradient>",
  "</defs>",
  "<rect width='900' height='1200' fill='url(#bg)'/>",
  "<circle cx='450' cy='520' r='330' fill='none' stroke='#f7dce5' stroke-opacity='.2' stroke-width='2'/>",
  "<circle cx='450' cy='520' r='280' fill='none' stroke='#f7dce5' stroke-opacity='.13' stroke-width='1'/>",
  "<g transform='translate(450 540) rotate(-18)'>",
  "<g fill='#dca99d' stroke='#f6d8d9' stroke-opacity='.38' stroke-width='4'>",
  "<rect x='-250' y='-250' width='112' height='520' rx='56'/><rect x='-120' y='-320' width='112' height='570' rx='56'/><rect x='10' y='-350' width='112' height='590' rx='56'/><rect x='140' y='-285' width='112' height='530' rx='56'/>",
  "</g>",
  "<g fill='url(#nail)' stroke='#fff4f7' stroke-width='5'>",
  "<path d='M-250 -250 Q-250 -335 -194 -335 Q-138 -335 -138 -250 L-138 -145 Q-194 -120 -250 -145Z'/>",
  "<path d='M-120 -320 Q-120 -405 -64 -405 Q-8 -405 -8 -320 L-8 -210 Q-64 -185 -120 -210Z'/>",
  "<path d='M10 -350 Q10 -435 66 -435 Q122 -435 122 -350 L122 -235 Q66 -210 10 -235Z'/>",
  "<path d='M140 -285 Q140 -370 196 -370 Q252 -370 252 -285 L252 -175 Q196 -150 140 -175Z'/>",
  "</g>",
  "<g fill='none' stroke='url(#gold)' stroke-width='7'><path d='M-218 -250q25 45 61 48'/><path d='M-88 -320q24 46 59 47'/><path d='M42 -350q25 50 61 50'/><path d='M172 -285q25 45 60 47'/></g>",
  "</g>",
  "<g fill='#fff' opacity='.9'><path d='m155 250 9 27 27 9-27 9-9 27-9-27-27-9 27-9Z'/><path d='m740 850 7 20 20 7-20 7-7 20-7-20-20-7 20-7Z'/></g>",
  "<text x='450' y='1050' text-anchor='middle' font-family='Georgia,serif' font-size='30' letter-spacing='8' fill='#fff1f5'>DETAILS MAKE THE DIFFERENCE</text>",
  "<text x='450' y='1094' text-anchor='middle' font-family='Arial,sans-serif' font-size='13' letter-spacing='7' fill='#edb4c7'>K NAILS</text>",
  "</svg>"
].join("\n");

await fs.rm(outputDir, { recursive: true, force: true });
await fs.mkdir(outputDir, { recursive: true });

const optimized = [];
let sourceBytes = 0;
let outputBytes = 0;

for (const item of sources) {
  const input = path.join(sourceDir, item.file);
  try {
    const stat = await fs.stat(input);
    sourceBytes += stat.size;
    const metadata = await sharp(input, { failOn: "none" }).metadata();
    if (!metadata.width || !metadata.height) throw new Error("Image dimensions could not be read");

    const swapped = [5, 6, 7, 8].includes(metadata.orientation ?? 1);
    const width = swapped ? metadata.height : metadata.width;
    const height = swapped ? metadata.width : metadata.height;
    const targetWidths = [...new Set(
      [420, 840, 1280].filter((candidate) => candidate < width).concat(width),
    )].sort((a, b) => a - b);
    const variants = [];

    for (const targetWidth of targetWidths) {
      const filename = item.id + "-" + targetWidth + ".webp";
      const destination = path.join(outputDir, filename);
      await sharp(input, { failOn: "none" })
        .rotate()
        .resize({ width: targetWidth, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 78, effort: 6, smartSubsample: true })
        .toFile(destination);
      const outStat = await fs.stat(destination);
      outputBytes += outStat.size;
      variants.push({ width: targetWidth, src: publicBase + filename, bytes: outStat.size });
    }

    const srcSet = variants.map((variant) => variant.src + " " + variant.width + "w").join(", ");
    optimized.push({
      ...item,
      width,
      height,
      src: variants[0].src,
      srcSet,
      largeSrc: variants[variants.length - 1].src,
    });
    const fullSize = variants[variants.length - 1].bytes;
    const saved = Math.max(0, Math.round((1 - fullSize / stat.size) * 100));
    console.log("Optimized " + item.file + ": " + width + "x" + height + ", " +
      Math.round(stat.size / 1024) + " KB -> " + Math.round(fullSize / 1024) + " KB (" + saved + "% smaller)");
  } catch (error) {
    console.log("Image source unavailable, will use generated artwork for " + item.role + ": " + item.file);
  }
}

const makeFallback = async (filename, artwork, alt, label, id) => {
  const destination = path.join(outputDir, filename);
  await fs.writeFile(destination, artwork, "utf8");
  const src = publicBase + filename;
  return { id, alt, label, src, srcSet: src + " 900w", largeSrc: src, width: 900, height: 1200 };
};

let hero = optimized.find((image) => image.role === "hero");
let studio = optimized.find((image) => image.role === "studio");
let gallery = optimized.filter((image) => image.role === "gallery");

if (!hero) {
  hero = await makeFallback(
    "k-nails-hero.svg", heroArtwork,
    "Illustrated K Nails polish bottle in blush pink and black",
    "The K Nails look", "K-NAILS-HERO"
  );
}
if (!studio) {
  studio = await makeFallback(
    "k-nails-studio.svg", studioArtwork,
    "Soft pink illustrated manicure with glossy nail details",
    "A little self-care", "K-NAILS-STUDIO"
  );
}
if (!gallery.length) {
  gallery = [await makeFallback(
    "k-nails-details.svg", galleryArtwork,
    "Illustrated glossy nail shapes with delicate rose-gold details",
    "Glossy details", "K-NAILS-DETAILS"
  )];
}

const toEntry = (image) => [
  "  {",
  "    id: " + JSON.stringify(image.id) + ",",
  "    alt: " + JSON.stringify(image.alt) + ",",
  "    label: " + JSON.stringify(image.label) + ",",
  "    src: " + JSON.stringify(image.src) + ",",
  "    srcSet: " + JSON.stringify(image.srcSet) + ",",
  "    largeSrc: " + JSON.stringify(image.largeSrc) + ",",
  "    width: " + image.width + ",",
  "    height: " + image.height + ",",
  "  }",
].join("\n");

const generated = [
  "// Generated by scripts/optimize-assets.mjs. Do not edit by hand.",
  "export type OptimizedImage = {",
  "  id: string;",
  "  alt: string;",
  "  label: string;",
  "  src: string;",
  "  srcSet: string;",
  "  largeSrc: string;",
  "  width: number;",
  "  height: number;",
  "};",
  "",
  "export const siteImages: { hero: OptimizedImage; studio: OptimizedImage } = {",
  "  hero: " + toEntry(hero) + ",",
  "  studio: " + toEntry(studio),
  "};",
  "",
  "export const galleryImages: OptimizedImage[] = [",
  gallery.map(toEntry).join(",\n"),
  "];",
  "",
].join("\n");

await fs.writeFile(generatedFile, generated, "utf8");
const savedBytes = sourceBytes - outputBytes;
const savedPercent = sourceBytes > 0 ? Math.round((savedBytes / sourceBytes) * 100) : 0;
if (optimized.length) {
  console.log("Optimized " + optimized.length + " original photos (" + savedPercent + "% smaller, responsive WebP).");
} else {
  console.log("Original salon photos are not in the repository. Created K Nails illustration artwork instead.");
}
console.log("Generated hero, studio and gallery artwork for the K Nails website.");
