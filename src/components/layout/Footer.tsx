import React from 'react';
import { SITE_CONFIG } from '../../config/site.config';
import { ShieldCheck, Headphones, Truck, Clock, Phone, Mail, MapPin, MessageSquare, Send, ChevronRight, CreditCard, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer
      id="main-footer"
      className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
    >
      {/* Barra de Beneficios Rápidos (Professional Polish Style) */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="bg-[#f97316]/10 text-[#f97316] p-3 rounded-xl shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Garantía Total
              </p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                En todos los productos de marca
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="bg-[#f97316]/10 text-[#f97316] p-3 rounded-xl shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Asesoría Técnica
              </p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Expertos ferreteros a tu servicio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="bg-[#f97316]/10 text-[#f97316] p-3 rounded-xl shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Entrega Rápida
              </p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Despachos a obra y taller
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="bg-[#f97316]/10 text-[#f97316] p-3 rounded-xl shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Pagos Flexibles
              </p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Tarjetas, Yape, Plin y Transferencia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal del Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Columna 1: Branding & Misión */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-[#0f172a] dark:text-white">
              FERRETERÍA <span className="text-[#f97316]">JULY</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 -mt-1">
              Soluciones de confianza para la construcción
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
            {SITE_CONFIG.description}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={SITE_CONFIG.buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
            </a>
            <a
              href={SITE_CONFIG.buildTelegramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
              aria-label="Telegram"
              title="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Navegación
          </h4>
          <ul className="space-y-2 text-xs">
            {SITE_CONFIG.navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => onNavigateSection(link.href.replace('#', ''))}
                  className="hover:text-[#f97316] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Categorías Clave */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Catálogo
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onNavigateSection('productos')}
                className="hover:text-[#f97316] transition-colors flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-slate-400" /> Herramientas Eléctricas
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateSection('productos')}
                className="hover:text-[#f97316] transition-colors flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-slate-400" /> Herramientas Manuales
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateSection('productos')}
                className="hover:text-[#f97316] transition-colors flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-slate-400" /> Construcción & Sika
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateSection('productos')}
                className="hover:text-[#f97316] transition-colors flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-slate-400" /> Pinturas & Acabados
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateSection('productos')}
                className="hover:text-[#f97316] transition-colors flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 text-slate-400" /> Conductores Indeco
              </button>
            </li>
          </ul>
        </div>

        {/* Columna 4: Atención & Contacto */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Atención al Cliente
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
              <span>{SITE_CONFIG.contact.address}, {SITE_CONFIG.contact.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#f97316] shrink-0" />
              <span>{SITE_CONFIG.contact.phoneDisplay}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#f97316] shrink-0" />
              <span>{SITE_CONFIG.contact.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs text-slate-600 dark:text-slate-400">
                <p>{SITE_CONFIG.contact.schedules.weekdays}</p>
                <p>{SITE_CONFIG.contact.schedules.saturday}</p>
                <p className="text-slate-400 dark:text-slate-500">{SITE_CONFIG.contact.schedules.sunday}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright inferior */}
      <div className="border-t border-slate-200 dark:border-slate-800 py-4 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 {SITE_CONFIG.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-medium text-slate-400">
              Arquitectura Modular • REST API Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
