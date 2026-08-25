import React, { useEffect, useState } from "react";
import { Category } from "../../models";
import { categoryService } from "../../services/category.service";
import {
  ArrowRight,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Lightbulb,
  Droplet,
  Shield,
  Scissors,
  Sparkles,
} from "lucide-react";

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoryService.getCategories().then(setCategories);
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "Wrench":
        return <Wrench className="w-5 h-5" />;
      case "Hammer":
        return <Hammer className="w-5 h-5" />;
      case "Paintbrush":
        return <Paintbrush className="w-5 h-5" />;
      case "Lightbulb":
        return <Lightbulb className="w-5 h-5" />;
      case "Droplet":
        return <Droplet className="w-5 h-5" />;
      case "Shield":
        return <Shield className="w-5 h-5" />;
      case "Scissors":
      default:
        return <Scissors className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="categorias"
      className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316] bg-[#f97316]/10 px-3 py-1 rounded-full">
            Catálogo Especializado
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            Explora por Categorías
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Encuentra exactamente las herramientas y materiales que tu proyecto
            demanda.
          </p>
        </div>

        {selectedCategory !== "all" && (
          <button
            onClick={() => onSelectCategory("all")}
            className="text-xs font-bold text-[#f97316] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            Ver todas las categorías <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              id={`category-card-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-3.5 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-xl ring-2 ring-[#f97316]"
                  : "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 hover:border-[#f97316]/60 hover:shadow-xl"
              }`}
            >
              {/* Imagen de fondo tenue en hover */}
              <div className="absolute right-0 bottom-0 w-20 sm:w-24 h-20 sm:h-24 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none overflow-hidden">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isSelected
                        ? "bg-[#f97316] text-white"
                        : "bg-[#f97316]/10 text-[#f97316]"
                    }`}
                  >
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {cat.productCount} items
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold leading-snug group-hover:text-[#f97316] transition-colors line-clamp-2">
                  {cat.name}
                </h3>
                <p
                  className={`text-[10px] sm:text-[11px] mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed ${
                    isSelected
                      ? "text-slate-300"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] sm:text-xs font-semibold">
                <span
                  className={`${
                    isSelected
                      ? "text-[#f97316]"
                      : "text-slate-400 group-hover:text-[#f97316]"
                  } transition-colors flex items-center gap-1`}
                >
                  Ver productos{" "}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
