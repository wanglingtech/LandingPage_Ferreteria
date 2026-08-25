import React from "react";
import { SITE_CONFIG } from "../../config/site.config";
import {
  User,
  MessageSquare,
  Send,
  Phone,
  Clock,
  ChevronRight,
  X,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { User as UserModel } from "../../models";
import { authService } from "../../services/auth.service";
import { generateAvatarPlaceholder } from "../../utils/imageFallback";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  currentUser: UserModel | null;
  onOpenAuth: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigateSection,
  currentUser,
  onOpenAuth,
}) => {
  if (!isOpen) return null;

  const handleLinkClick = (sectionKey: string) => {
    onNavigateSection(sectionKey);
    onClose();
  };

  return (
    <div
      id="mobile-nav-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in-0"
      onClick={onClose}
    >
      <div
        id="mobile-nav-drawer"
        className="w-[85%] max-w-sm h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-left duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del menú */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight">
              FERRETERÍA <span className="text-[#f97316]">JULY</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">
              Soluciones Profesionales
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Usuario o Login */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
          {currentUser ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
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
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#f97316]"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {currentUser.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  authService.logout();
                  onClose();
                }}
                className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-[#0f172a] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
            >
              <User className="w-4 h-4 text-[#f97316]" /> Iniciar Sesión /
              Registrarse
            </button>
          )}
        </div>

        {/* Enlaces de Navegación */}
        <div className="flex-1 py-4 px-3 space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Navegación
          </p>
          {SITE_CONFIG.navLinks.map((link) => {
            const sectionKey = link.href.replace("#", "");
            const isActive = activeSection === sectionKey;
            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(sectionKey)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#f97316]/10 text-[#f97316]"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#f97316]" : "bg-transparent"}`}
                  />
                  {link.label}
                </span>
                {link.badge ? (
                  <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-rose-500 text-white">
                    {link.badge}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Canales de Contacto Directo */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50 dark:bg-slate-900/40">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Contacto Directo
          </p>
          <a
            href={SITE_CONFIG.buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WhatsApp: {SITE_CONFIG.contact.whatsappDisplay}</span>
          </a>

          <a
            href={SITE_CONFIG.buildTelegramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold hover:bg-sky-500/20 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Telegram: {SITE_CONFIG.contact.telegramDisplay}</span>
          </a>

          <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-[11px]">
                <p className="font-semibold text-slate-700 dark:text-slate-200">
                  Horario de Atención:
                </p>
                <p>{SITE_CONFIG.contact.schedules.weekdays}</p>
                <p>{SITE_CONFIG.contact.schedules.saturday}</p>
                <p className="text-slate-400">
                  {SITE_CONFIG.contact.schedules.sunday}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="hover:text-amber-500 font-medium"
              >
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
