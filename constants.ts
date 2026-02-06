import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Iphone 15 pro',
    category: 'smartphone',
    price: 155000,
    description: 'etat : 10/10 , batterie : 99% , stockage : 256 GB',
    image: 'https://dz.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/72/6535/1.jpg?7197',
    specs: {
      screen: 'Technologie ProMotion avec taux de rafraîchissement adaptatif atteignant 120 Hz',
      battery: '4500 mAh',
      camera: '50MP Principal',
      faceid: 'active'
    },
  },
  {
    id: 'p2',
    name: 'Galaxy Horizon S24',
    category: 'smartphone',
    price: 850,
    description: 'Performance et élégance. Parfait pour les professionnels et les créatifs.',
    image: 'https://picsum.photos/400/500?random=2',
    specs: {
      screen: '6.2" AMOLED',
      battery: '4000 mAh',
      camera: '64MP Zoom x3',
      processor: 'Snapdragon Gen 3',
    },
  },
  {
    id: 'p3',
    name: 'Pixel Vision 8',
    category: 'smartphone',
    price: 750,
    description: 'La meilleure expérience photo sur mobile avec une IA intégrée révolutionnaire.',
    image: 'https://picsum.photos/400/500?random=3',
    specs: {
      screen: '6.1" OLED',
      battery: '4200 mAh',
      camera: '50MP Night Sight',
      processor: 'Tensor G4',
    },
  },
  {
    id: 'a1',
    name: 'Écouteurs Sonic Buds Pro',
    category: 'accessory',
    price: 199,
    description: 'Réduction de bruit active et son spatial immersif.',
    image: 'https://picsum.photos/400/500?random=4',
    specs: {
      battery: '24h avec boîtier',
      compatibility: 'Bluetooth 5.3',
    },
  },
  {
    id: 'a2',
    name: 'Chargeur UltraFast 65W',
    category: 'accessory',
    price: 45,
    description: 'Rechargez vos appareils en un temps record. Compatible USB-C.',
    image: 'https://picsum.photos/400/500?random=5',
    specs: {
      compatibility: 'USB-C PD',
    },
  },
  {
    id: 'a3',
    name: 'Coque de Protection Renforcée',
    category: 'accessory',
    price: 35,
    description: 'Protection militaire contre les chutes jusqu\'à 3 mètres.',
    image: 'https://picsum.photos/400/500?random=6',
    specs: {
      compatibility: 'Universel (s\'adapte)',
    },
  },
];
