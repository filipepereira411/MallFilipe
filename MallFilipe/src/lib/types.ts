export type Store = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  floor: string;
  unit: string;
  hours: string;
  logo: string;
  coverImage: string;
  accent: string;
  rating: number;
  featured: boolean;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  oldPrice: number | null;
  imageUrl: string;
  badge: string | null;
  highlights: string[];
  rating: number;
  stock: number;
  sold: number;
  featured: boolean;
  storeId: number;
  storeSlug: string;
  storeName: string;
  storeFloor: string;
  storeUnit: string;
  storeAccent: string;
};

export type MallEvent = {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  location: string;
  category: string;
  imageUrl: string;
  capacity: number;
  featured: boolean;
  registrations: number;
};

export type OrderItem = {
  id: number;
  productId: number | null;
  productName: string;
  storeName: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  id: number;
  code: string;
  customerName: string;
  email: string;
  phone: string;
  notes: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};
