import { Category } from "../models";

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    slug: "herramientas-electricas",
    name: "Herramientas Eléctricas",
    description:
      "Taladros, amoladoras, sierras, rotomartillos y lijadoras de alta potencia.",
    icon: "Zap",
    imageUrl:
      "https://media.falabella.com/sodimacPE/2953803_01/w=800,h=800,fit=pad",
    productCount: 42,
    featured: true,
  },
  {
    id: "cat-2",
    slug: "herramientas-manuales",
    name: "Herramientas Manuales",
    description:
      "Juegos de llaves, alicates, martillos, destornilladores y niveles de precisión.",
    icon: "Wrench",
    imageUrl:
      "https://imagedelivery.net/0tt38OLkrSmHRt7hdItWEA/01815110-27e7-4d9a-ce7b-804913688800/public",
    productCount: 68,
    featured: true,
  },
  {
    id: "cat-3",
    slug: "construccion-y-acabados",
    name: "Construcción y Fijaciones",
    description:
      "Tornillos, pernos, anclajes, cemento, adhesivos industriales y selladores.",
    icon: "Hammer",
    imageUrl:
      "https://tecnofijaciones.com/wp-content/uploads/2023/06/Tornillos-para-Madera-Producto.jpg",
    productCount: 95,
    featured: true,
  },
  {
    id: "cat-4",
    slug: "pinturas-y-quimicos",
    name: "Pinturas y Acabados",
    description:
      "Esmaltes, látex, anticorrosivos, brochas, rodillos, lijas y solventes.",
    icon: "Paintbrush",
    imageUrl:
      "https://ferreteriadinova.com/wp-content/uploads/2023/09/ESMALTE-FAST.jpeg",
    productCount: 38,
    featured: true,
  },
  {
    id: "cat-5",
    slug: "electricidad-e-iluminacion",
    name: "Electricidad e Iluminación",
    description:
      "Cables, llaves térmicas, tomacorrientes, reflectores LED y canaletas.",
    icon: "Lightbulb",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT71oOv9V4OmoFoIz8UqLkD79VRXQzkJGRTxlTbIDxGNn9AP1Ftm4yepDeG&s=10",
    productCount: 54,
    featured: true,
  },
  {
    id: "cat-6",
    slug: "gasfiteria-y-plomeria",
    name: "Gasfitería y Plomería",
    description:
      "Tuberías PVC, llaves de paso, pegamentos, griferías y bombas de agua.",
    icon: "Droplet",
    imageUrl: "https://www.efusion.com.uy/imgs/productos/_original_3076.jpg",
    productCount: 47,
    featured: true,
  },
  {
    id: "cat-7",
    slug: "seguridad-industrial",
    name: "Seguridad Industrial / EPP",
    description:
      "Cascos, guantes de nitrilo, lentes protectores, botas punta de acero y arneses.",
    icon: "Shield",
    imageUrl:
      "https://grupesac.pe/wp-content/uploads/2026/01/epps-antiguos.jpg",
    productCount: 31,
    featured: false,
  },
  {
    id: "cat-8",
    slug: "jardineria-y-exteriores",
    name: "Jardinería y Exteriores",
    description:
      "Mangueras, aspersores, tijeras podadoras, palas y carretillas.",
    icon: "Scissors",
    imageUrl: "https://ilabora.com/wp-content/uploads/2025/11/Imagen1.jpg",
    productCount: 29,
    featured: false,
  },
];
