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
    name: 'Iphone 16 pro ',
    category: 'smartphone',
    price: 160000,
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-model-unselect-gallery-2-202409_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=90&.v=ZnlzVUZzRWd3dlg0RllqbHhQSUpKTGdzSmpObkZCM3MrNmJ5SkhESlNDZ1FydVY5cEpsVTdwMmk5U2U2UXBQVThLcXQxZ1h0QThIT2dnUm5qbGk5OUJkSERIUjY1Wk1Od3FtNjF6NFZLVXN3T2cyVW1PTmN1S2p2Q1BWWWpNTGkwTko2SW91TzhmREJLUUxPTmhpZ1NB&traceId=1',
    specs: {
      couleur: 'vert ',
      battery: '90%',
      stockag: '512 GB',
      Etat_du_telephone: '10/10',
    },
  },
  {
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
