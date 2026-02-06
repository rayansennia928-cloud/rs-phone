export interface Product {
  id: string;
  name: string;
  category: 'smartphone' | 'accessory';
  price: number;
  description: string;
  image: string;
  inStock: boolean;
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

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  note?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  customerName: string;
  address: string;
  phone: string;
  email: string;
  note?: string;
}

export type ViewState = 'home' | 'accessories' | 'tracking' | 'checkout-success' | 'about';
