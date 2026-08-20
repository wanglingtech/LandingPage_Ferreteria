/**
 * Review Service
 * Maneja las reseñas y comentarios de productos.
 * Preparado para endpoints:
 * GET /products/:id/reviews
 * POST /products/:id/reviews
 * PUT /reviews/:id
 * DELETE /reviews/:id
 */

import { ProductReview, User } from '../models';
import { MOCK_REVIEWS } from '../mocks/reviews.mock';
import { toastService } from './toast.service';

type ReviewListener = (reviews: ProductReview[]) => void;

class ReviewService {
  private reviews: ProductReview[] = [...MOCK_REVIEWS];
  private listeners: Set<ReviewListener> = new Set();

  public subscribe(listener: ReviewListener): () => void {
    this.listeners.add(listener);
    listener([...this.reviews]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const copy = [...this.reviews];
    this.listeners.forEach((listener) => listener(copy));
  }

  /**
   * Obtiene reseñas para un producto específico
   */
  public async getReviewsByProductId(productId: string): Promise<ProductReview[]> {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return this.reviews.filter((r) => r.productId === productId);
  }

  /**
   * Crea una nueva reseña (Requiere autenticación)
   */
  public async createReview(
    productId: string,
    data: { rating: number; title: string; comment: string },
    user: User | null
  ): Promise<ProductReview> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!user) {
      throw new Error('Debes iniciar sesión para publicar una reseña.');
    }

    if (!data.rating || data.rating < 1 || data.rating > 5) {
      throw new Error('Por favor selecciona una calificación de 1 a 5 estrellas.');
    }

    if (!data.comment || data.comment.trim().length < 5) {
      throw new Error('El comentario debe contener al menos 5 caracteres.');
    }

    const newReview: ProductReview = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      productId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      rating: data.rating,
      title: data.title || 'Opinión del cliente',
      comment: data.comment.trim(),
      createdAt: new Date().toISOString(),
      verifiedPurchase: true,
    };

    this.reviews.unshift(newReview);
    this.notify();
    toastService.success('¡Gracias por tu opinión! Tu reseña ha sido publicada.');
    return newReview;
  }

  /**
   * Actualiza una reseña propia
   */
  public async updateReview(
    reviewId: string,
    data: { rating?: number; title?: string; comment?: string },
    user: User | null
  ): Promise<ProductReview> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!user) {
      throw new Error('Debes iniciar sesión para editar una reseña.');
    }

    const index = this.reviews.findIndex((r) => r.id === reviewId);
    if (index === -1) {
      throw new Error('Reseña no encontrada.');
    }

    const review = this.reviews[index];
    if (review.userId !== user.id && user.role !== 'ADMIN') {
      throw new Error('No tienes permisos para editar esta reseña.');
    }

    const updated: ProductReview = {
      ...review,
      rating: data.rating !== undefined ? data.rating : review.rating,
      title: data.title !== undefined ? data.title : review.title,
      comment: data.comment !== undefined ? data.comment.trim() : review.comment,
      updatedAt: new Date().toISOString(),
    };

    this.reviews[index] = updated;
    this.notify();
    toastService.success('Tu reseña ha sido actualizada.');
    return updated;
  }

  /**
   * Elimina una reseña
   */
  public async deleteReview(reviewId: string, user: User | null): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 150));

    if (!user) {
      throw new Error('Debes iniciar sesión para eliminar una reseña.');
    }

    const index = this.reviews.findIndex((r) => r.id === reviewId);
    if (index === -1) {
      throw new Error('Reseña no encontrada.');
    }

    const review = this.reviews[index];
    if (review.userId !== user.id && user.role !== 'ADMIN') {
      throw new Error('No tienes permisos para eliminar esta reseña.');
    }

    this.reviews = this.reviews.filter((r) => r.id !== reviewId);
    this.notify();
    toastService.info('La reseña fue eliminada.');
    return true;
  }

  /**
   * Calcula estadísticas de valoraciones para un producto
   */
  public getRatingBreakdown(reviews: ProductReview[]): {
    average: number;
    total: number;
    distribution: Record<number, number>;
  } {
    if (reviews.length === 0) {
      return { average: 5.0, total: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }

    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = Number((sum / total).toFixed(1));

    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const rounded = Math.round(r.rating);
      if (distribution[rounded] !== undefined) {
        distribution[rounded] += 1;
      }
    });

    return { average, total, distribution };
  }
}

export const reviewService = new ReviewService();
