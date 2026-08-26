<div align="center">
   <img src="docs/screenshots/hero-ferreteria-july.webp" alt="Ferretería July - landing page de catálogo y cotizaciones" width="100%">

# Ferretería July

**Landing page comercial para catálogo, promociones y cotizaciones por WhatsApp**

   <p>
      <a href="https://github.com/wanglingtech/LandingPage_Ferreteria"><img src="https://img.shields.io/badge/GitHub-Repositorio-181717?style=for-the-badge&logo=github" alt="Repositorio en GitHub"></a>
      <img src="https://img.shields.io/badge/Estado-Activo-16a34a?style=for-the-badge" alt="Estado activo">
      <img src="https://img.shields.io/badge/Licencia-MIT-f97316?style=for-the-badge" alt="Licencia MIT">
   </p>
</div>

## Descripción

Ferretería July es una **landing page moderna, responsive y orientada a conversión** para una ferretería peruana. Presenta la marca, sus categorías, productos destacados, ofertas y canales de contacto en una sola experiencia web.

Más que una página informativa, funciona como un catálogo interactivo: el visitante puede buscar productos, revisar detalles, guardar favoritos, armar un carrito y enviar una solicitud de cotización o pedido directamente por WhatsApp. El proyecto está preparado para evolucionar hacia una API y un sistema de inventario real.

> **Alcance actual:** frontend demostrativo con datos mock y persistencia local del navegador. No incluye todavía un backend productivo ni una base de datos conectada.

## Vista previa

Cuando agregues tus capturas a `docs/screenshots/`, puedes documentar cada vista así:

<div align="center">
   <img src="docs/screenshots/catalogo.webp" alt="Catálogo de productos de Ferretería July" width="48%">
   <img src="docs/screenshots/ofertas.webp" alt="Sección de ofertas de Ferretería July" width="48%">
   <br><br>
   <img src="docs/screenshots/carrito-whatsapp.webp" alt="Carrito y cotización por WhatsApp" width="48%">
   <img src="docs/screenshots/contacto.webp" alt="Sección de contacto de Ferretería July" width="48%">
</div>

Si todavía no tienes las imágenes, toma capturas de la aplicación en escritorio y móvil, guárdalas con esos nombres y súbelas al repositorio. Usa `webp` o `png`, un ancho aproximado de 1280 px y textos alternativos descriptivos.

## Funcionalidades

- Hero principal con llamadas a la acción para explorar el catálogo y solicitar precios.
- Catálogo con búsqueda, categorías, productos destacados y productos en oferta.
- Vista rápida y modal de detalle con especificaciones, precio, stock y reseñas.
- Carrito persistente con cálculo de cantidades, descuentos y total estimado.
- Generación de mensajes de consulta y pedido para WhatsApp.
- Favoritos persistentes en `localStorage`.
- Registro e inicio de sesión demostrativos para la experiencia de usuario.
- Secciones de beneficios, trayectoria, contacto, horarios y preguntas frecuentes.
- Diseño responsive, modo claro/oscuro y navegación móvil.
- SEO inicial con título, descripción, keywords y Open Graph en `index.html`.

## Tecnologías utilizadas

### Frontend

- **React 19** y **TypeScript** para la interfaz y el tipado.
- **Vite 6** para desarrollo local y compilación optimizada.
- **Tailwind CSS 4** para estilos responsive y tokens visuales.
- **Lucide React** para iconografía consistente.
- **Motion** para transiciones y animaciones de interfaz.

### Lenguajes y herramientas

- TypeScript, TSX, CSS y HTML5.
- Node.js y npm.
- Arquitectura por componentes con servicios y mocks separados.
- Preparación de endpoints REST en `src/services/api.config.ts` para una futura integración con backend.

## Arquitectura del proyecto

```text
.
├── assets/                 # Recursos visuales del proyecto
├── src/
│   ├── components/         # Layout, home, productos, carrito y autenticación
│   ├── config/             # Configuración de marca y contacto
│   ├── mocks/              # Banners, categorías, productos y reseñas de demostración
│   ├── models/             # Interfaces y tipos TypeScript
│   ├── services/           # Carrito, favoritos, autenticación, productos y toast
│   └── utils/              # Utilidades compartidas
├── index.html              # Metadatos SEO y punto de entrada
├── vite.config.ts          # Configuración de Vite y Tailwind
└── package.json            # Scripts y dependencias
```

## Requisitos

- Node.js 18 o superior.
- npm 9 o superior.
- Git.

## Instalación y ejecución local

```bash
git clone https://github.com/wanglingtech/LandingPage_Ferreteria.git
cd LandingPage_Ferreteria
npm install
npm run dev
```

Abre `http://localhost:3000` en el navegador. El servidor de Vite acepta conexiones externas gracias a la configuración `--host=0.0.0.0`.

### Scripts disponibles

```bash
npm run dev      # Inicia Vite en desarrollo
npm run lint     # Comprueba tipos TypeScript
npm run build    # Genera la versión de producción en dist/
npm run preview  # Sirve localmente la compilación de producción
```

## Configuración de datos

Los datos de contacto, enlaces sociales, horarios, moneda, beneficios y estadísticas se centralizan en [`src/config/site.config.ts`](src/config/site.config.ts). Antes de publicar, reemplaza los datos de ejemplo por los datos reales del negocio, especialmente teléfono, dirección, correo, WhatsApp y redes sociales.

Las imágenes de productos y banners de demostración están definidas en `src/mocks/`. Verifica que tengas permiso para usar imágenes de terceros o sustitúyelas por fotografías propias y optimizadas.

## Publicar gratis con un dominio público

La opción más sencilla para este proyecto es **Vercel**, porque detecta Vite automáticamente y entrega una URL pública gratuita como `tu-proyecto.vercel.app`.

### Opción recomendada: Vercel

1. Sube el proyecto a GitHub.
2. Crea una cuenta en [Vercel](https://vercel.com/) e inicia sesión con GitHub.
3. Pulsa **Add New Project** y selecciona este repositorio.
4. Confirma estos valores:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Pulsa **Deploy**.
6. En **Settings > Domains**, copia la URL pública gratuita o conecta un dominio propio.

Cada `push` a la rama configurada generará un nuevo despliegue automáticamente.

### Alternativa: Netlify

1. Entra a [Netlify](https://www.netlify.com/) y elige **Add new site > Import an existing project**.
2. Conecta GitHub y selecciona el repositorio.
3. Configura `npm run build` como comando de compilación y `dist` como directorio de publicación.
4. Publica el sitio y usa el subdominio gratuito `tu-sitio.netlify.app`.

Para una SPA con rutas internas, añade después un archivo `public/_redirects` con esta línea:

```text
/* /index.html 200
```

## Variables de entorno

La versión actual funciona con datos mock y no necesita variables de entorno para iniciar. Si se habilita una API o una integración con Gemini, copia `.env.example` a `.env.local`, completa únicamente las claves privadas en tu entorno de despliegue y nunca las subas a GitHub.

## Autor

<div align="center">
   <strong>WangLing Tech</strong><br>
   Desarrollador Full-Stack enfocado en productos web y soluciones empresariales

   <p>
      <a href="https://github.com/wanglingtech">GitHub</a> ·
      <a href="https://www.linkedin.com/in/kevin-villegas-solis-7b0038366/">LinkedIn</a> ·
      <a href="mailto:kevinvillegas.dev@gmail.com">Email</a>
   </p>
</div>

## Licencia

Este proyecto se distribuye bajo la [Licencia MIT](LICENSE).

<div align="center">
   Hecho con TypeScript, React y dedicación para Ferretería July.
</div>
