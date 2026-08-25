import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { SITE_CONFIG } from "../../config/site.config";
import { Product, User as UserModel } from "../../models";
import { productService } from "../../services/product.service";
import { authService } from "../../services/auth.service";
import { cartService } from "../../services/cart.service";
import { SearchDropdown } from "../products/SearchDropdown";
import { generateAvatarPlaceholder } from "../../utils/imageFallback";

interface HeaderProps {
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
  onOpenMobileNav?: () => void;
  onToggleMobileMenu?: () => void;
  isMobileNavOpen?: boolean;
  isMobileMenuOpen?: boolean;
  currentUser?: UserModel | null;
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenAuth,
  onSelectProduct,
  onNavigateSection,
  activeSection,
  onOpenMobileNav,
  onToggleMobileMenu,
  isMobileNavOpen,
  isMobileMenuOpen,
  currentUser: propCurrentUser,
  cartCount: propCartCount,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(propCartCount ?? 0);
  const [currentUser, setCurrentUser] = useState<UserModel | null>(
    propCurrentUser ?? null,
  );

  const toggleMobileNav = onOpenMobileNav ?? onToggleMobileMenu ?? (() => {});
  const isNavOpen = isMobileNavOpen ?? isMobileMenuOpen ?? false;

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Subscripciones reactivas
  useEffect(() => {
    const unsubCart = cartService.subscribe((state) => {
      setCartCount(state.itemCount);
    });
    const unsubAuth = authService.subscribe((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubCart();
      unsubAuth();
    };
  }, []);

  // Debounce para búsqueda en tiempo real
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (searchQuery.trim().length >= 2) {
      setIsSearching(true);
      setIsSearchOpen(true);
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const results = await productService.liveSearch(searchQuery, 6);
          setSearchResults(results);
        } catch (error) {
          console.error("Error in live search:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 250); // 250ms debounce
    } else {
      setSearchResults([]);
      setIsSearching(false);
      if (searchQuery.trim().length === 0) {
        setIsSearchOpen(false);
      }
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const inDesktop =
        searchContainerRef.current &&
        searchContainerRef.current.contains(target);
      const inMobile =
        mobileSearchRef.current && mobileSearchRef.current.contains(target);

      if (!inDesktop && !inMobile) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductPick = (product: Product) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    onSelectProduct(product);
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        {/* Botón Menú Hamburguesa Móvil con target 44px */}
        <button
          onClick={toggleMobileNav}
          className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label={isNavOpen ? "Cerrar menú" : "Abrir menú"}
          id="mobile-menu-toggle-btn"
        >
          {isNavOpen ? (
            <X className="w-6 h-6 text-[#f97316]" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Brand Logo - Ferretería July */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection("inicio");
          }}
          className="flex flex-col group cursor-pointer focus:outline-none shrink-0"
          id="brand-logo"
        >
          <span className="text-lg xs:text-xl sm:text-2xl font-black tracking-tighter text-[#0f172a] dark:text-white transition-colors leading-tight">
            FERRETERÍA <span className="text-[#f97316]">JULY</span>
          </span>
          <span className="text-[8px] xs:text-[9px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400 -mt-0.5 flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 text-[#f97316]" /> Soluciones de
            confianza
          </span>
        </a>

        {/* Navegación Desktop */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
          {SITE_CONFIG.navLinks.map((link) => {
            const sectionKey = link.href.replace("#", "");
            const isActive = activeSection === sectionKey;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection(sectionKey);
                }}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? "text-[#f97316] font-bold"
                    : "hover:text-[#0f172a] dark:hover:text-white"
                }`}
                id={`nav-link-${sectionKey}`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-black uppercase rounded bg-rose-500 text-white animate-pulse">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f97316] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Buscador de Productos Desktop con Debounce */}
        <div
          ref={searchContainerRef}
          className="flex-1 max-w-md relative hidden md:block"
        >
          <div className="relative">
            <input
              type="text"
              id="header-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchQuery.trim().length >= 2) setIsSearchOpen(true);
              }}
              placeholder="Buscar taladros, herramientas, pinturas, tuberías..."
              className="w-full pl-10 pr-9 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-[#f97316] outline-none transition-all"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchOpen(false);
                }}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dropdown de Resultados Dinámicos */}
          {isSearchOpen && (
            <SearchDropdown
              results={searchResults}
              isLoading={isSearching}
              searchQuery={searchQuery}
              onSelectProduct={handleProductPick}
              onViewAllResults={() => {
                setIsSearchOpen(false);
                onNavigateSection("productos");
              }}
            />
          )}
        </div>

        {/* Acciones: Carrito & Iniciar Sesión / Usuario */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Botón Carrito con Contador */}
          <button
            onClick={onOpenCart}
            id="header-cart-btn"
            className="relative p-2 text-slate-700 dark:text-slate-200 hover:text-[#f97316] dark:hover:text-[#f97316] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label={`Ver carrito de compras, ${cartCount} artículos`}
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            {cartCount > 0 && (
              <span
                id="cart-badge-count"
                className="absolute -top-1 -right-1 bg-[#f97316] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md animate-in zoom-in-75"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* Botón de Autenticación / Perfil */}
          {currentUser ? (
            <button
              onClick={onOpenAuth}
              id="header-user-btn"
              className="flex items-center gap-2 p-1.5 pr-2.5 sm:pr-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-left focus:outline-none min-h-[40px]"
              aria-label="Ver perfil de usuario"
            >
              <img
                src={
                  currentUser.avatar ||
                  generateAvatarPlaceholder(currentUser.name)
                }
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    generateAvatarPlaceholder(currentUser.name);
                }}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-[#f97316]"
              />
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[90px] xl:max-w-[120px]">
                  {currentUser.name.split(" ")[0]}
                </p>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 capitalize leading-none">
                  {currentUser.role === "ADMIN" ? "Admin" : "Mi Cuenta"}
                </p>
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              id="header-login-btn"
              className="bg-[#0f172a] dark:bg-slate-800 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 shadow-sm min-h-[38px]"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f97316]" />
              <span className="hidden xs:inline">Ingresar</span>
            </button>
          )}
        </div>
      </div>

      {/* Buscador visible en pantallas móviles / tablets pequeñas */}
      <div
        ref={mobileSearchRef}
        className="md:hidden px-3 sm:px-6 pb-3 pt-0.5 relative"
      >
        <div className="relative">
          <input
            type="text"
            id="mobile-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchQuery.trim().length >= 2) setIsSearchOpen(true);
            }}
            placeholder="Buscar en Ferretería July..."
            className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#f97316] outline-none"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setIsSearchOpen(false);
              }}
              className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {isSearchOpen && (
          <div className="relative mt-1">
            <SearchDropdown
              results={searchResults}
              isLoading={isSearching}
              searchQuery={searchQuery}
              onSelectProduct={handleProductPick}
              onViewAllResults={() => {
                setIsSearchOpen(false);
                onNavigateSection("productos");
              }}
            />
          </div>
        )}
      </div>
    </header>
  );
};
