import { mkdir, readdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

/** 19 fotos definitivas — 9/jul/2026 */
const cauchos = [
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.49 PM (7).jpeg',
    out: 'caucho-1001.webp',
    code: '1001',
    title: '130/80-17 TL',
    model: 'VL97E',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.50 PM (3).jpeg',
    out: 'caucho-1003.webp',
    code: '1003',
    title: '110/90-16 TL',
    model: 'VL52P',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.50 PM (2).jpeg',
    out: 'caucho-1004.webp',
    code: '1004',
    title: '90/90-21 TT',
    model: 'VL37T',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.50 PM.jpeg',
    out: 'caucho-1006.webp',
    code: '1006',
    title: '90/90-18 TL',
    model: 'VL77C',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.49 PM (9).jpeg',
    out: 'caucho-1007.webp',
    code: '1007',
    title: '90/90-18 TL',
    model: 'VL97W',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.49 PM (2).jpeg',
    out: 'caucho-1008.webp',
    code: '1008',
    title: '90/90-18 TL',
    model: 'VL18H',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.48 PM (2).jpeg',
    out: 'caucho-1010.webp',
    code: '1010',
    title: '90/90-18 TT',
    model: 'VL97V',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.49 PM (3).jpeg',
    out: 'caucho-1013.webp',
    code: '1013',
    title: '3.60-18 TL',
    model: 'VL43T',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.49 PM (6).jpeg',
    out: 'caucho-1017.webp',
    code: '1017',
    title: '2.75-18 TT',
    model: 'VL97V',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.48 PM (1).jpeg',
    out: 'caucho-1019.webp',
    code: '1019',
    title: '2.75-18 TT',
    model: 'VL97W',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.49 PM (4).jpeg',
    out: 'caucho-1021.webp',
    code: '1021',
    title: '90/90-18 TT',
    model: 'VL18H',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.48 PM.jpeg',
    out: 'caucho-1022.webp',
    code: '1022',
    title: '130/80-17 TT',
    model: 'VL37T',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.49 PM.jpeg',
    out: 'caucho-1023.webp',
    code: '1023',
    title: '130/80-17 TT',
    model: 'VL52P',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.49 PM (5).jpeg',
    out: 'caucho-1024.webp',
    code: '1024',
    title: '120/80-17 TL',
    model: 'VL97V',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.49 PM (8).jpeg',
    out: 'caucho-1025.webp',
    code: '1025',
    title: '90/90-17 TL',
    model: 'VL97V',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.48 PM (3).jpeg',
    out: 'caucho-1026.webp',
    code: '1026',
    title: '80/90-17 TL',
    model: 'VL18H',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.50 PM (1).jpeg',
    out: 'caucho-1029.webp',
    code: '1029',
    title: '120/70-12 TL',
    model: 'VL08T',
  },
  {
    src: 'WhatsApp Image 2026-07-09 at 2.47.49 PM (1).jpeg',
    out: 'caucho-1030.webp',
    code: '1030',
    title: '130/80-17 TL',
    model: 'VL97V',
  },
];

const outDir = 'public/images/cauchos';
await mkdir(outDir, { recursive: true });

for (const old of await readdir(outDir)) {
  if (old.endsWith('.webp')) await unlink(join(outDir, old));
}

for (const item of cauchos) {
  await sharp(`public/images/${item.src}`)
    .webp({ quality: 88 })
    .toFile(`${outDir}/${item.out}`);
  console.log(`✓ ${item.out} ← ${item.model} · ${item.code} · ${item.title}`);
}
