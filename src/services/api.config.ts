/**
 * Configuración centralizada de API REST y Endpoints para Ferretería July
 * Diseñado para integrarse directamente con el backend Node.js + Express + Prisma + JWT.
 */

export const API_CONFIG = {
  // Base URL obtenida del environment o fallback a relativo/localhost
  baseUrl: (typeof window !== 'undefined' && (window as any).__API_URL__) || '/api',
  timeout: 10000,
  
  // Contratos de Endpoints REST
  endpoints: {
    // Autenticación (JWT + bcrypt)
    auth: {
      login: '/auth/login',                  // POST: { email, password } -> { user, token }
      register: '/auth/register',            // POST: { name, email, password, phone? } -> { user, token }
      googleLogin: '/auth/google',          // POST: { idToken } -> { user, token }
      me: '/auth/me',                        // GET (Bearer Token) -> User
      recoverPassword: '/auth/recover',      // POST: { email } -> { message }
    },
    // Productos
    products: {
      list: '/products',                     // GET ?page=1&limit=20&category=&search=&sort=
      detail: (id: string) => `/products/${id}`, // GET
      featured: '/products/featured',        // GET
      offers: '/products/offers',            // GET
      byCategory: (slug: string) => `/products/category/${slug}`, // GET
    },
    // Categorías
    categories: {
      list: '/categories',                   // GET
      detail: (id: string) => `/categories/${id}`, // GET
    },
    // Reseñas y Comentarios
    reviews: {
      byProduct: (productId: string) => `/products/${productId}/reviews`, // GET
      create: (productId: string) => `/products/${productId}/reviews`,    // POST (Auth Required)
      update: (reviewId: string) => `/reviews/${reviewId}`,               // PUT (Auth Required)
      delete: (reviewId: string) => `/reviews/${reviewId}`,               // DELETE (Auth Required)
    },
    // Carrito & Checkout (Sincronización opcional)
    cart: {
      sync: '/cart/sync',                    // POST: { items } (Auth Required)
      checkout: '/orders/checkout',          // POST: { items, shipping, paymentMethod }
    },
    // Banners & Promociones
    banners: {
      hero: '/banners/hero',                 // GET
      promotions: '/banners/promotions',     // GET
    },
  },

  // Generador de Headers con JWT
  getAuthHeaders: (token?: string): Record<string, string> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const activeToken = token || (typeof window !== 'undefined' ? localStorage.getItem('fj_auth_token') : null);
    if (activeToken) {
      headers['Authorization'] = `Bearer ${activeToken}`;
    }
    return headers;
  }
};
