import React from 'react';
import { SITE_CONFIG } from '../../config/site.config';
import { ShieldCheck, BadgePercent, Headphones, Boxes, Truck, CreditCard } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#f97316]" />;
      case 'BadgePercent':
        return <BadgePercent className="w-6 h-6 text-[#f97316]" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-[#f97316]" />;
      case 'Boxes':
        return <Boxes className="w-6 h-6 text-[#f97316]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#f97316]" />;
      case 'CreditCard':
      default:
        return <CreditCard className="w-6 h-6 text-[#f97316]" />;
    }
  };

  return (
    <section id="beneficios" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316] bg-[#f97316]/10 px-3 py-1 rounded-full">
          Nuestra Promesa de Valor
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
          ¿Por qué elegir Ferretería July?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl mx-auto">
          Brindamos soluciones integrales con soporte técnico especializado y respaldo directo de fábrica.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SITE_CONFIG.benefits.map((benefit) => (
          <div
            key={benefit.id}
            id={`benefit-card-${benefit.id}`}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-[#f97316]/40 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f97316]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {getIcon(benefit.icon)}
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#f97316] transition-colors">
              {benefit.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
