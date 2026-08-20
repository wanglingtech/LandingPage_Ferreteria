/**
 * Auth Service
 * Maneja el estado de autenticación de usuario, tokens JWT y perfiles.
 * Preparado para conectarse con backend Node.js + Express + Prisma + JWT.
 */

import { User } from '../models';
import { toastService } from './toast.service';

type AuthListener = (user: User | null) => void;

class AuthService {
  private currentUser: User | null = null;
  private token: string | null = null;
  private listeners: Set<AuthListener> = new Set();

  constructor() {
    this.loadInitialSession();
  }

  private loadInitialSession(): void {
    if (typeof window === 'undefined') return;
    try {
      const savedUser = localStorage.getItem('fj_auth_user');
      const savedToken = localStorage.getItem('fj_auth_token');
      if (savedUser && savedToken) {
        this.currentUser = JSON.parse(savedUser);
        this.token = savedToken;
      }
    } catch {
      this.currentUser = null;
      this.token = null;
    }
  }

  public subscribe(listener: AuthListener): () => void {
    this.listeners.add(listener);
    listener(this.currentUser);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.currentUser));
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public getToken(): string | null {
    return this.token;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null && !!this.token;
  }

  /**
   * Iniciar sesión con email y contraseña
   */
  public async login(credentials: { email: string; password: string }): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!credentials.email || !credentials.password) {
      throw new Error('Por favor ingresa tu correo y contraseña.');
    }

    if (credentials.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    // Usuario simulado con token JWT emulado
    const mockUser: User = {
      id: 'user-' + Date.now(),
      name: credentials.email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: credentials.email,
      role: credentials.email.includes('admin') ? 'ADMIN' : 'CUSTOMER',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      token: 'jwt_mock_token_' + Math.random().toString(36).substring(2),
    };

    this.setUserSession(mockUser, mockUser.token!);
    toastService.success(`¡Bienvenido de nuevo, ${mockUser.name}!`, 'Sesión iniciada');
    return mockUser;
  }

  /**
   * Registro de nuevo cliente
   */
  public async register(data: { name: string; email: string; password: string; phone?: string }): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (!data.name || !data.email || !data.password) {
      throw new Error('Todos los campos obligatorios deben ser completados.');
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      role: 'CUSTOMER',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      token: 'jwt_mock_token_' + Math.random().toString(36).substring(2),
    };

    this.setUserSession(newUser, newUser.token!);
    toastService.success(`Cuenta creada con éxito. ¡Bienvenido a Ferretería July, ${newUser.name}!`);
    return newUser;
  }

  /**
   * Inicio de sesión con Google / Gmail
   */
  public async loginWithGoogle(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const googleUser: User = {
      id: 'google-user-' + Date.now(),
      name: 'Cliente Google Ferretero',
      email: 'usuario.google@gmail.com',
      role: 'CUSTOMER',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
      token: 'jwt_google_token_' + Math.random().toString(36).substring(2),
    };

    this.setUserSession(googleUser, googleUser.token!);
    toastService.success(`Accediste con tu cuenta de Google.`, '¡Bienvenido!');
    return googleUser;
  }

  /**
   * Recuperar contraseña
   */
  public async recoverPassword(email: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (!email || !email.includes('@')) {
      throw new Error('Ingresa un correo electrónico válido.');
    }
    toastService.info(`Te hemos enviado un enlace de recuperación a ${email}`, 'Correo enviado');
    return 'Enlace enviado satisfactoriamente.';
  }

  /**
   * Cierra la sesión
   */
  public logout(): void {
    this.currentUser = null;
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fj_auth_user');
      localStorage.removeItem('fj_auth_token');
    }
    this.notify();
    toastService.info('Has cerrado tu sesión.');
  }

  private setUserSession(user: User, token: string): void {
    this.currentUser = user;
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('fj_auth_user', JSON.stringify(user));
      localStorage.setItem('fj_auth_token', token);
    }
    this.notify();
  }
}

export const authService = new AuthService();
