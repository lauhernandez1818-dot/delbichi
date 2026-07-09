import { rename } from 'node:fs/promises';
import sharp from 'sharp';

const input = 'public/images/logo.png';

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: w, height: h } = info;

/** Fondo negro del logo nuevo — flood fill desde bordes */
const isBackground = (r, g, b) => r < 28 && g < 28 && b < 28;

const visited = new Uint8Array(w * h);
const queue = [];

for (let x = 0; x < w; x++) {
  queue.push([x, 0], [x, h - 1]);
}
for (let y = 0; y < h; y++) {
  queue.push([0, y], [w - 1, y]);
}

while (queue.length > 0) {
  const [x, y] = queue.pop();
  if (x < 0 || x >= w || y < 0 || y >= h) continue;

  const idx = y * w + x;
  if (visited[idx]) continue;

  const i = idx * 4;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  if (!isBackground(r, g, b)) continue;

  visited[idx] = 1;
  data[i + 3] = 0;
  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .trim()
  .png()
  .toFile('public/images/logo.tmp.png');

await rename('public/images/logo.tmp.png', 'public/images/logo.png');

await sharp('public/images/logo.png')
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile('public/images/logo.webp');

console.log('✓ logo.png transparente + logo.webp actualizado');
