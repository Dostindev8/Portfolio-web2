/**
 * Sistema de proyectos — fuente única de verdad.
 *
 * Para agregar un proyecto nuevo:
 * 1. Crear carpeta /public/projects/<slug>/ con cover.png|webp (optimizada, <500KB)
 * 2. Agregar un objeto al array `projects` con `links.demo` (URL en vivo)
 * 3. La card del grid abre el demo externo — sin páginas internas
 */

export type ProjectCategory =
  | "ecommerce"
  | "saas"
  | "fiscal"
  | "marketplace"
  | "agency"
  | "api";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  taglineEn: string;
  taglineIt?: string;
  description: string;
  descriptionEn: string;
  descriptionIt?: string;
  category: ProjectCategory;
  role: string;
  year: string;
  accentColor: string;
  stack: string[];
  features: string[];
  featuresEn: string[];
  featuresIt?: string[];
  coverImage: string;
  gallery: string[];
  links?: { demo?: string; github?: string; whatsapp?: string };
}

export function localizeProject(project: Project, locale: string) {
  const isEn = locale === "en";
  const isIt = locale === "it";
  return {
    ...project,
    tagline: isEn
      ? project.taglineEn
      : isIt
        ? project.taglineIt || project.tagline
        : project.tagline,
    description: isEn
      ? project.descriptionEn
      : isIt
        ? project.descriptionIt || project.description
        : project.description,
    features: isEn
      ? project.featuresEn
      : isIt
        ? project.featuresIt || project.features
        : project.features,
  };
}

/** Tiny SVG blur placeholder (gray) — avoids CLS while loading */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjEyNjJEIi8+PC9zdmc+";

export const projects: Project[] = [
  {
    slug: "vapingchiller",
    name: "VapingChiller",
    tagline: "El mejor vapeo, en un solo lugar.",
    taglineEn: "The best vape experience, in one place.",
    description:
      "Tienda en línea de productos de vapeo con catálogo de productos premium, sistema de compra fácil y segura, chatbot de asistencia con IA (Chiller Bot), gestión de marcas (Puff, Nubo, Cuzoo, Smok, Betta Ice, Alyamar), diseño oscuro con acentos morados y estética urbana/streetwear.",
    descriptionEn:
      "Online vape store with a premium catalog, easy and secure checkout, AI support chatbot (Chiller Bot), brand management (Puff, Nubo, Cuzoo, Smok, Betta Ice, Alyamar), and a dark urban/streetwear design with neon purple accents.",
    category: "ecommerce",
    role: "Fullstack Developer (LCS)",
    year: "2024–2025",
    accentColor: "#8B5CF6",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "Catálogo de productos destacados y navegación por categorías",
      "Login/registro y carrito de compra",
      "Chatbot de asistencia con IA (Chiller Bot)",
      "Integración con Instagram y branding streetwear",
      "Envíos rápidos y garantía de productos originales",
      "Marcas: Puff, Nubo, Cuzoo, Smok, Betta Ice, Alyamar",
    ],
    featuresEn: [
      "Featured product catalog and category navigation",
      "Login/register and shopping cart",
      "AI support chatbot (Chiller Bot)",
      "Instagram integration and streetwear branding",
      "Fast shipping and original-product guarantee",
      "Brands: Puff, Nubo, Cuzoo, Smok, Betta Ice, Alyamar",
    ],
    coverImage: "/projects/vapingchiller/cover.png",
    gallery: ["/projects/vapingchiller/cover.png"],
    links: { demo: "https://www.vapingchiller.com/" },
  },
  {
    slug: "logic-code-spot",
    name: "Logic Code Spot",
    tagline: "No hacemos páginas web. Desarrollamos experiencias.",
    taglineEn: "We don't just make websites. We build experiences.",
    taglineIt: "Non facciamo semplici siti web. Sviluppiamo esperienze.",
    description:
      "Marca y plataforma de servicios de Logic Code Spot Software Solutions — soluciones digitales inteligentes que automatizan, protegen y hacen crecer negocios dominicanos. Incluye dashboards de ejemplo (ventas, clientes, facturas) mostrando el nivel de producto que LCS entrega a sus clientes. Identidad Hecho en RD.",
    descriptionEn:
      "Brand and services platform for Logic Code Spot Software Solutions — intelligent digital solutions that automate, protect and grow Dominican businesses. Includes sample dashboards (sales, clients, invoices) showing the product quality LCS delivers. Made in DR identity.",
    descriptionIt:
      "Brand e piattaforma di servizi di Logic Code Spot Software Solutions — soluzioni digitali intelligenti che automatizzano, proteggono e fanno crescere le imprese dominicaniane. Include dashboard di esempio e identità Hecho en RD.",
    category: "agency",
    role: "Founder, CEO & Lead Developer",
    year: "2024–Presente",
    accentColor: "#00E0B8",
    stack: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "Framer Motion"],
    features: [
      "Automatizaciones que ahorran tiempo y reducen errores",
      "Interfaces modernas con efectos que convierten",
      "Seguridad informática y protección de datos",
      "Dashboards con métricas en tiempo real (ventas, clientes, facturas)",
      "Identidad Hecho en RD",
      "CTA y landing de marca para captación de clientes",
    ],
    featuresEn: [
      "Automations that save time and reduce errors",
      "Modern interfaces with converting effects",
      "Cybersecurity and data protection",
      "Real-time dashboards (sales, clients, invoices)",
      "Made in DR identity",
      "Brand landing and CTAs for client acquisition",
    ],
    coverImage: "/projects/logic-code-spot/cover.png",
    gallery: [
      "/projects/logic-code-spot/cover.png",
      "/projects/logic-code-spot/dashboard-preview.png",
      "/projects/logic-code-spot/gallery-1.png",
    ],
    links: { demo: "https://logic-codespot-com.vercel.app/" },
  },
  {
    slug: "factp",
    name: "FactP",
    tagline: "Tu sistema de facturación online. Todo en 1. Automatizado.",
    taglineEn: "Your online invoicing system. All-in-one. Automated.",
    description:
      "Plataforma de facturación electrónica 100% en la nube, alineada con los requisitos de la DGII de República Dominicana. Genera comprobantes fiscales electrónicos (e-CF) con código QR, autorizados por la DGII, con impresión térmica directa y módulos integrados de inventario, nómina, RRHH y multi-sucursal.",
    descriptionEn:
      "100% cloud electronic invoicing platform aligned with Dominican Republic DGII requirements. Generates electronic fiscal receipts (e-CF) with QR codes, DGII authorization, thermal printing, plus integrated inventory, payroll, HR and multi-branch modules.",
    category: "fiscal",
    role: "Fullstack Developer — arquitectura y desarrollo completo",
    year: "2024–2025",
    accentColor: "#3B82F6",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "JWT", "Barcode"],
    features: [
      "Escaneo de productos por código de barras",
      "Gestión de roles (Admin, Ventas, Caja, Almacén)",
      "Dashboard de ingresos en tiempo real",
      "Nómina automatizada (sueldos, deducciones, impuestos)",
      "RRHH: empleados, contratos, vacaciones, permisos",
      "Inventario inteligente con alertas de stock bajo",
      "Reportes avanzados (ventas, compras, impuestos)",
      "Multi-sucursal y multi-almacén + e-CF con QR DGII",
    ],
    featuresEn: [
      "Barcode product scanning",
      "Role management (Admin, Sales, Cashier, Warehouse)",
      "Real-time income dashboard",
      "Automated payroll (salaries, deductions, taxes)",
      "HR: employees, contracts, vacations, permits",
      "Smart inventory with low-stock alerts",
      "Advanced reports (sales, purchases, taxes)",
      "Multi-branch / multi-warehouse + e-CF with DGII QR",
    ],
    coverImage: "/projects/factp/cover.png",
    gallery: ["/projects/factp/cover.png"],
    links: {},
  },
  {
    slug: "vendelette",
    name: "Vendelette",
    tagline: "Véndeles lo que sea. Publica, conecta y vende más fácil que nunca.",
    taglineEn: "Sell them anything. Post, connect and sell easier than ever.",
    description:
      "La plataforma de marketplace dominicana para publicar, conectar y vender — rifas, servicios, anuncios y más, en un solo lugar, con alcance a nivel nacional.",
    descriptionEn:
      "The Dominican marketplace platform to publish, connect and sell — raffles, services, ads and more in one place, with nationwide reach.",
    category: "marketplace",
    role: "Fullstack Developer",
    year: "2024–2025",
    accentColor: "#DC2626",
    stack: ["Next.js", "React", "Node.js", "MongoDB", "WhatsApp API", "Tailwind CSS"],
    features: [
      "Categorías: Rifas, Servicios, Anuncios, Otros",
      "Publicaciones destacadas con badges por tipo",
      "Transacciones seguras",
      "Alcance a nivel nacional (RD)",
      "Soporte rápido y confiable vía WhatsApp",
      "Web y móvil totalmente responsive",
    ],
    featuresEn: [
      "Categories: Raffles, Services, Ads, Other",
      "Featured listings with type badges",
      "Secure transactions",
      "Nationwide reach (DR)",
      "Fast reliable WhatsApp support",
      "Fully responsive web and mobile",
    ],
    coverImage: "/projects/vendelette/cover.png",
    gallery: ["/projects/vendelette/cover.png"],
    links: { demo: "https://vendelette.vercel.app/" },
  },
  {
    slug: "goprize",
    name: "GoPrize.SDQ",
    tagline: "Plataforma premium de rifas con animaciones 3D.",
    taglineEn: "Premium raffle platform with 3D animations.",
    description:
      "Plataforma de rifas con experiencia premium, animaciones 3D CSS, glassmorphism, selección automática de ganador vía Cron Jobs y notificaciones por WhatsApp y email.",
    descriptionEn:
      "Raffle platform with premium UX, 3D CSS animations, glassmorphism, automatic winner selection via Cron Jobs, and WhatsApp/email notifications.",
    category: "saas",
    role: "Lead Developer",
    year: "2024–2025",
    accentColor: "#C9A227",
    stack: ["MERN", "WhatsApp API", "Cron Jobs", "3D CSS", "JWT"],
    features: [
      "Splash screen animado y landing glassmorphism",
      "Tarjetas holográficas 3D",
      "Selección automática de ganador vía Cron Jobs",
      "Notificaciones por WhatsApp y email",
      "Autenticación JWT",
    ],
    featuresEn: [
      "Animated splash and glassmorphism landing",
      "Holographic 3D cards",
      "Automatic winner selection via Cron Jobs",
      "WhatsApp and email notifications",
      "JWT authentication",
    ],
    coverImage: "/projects/goprize/cover.png",
    gallery: [
      "/projects/goprize/cover.png",
      "/projects/goprize/logo.png",
    ],
    links: { demo: "https://goprizesdqcom.vercel.app/" },
  },
  {
    slug: "fashion-store",
    name: "Fashion Store",
    tagline: "E-commerce completo con checkout dual y cupones.",
    taglineEn: "Full e-commerce with dual checkout and coupons.",
    description:
      "Tienda online con catálogo, carrito, wishlist, motor de cupones/descuentos, checkout dual (PayPal + transferencia), calculadora de envío por provincia y dashboard admin con analíticas de venta.",
    descriptionEn:
      "Online store with catalog, cart, wishlist, coupon engine, dual checkout (PayPal + bank transfer), province shipping calculator and admin dashboard with sales analytics.",
    category: "ecommerce",
    role: "Fullstack Developer",
    year: "2024–2025",
    accentColor: "#EC4899",
    stack: ["React", "Node.js", "Express", "MongoDB", "Resend", "PayPal", "JWT"],
    features: [
      "Catálogo, carrito y wishlist",
      "Motor de cupones y descuentos",
      "Checkout PayPal + transferencia bancaria",
      "Calculadora de envío por provincia",
      "Emails de confirmación (Resend)",
      "Dashboard admin con analíticas de venta",
    ],
    featuresEn: [
      "Catalog, cart and wishlist",
      "Coupon and discount engine",
      "PayPal + bank transfer checkout",
      "Province-based shipping calculator",
      "Confirmation emails (Resend)",
      "Admin dashboard with sales analytics",
    ],
    // TODO: reemplazar asset con cover real de Fashion Store cuando esté disponible
    coverImage: "/projects/fashion-store/cover.png",
    gallery: ["/projects/fashion-store/cover.png"],
    links: {},
  },
  {
    slug: "university-api",
    name: "University REST API",
    tagline: "Backend académico en C# / ASP.NET Core.",
    taglineEn: "Academic backend in C# / ASP.NET Core.",
    description:
      "API REST universitaria con CRUD completo para profesores, estudiantes, cursos, matrículas y calificaciones; autenticación JWT, autorización por rol, Entity Framework, SQL Server y documentación Swagger.",
    descriptionEn:
      "University REST API with full CRUD for teachers, students, courses, enrollments and grades; JWT auth, role-based authorization, Entity Framework, SQL Server and Swagger docs.",
    category: "api",
    role: "Backend Developer",
    year: "2024",
    accentColor: "#6366F1",
    stack: ["C#", "ASP.NET Core", "SQL Server", "EF Core", "Swagger", "JWT"],
    features: [
      "CRUD: profesores, estudiantes, cursos, matrículas y calificaciones",
      "Entity Framework + SQL Server",
      "Documentación Swagger",
      "JWT y autorización por rol",
    ],
    featuresEn: [
      "CRUD: teachers, students, courses, enrollments and grades",
      "Entity Framework + SQL Server",
      "Swagger documentation",
      "JWT and role-based authorization",
    ],
    // TODO: reemplazar asset con cover real de University API cuando esté disponible
    coverImage: "/projects/university-api/cover.png",
    gallery: ["/projects/university-api/cover.png"],
    links: {},
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categoryLabels: Record<
  ProjectCategory,
  { es: string; en: string; it: string }
> = {
  ecommerce: { es: "E-commerce", en: "E-commerce", it: "E-commerce" },
  saas: { es: "SaaS", en: "SaaS", it: "SaaS" },
  fiscal: { es: "Fiscal / DGII", en: "Fiscal / DGII", it: "Fiscale / DGII" },
  marketplace: { es: "Marketplace", en: "Marketplace", it: "Marketplace" },
  agency: { es: "Agencia", en: "Agency", it: "Agenzia" },
  api: { es: "API / Backend", en: "API / Backend", it: "API / Backend" },
};

/** Map filter chips → project categories */
export const filterToCategories: Record<string, ProjectCategory[] | "all"> = {
  all: "all",
  web: ["agency", "api"],
  ecommerce: ["ecommerce", "marketplace"],
  saas: ["saas"],
  systems: ["fiscal", "saas"],
};
