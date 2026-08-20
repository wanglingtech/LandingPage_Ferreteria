/**
 * Configuración Centralizada de Ferretería July
 * Permite cambiar datos de contacto, enlaces, textos y estadísticas en un solo lugar.
 */

import { ContactInfo, StoreBenefit, StoreStat } from '../models';

export const SITE_CONFIG = {
  name: 'Ferretería July',
  slogan: 'Calidad, Variedad y Asesoría Profesional para tus Proyectos',
  description: 'Distribuidora y ferretería líder en herramientas eléctricas, manuales, materiales de construcción, pinturas, plomería y electricidad.',
  currency: {
    symbol: 'S/',
    code: 'PEN',
    name: 'Soles',
  },
  
  // Datos de contacto centralizados
  contact: {
    phone: '+51987654321',
    phoneDisplay: '(01) 456-7890 / 987 654 321',
    whatsapp: '51987654321',
    whatsappDisplay: '+51 987 654 321',
    telegram: 'ferreteriajuly_pe',
    telegramDisplay: '@ferreteriajuly_pe',
    email: 'ventas@ferreteriajuly.com',
    address: 'Av. Las Herramientas 1248, Lima Industrial',
    city: 'Lima',
    country: 'Perú',
    googleMapsUrl: 'https://maps.google.com/?q=Lima+Peru',
    schedules: {
      weekdays: 'Lunes a Viernes: 7:30 AM - 7:00 PM',
      saturday: 'Sábados: 8:00 AM - 6:00 PM',
      sunday: 'Domingos: 9:00 AM - 2:00 PM',
    },
    socials: {
      facebook: 'https://facebook.com/ferreteriajuly',
      instagram: 'https://instagram.com/ferreteriajuly',
      tiktok: 'https://tiktok.com/@ferreteriajuly',
      youtube: 'https://youtube.com/@ferreteriajuly',
    },
  } as ContactInfo,

  // Enlaces de navegación
  navLinks: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Productos', href: '#productos' },
    { label: 'Categorías', href: '#categorias' },
    { label: 'Ofertas', href: '#ofertas', badge: 'Hot' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ],

  // Estadísticas de la empresa
  stats: [
    {
      id: 'experience',
      value: '+15',
      label: 'Años de Experiencia',
      description: 'Liderando el mercado ferretero con confianza',
      icon: 'Award',
    },
    {
      id: 'products',
      value: '+2,500',
      label: 'Productos en Stock',
      description: 'Herramientas y materiales de primera línea',
      icon: 'Package',
    },
    {
      id: 'clients',
      value: '+12,000',
      label: 'Clientes Satisfechos',
      description: 'Maestros de obra, contratistas y hogares',
      icon: 'Users',
    },
    {
      id: 'brands',
      value: '+50',
      label: 'Marcas Oficiales',
      description: 'Garantía directa de fabricante',
      icon: 'ShieldCheck',
    },
  ] as StoreStat[],

  // Beneficios de comprar en Ferretería July
  benefits: [
    {
      id: '1',
      title: 'Garantía de Fábrica',
      description: 'Todos nuestros productos cuentan con respaldo y garantía oficial de marcas líderes.',
      icon: 'ShieldCheck',
    },
    {
      id: '2',
      title: 'Precios Competitivos',
      description: 'Descuentos especiales para mayoristas, contratistas y compras por volumen.',
      icon: 'BadgePercent',
    },
    {
      id: '3',
      title: 'Asesoría Técnica Experta',
      description: 'Nuestro equipo de especialistas te orienta en la elección ideal para tu obra o proyecto.',
      icon: 'Headphones',
    },
    {
      id: '4',
      title: 'Stock Permanente',
      description: 'Disponibilidad inmediata en tienda y almacén para no detener tus proyectos.',
      icon: 'Boxes',
    },
    {
      id: '5',
      title: 'Envío Rápido y Seguro',
      description: 'Despachos directos a tu taller, obra o domicilio, o recojo express en tienda.',
      icon: 'Truck',
    },
    {
      id: '6',
      title: 'Múltiples Medios de Pago',
      description: 'Aceptamos transferencias, tarjetas de crédito/débito, Yape, Plin y efectivo.',
      icon: 'CreditCard',
    },
  ] as StoreBenefit[],

  // Generador de enlaces de WhatsApp
  buildWhatsAppUrl: (message?: string): string => {
    const phone = SITE_CONFIG.contact.whatsapp;
    const text = message 
      ? encodeURIComponent(message)
      : encodeURIComponent('¡Hola Ferretería July! Deseo consultar sobre sus productos y catálogo.');
    return `https://wa.me/${phone}?text=${text}`;
  },

  // Generador de enlace de Telegram
  buildTelegramUrl: (text?: string): string => {
    const user = SITE_CONFIG.contact.telegram;
    return `https://t.me/${user}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
  },

  // Plantilla de mensaje para consulta de producto
  buildProductInquiryMsg: (productName: string, sku: string, price: number): string => {
    return `¡Hola Ferretería July! 👋 Me interesa cotizar este producto:
🛠️ *${productName}*
🔢 SKU: ${sku}
💰 Precio mostrado: S/ ${price.toFixed(2)}
¿Tienen stock disponible y opciones de envío?`;
  },

  // Plantilla de mensaje para orden del carrito
  buildCartOrderMsg: (items: { name: string; quantity: number; price: number }[], total: number): string => {
    const itemsList = items
      .map((item, idx) => `${idx + 1}. ${item.name} x${item.quantity} -> S/ ${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');
    return `¡Hola Ferretería July! 🛒 Deseo realizar el siguiente pedido desde su catálogo web:

${itemsList}

*TOTAL ESTIMADO: S/ ${total.toFixed(2)}*

Por favor confirmen disponibilidad y costo de envío. ¡Muchas gracias!`;
  }
};
