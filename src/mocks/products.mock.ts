import { Product } from '../models';

export const MOCK_PRODUCTS: Product[] = [
  // 1. Herramientas Eléctricas (cat-1)
  {
    id: 'prod-1',
    slug: 'taladro-percutor-bosch-gsb-550-re-kit',
    sku: 'BOS-GSB-550',
    name: 'Taladro Percutor Bosch GSB 550 RE 550W + Kit 40 Accesorios',
    brand: 'Bosch',
    categoryId: 'cat-1',
    categoryName: 'Herramientas Eléctricas',
    description: 'El taladro percutor Bosch GSB 550 RE ofrece un rendimiento confiable con su motor de 550W. Su diseño compacto y ergonómico permite trabajar en espacios reducidos con total comodidad. Incluye selector de percusión y perforación, velocidad variable reversible y maletín organizador con 40 accesorios indispensables.',
    shortDescription: 'Motor de 550W, mandril de 13mm (1/2"), velocidad variable reversible y kit completo.',
    features: [
      'Motor potente y resistente de 550 W',
      'Mandril metálico de 13 mm (1/2 pulgada) con llave',
      'Velocidad variable con reversibilidad de giro',
      'Botón de bloqueo para trabajos continuos',
      'Maletín de transporte con 40 piezas entre brocas, puntas y llaves'
    ],
    specifications: [
      { name: 'Potencia absorbida', value: '550 W' },
      { name: 'Velocidad de giro en vacío', value: '0 – 2,800 rpm' },
      { name: 'Número de impactos', value: '0 – 44,800 bpm' },
      { name: 'Capacidad de portabrocas', value: '1.5 – 13 mm' },
      { name: 'Perforación hormigón', value: '13 mm' },
      { name: 'Perforación madera', value: '25 mm' },
      { name: 'Perforación acero', value: '10 mm' },
      { name: 'Peso', value: '1.8 kg' }
    ],
    price: 249.90,
    originalPrice: 299.90,
    discountPercentage: 17,
    stock: 15,
    featured: true,
    isOnSale: true,
    isBestSeller: true,
    isNew: false,
    rating: 4.8,
    reviewCount: 28,
    unit: 'unidad',
    tags: ['taladro', 'bosch', 'percutor', 'oferta', 'kit', 'herramienta electrica'],
    warranty: '1 Año de Garantía Oficial Bosch Perú',
    images: [
      {
        id: 'img-1-1',
        url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        alt: 'Taladro Percutor Bosch GSB 550 RE',
        isPrimary: true
      },
      {
        id: 'img-1-2',
        url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
        alt: 'Bosch GSB en uso en concreto',
        isPrimary: false
      }
    ]
  },
  {
    id: 'prod-2',
    slug: 'amoladora-angular-dewalt-dwe4010-750w',
    sku: 'DEW-DWE4010',
    name: 'Amoladora Angular DeWalt DWE4010 4-1/2" 750W 12,000 RPM',
    brand: 'DeWalt',
    categoryId: 'cat-1',
    categoryName: 'Herramientas Eléctricas',
    description: 'Esmeril angular de 4-1/2 pulgadas DeWalt con motor de 750W de alta eficiencia. Cuenta con sistema de extracción de polvo, engranajes helicoidales que reducen la vibración y prolongan la vida útil de la herramienta. Ideal para cortes precisos en metal, concreto y desbaste profesional.',
    shortDescription: 'Potente motor de 750W, 12,000 RPM, mango lateral de 2 posiciones y guarda ajustable.',
    features: [
      'Motor de 750W entrega mayor velocidad y potencia en desbaste',
      'Caja de engranajes de bajo perfil para trabajar en espacios estrechos',
      'Interruptor deslizante con bloqueo para operación continua',
      'Cable reforzado de 2 metros para mayor durabilidad',
      'Incluye guarda de protección, llave y mango lateral'
    ],
    specifications: [
      { name: 'Potencia', value: '750 Watts' },
      { name: 'Velocidad sin carga', value: '12,000 RPM' },
      { name: 'Diámetro de disco', value: '4-1/2" (115 mm)' },
      { name: 'Eje', value: 'M14' },
      { name: 'Tipo de interruptor', value: 'Deslizante' },
      { name: 'Peso aproximado', value: '1.9 kg' }
    ],
    price: 219.00,
    originalPrice: 259.00,
    discountPercentage: 15,
    stock: 22,
    featured: true,
    isOnSale: true,
    isBestSeller: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 35,
    unit: 'unidad',
    tags: ['amoladora', 'dewalt', 'esmeril', 'corte', 'metal', 'herramienta electrica'],
    warranty: '3 Años de Garantía Limitada DeWalt',
    images: [
      {
        id: 'img-2-1',
        url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
        alt: 'Amoladora DeWalt DWE4010',
        isPrimary: true
      },
      {
        id: 'img-2-2',
        url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
        alt: 'Amoladora trabajando con chispas de corte',
        isPrimary: false
      }
    ]
  },
  {
    id: 'prod-4',
    slug: 'taladro-atornillador-inalambrico-makita-12v',
    sku: 'MAK-HP333D',
    name: 'Taladro Atornillador Inalámbrico Makita 12V CXT + 2 Baterías + Cargador',
    brand: 'Makita',
    categoryId: 'cat-1',
    categoryName: 'Herramientas Eléctricas',
    description: 'Compacto taladro percutor atornillador a batería de 12V Max CXT Makita. Con luz LED integrada para iluminar el área de trabajo, 20 posiciones de torque + percusión y mandril autoajustable sin llave. Liviano, ergonómico y diseñado para montajes continuos y carpintería fina.',
    shortDescription: 'Tecnología CXT 12V, incluye 2 baterías de litio 1.5Ah, cargador rápido y maletín.',
    features: [
      'Diseño ultra compacto de solo 193 mm de longitud',
      'Luz de trabajo LED incorporada con función de persistencia',
      'Circuito de protección de batería contra sobrecarga y descarga profunda',
      '2 velocidades mecánicas con control electrónico de gatillo'
    ],
    specifications: [
      { name: 'Voltaje', value: '12V Max CXT' },
      { name: 'Capacidad de batería', value: '1.5 Ah Li-Ion (2 incluidas)' },
      { name: 'Torque máximo', value: '30 N.m (260 in.lbs.)' },
      { name: 'Velocidad', value: 'Alta: 0 - 1,700 RPM | Baja: 0 - 450 RPM' },
      { name: 'Mandril', value: '10 mm (3/8") autoajustable' },
      { name: 'Peso con batería', value: '1.1 kg' }
    ],
    price: 459.00,
    originalPrice: 520.00,
    discountPercentage: 12,
    stock: 14,
    featured: true,
    isOnSale: false,
    isBestSeller: true,
    isNew: true,
    rating: 5.0,
    reviewCount: 41,
    unit: 'unidad',
    tags: ['inalambrico', 'makita', 'atornillador', 'bateria', '12v'],
    warranty: '1 Año de Garantía Oficial Makita Perú',
    images: [
      {
        id: 'img-4-1',
        url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
        alt: 'Taladro Atornillador Makita Inalámbrico',
        isPrimary: true
      }
    ]
  },
  {
    id: 'prod-11',
    slug: 'sierra-circular-bosch-gks-150-1500w',
    sku: 'BOS-GWS-700',
    name: 'Sierra Circular Bosch GKS 150 1500W 7-1/4" Profesional',
    brand: 'Bosch',
    categoryId: 'cat-1',
    categoryName: 'Herramientas Eléctricas',
    description: 'Sierra circular manual de alto rendimiento con motor de 1500W. Capacidad de corte a 90° de 65mm y a 45° de 45mm. Con soplador de polvo integrado que mantiene la línea de corte siempre visible y placa base robusta para cortes limpios en todo tipo de maderas.',
    shortDescription: 'Potente motor de 1500W, disco de 7-1/4" con 24 dientes de carburo de tungsteno.',
    features: [
      'Visor de línea de corte optimizado',
      'Empuñadura auxiliar ergonómica para mayor control',
      'Fácil acceso a carbones para mantenimiento rápido',
      'Incluye disco de corte Bosch Optiline Wood'
    ],
    specifications: [
      { name: 'Potencia', value: '1,500 Watts' },
      { name: 'Velocidad', value: '6,000 RPM' },
      { name: 'Diámetro de disco', value: '7-1/4" (184 mm)' },
      { name: 'Profundidad de corte (90°)', value: '65 mm' },
      { name: 'Peso', value: '3.7 kg' }
    ],
    price: 439.00,
    originalPrice: 499.00,
    discountPercentage: 12,
    stock: 11,
    featured: true,
    isOnSale: true,
    isBestSeller: false,
    isNew: true,
    rating: 4.9,
    reviewCount: 18,
    unit: 'unidad',
    tags: ['sierra', 'bosch', 'circular', 'madera', 'corte'],
    warranty: '1 Año Garantía Bosch',
    images: [
      {
        id: 'img-11-1',
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        alt: 'Sierra Circular Bosch Profesional',
        isPrimary: true
      }
    ]
  },

  // 2. Herramientas Manuales (cat-2)
  {
    id: 'prod-3',
    slug: 'juego-herramientas-mecanicas-stanley-123-piezas',
    sku: 'STA-STMT74393',
    name: 'Juego de Herramientas Mecánicas Stanley 123 Piezas Cromo Vanadio',
    brand: 'Stanley',
    categoryId: 'cat-2',
    categoryName: 'Herramientas Manuales',
    description: 'Set completo de 123 piezas Stanley fabricado en acero cromo vanadio de alta resistencia con acabado cromado micro-satinado que evita la corrosión. Incluye dados milimétricos y en pulgadas con tecnología Maxi-Drive que incrementa el torque hasta un 15% evitando el redondeo de tuercas.',
    shortDescription: '123 piezas en maletín plástico ultra resistente de alta durabilidad profesional.',
    features: [
      'Fabricado en aleación Cromo Vanadio con tratamiento térmico',
      'Trinquetes ergonómicos con botón de desacople rápido',
      'Estuche resistente con bisagras reforzadas',
      'Tecnología Maxi-Drive para mayor torsión sin dañar tornillos',
      'Ideal para automotriz, mantenimiento industrial y hogar'
    ],
    specifications: [
      { name: 'Cantidad de piezas', value: '123 piezas' },
      { name: 'Material', value: 'Acero Cromo Vanadio' },
      { name: 'Medidas', value: 'Milimétricas y Pulgadas (1/4", 3/8", 1/2")' },
      { name: 'Estuche', value: 'Polietileno de alta densidad (Blow Mold Case)' },
      { name: 'Peso total', value: '6.8 kg' }
    ],
    price: 389.00,
    originalPrice: 469.00,
    discountPercentage: 17,
    stock: 9,
    featured: true,
    isOnSale: true,
    isBestSeller: false,
    isNew: true,
    rating: 4.7,
    reviewCount: 19,
    unit: 'juego',
    tags: ['herramientas', 'stanley', 'dados', 'llaves', 'mecanica'],
    warranty: 'Garantía de por vida limitada Stanley',
    images: [
      {
        id: 'img-3-1',
        url: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?auto=format&fit=crop&w=800&q=80',
        alt: 'Juego de Herramientas Stanley 123 Piezas',
        isPrimary: true
      },
      {
        id: 'img-3-2',
        url: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
        alt: 'Detalle de llaves y dados cromo vanadio',
        isPrimary: false
      }
    ]
  },
  {
    id: 'prod-5',
    slug: 'nivel-laser-autonivelante-truper-15m-verde',
    sku: 'TRU-12845',
    name: 'Nivel Láser Autonivelante de Líneas Cruzadas Truper 15m Verde',
    brand: 'Truper',
    categoryId: 'cat-2',
    categoryName: 'Herramientas Manuales',
    description: 'Nivel láser autonivelante con haz verde de alta visibilidad, hasta 4 veces más visible que el láser rojo tradicional. Proyecta líneas cruzadas horizontal y vertical para alineación exacta en drywall, cerámicos, estanterías e instalaciones eléctricas.',
    shortDescription: 'Rango de 15 metros, haz láser verde brillante, soporte magnético incluido.',
    features: [
      'Diodo láser verde de alta luminosidad clase II',
      'Sistema de péndulo autonivelante con alarma de desalineación',
      'Rosca estándar de 1/4" para trípode',
      'Incluye funda de transporte acolchada y soporte magnético'
    ],
    specifications: [
      { name: 'Alcance', value: '15 metros' },
      { name: 'Precisión', value: '± 0.3 mm/m' },
      { name: 'Rango de autonivelación', value: '± 4°' },
      { name: 'Alimentación', value: '2 Pilas AA incluidas' }
    ],
    price: 185.00,
    originalPrice: 215.00,
    discountPercentage: 14,
    stock: 18,
    featured: false,
    isOnSale: true,
    isBestSeller: false,
    isNew: true,
    rating: 4.6,
    reviewCount: 12,
    unit: 'unidad',
    tags: ['nivel', 'laser', 'truper', 'drywall', 'acabados'],
    warranty: '1 Año Garantía Truper',
    images: [
      {
        id: 'img-5-1',
        url: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
        alt: 'Nivel Láser Autonivelante Truper',
        isPrimary: true
      }
    ]
  },
  {
    id: 'prod-12',
    slug: 'martillo-una-curva-stanley-antivibe-20oz',
    sku: 'STA-MART-20OZ',
    name: 'Martillo de Uña Curva Stanley Antivibe 20 Oz Mango Ergonómico',
    brand: 'Stanley',
    categoryId: 'cat-2',
    categoryName: 'Herramientas Manuales',
    description: 'Martillo forjado en una sola pieza de acero de aleación con tecnología antivibración patentada AntiVibe que reduce la fatiga muscular y el choque en la muñeca. Boca pulida y uña curva afilada para fácil extracción de clavos.',
    shortDescription: 'Cabeza de 20 oz forjada en una sola pieza, agarre de goma texturizada antideslizante.',
    features: [
      'Estructura de acero macizo de una sola pieza',
      'Tecnología AntiVibe reduce la vibración transmitida al brazo',
      'Cara de golpeo templada de máxima durabilidad'
    ],
    specifications: [
      { name: 'Peso de cabeza', value: '20 Oz (567 g)' },
      { name: 'Tipo de uña', value: 'Curva' },
      { name: 'Mango', value: 'Acero con elastómero amortiguador' }
    ],
    price: 68.00,
    originalPrice: 79.00,
    discountPercentage: 14,
    stock: 30,
    featured: false,
    isOnSale: false,
    isBestSeller: true,
    isNew: false,
    rating: 4.8,
    reviewCount: 26,
    unit: 'unidad',
    tags: ['martillo', 'stanley', 'antivibe', 'carpinteria'],
    warranty: 'Garantía de por vida Stanley',
    images: [
      {
        id: 'img-12-1',
        url: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
        alt: 'Martillo Stanley AntiVibe',
        isPrimary: true
      }
    ]
  },

  // 3. Construcción y Fijaciones (cat-3)
  {
    id: 'prod-6',
    slug: 'sellador-poliuretano-sikaflex-1a-plus-gris-300ml',
    sku: 'SIK-FLEX-1A',
    name: 'Sellador de Poliuretano Sikaflex 1A Plus Gris Cartucho 300ml',
    brand: 'Sika',
    categoryId: 'cat-3',
    categoryName: 'Construcción y Fijaciones',
    description: 'Sikaflex 1A Plus es un sellador elástico monocomponente a base de poliuretano, que cura con la humedad del ambiente. Diseñado especialmente para juntas de dilatación en muros, techos, losas, marcos de puertas y ventanas con excelente resistencia a la intemperie y rayos UV.',
    shortDescription: 'Sellador elastomérico de alto desempeño para juntas de construcción y fachadas.',
    features: [
      'Capacidad de movimiento de junta hasta ±25%',
      'Excelente adherencia sobre concreto, ladrillo, madera y metales',
      'No se escurre en juntas verticales',
      'Pintable una vez curado'
    ],
    specifications: [
      { name: 'Presentación', value: 'Cartucho 300 ml' },
      { name: 'Color', value: 'Gris concreto' },
      { name: 'Base química', value: 'Poliuretano monocomponente' },
      { name: 'Tiempo de secado', value: '60 - 90 minutos' }
    ],
    price: 28.50,
    originalPrice: 34.00,
    discountPercentage: 16,
    stock: 120,
    featured: true,
    isOnSale: true,
    isBestSeller: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 53,
    unit: 'unidad',
    tags: ['sika', 'sellador', 'poliuretano', 'construccion', 'juntas'],
    warranty: 'Calidad Certificada Sika Perú',
    images: [
      {
        id: 'img-6-1',
        url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
        alt: 'Sikaflex 1A Plus Cartucho',
        isPrimary: true
      }
    ]
  },
  {
    id: 'prod-13',
    slug: 'cemento-portland-tipo-i-sol-bolsa-42-5kg',
    sku: 'SOL-CEM-425',
    name: 'Cemento Portland Tipo I Sol Bolsa 42.5 Kg Estructural',
    brand: 'Sol',
    categoryId: 'cat-3',
    categoryName: 'Construcción y Fijaciones',
    description: 'Cemento de uso general de alta resistencia para columnas, vigas, losas y cimentaciones. Cumple con la norma técnica peruana NTP 334.009 y ASTM C-150 Tipo I.',
    shortDescription: 'Bolsa de 42.5 kg, fraguado óptimo y alta resistencia inicial y final.',
    features: [
      'Máxima resistencia a la compresión para obras de concreto armado',
      'Excelente trabajabilidad y acabado superficial liso',
      'Fórmula tradicional líder en el mercado de la construcción en Perú'
    ],
    specifications: [
      { name: 'Peso por bolsa', value: '42.5 Kg' },
      { name: 'Tipo de cemento', value: 'Portland Tipo I' },
      { name: 'Norma de fabricación', value: 'NTP 334.009 / ASTM C-150' }
    ],
    price: 27.90,
    originalPrice: 31.00,
    discountPercentage: 10,
    stock: 250,
    featured: true,
    isOnSale: false,
    isBestSeller: true,
    isNew: false,
    rating: 5.0,
    reviewCount: 64,
    unit: 'bolsa',
    tags: ['cemento', 'sol', 'construccion', 'materiales', 'concreto'],
    warranty: 'Certificación UNACEM',
    images: [
      {
        id: 'img-13-1',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
        alt: 'Bolsa Cemento Sol 42.5 kg',
        isPrimary: true
      }
    ]
  },

  // 4. Pinturas y Acabados (cat-4)
  {
    id: 'prod-7',
    slug: 'pintura-latex-supermate-cpp-blanco-galon',
    sku: 'CPP-LAT-SUP',
    name: 'Pintura Látex Supermate CPP Blanco Galón 4L Máxima Cobertura',
    brand: 'CPP',
    categoryId: 'cat-4',
    categoryName: 'Pinturas y Acabados',
    description: 'Pintura látex acrílica para interiores y exteriores de acabado mate aterciopelado. Formulada con resinas de alta calidad que brindan excelente lavabilidad, alto poder cubriente y resistencia contra el moho y la humedad.',
    shortDescription: 'Galón 4 Litros, acabado mate uniforme, lavable y bajo olor.',
    features: [
      'Excelente rendimiento: cubre hasta 35 m² por galón a dos manos',
      'Fácil aplicación con brocha, rodillo o soplete',
      'Bajo contenido de COV (Compuestos Orgánicos Volátiles)',
      'Secado al tacto en 30 minutos'
    ],
    specifications: [
      { name: 'Volumen', value: '1 Galón (3.785 L)' },
      { name: 'Acabado', value: 'Super Mate' },
      { name: 'Color', value: 'Blanco Puro' },
      { name: 'Rendimiento', value: '35 - 40 m²/galón' }
    ],
    price: 52.00,
    originalPrice: 62.00,
    discountPercentage: 16,
    stock: 45,
    featured: false,
    isOnSale: true,
    isBestSeller: true,
    isNew: false,
    rating: 4.8,
    reviewCount: 30,
    unit: 'galón',
    tags: ['pintura', 'latex', 'cpp', 'blanco', 'acabados'],
    warranty: 'Garantía de Color y Calidad CPP',
    images: [
      {
        id: 'img-7-1',
        url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
        alt: 'Galón de Pintura Látex Supermate CPP',
        isPrimary: true
      }
    ]
  },
  {
    id: 'prod-14',
    slug: 'esmalte-sintetico-vencedor-negro-brillante-galon',
    sku: 'VEN-ESM-NEG',
    name: 'Esmalte Sintético Anticorrosivo Vencedor Negro Brillante 1 Galón',
    brand: 'Vencedor',
    categoryId: 'cat-4',
    categoryName: 'Pinturas y Acabados',
    description: 'Pintura alquídica de alta durabilidad para metal, rejas, puertas y madera. Brinda protección contra el óxido y brillo duradero en exteriores.',
    shortDescription: '1 Galón, máxima adherencia y protección anticorrosiva para metal y madera.',
    features: [
      'Acabado ultra brillante de alta dureza',
      'Excelente resistencia al intemperismo y humedad costera',
      'Rinde de 30 a 35 m² por galón'
    ],
    specifications: [
      { name: 'Presentación', value: '1 Galón' },
      { name: 'Color', value: 'Negro Brillante' },
      { name: 'Base', value: 'Alquídica / Sintética' }
    ],
    price: 64.00,
    originalPrice: 75.00,
    discountPercentage: 15,
    stock: 32,
    featured: false,
    isOnSale: false,
    isBestSeller: false,
    isNew: false,
    rating: 4.7,
    reviewCount: 14,
    unit: 'galón',
    tags: ['esmalte', 'vencedor', 'sintetico', 'anticorrosivo', 'metal'],
    warranty: 'Garantía Vencedor',
    images: [
      {
        id: 'img-14-1',
        url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
        alt: 'Esmalte Sintético Vencedor',
        isPrimary: true
      }
    ]
  },

  // 5. Electricidad e Iluminación (cat-5)
  {
    id: 'prod-8',
    slug: 'rollo-cable-electrico-indeco-thw-14-100m-rojo',
    sku: 'IND-THW-14',
    name: 'Rollo de Cable Eléctrico Indeco THW 14 AWG 100m Cobre 100% Rojo',
    brand: 'Indeco',
    categoryId: 'cat-5',
    categoryName: 'Electricidad e Iluminación',
    description: 'Conductor eléctrico de cobre electrolítico recocido de 99.9% de pureza con aislamiento termoplástico de PVC autoextinguible. Certificado para instalaciones residenciales y comerciales seguras según norma NTP 370.252.',
    shortDescription: 'Rollo 100 metros calibre 14 AWG (2.5mm² aprox.), 100% Cobre certificado.',
    features: [
      'Cobre 99.9% de alta conductividad',
      'Aislamiento ignífugo no propagador de llama',
      'Resistente a la humedad y grasas',
      'Sello de calidad INDECO y normas peruanas'
    ],
    specifications: [
      { name: 'Calibre', value: '14 AWG' },
      { name: 'Longitud', value: '100 metros' },
      { name: 'Tensión de servicio', value: '450 / 750 V' },
      { name: 'Temperatura máx.', value: '70 °C' },
      { name: 'Color', value: 'Rojo' }
    ],
    price: 135.00,
    originalPrice: 155.00,
    discountPercentage: 13,
    stock: 35,
    featured: true,
    isOnSale: false,
    isBestSeller: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 47,
    unit: 'rollo',
    tags: ['cable', 'indeco', 'electricidad', 'cobre', '14awg'],
    warranty: 'Certificación de Fábrica Indeco',
    images: [
      {
        id: 'img-8-1',
        url: 'https://images.unsplash.com/photo-1558441719-5b128525b682?auto=format&fit=crop&w=800&q=80',
        alt: 'Cable Eléctrico Indeco 14 AWG',
        isPrimary: true
      }
    ]
  },
  {
    id: 'prod-15',
    slug: 'reflector-led-exterior-philips-100w-ip65-luz-blanca',
    sku: 'PHI-REF-100W',
    name: 'Reflector LED Exterior Philips Essential 100W IP65 Luz Blanca 6500K',
    brand: 'Philips',
    categoryId: 'cat-5',
    categoryName: 'Electricidad e Iluminación',
    description: 'Proyector LED de alta potencia para exteriores, fachadas, almacenes y patios de obra. Protección IP65 resistente a la lluvia, polvo e impactos con carcasa de aluminio inyectado.',
    shortDescription: '100W, 10,000 lúmenes, protección IP65 para intemperie, ahorro energético 85%.',
    features: [
      '10,000 Lúmenes de flujo luminoso real',
      'Vida útil de hasta 30,000 horas continuas',
      'Driver integrado con protección contra sobretensiones'
    ],
    specifications: [
      { name: 'Potencia', value: '100 Watts' },
      { name: 'Flujo luminoso', value: '10,000 Lm' },
      { name: 'Temperatura de color', value: '6500K (Luz Fría)' },
      { name: 'Grado de protección', value: 'IP65' }
    ],
    price: 119.00,
    originalPrice: 145.00,
    discountPercentage: 18,
    stock: 20,
    featured: true,
    isOnSale: true,
    isBestSeller: false,
    isNew: true,
    rating: 4.8,
    reviewCount: 21,
    unit: 'unidad',
    tags: ['reflector', 'philips', 'led', 'iluminacion', 'exterior'],
    warranty: '2 Años de Garantía Philips',
    images: [
      {
        id: 'img-15-1',
        url: 'https://images.unsplash.com/photo-1558441719-5b128525b682?auto=format&fit=crop&w=800&q=80',
        alt: 'Reflector LED Philips 100W',
        isPrimary: true
      }
    ]
  },

  // 6. Gasfitería y Plomería (cat-6)
  {
    id: 'prod-10',
    slug: 'tubo-agua-fria-pvc-pavco-12-c10-5m',
    sku: 'PAV-TUB-PVC-12',
    name: 'Tubo de Agua Fría PVC Pavco 1/2" C-10 x 5 Metros',
    brand: 'Pavco',
    categoryId: 'cat-6',
    categoryName: 'Gasfitería y Plomería',
    description: 'Tubería rígida de PVC para conducción de agua potable a presión Clase 10 con unión roscada o simple presión. Fabricada bajo estrictas normas técnicas que aseguran resistencia a la presión hidráulica y larga vida útil libre de sarro.',
    shortDescription: 'Tubo de 5 metros longitud, diámetro 1/2 pulgada, Clase 10 Pavco Wavin.',
    features: [
      'Pared lisa de mínima fricción y cero incrustaciones',
      'No altera el sabor ni la pureza del agua potable',
      'Alta resistencia química y mecánica'
    ],
    specifications: [
      { name: 'Diámetro nominal', value: '1/2"' },
      { name: 'Longitud', value: '5.0 metros' },
      { name: 'Clase', value: 'C-10 (10 kgf/cm²)' },
      { name: 'Norma técnica', value: 'NTP 399.002' }
    ],
    price: 18.90,
    originalPrice: 22.00,
    discountPercentage: 14,
    stock: 80,
    featured: false,
    isOnSale: false,
    isBestSeller: true,
    isNew: false,
    rating: 4.7,
    reviewCount: 16,
    unit: 'tubo',
    tags: ['pavco', 'pvc', 'tubo', 'gasfiteria', 'agua'],
    warranty: 'Certificación Pavco Wavin',
    images: [
      {
        id: 'img-10-1',
        url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
        alt: 'Tubo PVC Pavco 1/2 pulgada',
        isPrimary: true
      }
    ]
  },
  {
    id: 'prod-16',
    slug: 'pegamento-pvc-oatey-dorado-cemento-solvente-8oz',
    sku: 'OAT-PEG-8OZ',
    name: 'Pegamento para PVC Oatey Dorado Extra Reforzado 8 Oz con Aplicador',
    brand: 'Oatey',
    categoryId: 'cat-6',
    categoryName: 'Gasfitería y Plomería',
    description: 'Cemento solvente de alta viscosidad formulado para soldar tuberías y conexiones de PVC de agua y desagüe con máxima presión.',
    shortDescription: 'Lata de 8 onzas (237 ml) con hisopo aplicador en la tapa.',
    features: [
      'Secado rápido y soldadura química permanente',
      'Resiste presiones hidrostáticas elevadas',
      'Apto para agua potable y redes sanitarias'
    ],
    specifications: [
      { name: 'Contenido', value: '8 Oz (237 ml)' },
      { name: 'Uso', value: 'Tuberías PVC rígido hasta 6"' }
    ],
    price: 24.50,
    originalPrice: 28.00,
    discountPercentage: 12,
    stock: 65,
    featured: false,
    isOnSale: false,
    isBestSeller: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 33,
    unit: 'unidad',
    tags: ['pegamento', 'oatey', 'pvc', 'gasfiteria', 'soldadura'],
    warranty: 'Calidad Original Oatey',
    images: [
      {
        id: 'img-16-1',
        url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
        alt: 'Pegamento PVC Oatey Dorado',
        isPrimary: true
      }
    ]
  },

  // 7. Seguridad Industrial / EPP (cat-7)
  {
    id: 'prod-9',
    slug: 'respirador-medio-rostro-3m-6200-filtros',
    sku: '3M-RESP-6200',
    name: 'Respirador Medio Rostro 3M 6200 con Filtros para Vapores y Polvo',
    brand: '3M',
    categoryId: 'cat-7',
    categoryName: 'Seguridad Industrial / EPP',
    description: 'Respirador reutilizable de media pieza facial 3M Serie 6000 fabricado en elastómero termoplástico hipoalergénico. Incluye par de cartuchos para vapores orgánicos y prefiltros contra partículas, ideal para pintura, solventes y lijado.',
    shortDescription: 'Media máscara reutilizable talla M con arnés de 4 puntos y válvulas de exhalación.',
    features: [
      'Material elastómero suave y liviano',
      'Diseño de bajo perfil compatible con visores y lentes de seguridad',
      'Sistema de conexión tipo bayoneta para rápido cambio de filtros'
    ],
    specifications: [
      { name: 'Talla', value: 'Mediana (M - 6200)' },
      { name: 'Certificación', value: 'NIOSH TC-84A' },
      { name: 'Material', value: 'Elastómero termoplástico' }
    ],
    price: 89.00,
    originalPrice: 105.00,
    discountPercentage: 15,
    stock: 28,
    featured: false,
    isOnSale: true,
    isBestSeller: false,
    isNew: false,
    rating: 4.8,
    reviewCount: 22,
    unit: 'unidad',
    tags: ['3m', 'respirador', 'epp', 'seguridad', 'mascarilla'],
    warranty: 'Garantía Original 3M',
    images: [
      {
        id: 'img-9-1',
        url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
        alt: 'Respirador 3M 6200',
        isPrimary: true
      }
    ]
  },
  {
    id: 'prod-17',
    slug: 'casco-seguridad-tipo-jockey-3m-h700-arnes-ratchet',
    sku: '3M-CAS-H700',
    name: 'Casco de Seguridad 3M H-700 Blanco con Suspensión Ratchet 4 Puntas',
    brand: '3M',
    categoryId: 'cat-7',
    categoryName: 'Seguridad Industrial / EPP',
    description: 'Casco dieléctrico de protección clase E y G ANSI/ISEA Z89.1. Con suspensión tipo ratchet ajustable con una sola mano y ranuras para orejeras y caretas.',
    shortDescription: 'Casco tipo jockey blanco con ajuste ratchet, alta absorción de impacto.',
    features: [
      'Carcasa de polietileno de alta densidad',
      'Banda sudorípara suave y reemplazable',
      'Ajuste ergonómico de 4 puntos'
    ],
    specifications: [
      { name: 'Color', value: 'Blanco' },
      { name: 'Norma', value: 'ANSI/ISEA Z89.1 Tipo I Clase C, G y E' }
    ],
    price: 34.00,
    originalPrice: 40.00,
    discountPercentage: 15,
    stock: 50,
    featured: false,
    isOnSale: true,
    isBestSeller: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 39,
    unit: 'unidad',
    tags: ['casco', '3m', 'seguridad', 'epp', 'proteccion'],
    warranty: 'Certificación 3M Oficial',
    images: [
      {
        id: 'img-17-1',
        url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
        alt: 'Casco 3M H-700',
        isPrimary: true
      }
    ]
  },

  // 8. Jardinería y Exteriores (cat-8)
  {
    id: 'prod-18',
    slug: 'tijera-podar-truper-profesional-forjada-8-pulgadas',
    sku: 'TRU-TIJ-POD8',
    name: 'Tijera de Podar Truper Profesional Forjada 8" Cuchilla SK5',
    brand: 'Truper',
    categoryId: 'cat-8',
    categoryName: 'Jardinería y Exteriores',
    description: 'Tijera para poda de ramas verdes y secas con cuchilla forjada en acero alto carbono SK5 con recubrimiento antiadherente de teflón. Mangos ergonómicos de aluminio con revestimiento antideslizante.',
    shortDescription: '8 pulgadas, corte limpio hasta 20 mm de grosor, seguro de bloqueo con una mano.',
    features: [
      'Hoja de acero SK-5 forjado para filo de larga duración',
      'Tope amortiguador de impacto para reducir la tensión en la muñeca',
      'Resorte de retorno suave y duradero'
    ],
    specifications: [
      { name: 'Longitud', value: '8" (200 mm)' },
      { name: 'Capacidad de corte', value: '3/4" (19 mm)' }
    ],
    price: 39.90,
    originalPrice: 48.00,
    discountPercentage: 17,
    stock: 24,
    featured: false,
    isOnSale: true,
    isBestSeller: false,
    isNew: true,
    rating: 4.8,
    reviewCount: 15,
    unit: 'unidad',
    tags: ['tijera', 'podar', 'truper', 'jardineria', 'plantas'],
    warranty: 'Garantía Truper',
    images: [
      {
        id: 'img-18-1',
        url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
        alt: 'Tijera de Podar Truper',
        isPrimary: true
      }
    ]
  },
  {
    id: 'prod-19',
    slug: 'manguera-jardin-reforzada-tramontina-1-2-25m-accesorios',
    sku: 'TRA-MAN-25M',
    name: 'Manguera de Jardín Tramontina Reforzada 1/2" x 25 Metros + Pistola 4 Chorros',
    brand: 'Tramontina',
    categoryId: 'cat-8',
    categoryName: 'Jardinería y Exteriores',
    description: 'Manguera flexible de 3 capas con malla de poliéster antitorsión y resistencia UV. Incluye acoples rápidos para caño y pistola pulverizadora regulable.',
    shortDescription: 'Largo 25 metros, 3 capas antinudos, incluye acoples y pistola de riego.',
    features: [
      'Resistente a presión de agua de hasta 10 bar',
      'Protección UV para uso continuo al aire libre',
      'Set completo listo para conectar al grifo'
    ],
    specifications: [
      { name: 'Longitud', value: '25 metros' },
      { name: 'Diámetro', value: '1/2 pulgada' }
    ],
    price: 79.00,
    originalPrice: 95.00,
    discountPercentage: 16,
    stock: 30,
    featured: true,
    isOnSale: true,
    isBestSeller: true,
    isNew: false,
    rating: 4.7,
    reviewCount: 29,
    unit: 'unidad',
    tags: ['manguera', 'tramontina', 'jardin', 'riego', 'pistola'],
    warranty: 'Garantía Tramontina',
    images: [
      {
        id: 'img-19-1',
        url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
        alt: 'Manguera Tramontina 25 metros',
        isPrimary: true
      }
    ]
  }
];
