/**
 * Category Service
 * Servicio para gestión de categorías de Ferretería July
 */

import { Category } from '../models';
import { MOCK_CATEGORIES } from '../mocks/categories.mock';

class CategoryService {
  private categories: Category[] = [...MOCK_CATEGORIES];

  public async getCategories(): Promise<Category[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [...this.categories];
  }

  public async getFeaturedCategories(): Promise<Category[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return this.categories.filter((c) => c.featured);
  }

  public async getCategoryById(id: string): Promise<Category | null> {
    const found = this.categories.find((c) => c.id === id);
    return found || null;
  }

  public async getCategoryBySlug(slug: string): Promise<Category | null> {
    const found = this.categories.find((c) => c.slug === slug);
    return found || null;
  }
}

export const categoryService = new CategoryService();
