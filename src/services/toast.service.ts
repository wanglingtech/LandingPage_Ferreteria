/**
 * Toast Notification Service
 * Sistema de alertas flotantes sin dependencias externas
 */

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
}

type ToastListener = (toasts: ToastMessage[]) => void;

class ToastService {
  private toasts: ToastMessage[] = [];
  private listeners: Set<ToastListener> = new Set();

  public subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    listener([...this.toasts]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const copy = [...this.toasts];
    this.listeners.forEach((listener) => listener(copy));
  }

  public show(message: string, type: ToastMessage['type'] = 'info', title?: string, duration: number = 3500): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { id, type, title, message, duration };
    this.toasts.push(newToast);
    this.notify();

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }
    return id;
  }

  public success(message: string, title: string = '¡Éxito!'): string {
    return this.show(message, 'success', title);
  }

  public error(message: string, title: string = 'Error'): string {
    return this.show(message, 'error', title);
  }

  public info(message: string, title?: string): string {
    return this.show(message, 'info', title);
  }

  public warning(message: string, title: string = 'Aviso'): string {
    return this.show(message, 'warning', title);
  }

  public dismiss(id: string): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }
}

export const toastService = new ToastService();
