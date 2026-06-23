export type ProductCategory = 'cauchos' | 'repuestos';

export interface CatalogProduct {
  title: string;
  description: string;
  image: string;
  tag: string;
  category: ProductCategory;
  model?: string;
}

export interface CatalogSection {
  type: 'section';
  title: string;
  description: string;
}

export type CatalogItem = CatalogProduct | CatalogSection;

export const isCatalogSection = (item: CatalogItem): item is CatalogSection =>
  'type' in item && item.type === 'section';

const cauchoDescription = (model: string) =>
  `Modelo ${model} · Caucho Vulcano. Venta al mayor — compra mínima 8 unidades.`;

export const catalogItems: CatalogItem[] = [
  {
    type: 'section',
    title: 'Cauchos Vulcano',
    description:
      'Medidas comerciales para todo tipo de motos. Seguridad y rendimiento al mayor.',
  },
  {
    title: '130/80-17 TL',
    description: cauchoDescription('VL97E'),
    image: '/images/cauchos/caucho-1001.webp',
    tag: '01',
    category: 'cauchos',
    model: 'VL97E · 1001',
  },
  {
    title: '110/90-16 TL',
    description: cauchoDescription('VL52P'),
    image: '/images/cauchos/caucho-1003.webp',
    tag: '02',
    category: 'cauchos',
    model: 'VL52P · 1003',
  },
  {
    title: '90/90-21 TT',
    description: cauchoDescription('VL37T'),
    image: '/images/cauchos/caucho-1004.webp',
    tag: '03',
    category: 'cauchos',
    model: 'VL37T · 1004',
  },
  {
    title: '90/90-18 TL',
    description: cauchoDescription('VL77C'),
    image: '/images/cauchos/caucho-1006.webp',
    tag: '04',
    category: 'cauchos',
    model: 'VL77C · 1006',
  },
  {
    title: '90/90-18 TL',
    description: cauchoDescription('VL97W'),
    image: '/images/cauchos/caucho-1007.webp',
    tag: '05',
    category: 'cauchos',
    model: 'VL97W · 1007',
  },
  {
    title: '90/90-18 TL',
    description: cauchoDescription('VL18H'),
    image: '/images/cauchos/caucho-1008.webp',
    tag: '06',
    category: 'cauchos',
    model: 'VL18H · 1008',
  },
  {
    title: '90/90-18 TT',
    description: cauchoDescription('VL97V'),
    image: '/images/cauchos/caucho-1010.webp',
    tag: '07',
    category: 'cauchos',
    model: 'VL97V · 1010',
  },
  {
    title: '3.60-18 TL',
    description: cauchoDescription('VL43T'),
    image: '/images/cauchos/caucho-1013.webp',
    tag: '08',
    category: 'cauchos',
    model: 'VL43T · 1013',
  },
  {
    title: '2.75-18 TT',
    description: cauchoDescription('VL97V'),
    image: '/images/cauchos/caucho-1017.webp',
    tag: '09',
    category: 'cauchos',
    model: 'VL97V · 1017',
  },
  {
    title: '2.75-18 TT',
    description: cauchoDescription('VL97W'),
    image: '/images/cauchos/caucho-1019.webp',
    tag: '10',
    category: 'cauchos',
    model: 'VL97W · 1019',
  },
  {
    title: '90/90-18 TT',
    description: cauchoDescription('VL18H'),
    image: '/images/cauchos/caucho-1021.webp',
    tag: '11',
    category: 'cauchos',
    model: 'VL18H · 1021',
  },
  {
    title: '130/80-17 TT',
    description: cauchoDescription('VL37T'),
    image: '/images/cauchos/caucho-1022.webp',
    tag: '12',
    category: 'cauchos',
    model: 'VL37T · 1022',
  },
  {
    title: '130/80-17 TT',
    description: cauchoDescription('VL52P'),
    image: '/images/cauchos/caucho-1023.webp',
    tag: '13',
    category: 'cauchos',
    model: 'VL52P · 1023',
  },
  {
    title: '120/80-17 TL',
    description: cauchoDescription('VL97V'),
    image: '/images/cauchos/caucho-1024.webp',
    tag: '14',
    category: 'cauchos',
    model: 'VL97V · 1024',
  },
  {
    title: '90/90-17 TL',
    description: cauchoDescription('VL97V'),
    image: '/images/cauchos/caucho-1025.webp',
    tag: '15',
    category: 'cauchos',
    model: 'VL97V · 1025',
  },
  {
    title: '80/90-17 TL',
    description: cauchoDescription('VL18H'),
    image: '/images/cauchos/caucho-1026.webp',
    tag: '16',
    category: 'cauchos',
    model: 'VL18H · 1026',
  },
  {
    title: '130/60-13 TL',
    description: cauchoDescription('VL08T'),
    image: '/images/cauchos/caucho-1028.webp',
    tag: '17',
    category: 'cauchos',
    model: 'VL08T · 1028',
  },
  {
    title: '120/79-12 TL',
    description: cauchoDescription('VL08T'),
    image: '/images/cauchos/caucho-1029.webp',
    tag: '18',
    category: 'cauchos',
    model: 'VL08T · 1029',
  },
  {
    title: '130/80-17 TL',
    description: cauchoDescription('VL97V'),
    image: '/images/cauchos/caucho-1030.webp',
    tag: '19',
    category: 'cauchos',
    model: 'VL97V · 1030',
  },
  {
    type: 'section',
    title: 'Repuestos',
    description:
      'Piezas de motor, transmisión y suspensión con calidad garantizada para tu inventario.',
  },
  {
    title: 'Kit de Bloque',
    description: 'Máximo rendimiento, durabilidad y fácil instalación para tu motor.',
    image: '/images/kit-bloque.webp',
    tag: '20',
    category: 'repuestos',
  },
  {
    title: 'Cigüeñal',
    description: 'Material reforzado con calidad garantizada para máxima resistencia.',
    image: '/images/ciguenal.webp',
    tag: '21',
    category: 'repuestos',
  },
  {
    title: 'Carburador GN125',
    description: 'Ahorro de combustible y mejor rendimiento del motor garantizado.',
    image: '/images/carburador.webp',
    tag: '22',
    category: 'repuestos',
  },
  {
    title: 'Amortiguador GY6',
    description: 'Máxima absorción y resistencia para una conducción suave y segura.',
    image: '/images/amortiguador.webp',
    tag: '23',
    category: 'repuestos',
  },
  {
    title: 'Crochera Completa',
    description: 'Transmisión impecable, alta calidad y mayor durabilidad para tu moto.',
    image: '/images/crochera.webp',
    tag: '24',
    category: 'repuestos',
  },
  {
    title: 'Arranque GN125',
    description: 'Arranque potente y encendido confiable en cualquier condición.',
    image: '/images/arranque.webp',
    tag: '25',
    category: 'repuestos',
  },
];

export const catalogProducts = catalogItems.filter(
  (item): item is CatalogProduct => !isCatalogSection(item)
);
