/**
 * Product Service
 * Maneja la lógica de catálogo, filtros, búsqueda normalizada y detalle de productos.
 * Preparado para reemplazar datos simulados por llamadas HTTP a API REST (GET /api/products, etc.)
 */

import { FilterOptions, Product } from '../models';
import { MOCK_PRODUCTS } from '../mocks/products.mock';

/**
 * Normaliza cadenas quitando tildes, caracteres especiales y espacios extras
 */
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

class ProductService {
  private products: Product[] = [...MOCK_PRODUCTS];

  /**
   * Obtiene todos los productos con opciones completas de filtro y ordenamiento
   */
  public async getProducts(filters?: FilterOptions): Promise<{ data: Product[]; total: number }> {
    await new Promise((resolve) => setTimeout(resolve, 60));

    let result = [...this.products];

    if (filters) {
      // Filtro por categoría (ID o Slug)
      if (filters.category && filters.category !== 'all') {
        const catNorm = normalizeText(filters.category);
        result = result.filter(
          (p) =>
            p.categoryId === filters.category ||
            normalizeText(p.categoryName) === catNorm ||
            normalizeText(p.categoryName).includes(catNorm)
        );
      }

      // Filtro por marca
      if (filters.brand && filters.brand !== 'all') {
        result = result.filter((p) => p.brand.toLowerCase() === filters.brand!.toLowerCase());
      }

      // Filtro por texto de búsqueda normalizada (sin tildes, case-insensitive)
      if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
        const q = normalizeText(filters.searchQuery);
        result = result.filter((p) => {
          const nameMatch = normalizeText(p.name).includes(q);
          const brandMatch = normalizeText(p.brand).includes(q);
          const skuMatch = normalizeText(p.sku).includes(q);
          const catMatch = normalizeText(p.categoryName).includes(q);
          const tagMatch = p.tags.some((t) => normalizeText(t).includes(q));
          const descMatch = normalizeText(p.shortDescription).includes(q);
          return nameMatch || brandMatch || skuMatch || catMatch || tagMatch || descMatch;
        });
      }

      // Filtro solo ofertas
      if (filters.onSaleOnly) {
        result = result.filter((p) => p.isOnSale || (p.discountPercentage && p.discountPercentage > 0));
      }

      // Filtro solo con stock disponible
      if (filters.inStockOnly) {
        result = result.filter((p) => p.stock > 0);
      }

      // Filtro por rango de precio
      if (filters.minPrice !== undefined && filters.minPrice > 0) {
        result = result.filter((p) => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
        result = result.filter((p) => p.price <= filters.maxPrice!);
      }

      // Filtro por calificación mínima (estrellas)
      if (filters.minRating !== undefined && filters.minRating > 0) {
        result = result.filter((p) => p.rating >= filters.minRating!);
      }

      // Ordenamiento
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            result.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
          case 'name-asc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'featured':
          default:
            result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
        }
      }
    }

    const total = result.length;

    // Paginación si se especifica
    if (filters?.page && filters?.pageSize) {
      const start = (filters.page - 1) * filters.pageSize;
      result = result.slice(start, start + filters.pageSize);
    }

    return {
      data: result,
      total,
    };
  }

  /**
   * Obtiene un producto por su ID o por su slug
   */
  public async getProductById(idOrSlug: string): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    const cleanId = idOrSlug.trim().toLowerCase();
    const product = this.products.find(
      (p) => p.id.toLowerCase() === cleanId || p.slug.toLowerCase() === cleanId
    );
    return product || null;
  }

  /**
   * Obtiene los productos destacados para el Home
   */
  public async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return this.products.filter((p) => p.featured || p.isBestSeller).slice(0, limit);
  }

  /**
   * Obtiene productos con descuento / ofertas
   */
  public async getDiscountedOffers(limit: number = 6): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return this.products
      .filter((p) => p.isOnSale || (p.discountPercentage && p.discountPercentage > 0))
      .slice(0, limit);
  }

  /**
   * Obtiene productos relacionados por categoría
   */
  public async getRelatedProducts(categoryId: string, currentProductId: string, limit: number = 4): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 40));
    return this.products
      .filter((p) => (p.categoryId === categoryId || p.categoryName === categoryId) && p.id !== currentProductId)
      .slice(0, limit);
  }

  /**
   * Búsqueda en tiempo real con normalización de acentos para el header
   */
  public async liveSearch(query: string, limit: number = 8): Promise<Product[]> {
    if (!query || query.trim().length < 2) return [];
    const q = normalizeText(query);
    return this.products
      .filter((p) => {
        const nameMatch = normalizeText(p.name).includes(q);
        const brandMatch = normalizeText(p.brand).includes(q);
        const skuMatch = normalizeText(p.sku).includes(q);
        const catMatch = normalizeText(p.categoryName).includes(q);
        const tagMatch = p.tags.some((t) => normalizeText(t).includes(q));
        return nameMatch || brandMatch || skuMatch || catMatch || tagMatch;
      })
      .slice(0, limit);
  }

  /**
   * Obtiene la lista de marcas únicas disponibles
   */
  public async getBrands(): Promise<string[]> {
    const brands = new Set(this.products.map((p) => p.brand));
    return Array.from(brands).sort();
  }

  /**
   * Obtiene productos por lista de IDs (ej. para lista de Favoritos)
   */
  public async getProductsByIds(ids: string[]): Promise<Product[]> {
    if (!ids || ids.length === 0) return [];
    return this.products.filter((p) => ids.includes(p.id));
  }
}

export const productService = new ProductService();
