import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const cauchos = [
  { src: 'cauchos (3).jpg', out: 'caucho-1001.webp', code: '1001' },
  { src: 'cauchos (4).jpg', out: 'caucho-1003.webp', code: '1003' },
  { src: 'cauchos (5).jpg', out: 'caucho-1004.webp', code: '1004' },
  { src: 'cauchos (6).jpg', out: 'caucho-1006.webp', code: '1006' },
  { src: 'cauchos (2).jpg', out: 'caucho-1007.webp', code: '1007' },
  { src: 'cauchos (7).jpg', out: 'caucho-1008.webp', code: '1008' },
  { src: 'cauchos (8).jpg', out: 'caucho-1010.webp', code: '1010' },
  { src: 'cauchos (9).jpg', out: 'caucho-1013.webp', code: '1013' },
  { src: 'cauchos (10).jpg', out: 'caucho-1017.webp', code: '1017' },
  { src: 'cauchos (11).jpg', out: 'caucho-1019.webp', code: '1019' },
  { src: 'cauchos (12).jpg', out: 'caucho-1021.webp', code: '1021' },
  { src: 'cauchos (13).jpg', out: 'caucho-1022.webp', code: '1022' },
  { src: 'cauchos (14).jpg', out: 'caucho-1023.webp', code: '1023' },
  { src: 'cauchos (15).jpg', out: 'caucho-1024.webp', code: '1024' },
  { src: 'cauchos (16).jpg', out: 'caucho-1025.webp', code: '1025' },
  { src: 'cauchos (17).jpg', out: 'caucho-1026.webp', code: '1026' },
  { src: 'cauchos (18).jpg', out: 'caucho-1028.webp', code: '1028' },
  { src: 'cauchos (19).jpg', out: 'caucho-1029.webp', code: '1029' },
  { src: 'cauchos (1).jpg', out: 'caucho-1030.webp', code: '1030' },
];

await mkdir('public/images/cauchos', { recursive: true });

for (const item of cauchos) {
  await sharp(`public/images/${item.src}`)
    .webp({ quality: 88 })
    .toFile(`public/images/cauchos/${item.out}`);
  console.log(`converted ${item.out}`);
}
