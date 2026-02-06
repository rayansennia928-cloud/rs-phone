export interface Product {
  id: string;
  name: string;
  category: 'smartphone' | 'accessory';
  price: number;
  description: string;
  image: string;
  specs: {
    screen?: string;
    battery?: string;
    camera?: string;
    processor?: string;
    compatibility?: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export enum OrderStatus {
  PENDING = 'En traitement',
  SHIPPED = 'Expédiée',
  DELIVERED = 'Livrée',
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  customerName: string;
  address: string;
}

export type ViewState = 'home' | 'tracking' | 'checkout-success';