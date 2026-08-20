import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Product } from '../../models';
import { productService } from '../../services/product.service';
import { SITE_CONFIG } from '../../config/site.config';
import {
  Percent,
  ChevronLeft,
  ChevronRight,
  Flame,
  ShoppingBag,
  Eye,
  Heart,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { StarRating } from '../shared/StarRating';
import { ProductImage } from '../shared/ProductImage';

interface DiscountProductsCarouselProps {
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
  favorites?: string[];
  onToggleFavorite?: (productId: string, event: React.MouseEvent) => void;
}

export const DiscountProductsCarousel: React.FC<DiscountProductsCarouselProps> = ({
  onSelectProduct,
  onQuickView,
  onAddToCart,
  favorites = [],
  onToggleFavorite,
}) => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(4);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Cargar productos con descuento
  useEffect(() => {
    productService.getProducts({ onSaleOnly: true }).then((res) => {
      if (res && res.data && res.data.length > 0) {
        setDiscountedProducts(res.data);
      } else {
        productService.getDiscountedOffers(12).then((fallbackProds) => {
          setDiscountedProducts(fallbackProds);
        });
      }
    });
  }, []);

  // Calcular tarjetas por vista de forma reactiva y exacta
  const updateCardsPerView = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setCardsPerView(1); // Mobile (1 por vista)
    } else if (width < 1024) {
      setCardsPerView(2); // Tablet (2 por vista)
    } else if (width < 1280) {
      setCardsPerView(3); // Laptop (3 por vista)
    } else {
      setCardsPerView(4); // Desktop grande (4 por vista)
    }
  }, []);

  useEffect(() => {
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, [updateCardsPerView]);

  const maxIndex = Math.max(0, discountedProducts.length - cardsPerView);

  // Ajustar currentIndex si maxIndex se reduce por resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Rotación automática continua (se pausa al pasar el mouse por encima)
  useEffect(() => {
    if (isHovered || discountedProducts.length <= cardsPerView) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, discountedProducts.length, cardsPerView, handleNext]);

  // Soporte táctil / swipe para móviles
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (discountedProducts.length === 0) return null;

  return (
    <section
      id="carrusel-descuentos"
      className="py-12 sm:py-16 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glows decorativos de fondo */}
      <div className="absolute -top-20 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera del Carrusel */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 pb-4 border-b border-slate-800/90">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white font-black text-[11px] uppercase tracking-wider shadow-md">
                <Flame className="w-3.5 h-3.5 fill-current" />
                Ofertas Especiales
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-bold bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/25">
                <Percent className="w-3 h-3" />
                Rebajas por Tiempo Limitado
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Productos en Rebaja Especial
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5 max-w-2xl">
              Herramientas y suministros de primeras marcas con descuentos directos y garantía oficial.
            </p>
          </div>

          {/* Controles de Navegación (Solo Flechas e Indicador) */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Indicador de posición */}
            <span className="text-xs font-bold text-slate-400 mr-1 min-w-[40px] text-right">
              {currentIndex + 1} / {Math.max(1, discountedProducts.length - cardsPerView + 1)}
            </span>

            {/* Botón Anterior */}
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 hover:border-amber-400 transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center min-w-[38px] min-h-[38px]"
              aria-label="Ver productos anteriores en descuento"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Botón Siguiente */}
            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 hover:border-amber-400 transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center min-w-[38px] min-h-[38px]"
              aria-label="Ver siguientes productos en descuento"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewport del Carrusel */}
        <div
          className="relative overflow-hidden py-1"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out -mx-2 sm:-mx-2.5"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {discountedProducts.map((product) => {
              const mainImage = product.images[0]?.url || '';
              const isFavorite = favorites.includes(product.id);
              const discount = product.discountPercentage || 15;
              const savings = product.originalPrice
                ? (product.originalPrice - product.price)
                : (product.price * (discount / 100));

              const isOutOfStock = product.stock <= 0;
              const isLowStock = product.stock > 0 && product.stock <= 5;
              const whatsappUrl = SITE_CONFIG.buildWhatsAppUrl(
                SITE_CONFIG.buildProductInquiryMsg(product.name, product.sku, product.price)
              );

              return (
                <div
                  key={product.id}
                  style={{ width: `${100 / cardsPerView}%` }}
                  className="shrink-0 px-2 sm:px-2.5"
                >
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="h-full bg-slate-800/90 hover:bg-slate-800 rounded-2xl border border-slate-700/80 hover:border-amber-500/60 p-4 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer group relative"
                  >
                    {/* Contenedor Superior: Imagen, Badges y Datos */}
                    <div>
                      {/* Imagen con Badges Integrados Limpiamente */}
                      <div className="h-44 sm:h-48 bg-slate-900/95 rounded-xl mb-3 relative flex items-center justify-center overflow-hidden border border-slate-700/50 group-hover:border-slate-600">
                        
                        {/* Badge de Descuento (Esquina superior izquierda) */}
                        <div className="absolute top-2.5 left-2.5 z-20">
                          <span className="bg-gradient-to-r from-rose-600 to-amber-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-current" />
                            -{discount}% OFF
                          </span>
                        </div>

                        {/* Botones Flotantes (Favorito y Vista Rápida en esquina superior derecha) */}
                        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1.5">
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
                                  : 'bg-slate-800/90 text-slate-300 hover:text-rose-400 hover:bg-slate-700'
                              }`}
                              aria-label="Guardar en favoritos"
                              title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
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
                            className="p-2 rounded-lg bg-slate-800/90 text-slate-300 hover:text-amber-400 hover:bg-slate-700 backdrop-blur-md shadow-md transition-all"
                            aria-label="Vista rápida del producto"
                            title="Vista Rápida"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Imagen con zoom al hover */}
                        <ProductImage
                          src={mainImage}
                          alt={product.name}
                          brand={product.brand}
                          containerClassName="w-full h-full p-3"
                          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                        />
                      </div>

                      {/* Marca y SKU */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                          {product.brand}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          SKU: {product.sku}
                        </span>
                      </div>

                      {/* Título del Producto */}
                      <h3 className="font-bold text-sm leading-snug text-white group-hover:text-amber-400 transition-colors line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>

                      {/* Rating y Garantía */}
                      <div className="mt-2 flex items-center justify-between">
                        <StarRating rating={product.rating} size="sm" showValue reviewCount={product.reviewCount} />
                        {product.warranty && (
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 hidden xs:flex">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            {product.warranty}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Precios, Ahorro y Botones de Acción */}
                    <div className="mt-3.5 pt-3 border-t border-slate-700/80">
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-amber-400">
                            {SITE_CONFIG.currency.symbol} {product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {SITE_CONFIG.currency.symbol} {product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Indicador de Stock */}
                        <div className="text-[11px] font-semibold text-right">
                          {isOutOfStock ? (
                            <span className="text-rose-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> Agotado
                            </span>
                          ) : isLowStock ? (
                            <span className="text-amber-400 flex items-center gap-1 text-[10px]">
                              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                              ¡Últimas {product.stock}!
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">
                              Stock: {product.stock} un.
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Monto de ahorro */}
                      <div className="mb-3">
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Ahorras {SITE_CONFIG.currency.symbol} {savings.toFixed(2)}
                        </span>
                      </div>

                      {/* Botones de Acción */}
                      <div className="flex items-center gap-2">
                        {/* Botón Agregar al Carrito */}
                        <button
                          type="button"
                          disabled={isOutOfStock}
                          onClick={(e) => onAddToCart(product, e)}
                          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md ${
                            isOutOfStock
                              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95 shadow-amber-500/20'
                          }`}
                          aria-label={`Agregar ${product.name} al carrito`}
                        >
                          <ShoppingBag className="w-4 h-4 shrink-0" />
                          <span className="truncate">Agregar al Carrito</span>
                        </button>

                        {/* Botón WhatsApp de Cotización Rápida */}
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 flex items-center justify-center transition-colors shrink-0 min-w-[40px] min-h-[40px]"
                          aria-label="Consultar oferta en WhatsApp"
                          title="Cotizar por WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4 fill-current" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicadores de Puntos (Dots) */}
        {discountedProducts.length > cardsPerView && (
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-7 bg-amber-500'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Ir a la página de descuentos ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
