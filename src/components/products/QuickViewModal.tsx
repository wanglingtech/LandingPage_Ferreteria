import React, { useState } from 'react';
import { Product } from '../../models';
import { SITE_CONFIG } from '../../config/site.config';
import { X, ShoppingBag, MessageSquare, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { StarRating } from '../shared/StarRating';
import { ProductImage } from '../shared/ProductImage';
import { cartService } from '../../services/cart.service';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewFullDetail: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onViewFullDetail,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const mainImage = product.images[0]?.url || '';
  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const whatsappInquiryUrl = SITE_CONFIG.buildWhatsAppUrl(
    SITE_CONFIG.buildProductInquiryMsg(product.name, product.sku, product.price)
  );

  const handleAddToCart = () => {
    cartService.addItem(product, quantity);
    onClose();
  };

  return (
    <div
      id="quick-view-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in-0"
      onClick={onClose}
    >
      <div
        id="quick-view-modal-content"
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
            Vista Rápida de Producto
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Imagen */}
          <div className="h-64 bg-slate-50 dark:bg-slate-800/80 rounded-xl flex items-center justify-center p-4 border border-slate-100 dark:border-slate-800 relative">
            {hasDiscount && (
              <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm z-10">
                -{product.discountPercentage}% OFF
              </span>
            )}
            <ProductImage
              src={mainImage}
              alt={product.name}
              brand={product.brand}
              containerClassName="w-full h-full p-2"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Información */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#f97316] bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded">
                  {product.brand}
                </span>
                <span className="text-xs text-slate-400">SKU: {product.sku}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {product.name}
              </h2>

              <div className="mt-2">
                <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} />
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Precios */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-black text-[#0f172a] dark:text-white">
                  {SITE_CONFIG.currency.symbol} {product.price.toFixed(2)}
                </span>
                {hasDiscount && product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {SITE_CONFIG.currency.symbol} {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                {product.stock > 0 ? `Stock disponible: ${product.stock} unidades` : 'Sin stock inmediato'}
              </div>
            </div>

            {/* Acciones */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              {/* Selector de cantidad y Agregar */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-900 dark:text-white min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#f97316] text-white text-xs font-bold hover:bg-[#ea580c] transition-colors flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
                >
                  <ShoppingBag className="w-4 h-4" /> Agregar al Carrito
                </button>
              </div>

              {/* WhatsApp y Ver Detalles Completos */}
              <div className="flex items-center gap-2">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" /> Consultar por WhatsApp
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onViewFullDetail(product);
                  }}
                  className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#f97316] text-xs font-bold transition-colors flex items-center gap-1"
                >
                  Ver Ficha Completa <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
