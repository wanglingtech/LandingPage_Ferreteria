/**
 * Cart Service
 * Maneja el estado global del carrito de compras, persistencia y exportación a WhatsApp.
 */

import { CartItem, CartState, Product } from '../models';
import { SITE_CONFIG } from '../config/site.config';
import { toastService } from './toast.service';

type CartListener = (state: CartState) => void;

class CartService {
  private items: CartItem[] = [];
  private listeners: Set<CartListener> = new Set();

  constructor() {
    this.loadInitialCart();
  }

  private loadInitialCart(): void {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('fj_cart_items');
      if (saved) {
        this.items = JSON.parse(saved);
      }
    } catch {
      this.items = [];
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('fj_cart_items', JSON.stringify(this.items));
    } catch {
      // Ignore storage errors
    }
  }

  public subscribe(listener: CartListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): CartState {
    const subtotal = this.items.reduce((acc, item) => {
      const regularPrice = item.product.originalPrice || item.product.price;
      return acc + regularPrice * item.quantity;
    }, 0);

    const total = this.items.reduce((acc, item) => {
      return acc + item.selectedPrice * item.quantity;
    }, 0);

    const discountTotal = Math.max(0, subtotal - total);
    const itemCount = this.items.reduce((acc, item) => acc + item.quantity, 0);

    return {
      items: [...this.items],
      subtotal,
      discountTotal,
      total,
      itemCount,
    };
  }

  private notify(): void {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
    this.saveToStorage();
  }

  /**
   * Agrega un producto al carrito
   */
  public addItem(product: Product, quantity: number = 1): void {
    if (product.stock <= 0) {
      toastService.error(`El producto "${product.name}" se encuentra agotado.`);
      return;
    }

    const existingIndex = this.items.findIndex((item) => item.product.id === product.id);

    if (existingIndex > -1) {
      const currentQty = this.items[existingIndex].quantity;
      if (currentQty >= product.stock) {
        toastService.info(`Ya alcanzaste el límite máximo de stock disponible (${product.stock} unid.)`);
        return;
      }
      const newQty = Math.min(product.stock, currentQty + quantity);
      this.items[existingIndex].quantity = newQty;
      toastService.success(`Se actualizó la cantidad de "${product.name}" (${newQty} en carrito)`);
    } else {
      const initialQty = Math.min(product.stock, Math.max(1, quantity));
      this.items.push({
        product,
        quantity: initialQty,
        selectedPrice: product.price,
      });
      toastService.success(`"${product.name}" agregado al carrito.`);
    }

    this.notify();
  }

  /**
   * Actualiza la cantidad de un item
   */
  public updateQuantity(productId: string, quantity: number): void {
    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index === -1) return;

    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const stock = this.items[index].product.stock;
    this.items[index].quantity = Math.min(stock, quantity);
    this.notify();
  }

  /**
   * Elimina un item del carrito
   */
  public removeItem(productId: string): void {
    const itemToRemove = this.items.find((item) => item.product.id === productId);
    this.items = this.items.filter((item) => item.product.id !== productId);
    if (itemToRemove) {
      toastService.info(`"${itemToRemove.product.name}" fue eliminado del carrito.`);
    }
    this.notify();
  }

  /**
   * Vacía el carrito
   */
  public clearCart(): void {
    this.items = [];
    this.notify();
    toastService.info('El carrito ha sido vaciado.');
  }

  /**
   * Genera el enlace de WhatsApp con la lista de productos
   */
  public getWhatsAppCheckoutUrl(): string {
    const state = this.getState();
    if (state.items.length === 0) {
      return SITE_CONFIG.buildWhatsAppUrl('¡Hola! Deseo cotizar productos de Ferretería July.');
    }

    const formattedList = state.items.map((item) => ({
      name: `[${item.product.sku}] ${item.product.name}`,
      quantity: item.quantity,
      price: item.selectedPrice,
    }));

    const message = SITE_CONFIG.buildCartOrderMsg(formattedList, state.total);
    return SITE_CONFIG.buildWhatsAppUrl(message);
  }
}

export const cartService = new CartService();
