import React, { useState, useEffect } from 'react';
import { Topbar } from './components/layout/Topbar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { HeroSlider } from './components/home/HeroSlider';
import { BenefitsSection } from './components/home/BenefitsSection';
import { CategoryGrid } from './components/home/CategoryGrid';
import { OffersSection } from './components/home/OffersSection';
import { DiscountProductsCarousel } from './components/home/DiscountProductsCarousel';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { AboutSection } from './components/home/AboutSection';
import { ContactSection } from './components/home/ContactSection';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { QuickViewModal } from './components/products/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/shared/ToastContainer';
import { Product, User, CartState } from './models';
import { authService } from './services/auth.service';
import { cartService } from './services/cart.service';
import { favoritesService } from './services/favorites.service';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(authService.getCurrentUser());
  const [cartState, setCartState] = useState<CartState>(cartService.getState());
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  
  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Favorites state synced via favoritesService
  const [favorites, setFavorites] = useState<string[]>(favoritesService.getFavorites());

  // Dark Mode state
  const [isDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Effect para sincronizar estado de autenticación, carrito y favoritos
  useEffect(() => {
    const unsubAuth = authService.subscribe((user) => setCurrentUser(user));
    const unsubCart = cartService.subscribe((cart) => setCartState(cart));
    const unsubFavs = favoritesService.subscribe((favs) => setFavorites(favs));
    return () => {
      unsubAuth();
      unsubCart();
      unsubFavs();
    };
  }, []);

  // Effect para sincronizar clase dark
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleFavorite = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    favoritesService.toggleFavorite(productId);
  };

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    cartService.addItem(product, 1);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const currentScroll = window.scrollY ?? window.pageYOffset ?? 0;
      const offsetPosition = elementPosition + currentScroll - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectCategoryFromGrid = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    scrollToSection('productos');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 antialiased selection:bg-[#f97316]/20 selection:text-[#f97316]">
      {/* Sistema de Notificaciones Toast */}
      <ToastContainer />

      {/* Barra de Contacto Superior */}
      <Topbar />

      {/* Header de Navegación & Buscador */}
      <Header
        activeSection={activeSection}
        onNavigateSection={scrollToSection}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        currentUser={currentUser}
        cartCount={cartState.itemCount}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Navegación Móvil Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activeSection={activeSection}
        onNavigateSection={scrollToSection}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Contenido Principal */}
      <main className="flex-1">
        {/* Slider Hero Principal */}
        <HeroSlider onNavigateSection={scrollToSection} />

        {/* Pilares y Beneficios de Valor */}
        <BenefitsSection />

        {/* Cuadrícula de Categorías */}
        <CategoryGrid
          selectedCategory={selectedCategoryId}
          onSelectCategory={handleSelectCategoryFromGrid}
        />

        {/* Sección de Ofertas Flash con Temporizador */}
        <OffersSection
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          onNavigateToCatalog={() => scrollToSection('productos')}
        />

        {/* Carrusel de Productos en Descuento (Sección Independiente) */}
        <DiscountProductsCarousel
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Catálogo Completo y Filtros */}
        <FeaturedProducts
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(id) => setSelectedCategoryId(id)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Sobre Nosotros / Trayectoria */}
        <AboutSection onNavigateSection={scrollToSection} />

        {/* Contacto, Formulario, Horarios y FAQ */}
        <ContactSection />
      </main>

      {/* Pie de Página */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Botón Flotante de WhatsApp */}
      <WhatsAppFloat />

      {/* Modal de Detalle Completo de Producto */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      )}

      {/* Modal de Vista Rápida */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onViewFullDetail={(p) => {
            setQuickViewProduct(null);
            setSelectedProduct(p);
          }}
        />
      )}

      {/* Drawer del Carrito */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onNavigateToProducts={() => scrollToSection('productos')}
      />

      {/* Modal de Autenticación */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
}
