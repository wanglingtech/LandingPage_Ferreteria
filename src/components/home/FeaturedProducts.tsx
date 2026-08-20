import React, { useState, useEffect } from 'react';
import { Product, Category, FilterOptions } from '../../models';
import { productService } from '../../services/product.service';
import { categoryService } from '../../services/category.service';
import { ProductCard } from '../products/ProductCard';
import { Search, X, ArrowUpDown, Sparkles, RefreshCw, Star, Heart, SlidersHorizontal } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site.config';

interface FeaturedProductsProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
  favorites: string[];
  onToggleFavorite: (productId: string, event: React.MouseEvent) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  selectedCategoryId,
  onSelectCategory,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  favorites,
  onToggleFavorite,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters State
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState<FilterOptions['sortBy']>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    categoryService.getCategories().then(setCategories);
    productService.getBrands().then(setAvailableBrands);
  }, []);

  const loadFilteredProducts = async () => {
    setIsLoading(true);
    try {
      const filter: FilterOptions = {
        category: selectedCategoryId,
        brand: selectedBrand,
        searchQuery: searchQuery,
        inStockOnly: onlyInStock,
        onSaleOnly: onlyOnSale,
        minRating: minRating > 0 ? minRating : undefined,
        maxPrice: maxPrice < 500 ? maxPrice : undefined,
        sortBy: sortBy,
      };
      const response = await productService.getProducts(filter);
      
      let finalData = response.data;
      if (onlyFavorites) {
        finalData = finalData.filter((p) => favorites.includes(p.id));
      }

      setProducts(finalData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFilteredProducts();
  }, [
    selectedCategoryId,
    selectedBrand,
    sortBy,
    onlyInStock,
    onlyOnSale,
    onlyFavorites,
    minRating,
    maxPrice,
    searchQuery,
    favorites,
  ]);

  const handleResetFilters = () => {
    onSelectCategory('all');
    setSelectedBrand('all');
    setSortBy('featured');
    setOnlyInStock(false);
    setOnlyOnSale(false);
    setOnlyFavorites(false);
    setMinRating(0);
    setMaxPrice(500);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategoryId !== 'all' ||
    selectedBrand !== 'all' ||
    sortBy !== 'featured' ||
    onlyInStock ||
    onlyOnSale ||
    onlyFavorites ||
    minRating > 0 ||
    maxPrice < 500 ||
    searchQuery.trim().length > 0;

  const activeCategoryObj = categories.find((c) => c.id === selectedCategoryId);

  return (
    <section id="productos" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Encabezado de Sección */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316] bg-[#f97316]/10 px-3 py-1 rounded-full">
              Inventario Completo
            </span>
            {onlyFavorites && (
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full flex items-center gap-1">
                <Heart className="w-3 h-3 fill-current" /> Mis Favoritos ({favorites.length})
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            {activeCategoryObj ? activeCategoryObj.name : 'Catálogo de Productos'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {activeCategoryObj
              ? activeCategoryObj.description
              : 'Filtra por marca, categoría, disponibilidad y encuentra el equipo ideal para tu obra o taller.'}
          </p>
        </div>

        {/* Buscador Rápido Interno y Ordenamiento */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Input de Búsqueda con Normalización */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en catálogo..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f97316] outline-none"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Toggle Filtros Avanzados */}
          <button
            onClick={() => setShowAdvancedFilters((prev) => !prev)}
            className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 ${
              showAdvancedFilters || minRating > 0 || maxPrice < 500
                ? 'bg-[#f97316] text-white border-[#f97316]'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-[#f97316]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filtros
          </button>

          {/* Selector de Orden */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#f97316] outline-none cursor-pointer"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Menor Precio</option>
              <option value="price-desc">Mayor Precio</option>
              <option value="rating">Mejor Calificados</option>
              <option value="newest">Más Recientes</option>
              <option value="name-asc">Nombre (A-Z)</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Barra de Filtros Rápidos (Categorías y Marcas) */}
      <div className="space-y-3 mb-8">
        
        {/* Pills de Categorías */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              onSelectCategory('all');
              setOnlyFavorites(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategoryId === 'all' && !onlyFavorites
                ? 'bg-slate-900 text-white dark:bg-[#f97316] dark:text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            Todas las Categorías
          </button>

          {/* Pill de Favoritos */}
          <button
            onClick={() => setOnlyFavorites((prev) => !prev)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              onlyFavorites
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current' : ''}`} />
            Favoritos ({favorites.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                setOnlyFavorites(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategoryId === cat.id && !onlyFavorites
                  ? 'bg-slate-900 text-white dark:bg-[#f97316] dark:text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              {cat.name} ({cat.productCount})
            </button>
          ))}
        </div>

        {/* Panel Desplegable de Filtros Avanzados */}
        {showAdvancedFilters && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in-0 duration-200">
            {/* Rango de Precio Máximo */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                <span>Precio Máximo:</span>
                <span className="text-[#f97316]">{SITE_CONFIG.currency.symbol} {maxPrice}</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#f97316] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>S/ 20</span>
                <span>S/ 500+</span>
              </div>
            </div>

            {/* Calificación Mínima */}
            <div>
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                Calificación mínima:
              </span>
              <div className="flex items-center gap-1.5">
                {[0, 4, 4.5, 4.8].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setMinRating(stars)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors ${
                      minRating === stars
                        ? 'bg-[#f97316] text-white border-[#f97316]'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {stars === 0 ? (
                      'Cualquiera'
                    ) : (
                      <>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {stars}★+
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón de limpiar filtros internos */}
            <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <button
                onClick={handleResetFilters}
                className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reestablecer filtros
              </button>
            </div>
          </div>
        )}

        {/* Fila de Filtros Secundarios (Marcas y Checkboxes) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">
              Marca:
            </span>
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedBrand === 'all'
                  ? 'bg-[#f97316]/10 text-[#f97316] font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todas
            </button>
            {availableBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedBrand === brand
                    ? 'bg-[#f97316]/10 text-[#f97316] font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Toggles de Stock & Ofertas */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-[#f97316] focus:ring-[#f97316]"
              />
              <span>Solo con stock</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={onlyOnSale}
                onChange={(e) => setOnlyOnSale(e.target.checked)}
                className="w-4 h-4 rounded text-[#f97316] focus:ring-[#f97316]"
              />
              <span>Solo ofertas</span>
            </label>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#f97316] hover:underline font-bold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Limpiar filtros
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Grid de Productos */}
      {isLoading ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse space-y-3"
            >
              <div className="h-40 sm:h-44 bg-slate-100 dark:bg-slate-800 rounded-xl" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-1/2 pt-2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 sm:py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No se encontraron productos coincidentes
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {onlyFavorites
              ? 'Aún no has guardado productos en tus favoritos. Haz clic en el icono del corazón en cualquier tarjeta para guardarlos aquí.'
              : 'Prueba ajustando los filtros de categoría o marca, o eliminando el término de búsqueda.'}
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 py-2.5 px-5 rounded-xl bg-[#f97316] text-white text-xs font-bold hover:bg-[#ea580c] transition-colors shadow-md min-h-[40px]"
          >
            Restablecer todos los filtros
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            <span>
              Mostrando <span className="font-bold text-slate-900 dark:text-white">{products.length}</span> producto(s) en catálogo
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Garantía de Fábrica & Stock Actualizado</span>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
