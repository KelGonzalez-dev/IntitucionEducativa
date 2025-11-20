import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header.tsx';
import HeroSection from './components/HeroSection.tsx';
import NewsCarousel from './components/NewsCarousel.tsx';
import StatsSection from './components/StatsSection.tsx';
import SocialProofSection from './components/SocialProofSection.tsx';
import CampusHighlights from './components/CampusHighlights.tsx';
import QuickAccessSection from './components/QuickAccessSection.tsx';
import {
  HeroSection as HeroSectionType,
  NewsItem,
  StatItem,
  AwardItem,
  CampusHighlight,
  QuickAccessItem
} from './types/index';

const Homepage = () => {
  // Hero Section Data
  const heroData: HeroSectionType = {
    title: "Institución Educativa Santa Catalina de Siena No. 3",
    logo: "/images/logo.jpg",
    logoAlt: "Logo Santa Catalina de Siena No. 3",
    logoWidth: 100,
    logoHeight: 100,
    logoColor: "#000000",
    logoBackgroundColor: "#ffffff",
    logoBorderRadius: 10,
    logoBorderColor: "#000000",
    logoBorderWidth: 1,
    logoBorderStyle: "solid",
    description: "Formando líderes del mañana con valores de respeto, responsabilidad y justicia. Una educación integral que honra la tradición mientras abraza la innovación.",
    videoUrl: "https://www.youtube.com/embed/SRXylS98yXI?autoplay=1&mute=1&controls=1&rel=0&loop=1&playlist=SRXylS98yXI",
    ctaButtons: [
      {
        id: "1",
        label: "Conoce Nuestras Sedes",
        variant: "default",
        icon: "Building",
        href: "/about"
      },
      {
        id: "2",
        label: "Agendar Visita",
        variant: "outline",
        icon: "Calendar",
        href: "/contact-and-services"
      }
    ]
  };

  // News Items Data (overridable via admin/localStorage)
  const defaultNews: NewsItem[] = [
    {
      id: "1",
      title: "Estudiantes de Santa Catalina Ganan Concurso Nacional de Ciencias",
      excerpt: "Nuestros estudiantes de grado 11 obtuvieron el primer lugar en el Concurso Nacional de Ciencias con su proyecto sobre energías renovables, demostrando una vez más la excelencia académica de nuestra institución.",
      date: "15 de Noviembre, 2024",
      category: "Logros Académicos",
      image: "https://images.unsplash.com/photo-1622016579436-14c1844c99ec",
      alt: "Estudiantes sonrientes en laboratorio de ciencias sosteniendo premio y proyecto de energía solar",
      href: "/news-and-events"
    },
    {
      id: "2",
      title: "Nueva Biblioteca Digital Disponible para Toda la Comunidad",
      excerpt: "Inauguramos nuestra moderna biblioteca digital con más de 10,000 recursos educativos, disponible 24/7 para estudiantes, padres y docentes de todas nuestras sedes.",
      date: "8 de Noviembre, 2024",
      category: "Infraestructura",
      image: "https://images.unsplash.com/photo-1731200302303-251e476a756a",
      alt: "Moderna biblioteca con computadores y estudiantes estudiando en ambiente tecnológico",
      href: "/news-and-events"
    },
    {
      id: "3",
      title: "Festival Cultural Santa Catalina 2024: Un Éxito Total",
      excerpt: "Más de 500 familias participaron en nuestro festival cultural anual, celebrando la diversidad y el talento de nuestra comunidad educativa con presentaciones artísticas y gastronómicas.",
      date: "2 de Noviembre, 2024",
      category: "Eventos",
      image: "https://images.unsplash.com/photo-1643616965521-e44f8f501751",
      alt: "Niños en trajes tradicionales colombianos bailando en escenario durante festival escolar",
      href: "/news-and-events"
    }
  ];

  // Statistics Data
  const stats: StatItem[] = [
    {
      id: "1",
      value: "2,450",
      label: "Estudiantes Activos",
      icon: "Users",
      description: "Estudiantes matriculados en todas nuestras sedes"
    },
    {
      id: "2",
      value: "98%",
      label: "Tasa de Graduación",
      icon: "GraduationCap",
      description: "Estudiantes que completan exitosamente sus estudios"
    },
    {
      id: "3",
      value: "150+",
      label: "Docentes Certificados",
      icon: "BookOpen",
      description: "Profesionales comprometidos con la excelencia"
    },
    {
      id: "4",
      value: "25",
      label: "Años de Experiencia",
      icon: "Award",
      description: "Décadas formando líderes del mañana"
    }
  ];

  // Awards Data
  const awards: AwardItem[] = [
    {
      id: "1",
      title: "Mejor Institución Educativa Regional 2024",
      description: "Reconocimiento otorgado por la Secretaría de Educación por nuestros altos estándares académicos y compromiso con la comunidad.",
      year: "2024",
      image: "https://images.unsplash.com/photo-1637203725059-53f993d6ae02",
      alt: "Trofeo dorado sobre pedestal con placa de reconocimiento educativo",
      category: "Excelencia Académica"
    },
    {
      id: "2",
      title: "Premio Nacional de Innovación Educativa",
      description: "Galardón nacional por la implementación exitosa de metodologías innovadoras y uso de tecnología en el aula.",
      year: "2023",
      image: "https://images.unsplash.com/photo-1613826488249-b67eba609bed",
      alt: "Medalla de oro con cinta azul sobre fondo de tecnología educativa",
      category: "Innovación"
    },
    {
      id: "3",
      title: "Certificación ISO 9001 en Calidad Educativa",
      description: "Certificación internacional que avala nuestros procesos de gestión de calidad y mejora continua en la educación.",
      year: "2023",
      image: "https://images.unsplash.com/photo-1662991831604-94b0e67b94c4",
      alt: "Certificado oficial ISO 9001 enmarcado en pared de oficina administrativa",
      category: "Calidad"
    }
  ];

  // Campus Highlights Data
  const campuses: CampusHighlight[] = [
    {
      id: "1",
      name: "Sede Leyda Garrido",
      description: "Nuestra sede principal cuenta con instalaciones modernas y espacios diseñados para el aprendizaje integral de nuestros estudiantes.",
      image: "https://images.unsplash.com/photo-1598209425765-88904e4a02f3",
      alt: "Edificio escolar moderno de tres pisos con fachada blanca y ventanas grandes, jardines frontales",
      features: [
        "Laboratorios de ciencias completamente equipados",
        "Biblioteca con más de 5,000 volúmenes",
        "Aulas inteligentes con tecnología digital",
        "Espacios deportivos y recreativos"
      ]
    },
    {
      id: "2",
      name: "Sede San José",
      description: "Campus especializado en educación primaria con enfoque en el desarrollo de habilidades fundamentales y valores institucionales.",
      image: "https://images.unsplash.com/photo-1735214548468-17b62b0bf4df",
      alt: "Patio escolar colorido con juegos infantiles y niños jugando bajo árboles frondosos",
      features: [
        "Aulas adaptadas para educación primaria",
        "Zona de juegos segura y supervisada",
        "Comedor escolar con menús balanceados",
        "Enfermería y atención psicopedagógica"
      ]
    },
    {
      id: "3",
      name: "Sede María Eugenia",
      description: "Sede enfocada en bachillerato con programas académicos avanzados y preparación para la educación superior.",
      image: "https://images.unsplash.com/photo-1617755403929-beee5daffbed",
      alt: "Estudiantes adolescentes en uniforme caminando por corredor escolar moderno con lockers",
      features: [
        "Laboratorio de informática avanzado",
        "Salón de artes y música",
        "Biblioteca especializada en bachillerato",
        "Orientación vocacional y universitaria"
      ]
    }
  ];

  // Quick Access Items Data
  const quickAccessItems: QuickAccessItem[] = [
    {
      id: "1",
      title: "Recursos Educativos",
      description: "Accede a materiales, documentos y recursos académicos",
      icon: "BookOpen",
      href: "/resource-library",
      color: "border-blue-500"
    },
    {
      id: "2",
      title: "Calendario Académico",
      description: "Consulta fechas importantes y eventos escolares",
      icon: "Calendar",
      href: "/academic-calendar",
      color: "border-green-500"
    },
    {
      id: "3",
      title: "Noticias y Eventos",
      description: "Mantente informado sobre las últimas novedades",
      icon: "Newspaper",
      href: "/news-and-events",
      color: "border-purple-500"
    },
    {
      id: "4",
      title: "Contacto y Servicios",
      description: "Comunícate con nosotros y conoce nuestros servicios",
      icon: "Phone",
      href: "/contact-and-services",
      color: "border-red-500"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Santa Catalina de Siena - Institución Educativa No. 3 | Inicio</title>
        <meta name="description" content="Institución Educativa Santa Catalina de Siena - Formando líderes del mañana con valores de respeto, responsabilidad y justicia. Educación integral de calidad." />
        <meta name="keywords" content="educación, colegio, Santa Catalina, institución educativa, Colombia, formación integral, valores" />
        <meta property="og:title" content="Santa Catalina de Siena - Institución Educativa" />
        <meta property="og:description" content="Formando líderes del mañana con valores de respeto, responsabilidad y justicia" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/homepage" />
        <link rel="icon" type="image/jpeg" href="/images/logo.jpg" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection heroData={heroData} />

          {/* Featured News Carousel */}
          <NewsCarousel newsItems={(() => {
            const raw = localStorage.getItem('ie3_news_items');
            if (raw) {
                try {
                  const parsed = JSON.parse(raw) as NewsItem[];
                  if (Array.isArray(parsed) && parsed.length) return parsed;
                } catch {}
            }
            return defaultNews;
          })()} />

          {/* Statistics Section */}
          <StatsSection stats={stats} />

          {/* Campus Highlights */}
          <CampusHighlights campuses={campuses} />

          {/* Social Proof Section */}
          <SocialProofSection awards={awards} />

          {/* Quick Access Section */}
          <QuickAccessSection quickAccessItems={quickAccessItems} />
        </main>

        {/* Footer */}
        <footer className="bg-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Institution Info */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">
                  Santa Catalina de Siena
                </h3>
                <p className="text-white/80 mb-4">
                  Institución Educativa No. 3 comprometida con la formación integral
                  de nuestros estudiantes basada en valores de respeto, responsabilidad y justicia.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Enlaces Rápidos</h3>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-white/80 hover:text-white transition-colors">Nosotros</a></li>
                  <li><a href="/resource-library" className="text-white/80 hover:text-white transition-colors">Recursos</a></li>
                  <li><a href="/academic-calendar" className="text-white/80 hover:text-white transition-colors">Calendario</a></li>
                  <li><a href="/contact-and-services" className="text-white/80 hover:text-white transition-colors">Contacto</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Contacto</h3>
                <div className="space-y-2 text-white/80">
                  <p>📧 info@santacatalina.edu.co</p>
                  <p>📞 +57 (1) 234-5678</p>
                  <p>📍 Bogotá, Colombia</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 mt-8 pt-8 text-center">
              <p className="text-white/80">
                © {new Date().getFullYear()} Institución Educativa Santa Catalina de Siena. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;