import React, { useState, useEffect } from 'react';
import { Phone, Clock, MessageSquare, Send, X, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site.config';
import { Tooltip } from '../shared/Tooltip';

export const Topbar: React.FC = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const whatsappUrl = SITE_CONFIG.buildWhatsAppUrl();
  const telegramUrl = SITE_CONFIG.buildTelegramUrl();

  // Close schedule modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsScheduleModalOpen(false);
      }
    };
    if (isScheduleModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isScheduleModalOpen]);

  // Determine if the store is open right now in Peru time (UTC-5)
  const getStoreStatus = () => {
    try {
      const now = new Date();
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
      const utcDay = now.getUTCDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

      let limaHours = utcHours - 5;
      let limaDay = utcDay;
      if (limaHours < 0) {
        limaHours += 24;
        limaDay = (limaDay + 6) % 7;
      }
      const limaMinutesTotal = limaHours * 60 + utcMinutes;

      if (limaDay >= 1 && limaDay <= 5) {
        // Lun-Vie: 7:30 AM (450) a 7:00 PM (1140)
        return limaMinutesTotal >= 450 && limaMinutesTotal <= 1140;
      } else if (limaDay === 6) {
        // Sáb: 8:00 AM (480) a 6:00 PM (1080)
        return limaMinutesTotal >= 480 && limaMinutesTotal <= 1080;
      } else if (limaDay === 0) {
        // Dom: 9:00 AM (540) a 2:00 PM (840)
        return limaMinutesTotal >= 540 && limaMinutesTotal <= 840;
      }
      return false;
    } catch {
      return true;
    }
  };

  const isOpen = getStoreStatus();

  return (
    <>
      <div
        id="topbar-contact"
        className="bg-slate-900 text-slate-300 text-xs py-2 px-3 sm:px-6 lg:px-8 border-b border-slate-800 transition-colors relative z-30"
      >
        <div className="max-w-7xl mx-auto">
          {/* DISEÑO PARA PANTALLAS MÓVILES (< md): Ordenado, centrado y en 2 filas limpias */}
          <div className="flex flex-col md:hidden gap-2">
            {/* Fila 1: Horario de atención centrado con botón de detalle */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(true)}
                className="w-full flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 text-[11px] transition-colors group"
                aria-label="Ver horarios completos de atención"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                  title={isOpen ? 'Abierto ahora' : 'Cerrado temporalmente'}
                />
                <span className="font-medium truncate">
                  Lun a Vie: 7:30 AM - 7:00 PM • Sáb: 8:00 AM - 6:00 PM
                </span>
                <span className="text-[10px] text-amber-400 font-bold underline underline-offset-2 shrink-0 ml-0.5">
                  Detalle
                </span>
              </button>
            </div>

            {/* Fila 2: Teléfono centrado + Botones de WhatsApp y Telegram */}
            <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
              {/* Teléfono */}
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="flex items-center gap-1.5 text-[11px] text-slate-200 hover:text-white font-medium py-1 px-2 rounded-lg bg-slate-800/40 border border-slate-700/40 transition-colors flex-1 sm:flex-initial justify-center"
                aria-label={`Llamar a ${SITE_CONFIG.contact.phoneDisplay}`}
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{SITE_CONFIG.contact.phoneDisplay}</span>
              </a>

              {/* Botones de acción directa */}
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  id="topbar-whatsapp-btn-mobile"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition-all font-semibold text-[11px]"
                  aria-label="WhatsApp Ventas"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Ventas</span>
                </a>

                <a
                  id="topbar-telegram-btn-mobile"
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-600/20 text-sky-400 hover:bg-sky-600 hover:text-white border border-sky-500/30 transition-all font-semibold text-[11px]"
                  aria-label="Telegram"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>

          {/* DISEÑO PARA ESCRITORIO (md+): Fila única elegante y perfectamente distribuida */}
          <div className="hidden md:flex items-center justify-between gap-4">
            {/* Lado Izquierdo: Horario Completo & Teléfono */}
            <div className="flex items-center gap-4 lg:gap-6 min-w-0">
              {/* Horario de Atención */}
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(true)}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-xs py-1 px-2 rounded-lg hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 group"
                aria-label="Ver horarios completos de atención"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                  title={isOpen ? 'Abierto ahora' : 'Cerrado temporalmente'}
                />
                <span className="font-medium hidden lg:inline">
                  Horario: Lunes a Viernes 7:30 AM - 7:00 PM | Sábados 8:00 AM - 6:00 PM | Domingos 9:00 AM - 2:00 PM
                </span>
                <span className="font-medium inline lg:hidden">
                  Lun a Vie: 7:30 AM - 7:00 PM • Sáb: 8:00 AM - 6:00 PM
                </span>
                <span className="text-[10px] text-amber-400 font-bold underline underline-offset-2 ml-1">
                  Ver detalle
                </span>
              </button>

              {/* Teléfono */}
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 whitespace-nowrap"
                aria-label={`Llamar a ${SITE_CONFIG.contact.phoneDisplay}`}
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-semibold">{SITE_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>

            {/* Lado Derecho: WhatsApp y Telegram */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Tooltip content="Chatear por WhatsApp con Ferretería July">
                <a
                  id="topbar-whatsapp-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition-all font-semibold text-xs min-h-[28px]"
                  aria-label="Abrir WhatsApp directo con la ferretería"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Ventas</span>
                </a>
              </Tooltip>

              <Tooltip content="Abrir canal/contacto en Telegram">
                <a
                  id="topbar-telegram-btn"
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-600/20 text-sky-400 hover:bg-sky-600 hover:text-white border border-sky-500/30 transition-all font-semibold text-xs min-h-[28px]"
                  aria-label="Abrir Telegram directo con la ferretería"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Seguro de Horarios de Atención (Fixed Backdrop) */}
      {isScheduleModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsScheduleModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-modal-title"
        >
          <div
            className="w-full max-w-md bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700/80 p-5 sm:p-6 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setIsScheduleModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Cerrar modal de horarios"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Encabezado */}
            <div className="flex items-center gap-3 pb-3.5 mb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 id="schedule-modal-title" className="font-bold text-base text-white">
                  Horarios de Atención
                </h3>
                <p className="text-xs text-slate-400">{SITE_CONFIG.name} • Atención y Despachos</p>
              </div>
            </div>

            {/* Badge de Estado Actual */}
            <div className="mb-4">
              <div
                className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl w-full justify-center ${
                  isOpen
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                {isOpen ? 'Abierto Ahora para Atención y Pedidos' : 'Cerrado Actualmente • Abrimos a las 7:30 AM'}
              </div>
            </div>

            {/* Desglose de Días */}
            <div className="space-y-2.5 mb-5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <span className="font-medium text-slate-300">Lunes a Viernes:</span>
                <span className="font-bold text-amber-400 text-sm">7:30 AM - 7:00 PM</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <span className="font-medium text-slate-300">Sábados:</span>
                <span className="font-bold text-amber-400 text-sm">8:00 AM - 6:00 PM</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <span className="font-medium text-slate-400">Domingos:</span>
                <span className="font-semibold text-slate-300 text-sm">9:00 AM - 2:00 PM</span>
              </div>
            </div>

            {/* Información adicional y acciones */}
            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{SITE_CONFIG.contact.address}, {SITE_CONFIG.contact.city}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Atención continua en tienda, cotizaciones y WhatsApp</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  Llamar
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/30"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


