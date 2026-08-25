import React, { useState, useEffect } from "react";
import { Banner } from "../../models";
import { bannerService } from "../../services/banner.service";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { SITE_CONFIG } from "../../config/site.config";
import { generateBannerPlaceholder } from "../../utils/imageFallback";

interface HeroSliderProps {
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onNavigateSection,
}) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    bannerService.getHeroBanners().then((data) => {
      setBanners(data);
    });
  }, []);

  // Autoplay
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [banners, isPaused]);

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="inicio"
      className="relative bg-[#0f172a] text-white overflow-hidden rounded-2xl sm:rounded-3xl mx-2 sm:mx-6 lg:mx-8 my-3 sm:my-6 shadow-2xl border border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Diapositiva Principal */}
      <div className="relative min-h-[380px] xs:min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center">
        {/* Imagen de fondo con overlay degradado profesional */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            loading="eager"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                generateBannerPlaceholder(currentBanner.title);
            }}
            className="w-full h-full object-cover opacity-20 sm:opacity-25 filter scale-105 transition-all duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent" />
          <div className="absolute inset-0 bg-radial at-center from-transparent to-[#0f172a]/70" />
        </div>

        {/* Contenido del Slide */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 xs:px-6 sm:px-10 lg:px-12 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-8 space-y-3.5 sm:space-y-6">
            {/* Badge de Oferta / Tagline */}
            <div className="flex items-center gap-2 flex-wrap">
              {currentBanner.badge && (
                <span className="inline-flex items-center gap-1 bg-[#f97316] text-white text-[10px] sm:text-[11px] font-black uppercase px-2.5 sm:px-3 py-1 rounded-full shadow-lg shadow-orange-500/30">
                  <Sparkles className="w-3 h-3" />
                  {currentBanner.badge}
                </span>
              )}
              {currentBanner.tagline && (
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 tracking-wider uppercase">
                  {currentBanner.tagline}
                </span>
              )}
            </div>

            {/* Título */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {currentBanner.title}
            </h1>

            {/* Subtítulo */}
            <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {currentBanner.subtitle}
            </p>

            {/* Highlight Banner */}
            {currentBanner.highlightText && (
              <div className="inline-block p-2 sm:p-2.5 px-3 sm:px-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-bold text-amber-300">
                ⚡ {currentBanner.highlightText}
              </div>
            )}

            {/* Botones de Llamado a la Acción */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-2">
              <button
                onClick={() => onNavigateSection("productos")}
                className="bg-[#f97316] hover:bg-[#ea580c] text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 min-h-[40px]"
              >
                {currentBanner.ctaText} <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateSection("ofertas")}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 min-h-[40px]"
              >
                {currentBanner.secondaryCtaText || "Ver Ofertas"}
              </button>

              <a
                href={SITE_CONFIG.buildWhatsAppUrl(
                  "¡Hola Ferretería July! Deseo recibir la lista de precios y catálogo actual.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex lg:hidden items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 text-xs font-bold min-h-[40px]"
              >
                <MessageSquare className="w-4 h-4 fill-current" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Tarjeta Visual Lateral */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl max-w-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f97316] text-white flex items-center justify-center font-bold">
                  FJ
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">
                    Ferretería July
                  </h4>
                  <p className="text-[10px] text-slate-300 uppercase tracking-widest mt-1">
                    Distribuidor Oficial
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                Atención personalizada para compras minoristas y proyectos de
                gran envergadura.
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400">
                <span>✓ Facturación Electrónica</span>
                <span>✓ Envío Express</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controles Prev / Next */}
        {banners.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-[#f97316] text-white backdrop-blur-md transition-all border border-white/10 opacity-75 hover:opacity-100"
              aria-label="Diapositiva anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-[#f97316] text-white backdrop-blur-md transition-all border border-white/10 opacity-75 hover:opacity-100"
              aria-label="Diapositiva siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Indicadores de Diapositivas */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx
                    ? "w-8 bg-[#f97316]"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Ir a diapositiva ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
