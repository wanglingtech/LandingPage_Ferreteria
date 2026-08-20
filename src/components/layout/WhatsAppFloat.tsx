import React from 'react';
import { MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site.config';

export const WhatsAppFloat: React.FC = () => {
  const whatsappUrl = SITE_CONFIG.buildWhatsAppUrl();

  return (
    <div
      id="whatsapp-floating-widget"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center group"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a Ferretería July por WhatsApp"
        className="flex items-center gap-2 bg-[#25D366] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40 min-w-[48px] min-h-[48px] justify-center"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" />
        <span className="hidden sm:inline font-bold text-xs tracking-tight">
          ¿Deseas asesoría? <span className="font-extrabold underline decoration-white/40">Escríbenos</span>
        </span>
      </a>
    </div>
  );
};
