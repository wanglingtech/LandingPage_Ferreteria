/**
 * Modelos e Interfaces para Ferretería July
 * Diseñado para desacoplar la UI y permitir fácil conexión con API REST / Prisma backend
 */

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  description: string;
  shortDescription: string;
  features: string[];
  specifications: ProductSpecification[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  stock: number;
  images: ProductImage[];
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  rating: number;
  reviewCount: number;
  unit: string; // 'unidad' | 'paquete' | 'metro' | 'caja' | 'galón' | 'rollo' | 'tubo' | 'juego'
  tags: string[];
  warranty?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  imageUrl: string;
  productCount: number;
  featured?: boolean;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  updatedAt?: string;
  verifiedPurchase?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN' | 'STAFF';
  avatar?: string;
  phone?: string;
  address?: string;
  token?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPrice: number;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  total: number;
  itemCount: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  tagline?: string;
  highlightText?: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  badge?: string;
  backgroundColor?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountLabel: string;
  endDate?: string;
  code?: string;
  imageUrl: string;
  categorySlug?: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  telegram: string;
  telegramDisplay: string;
  email: string;
  address: string;
  city: string;
  country: string;
  googleMapsUrl: string;
  schedules: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  socials: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
}

export interface StoreStat {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
}

export interface StoreBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FilterOptions {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'name-asc';
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}
