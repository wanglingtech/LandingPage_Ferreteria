import { ProductReview } from "../models";

export const MOCK_REVIEWS: ProductReview[] = [
  {
    id: "rev-1",
    productId: "prod-1",
    userId: "user-1",
    userName: "Carlos Mendoza",
    userAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    title: "Excelente taladro para trabajo pesado",
    comment:
      "Compré el kit con maletín y los accesorios son muy útiles. Tiene muy buen torque y perforó concreto sin ningún problema. La atención de Ferretería July fue de primera y llegó al día siguiente.",
    createdAt: "2026-08-10T14:30:00Z",
    verifiedPurchase: true,
  },
  {
    id: "rev-2",
    productId: "prod-1",
    userId: "user-2",
    userName: "Jorge Ramírez (Maestro de Obra)",
    userAvatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    title: "Relación calidad-precio inmejorable",
    comment:
      "La marca Bosch nunca falla. Muy buena ergonomía para largas jornadas y el selector de percutor responde de inmediato.",
    createdAt: "2026-08-14T09:15:00Z",
    verifiedPurchase: true,
  },
  {
    id: "rev-3",
    productId: "prod-2",
    userId: "user-3",
    userName: "Miguel Ángel Prado",
    userAvatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    title: "Muy potente y ergonómica",
    comment:
      "Corta fierros de construcción y perfiles metálicos como mantequilla. Se nota la durabilidad de los rodamientos DeWalt.",
    createdAt: "2026-08-05T18:20:00Z",
    verifiedPurchase: true,
  },
  {
    id: "rev-4",
    productId: "prod-3",
    userId: "user-4",
    userName: "Roberto Huamán",
    userAvatar:
      "https://www.epnewman.edu.pe/wp-content/uploads/sites/31/2025/09/En-que-ramas-de-la-Ingenieria-Ambiental-puedes-especializarte1.jpg",
    rating: 5,
    title: "Juego completísimo para taller mecánico",
    comment:
      "Los dados tienen muy buen acabado cromado y no se barren las cabezas de los pernos gracias al sistema Maxi-Drive.",
    createdAt: "2026-08-12T11:45:00Z",
    verifiedPurchase: true,
  },
  {
    id: "rev-5",
    productId: "prod-6",
    userId: "user-5",
    userName: "Ing. Fernando Valdivia",
    userAvatar:
      "https://usil-blog.s3.amazonaws.com/PROD/styles/large/public/blog/image/que-hace-un-ing-ambiental.jpg?itok=oT4Zj27z",
    rating: 5,
    title: "El mejor sellador para juntas de dilatación",
    comment:
      "Usamos Sikaflex 1A en toda la fachada de nuestro proyecto en Miraflores. Cero filtraciones con las lluvias.",
    createdAt: "2026-08-16T16:00:00Z",
    verifiedPurchase: true,
  },
];
