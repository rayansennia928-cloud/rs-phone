import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    category: 'smartphone',
    price: 285000,
    description: 'Le premier iPhone en titane de qualité aérospatiale. Puce A17 Pro révolutionnaire, bouton Action personnalisable et un système photo pro plus polyvalent que jamais.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    specs: {
      screen: '6.1" Super Retina XDR',
      battery: 'Jusqu\'à 23h',
      camera: '48MP Pro',
      processor: 'A17 Pro',
    },
  },
  {
    id: 'a1',
    name: 'Écouteurs Sonic Buds Pro',
    category: 'accessory',
    price: 18500,
    description: 'Réduction de bruit active et son spatial immersif. Une expérience sonore incomparable pour votre musique et vos appels.',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aac24d2600?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    specs: {
      battery: '24h avec boîtier',
      compatibility: 'Bluetooth 5.3',
    },
  },
];
