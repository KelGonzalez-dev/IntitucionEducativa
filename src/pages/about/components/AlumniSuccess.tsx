import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { AlumniStory } from '../types/index';

const AlumniSuccess = () => {
  const alumniStories: AlumniStory[] = [
  {
    id: '1',
    name: 'Dr. Alejandra Morales',
    graduationYear: 2008,
    currentPosition: 'Médica Especialista en Pediatría',
    company: 'Hospital Universitario San Ignacio',
    image: "https://images.unsplash.com/photo-1659353887233-05d1180eb691",
    alt: 'Doctora joven con bata blanca y estetoscopio sonriendo en hospital moderno',
    story: `Mi paso por Santa Catalina de Siena fue fundamental en mi formación como persona y profesional. 
      Los valores de respeto, responsabilidad y justicia que aprendí aquí me han guiado en mi carrera médica, 
      especialmente en mi trabajo con niños y familias vulnerables.`,
    achievement: 'Reconocimiento Nacional por Investigación en Pediatría Social'
  },
  {
    id: '2',
    name: 'Ing. Miguel Ángel Torres',
    graduationYear: 2010,
    currentPosition: 'Ingeniero de Software Senior',
    company: 'Google Colombia',
    image: "https://images.unsplash.com/photo-1705579607707-717fb965145f",
    alt: 'Ingeniero joven con camisa casual trabajando en oficina moderna con múltiples monitores',
    story: `La educación integral que recibí en Santa Catalina me preparó no solo académicamente, sino también 
      en valores y liderazgo. Hoy trabajo en una de las empresas tecnológicas más importantes del mundo, 
      pero nunca olvido las bases sólidas que recibí en mi colegio.`,
    achievement: 'Líder de Equipo en Proyecto de Inteligencia Artificial para Educación'
  },
  {
    id: '3',
    name: 'Lic. Carolina Vásquez',
    graduationYear: 2012,
    currentPosition: 'Directora de ONG Educativa',
    company: 'Fundación Educación para Todos',
    image: "https://images.unsplash.com/photo-1650784854056-49d8dd709fff",
    alt: 'Mujer profesional con blazer sonriendo en oficina con libros y materiales educativos',
    story: `Santa Catalina de Siena despertó en mí la pasión por la educación y el servicio social. 
      Hoy dirijo una fundación que lleva educación de calidad a comunidades rurales, aplicando los mismos 
      principios de justicia y responsabilidad que aprendí en mi institución.`,
    achievement: 'Premio Nacional de Innovación Social en Educación 2023'
  }];


  return (
    <section className="py-16 bg-canvas">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12">

          <h2 className="text-3xl md:text-4xl font-heading font-bold text-institutional mb-4">
            Historias de Éxito
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Nuestros egresados son el testimonio vivo del impacto transformador de la educación 
            que brindamos. Sus logros profesionales y contribuciones sociales reflejan los valores 
            y la excelencia académica de nuestra institución.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {alumniStories.map((story, index) =>
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-institutional p-6 hover-lift">

              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                  src={story.image}
                  alt={story.alt}
                  className="w-full h-full object-cover" />

                </div>
                <h3 className="text-xl font-heading font-bold text-institutional mb-2">
                  {story.name}
                </h3>
                <p className="text-primary font-body font-medium mb-1">
                  {story.currentPosition}
                </p>
                <p className="text-text-secondary text-sm font-body mb-2">
                  {story.company}
                </p>
                <div className="flex items-center justify-center text-sm text-text-secondary">
                  <Icon name="GraduationCap" size={14} className="mr-1" />
                  <span>Promoción {story.graduationYear}</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-text-primary font-body leading-relaxed italic">
                  "{story.story}"
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-start space-x-2">
                  <Icon name="Award" size={16} className="text-accent mt-1 flex-shrink-0" />
                  <p className="text-sm text-text-secondary font-body">
                    <strong>Logro destacado:</strong> {story.achievement}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-institutional p-8">

          <h3 className="text-2xl font-heading font-bold text-institutional text-center mb-8">
            Impacto de Nuestros Egresados
          </h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-heading font-bold text-primary">2,500+</div>
              <p className="text-text-secondary font-body">Egresados Graduados</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-heading font-bold text-primary">85%</div>
              <p className="text-text-secondary font-body">Acceso a Educación Superior</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-heading font-bold text-primary">150+</div>
              <p className="text-text-secondary font-body">Profesionales Destacados</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-heading font-bold text-primary">25+</div>
              <p className="text-text-secondary font-body">Líderes Comunitarios</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default AlumniSuccess;