import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection.tsx';
import MissionVisionSection from './components/MissionVisionSection.tsx';
import ValuesSection from './components/ValuesSection.tsx';
import HistoryTimeline from './components/HistoryTimeline.tsx';
import LeadershipTeam from './components/LeadershipTeam.tsx';
import AlumniSuccess from './components/AlumniSuccess.tsx';
import PartnershipsSection from './components/PartnershipsSection.tsx';
import DocumentsSection from './components/DocumentsSection.tsx';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Nosotros - Institución Educativa No. 3 Santa Catalina de Siena</title>
        <meta 
          name="description" 
          content="Conoce la historia, misión, visión y valores de la Institución Educativa No. 3 Santa Catalina de Siena. Excelencia educativa arraigada en valores atemporales con enfoque visionario." 
        />
        <meta 
          name="keywords" 
          content="Santa Catalina de Siena, institución educativa, misión, visión, valores, historia, equipo directivo, excelencia académica" 
        />
        <meta property="og:title" content="Nosotros - Santa Catalina de Siena Digital Campus" />
        <meta 
          property="og:description" 
          content="Descubre nuestra identidad institucional, historia y compromiso con la formación integral de estudiantes basada en respeto, responsabilidad y justicia." 
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Mission, Vision & Hymn */}
          <MissionVisionSection />

          {/* Institutional Values */}
          <ValuesSection />

          {/* Interactive History Timeline */}
          <HistoryTimeline />

          {/* Leadership Team */}
          <LeadershipTeam />

          {/* Alumni Success Stories */}
          <AlumniSuccess />

          {/* Strategic Partnerships */}
          <PartnershipsSection />

          {/* Institutional Documents */}
          <DocumentsSection />
        </main>

        {/* Footer */}
        <footer className="bg-institutional text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-heading font-bold mb-4">
                  Santa Catalina de Siena
                </h3>
                <p className="text-sm font-body opacity-90 leading-relaxed">
                  Institución Educativa No. 3 comprometida con la excelencia académica 
                  y la formación integral basada en valores.
                </p>
              </div>
              <div>
                <h4 className="font-heading font-bold mb-4">Navegación</h4>
                <ul className="space-y-2 text-sm font-body">
                  <li><a href="/homepage" className="hover:text-accent transition-colors">Inicio</a></li>
                  <li><a href="/about" className="hover:text-accent transition-colors">Nosotros</a></li>
                  <li><a href="/resource-library" className="hover:text-accent transition-colors">Recursos</a></li>
                  <li><a href="/academic-calendar" className="hover:text-accent transition-colors">Calendario</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold mb-4">Servicios</h4>
                <ul className="space-y-2 text-sm font-body">
                  <li><a href="/news-and-events" className="hover:text-accent transition-colors">Noticias</a></li>
                  <li><a href="/contact-and-services" className="hover:text-accent transition-colors">Contacto</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Admisiones</a></li>
                  <li><a href="#" className="hover:text-accent transition-colors">Biblioteca</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold mb-4">Contacto</h4>
                <div className="space-y-2 text-sm font-body">
                  <p>Calle 45 #23-67</p>
                  <p>Bogotá, Colombia</p>
                  <p>Tel: (601) 234-5678</p>
                  <p>info@santacatalina.edu.co</p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center">
              <p className="text-sm font-body opacity-75">
                © {new Date()?.getFullYear()} Institución Educativa No. 3 Santa Catalina de Siena. 
                Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutPage;