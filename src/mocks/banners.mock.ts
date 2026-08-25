import { Banner, Promotion } from "../models";

export const MOCK_HERO_BANNERS: Banner[] = [
  {
    id: "hero-1",
    title: "Potencia y Precisión para tus Proyectos",
    subtitle:
      "Encuentra las mejores marcas internacionales con garantía oficial, stock garantizado y asesoría técnica personalizada en cada compra.",
    tagline: "Ferretería July • Distribuidor Autorizado",
    highlightText: "Hasta 25% de Descuento en Línea Eléctrica",
    imageUrl:
      "https://grupocasalima.com/wp-content/uploads/herramientas-de-mano-casa-lima.jpg",
    ctaText: "Ver Productos",
    ctaLink: "#productos",
    secondaryCtaText: "Ver Ofertas Especiales",
    secondaryCtaLink: "#ofertas",
    badge: "Nuevas Ofertas de Temporada",
  },
  {
    id: "hero-2",
    title: "Herramientas Inalámbricas de Última Generación",
    subtitle:
      "Mayor autonomía, motores sin carbones (Brushless) y tecnología de carga ultrarrápida para maestros de obra y profesionales exigentes.",
    tagline: "DeWalt • Makita • Bosch • Stanley",
    highlightText: "Combos Exclusivos con Baterías y Maletín",
    imageUrl:
      "https://www.misterworker.com/it/img/cms/best%20power%20tools/ChatGPT%20Image%2030%20mar%202026,%2014_46%20(1).png",
    ctaText: "Explorar Herramientas",
    ctaLink: "#productos",
    secondaryCtaText: "Cotizar por WhatsApp",
    secondaryCtaLink: "#contacto",
    badge: "Tecnología Profesional",
  },
  {
    id: "hero-3",
    title: "Materiales y Acabados de Alta Resistencia",
    subtitle:
      "Pinturas de alto poder cubriente, selladores de poliuretano, fijaciones estructurales y tuberías certificadas para construcción civil.",
    tagline: "Sika • CPP • Indeco • Pavco",
    highlightText: "Descuentos por Volumen para Contratistas",
    imageUrl:
      "https://thumbs.dreamstime.com/b/materiales-de-construcci%C3%B3n-en-la-ferreter%C3%ADa-gente-est%C3%A1-buscando-los-del-acabamiento-para-las-reparaciones-casa-y-el-apartamento-126859594.jpg",
    ctaText: "Ver Construcción",
    ctaLink: "#categorias",
    secondaryCtaText: "Contactar Asesor",
    secondaryCtaLink: "#contacto",
    badge: "Precios Mayoristas",
  },
];

export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: "promo-1",
    title: "Semana de la Construcción",
    description:
      "Aprovecha precios rebajados en cementos, selladores Sika y aditivos para concreto.",
    discountLabel: "Hasta -20% OFF",
    endDate: "2026-08-31",
    code: "CONSTRUYE20",
    imageUrl:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
    categorySlug: "construccion-y-acabados",
  },
  {
    id: "promo-2",
    title: "Especial Electricidad Segura",
    description:
      "Conductores Indeco 100% cobre con certificación oficial y accesorios eléctricos.",
    discountLabel: "15% Descuento",
    endDate: "2026-08-25",
    code: "INDECO15",
    imageUrl:
      "https://images.unsplash.com/photo-1558441719-5b128525b682?auto=format&fit=crop&w=600&q=80",
    categorySlug: "electricidad-e-iluminacion",
  },
];
