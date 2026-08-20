/**
 * Image Fallback Utility
 * Proporciona placeholders SVG ultra-livianos, profesionales y garantizados
 * en caso de que una imagen falle, no tenga conexión o sea bloqueada.
 */

export const generatePlaceholderSvg = (text: string = 'Ferretería July', brand?: string): string => {
  const brandText = brand ? brand.toUpperCase() : 'FERRETERÍA JULY';
  const cleanTitle = text.replace(/<[^>]*>?/gm, '').trim();
  const displayTitle = cleanTitle.length > 32 ? cleanTitle.substring(0, 30) + '...' : cleanTitle;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="none">
      <rect width="600" height="600" fill="#0f172a"/>
      <rect x="24" y="24" width="552" height="552" rx="28" fill="#1e293b" stroke="#f97316" stroke-width="2" stroke-opacity="0.3"/>
      <circle cx="300" cy="240" r="75" fill="#f97316" fill-opacity="0.12"/>
      
      <!-- Icono de herramienta estilizada -->
      <path d="M265 240L300 205L335 240M300 205V285M255 295H345" stroke="#f97316" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      
      <!-- Marca / Código -->
      <rect x="180" y="340" width="240" height="32" rx="16" fill="#f97316" fill-opacity="0.2"/>
      <text x="300" y="362" fill="#fb923c" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" text-anchor="middle" letter-spacing="1.5">
        ${brandText}
      </text>

      <!-- Nombre del Producto -->
      <text x="300" y="415" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" text-anchor="middle">
        ${displayTitle}
      </text>

      <!-- Garantía / Marca -->
      <text x="300" y="455" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" text-anchor="middle" letter-spacing="2">
        PRODUCTO GARANTIZADO • FERRETERÍA JULY
      </text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const generateAvatarPlaceholder = (name: string = 'Usuario'): string => {
  const initial = (name.trim()[0] || 'U').toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="60" fill="#0f172a"/>
      <circle cx="60" cy="60" r="54" stroke="#f97316" stroke-width="3" stroke-opacity="0.5"/>
      <text x="60" y="74" fill="#f97316" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" text-anchor="middle">
        ${initial}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const generateBannerPlaceholder = (title: string = 'Ferretería July'): string => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="600" viewBox="0 0 1600 600" fill="none">
      <rect width="1600" height="600" fill="#0f172a"/>
      <rect x="40" y="40" width="1520" height="520" rx="32" fill="#1e293b" stroke="#f97316" stroke-width="3" stroke-opacity="0.3"/>
      <circle cx="800" cy="260" r="110" fill="#f97316" fill-opacity="0.12"/>
      <path d="M750 260L800 210L850 260M800 210V320M740 335H860" stroke="#f97316" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="800" y="420" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="900" text-anchor="middle" letter-spacing="1">
        ${title.toUpperCase()}
      </text>
      <text x="800" y="470" fill="#f97316" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" text-anchor="middle" letter-spacing="3">
        CALIDAD, HERRAMIENTAS Y SUMINISTROS PROFESIONALES
      </text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
