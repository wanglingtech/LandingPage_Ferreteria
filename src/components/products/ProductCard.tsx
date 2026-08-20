import React from 'react';
import { Product } from '../../models';
import { SITE_CONFIG } from '../../config/site.config';
import { Eye, ShoppingBag, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import { StarRating } from '../shared/StarRating';
import { ProductImage } from '../shared/ProductImage';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string, event: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickView,
  onAddToCart,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const mainImage = product.images[0]?.url || '';

  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-900/5 dark:hover:shadow-black/30 hover:border-[#f97316]/40 transition-all duration-300 cursor-pointer relative"
    >
      {/* Contenedor Superior: Imagen y Badges */}
      <div>
        <div className="h-44 sm:h-48 bg-slate-50 dark:bg-slate-800/80 rounded-xl mb-3 relative flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800">
          
          {/* Badges de Estado */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
            {hasDiscount && (
              <span className="bg-rose-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                Oferta -{product.discountPercentage}%
              </span>
            )}
            {product.isNew && !hasDiscount && (
              <span className="bg-[#0f172a] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                Nuevo
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-amber-500 text-slate-900 text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                Más Vendido
              </span>
            )}
          </div>

          {/* Botones Flotantes (Quick View & Wishlist) */}
          <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            {onToggleFavorite && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(product.id, e);
                }}
                className={`p-2 rounded-lg backdrop-blur-md shadow-md transition-all ${
                  isFavorite
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-200 hover:text-rose-500'
                }`}
                aria-label="Agregar a favoritos"
                title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2 rounded-lg bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-200 hover:text-[#f97316] backdrop-blur-md shadow-md transition-all"
              aria-label="Vista rápida"
              title="Vista Rápida"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Imagen de Producto con Fallback seguro */}
          <ProductImage
            src={mainImage}
            alt={product.name}
            brand={product.brand}
            containerClassName="w-full h-full p-2"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Metadatos y Título */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {product.brand}
            </span>
            <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
              SKU: {product.sku}
            </span>
          </div>

          <h3 className="font-bold text-sm leading-snug text-slate-800 dark:text-slate-100 group-hover:text-[#f97316] transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-1">
            <StarRating rating={product.rating} size="sm" showValue reviewCount={product.reviewCount} />
          </div>
        </div>
      </div>

      {/* Precios y Acción de Compra */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black text-[#0f172a] dark:text-white">
            {SITE_CONFIG.currency.symbol} {product.price.toFixed(2)}
          </span>
          {hasDiscount && product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              {SITE_CONFIG.currency.symbol} {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Estado de Stock */}
          <div className="text-[11px] font-semibold">
            {isOutOfStock ? (
              <span className="text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Sin stock
              </span>
            ) : isLowStock ? (
              <span className="text-amber-500 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                ¡Últimas {product.stock} unid.!
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Stock: {product.stock}
              </span>
            )}
          </div>

          {/* Botón Agregar al Carrito */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={(e) => onAddToCart(product, e)}
            className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center ${
              isOutOfStock
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-slate-100 dark:bg-slate-800 text-[#0f172a] dark:text-white hover:bg-[#f97316] hover:text-white active:scale-95 shadow-sm'
            }`}
            aria-label={`Agregar ${product.name} al carrito`}
            title="Agregar al carrito"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
