import React from "react";
import { SITE_CONFIG } from "../../config/site.config";
import {
  Award,
  Users,
  CheckCircle2,
  Shield,
  HeartHandshake,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { generateBannerPlaceholder } from "../../utils/imageFallback";

interface AboutSectionProps {
  onNavigateSection: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onNavigateSection,
}) => {
  return (
    <section
      id="nosotros"
      className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lado Izquierdo: Composición de Imágenes y Experiencia (lg:col-span-6) */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-800">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0qjFg762A62lOxVS5fsfAtUndJdw27yUWvI2UJFU71Sa7rlfMIWaOhoI&s=10"
                alt="Ferretería July Almacén y Atención"
                loading="lazy"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    generateBannerPlaceholder(
                      "Ferretería July - Almacén y Atención",
                    );
                }}
                className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Tarjeta flotante de años de experiencia */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-[#f97316] flex items-center justify-center font-black text-xl shrink-0">
                +15
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider">
                  Años de Trayectoria
                </h4>
                <p className="text-[11px] text-slate-300">
                  Equipando obras civiles, industrias y hogares.
                </p>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Historia, Misión y Métricas (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316] bg-[#f97316]/10 px-3 py-1 rounded-full">
                Conócenos
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 leading-tight">
                Tu socio estratégico en herramientas y construcción
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                En{" "}
                <strong className="text-slate-900 dark:text-white">
                  Ferretería July
                </strong>{" "}
                nos dedicamos a suministrar productos de alta calidad para
                contratistas, maestros de obra, talleres y familias que buscan
                durabilidad y rendimiento garantizado.
              </p>
            </div>

            {/* Métricas clave */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3">
              {SITE_CONFIG.stats.map((st, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center"
                >
                  <p className="text-xl sm:text-2xl font-black text-[#f97316]">
                    {st.value}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
                    {st.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Pilares de Valor */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Distribución de Marcas Líderes
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Garantía oficial directa en DeWalt, Bosch, Stanley, Makita,
                    Indeco y Sika.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Asesoría Técnica Especializada
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Personal capacitado para recomendarte la solución exacta
                    antes de comprar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Despacho Inmediato a Todo el País
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Coordinamos fletes rápidos y seguros directo a tu obra o
                    taller.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateSection("contacto")}
                className="py-3 px-6 rounded-xl bg-[#0f172a] text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                Contáctanos y Visítanos{" "}
                <ArrowRight className="w-4 h-4 text-[#f97316]" />
              </button>

              <a
                href={SITE_CONFIG.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#f97316] text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-[#f97316]" /> Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
