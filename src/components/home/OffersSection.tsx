import React, { useState, useEffect } from 'react';
import { Product } from '../../models';
import { productService } from '../../services/product.service';
import { ProductCard } from '../products/ProductCard';
import { Flame, Clock, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site.config';

interface OffersSectionProps {
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
  onNavigateToCatalog: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  onSelectProduct,
  onQuickView,
  onAddToCart,
  onNavigateToCatalog,
}) => {
  const [offerProducts, setOfferProducts] = useState<Product[]>([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 20 });

  useEffect(() => {
    productService.getDiscountedOffers(4).then((products) => {
      setOfferProducts(products);
    });
  }, []);

  // Simulación de temporizador de ofertas flash
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (offerProducts.length === 0) return null;

  return (
    <section id="ofertas" className="py-12 bg-gradient-to-b from-orange-50/50 to-white dark:from-slate-900/60 dark:to-slate-950 border-y border-orange-100/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Ofertas con Countdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-rose-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                <Flame className="w-3 h-3 fill-current" />
                Ofertas Flash de la Semana
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              Descuentos Especiales en Herramientas
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Aprovecha precios exclusivos con stock limitado por renovación de inventario.
            </p>
          </div>

          {/* Temporizador */}
          <div className="flex items-center gap-2.5 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm self-start md:self-auto">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 pr-2 border-r border-slate-200 dark:border-slate-800">
              <Clock className="w-4 h-4 text-rose-500 animate-spin" />
              <span>Termina en:</span>
            </div>

            <div className="flex items-center gap-1 font-mono text-xs font-black">
              <span className="bg-slate-900 text-white dark:bg-slate-800 px-2 py-1 rounded-lg">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-slate-900 text-white dark:bg-slate-800 px-2 py-1 rounded-lg">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-rose-500 text-white px-2 py-1 rounded-lg">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Grid de Productos en Oferta */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {offerProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Banner inferior de cotizaciones por mayor */}
        <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0f172a] to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-black flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#f97316]" />
              ¿Buscas comprar por volumen o para una licitación?
            </h4>
            <p className="text-xs text-slate-300">
              Solicita cotización formal con descuentos corporativos adicionales y entrega en obra.
            </p>
          </div>

          <a
            href={SITE_CONFIG.buildWhatsAppUrl('¡Hola Ferretería July! Necesito una cotización formal al por mayor para mi empresa/obra.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-orange-500/30 min-h-[40px]"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            Cotizar por Mayor
          </a>
        </div>

      </div>
    </section>
  );
};
