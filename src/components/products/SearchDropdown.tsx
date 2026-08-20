import React from 'react';
import { Product } from '../../models';
import { SITE_CONFIG } from '../../config/site.config';
import { ArrowRight, Sparkles, Tag, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ProductImage } from '../shared/ProductImage';

interface SearchDropdownProps {
  results: Product[];
  isLoading: boolean;
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
  onViewAllResults?: () => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  results,
  isLoading,
  searchQuery,
  onSelectProduct,
  onViewAllResults,
}) => {
  if (isLoading) {
    return (
      <div
        id="search-loading-dropdown"
        className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-6 z-50 text-center animate-in fade-in-0"
      >
        <div className="inline-block w-6 h-6 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin mb-2" />
        <p className="text-xs text-slate-500 dark:text-slate-400">Buscando en catálogo de Ferretería July...</p>
      </div>
    );
  }

  if (searchQuery.trim().length >= 2 && results.length === 0) {
    return (
      <div
        id="search-empty-dropdown"
        className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-6 z-50 text-center animate-in fade-in-0"
      >
        <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#f97316]/10 text-[#f97316] flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          No encontramos productos para "{searchQuery}"
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Prueba con términos como "taladro", "amoladora", "cemento", "tubo" o consulta con un asesor.
        </p>
        <a
          href={SITE_CONFIG.buildWhatsAppUrl(`¡Hola! Estoy buscando "${searchQuery}" y no lo encontré en el catálogo web.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#f97316] hover:underline"
        >
          Consultar disponibilidad por WhatsApp <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div
      id="search-results-dropdown"
      className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 max-h-[420px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in-0"
    >
      <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-3">
        <span className="font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#f97316]" />
          {results.length} coincidencias encontradas
        </span>
        <span className="text-[11px]">Haz clic para ver detalles</span>
      </div>

      <div className="p-1.5 space-y-1">
        {results.map((product) => {
          const mainImage = product.images[0]?.url || '';
          const hasDiscount = product.discountPercentage && product.discountPercentage > 0;

          return (
            <button
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="w-full text-left flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group focus:outline-none focus:ring-1 focus:ring-[#f97316]"
              id={`search-item-${product.id}`}
            >
              {/* Imagen */}
              <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                <ProductImage
                  src={mainImage}
                  alt={product.name}
                  brand={product.brand}
                  containerClassName="w-full h-full p-1"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Información */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#f97316] bg-[#f97316]/10 px-1.5 py-0.5 rounded">
                    {product.brand}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate">
                    {product.categoryName}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-[#f97316] transition-colors">
                  {product.name}
                </h4>

                <div className="flex items-center justify-between mt-1">
                  {/* Precios */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {SITE_CONFIG.currency.symbol} {product.price.toFixed(2)}
                    </span>
                    {hasDiscount && product.originalPrice && (
                      <>
                        <span className="text-[11px] text-slate-400 line-through">
                          Antes {SITE_CONFIG.currency.symbol} {product.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1 rounded">
                          -{product.discountPercentage}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* Stock */}
                  <div className="text-[11px] flex items-center gap-1">
                    {product.stock > 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Stock: {product.stock}
                      </span>
                    ) : (
                      <span className="text-rose-500">Agotado</span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {onViewAllResults && (
        <div className="p-2 bg-slate-50 dark:bg-slate-800/40 text-center">
          <button
            onClick={onViewAllResults}
            className="text-xs font-semibold text-[#f97316] hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            Ver catálogo completo <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
