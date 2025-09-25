export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  createdAt: Date;
}

export interface Address {
  _id?: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  models: string[]; // URLs to GLB/GLTF files
  variants: ProductVariant[];
  stock: number;
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface ProductVariant {
  _id?: string;
  name: string;
  value: string;
  price?: number; // Optional price override
  stock?: number; // Optional stock override
  modelUrl?: string; // Optional 3D model URL for this variant
}

export interface CartItem {
  productId: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'canceled';
  shippingAddress: Address;
  tracking?: string;
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  productId: string;
  product?: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 3D Model types for React Three Fiber
export interface Model3DProps {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

// Filter types for shop page
export interface ProductFilters {
  priceRange: [number, number];
  category: string;
  sortBy: string;
  tags?: string[];
}