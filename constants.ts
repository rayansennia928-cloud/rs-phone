import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Lumix Phone X15',
    category: 'smartphone',
    price: 999,
    description: 'Le dernier né de la technologie mobile. Écran OLED vibrant et processeur ultra-rapide.',
    image: 'https://picsum.photos/400/500?random=1',
    specs: {
      screen: '6.7" OLED 120Hz',
      battery: '4500 mAh',
      camera: '50MP Principal',
      processor: 'A15 Bionic-like',
    },
  },
