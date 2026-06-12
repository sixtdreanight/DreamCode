import sharp from "sharp";

const SIZES = [192, 512];
const BG = "#e85d3a";
const FG = "#ffffff";

async function generate(size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${BG}"/>
    <text x="${size / 2}" y="${size / 2}" text-anchor="middle" dominant-baseline="central"
          font-family="'Segoe UI','Noto Sans SC',sans-serif" font-weight="800"
          font-size="${size * 0.38}" fill="${FG}" letter-spacing="-0.02em">VC</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}.png`);

  console.log(`Generated icon-${size}.png`);
}

for (const size of SIZES) {
  await generate(size);
}
console.log("Done.");
