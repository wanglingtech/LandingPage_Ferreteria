/**
 * Favorites Service
 * Administra los productos favoritos del usuario con persistencia en localStorage y notificaciones observer.
 */

import { toastService } from './toast.service';

type FavoritesListener = (favorites: string[]) => void;

class FavoritesService {
  private storageKey = 'fj_favorites';
  private favorites: string[] = [];
  private listeners: FavoritesListener[] = [];

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      this.favorites = saved ? JSON.parse(saved) : [];
    } catch {
      this.favorites = [];
    }
  }

  private saveFavorites() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
    } catch (e) {
      console.error('Error guardando favoritos en localStorage', e);
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.favorites]));
  }

  public subscribe(listener: FavoritesListener): () => void {
    this.listeners.push(listener);
    listener([...this.favorites]);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getFavorites(): string[] {
    return [...this.favorites];
  }

  public getCount(): number {
    return this.favorites.length;
  }

  public isFavorite(productId: string): boolean {
    return this.favorites.includes(productId);
  }

  public toggleFavorite(productId: string, productName?: string): boolean {
    const exists = this.isFavorite(productId);
    if (exists) {
      this.favorites = this.favorites.filter((id) => id !== productId);
      this.saveFavorites();
      toastService.info(productName ? `"${productName}" eliminado de favoritos.` : 'Producto eliminado de favoritos.');
      return false;
    } else {
      this.favorites.push(productId);
      this.saveFavorites();
      toastService.success(productName ? `"${productName}" guardado en tus favoritos.` : 'Producto guardado en favoritos.');
      return true;
    }
  }

  public clearFavorites() {
    this.favorites = [];
    this.saveFavorites();
    toastService.info('Se han vaciado tus favoritos.');
  }
}

export const favoritesService = new FavoritesService();
