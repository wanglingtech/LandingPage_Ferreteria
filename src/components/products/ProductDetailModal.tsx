import React, { useState, useEffect } from 'react';
import { Product, User } from '../../models';
import { SITE_CONFIG } from '../../config/site.config';
import { X, ShoppingBag, MessageSquare, ShieldCheck, CheckCircle2, ChevronRight, Share2, Heart, ArrowLeft, Star, Truck, RefreshCw } from 'lucide-react';
import { StarRating } from '../shared/StarRating';
import { ProductImage } from '../shared/ProductImage';
import { ProductReviews } from './ProductReviews';
import { cartService } from '../../services/cart.service';
import { productService } from '../../services/product.service';
import { favoritesService } from '../../services/favorites.service';
import { toastService } from '../../services/toast.service';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectProduct,
  currentUser,
  onOpenAuth,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setQuantity(1);
      setActiveTab('details');
      setIsFavorite(favoritesService.isFavorite(product.id));

      // Cargar productos relacionados
      productService.getRelatedProducts(product.categoryId, product.id, 4).then(setRelatedProducts);
    }
  }, [product]);

  useEffect(() => {
    const unsub = favoritesService.subscribe((favIds) => {
      if (product) {
        setIsFavorite(favIds.includes(product.id));
      }
    });
    return unsub;
  }, [product]);

  if (!product) return null;

  const currentImage =
    product.images[selectedImageIndex]?.url ||
    product.images[0]?.url ||
    '';

  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const isOutOfStock = product.stock <= 0;

  const whatsappInquiryUrl = SITE_CONFIG.buildWhatsAppUrl(
    SITE_CONFIG.buildProductInquiryMsg(product.name, product.sku, product.price)
  );

  const handleAddToCart = () => {
    cartService.addItem(product, quantity);
  };

  const handleToggleFavorite = () => {
    favoritesService.toggleFavorite(product.id, product.name);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toastService.info('Enlace del producto copiado al portapapeles.');
    }
  };

  return (
    <div
      id="product-detail-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 overflow-y-auto animate-in fade-in-0"
      onClick={onClose}
    >
      <div
        id="product-detail-modal-container"
        className="bg-white dark:bg-slate-900 w-full max-w-4xl min-h-screen sm:min-h-0 sm:max-h-[92vh] sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header de navegación del modal */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={onClose}
              className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200 hover:text-[#f97316]"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al catálogo
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline font-medium text-slate-600 dark:text-slate-300">
              {product.categoryName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-500'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              aria-label="Favoritos"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Copiar enlace"
              aria-label="Compartir"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
          {/* Ficha Superior: Galería + Info de Compra */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Galería de Imágenes (md:col-span-5) */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="h-72 sm:h-80 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden">
                {hasDiscount && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm z-10">
                    -{product.discountPercentage}% Descuento
                  </span>
                )}
                <ProductImage
                  src={currentImage}
                  alt={product.name}
                  brand={product.brand}
                  containerClassName="w-full h-full p-2"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Miniaturas si hay múltiples imágenes */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={img.id || idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl p-1 bg-slate-50 dark:bg-slate-800 border-2 shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#f97316] ring-2 ring-[#f97316]/30'
                          : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <ProductImage
                        src={img.url}
                        alt={img.alt || product.name}
                        brand={product.brand}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Garantía y Asesoría Badge */}
              <div className="p-3 rounded-xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/60 dark:border-orange-800/40 flex items-center gap-3 text-xs text-orange-900 dark:text-orange-200">
                <ShieldCheck className="w-5 h-5 text-[#f97316] shrink-0" />
                <span>{product.warranty || 'Garantía Oficial respaldada por Ferretería July'}</span>
              </div>
            </div>

            {/* Información y Compra (md:col-span-7) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#f97316] bg-[#f97316]/10 px-2.5 py-0.5 rounded-full">
                    {product.brand}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    SKU: {product.sku}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight mt-2">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-2">
                  <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} />
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {product.unit ? `Venta por ${product.unit}` : 'Por unidad'}
                  </span>
                </div>

                {/* Precios */}
                <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Precio Catálogo:</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl sm:text-3xl font-black text-[#0f172a] dark:text-white">
                        {SITE_CONFIG.currency.symbol} {product.price.toFixed(2)}
                      </span>
                      {hasDiscount && product.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          {SITE_CONFIG.currency.symbol} {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
                    </span>
                    <span className="text-[10px] text-slate-400">Entrega en Lima y provincias</span>
                  </div>
                </div>

                {/* Descripción Corta */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                  {product.description}
                </p>

                {/* Puntos Destacados */}
                {product.features && product.features.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Características Clave:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 dark:text-slate-200">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#f97316] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Acciones de Compra & WhatsApp */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  {/* Selector Cantidad */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-colors"
                      aria-label="Reducir cantidad"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-white min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3.5 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  {/* Botón Agregar al Carrito */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-1 py-3 px-5 rounded-xl bg-[#f97316] text-white text-xs sm:text-sm font-bold hover:bg-[#ea580c] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 disabled:bg-slate-400 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="w-4 h-4" /> Agregar al Carrito
                  </button>
                </div>

                {/* Botón WhatsApp Directo */}
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" /> Consultar disponibilidad y cotización en WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Pestañas Inferiores: Especificaciones / Reseñas */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-xs sm:text-sm font-bold transition-colors relative ${
                  activeTab === 'details'
                    ? 'text-[#f97316]'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Detalles y Usos
                {activeTab === 'details' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f97316] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs sm:text-sm font-bold transition-colors relative ${
                  activeTab === 'specs'
                    ? 'text-[#f97316]'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Ficha Técnica
                {activeTab === 'specs' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f97316] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-xs sm:text-sm font-bold transition-colors relative ${
                  activeTab === 'reviews'
                    ? 'text-[#f97316]'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Opiniones y Reseñas ({product.reviewCount})
                {activeTab === 'reviews' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f97316] rounded-full" />
                )}
              </button>
            </div>

            {/* Contenido de la pestaña activa */}
            {activeTab === 'details' && (
              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4">
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xs uppercase flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#f97316]" /> Despacho y Entrega
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Entregas en almacén central o envíos a obras en Lima Metropolitana en 24 a 48 horas hábiles.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xs uppercase flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#f97316]" /> Garantía y Devolución
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Cambio directo por falla de fabricación durante los primeros 7 días y soporte del servicio técnico oficial de la marca.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-xs text-left">
                  <tbody>
                    {product.specifications && product.specifications.length > 0 ? (
                      product.specifications.map((spec, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-900'}
                        >
                          <td className="p-3 font-semibold text-slate-600 dark:text-slate-300 w-1/3 border-r border-slate-200 dark:border-slate-800">
                            {spec.name}
                          </td>
                          <td className="p-3 text-slate-800 dark:text-slate-100 font-medium">
                            {spec.value}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-4 text-slate-400">No hay especificaciones adicionales registradas.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ProductReviews
                productId={product.id}
                productName={product.name}
                currentUser={currentUser}
                onOpenAuth={onOpenAuth}
              />
            )}
          </div>

          {/* Productos Relacionados */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Productos Relacionados en {product.categoryName}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedProducts.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 text-left hover:border-[#f97316] transition-all group"
                  >
                    <div className="h-24 bg-white dark:bg-slate-800 rounded-lg p-1 flex items-center justify-center overflow-hidden mb-2">
                      <ProductImage
                        src={rel.images[0]?.url || ''}
                        alt={rel.name}
                        brand={rel.brand}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{rel.brand}</span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-[#f97316]">
                      {rel.name}
                    </h4>
                    <span className="text-xs font-black text-[#0f172a] dark:text-white mt-1 block">
                      {SITE_CONFIG.currency.symbol} {rel.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
