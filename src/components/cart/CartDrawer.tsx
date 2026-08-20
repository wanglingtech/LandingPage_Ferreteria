import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare, ShieldCheck, Plus, Minus, Tag, Check, AlertCircle } from 'lucide-react';
import { CartState } from '../../models';
import { cartService } from '../../services/cart.service';
import { SITE_CONFIG } from '../../config/site.config';
import { toastService } from '../../services/toast.service';
import { ProductImage } from '../shared/ProductImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToProducts: () => void;
}

const VALID_COUPONS: Record<string, { code: string; discountPercent: number; description: string }> = {
  JULY10: { code: 'JULY10', discountPercent: 10, description: '10% de descuento especial Ferretería July' },
  FERRE2026: { code: 'FERRE2026', discountPercent: 15, description: '15% de descuento por inauguración digital' },
  PROYECTO5: { code: 'PROYECTO5', discountPercent: 5, description: '5% de descuento en materiales' },
};

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToProducts,
}) => {
  const [cartState, setCartState] = useState<CartState>(cartService.getState());
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number; description: string } | null>(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    const unsubscribe = cartService.subscribe((state) => {
      setCartState(state);
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (VALID_COUPONS[cleanCode]) {
      setAppliedCoupon(VALID_COUPONS[cleanCode]);
      setCouponError('');
      toastService.success(`Cupón ${cleanCode} aplicado: ${VALID_COUPONS[cleanCode].discountPercent}% adicional`);
    } else {
      setCouponError('Cupón inválido o expirado. Prueba con "JULY10" o "FERRE2026"');
      toastService.error('Cupón no válido');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
    toastService.info('Cupón removido');
  };

  // Cálculo con cupón
  const couponDiscountAmount = appliedCoupon
    ? (cartState.total * appliedCoupon.discountPercent) / 100
    : 0;
  const finalTotal = Math.max(0, cartState.total - couponDiscountAmount);

  const handleCheckoutMock = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      toastService.success('¡Pedido registrado! Te redirigimos a WhatsApp para coordinar despacho.');
      window.open(cartService.getWhatsAppCheckoutUrl(), '_blank');
      onClose();
    }, 600);
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in-0"
      onClick={onClose}
    >
      <div
        id="cart-drawer-content"
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 border-l border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del Carrito */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#f97316]" />
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              Tu Carrito ({cartState.itemCount})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {cartState.items.length > 0 && (
              <button
                onClick={() => cartService.clearCart()}
                className="text-xs text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 font-semibold transition-colors flex items-center gap-1"
                title="Vaciar todo el carrito"
              >
                <Trash2 className="w-3.5 h-3.5" /> Vaciar
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lista de Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {cartState.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Tu carrito está vacío
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                Aún no has agregado herramientas ni materiales. Explora nuestro catálogo y equipa tu obra o taller.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToProducts();
                }}
                className="mt-5 py-2.5 px-5 rounded-xl bg-[#f97316] text-white text-xs font-bold hover:bg-[#ea580c] transition-colors flex items-center gap-2 shadow-md"
              >
                Explorar Catálogo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            cartState.items.map((item) => {
              const mainImg = item.product.images[0]?.url || '';
              const subtotalItem = item.selectedPrice * item.quantity;

              return (
                <div
                  key={item.product.id}
                  id={`cart-item-${item.product.id}`}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5"
                >
                  {/* Miniatura con fallback */}
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-800 p-1 shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                    <ProductImage
                      src={mainImg}
                      alt={item.product.name}
                      brand={item.product.brand}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Detalle */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-extrabold uppercase text-[#f97316]">
                      {item.product.brand}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs font-black text-slate-900 dark:text-white mt-0.5">
                      {SITE_CONFIG.currency.symbol} {item.selectedPrice.toFixed(2)}
                    </p>

                    {/* Controles de Cantidad */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
                        <button
                          onClick={() => cartService.updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800 dark:text-slate-200 min-w-[1.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => cartService.updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                        = {SITE_CONFIG.currency.symbol} {subtotalItem.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Eliminar Item */}
                  <button
                    onClick={() => cartService.removeItem(item.product.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                    aria-label={`Eliminar ${item.product.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer del Carrito con Totales, Cupón y Checkout */}
        {cartState.items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 space-y-3">
            
            {/* Input Cupón de Descuento */}
            {!appliedCoupon ? (
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      placeholder="Cupón (ej. JULY10)"
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 uppercase outline-none focus:ring-1 focus:ring-[#f97316]"
                    />
                    <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold hover:bg-[#f97316] transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {couponError && (
                  <p className="text-[10px] text-rose-500 font-medium">{couponError}</p>
                )}
              </form>
            ) : (
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span className="font-bold">{appliedCoupon.code}</span>
                  <span>(-{appliedCoupon.discountPercent}%)</span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-slate-400 hover:text-rose-500 text-[11px] underline"
                >
                  Quitar
                </button>
              </div>
            )}

            {/* Desglose */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal regular:</span>
                <span>{SITE_CONFIG.currency.symbol} {cartState.subtotal.toFixed(2)}</span>
              </div>
              {cartState.discountTotal > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Ahorro promocional catálogo:
                  </span>
                  <span>- {SITE_CONFIG.currency.symbol} {cartState.discountTotal.toFixed(2)}</span>
                </div>
              )}
              {appliedCoupon && couponDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Descuento por Cupón ({appliedCoupon.code}):</span>
                  <span>- {SITE_CONFIG.currency.symbol} {couponDiscountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Total Estimado:</span>
                <span className="text-[#f97316]">
                  {SITE_CONFIG.currency.symbol} {finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Acciones de Checkout / WhatsApp */}
            <div className="space-y-2 pt-1">
              {/* Botón WhatsApp Directo con Formato de Pedido */}
              <a
                href={cartService.getWhatsAppCheckoutUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                Pedir y Cotizar por WhatsApp
              </a>

              {/* Botón Checkout Preparado para Backend */}
              <button
                onClick={handleCheckoutMock}
                disabled={isCheckingOut}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0f172a] dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#f97316]" />
                {isCheckingOut ? 'Procesando...' : 'Finalizar Pedido Online (REST Ready)'}
              </button>
            </div>

            <p className="text-[10px] text-center text-slate-400">
              Precios incluyen IGV. Coordinación de flete y entrega directa.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
