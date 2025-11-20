import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { HistoryMilestone } from '../types/index';

const HistoryTimeline = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const milestones: HistoryMilestone[] = [
  {
    id: '1',
    year: 1985,
    title: 'Fundación de la Institución',
    description: `La Institución Educativa No. 3 Santa Catalina de Siena abre sus puertas por primera vez, 
      iniciando su misión de brindar educación de calidad basada en valores cristianos y el carisma de 
      Santa Catalina de Siena.`,
    image: "https://images.unsplash.com/photo-1533672733900-29830f98a901",
    alt: 'Edificio histórico de ladrillo rojo con ventanas grandes y jardín frontal representando la fundación de la institución',
    category: 'foundation'
  },
  {
    id: '2',
    year: 1992,
    title: 'Primera Promoción de Bachilleres',
    description: `Celebramos con orgullo la graduación de nuestra primera promoción de bachilleres, 
      marcando un hito importante en la historia institucional y el inicio de nuestro legado educativo.`,
    image: "https://images.unsplash.com/photo-1733835085968-d586d44a31da",
    alt: 'Estudiantes en togas de graduación celebrando con birretes en el aire en ceremonia de grado',
    category: 'achievement'
  },
  {
    id: '3',
    year: 1998,
    title: 'Expansión de Infraestructura',
    description: `Ampliación significativa de nuestras instalaciones con la construcción de nuevas aulas, 
      laboratorios de ciencias y espacios deportivos para mejorar la experiencia educativa de nuestros estudiantes.`,
    image: "https://images.unsplash.com/photo-1659384898744-da32f6053b05",
    alt: 'Moderno edificio educativo con amplias ventanas y espacios verdes mostrando la expansión de infraestructura',
    category: 'expansion'
  },
  {
    id: '4',
    year: 2005,
    title: 'Certificación de Calidad Educativa',
    description: `Obtención de la certificación de calidad educativa por parte del Ministerio de Educación Nacional, 
      reconociendo nuestros altos estándares académicos y metodológicos.`,
    image: "https://images.unsplash.com/photo-1659270879286-9d0db301b770",
    alt: 'Diploma de certificación enmarcado junto a libros y elementos académicos representando reconocimiento educativo',
    category: 'achievement'
  },
  {
    id: '5',
    year: 2012,
    title: 'Implementación de Tecnología Educativa',
    description: `Incorporación de tecnologías de la información y comunicación en el proceso educativo, 
      incluyendo aulas digitales, plataformas virtuales y herramientas multimedia.`,
    image: "https://images.unsplash.com/photo-1653565685072-adcf967db6b7",
    alt: 'Aula moderna con computadores y pizarra digital donde estudiantes trabajan con tecnología educativa',
    category: 'innovation'
  },
  {
    id: '6',
    year: 2018,
    title: 'Programa de Bilingüismo',
    description: `Lanzamiento del programa de educación bilingüe español-inglés, fortaleciendo las competencias 
      comunicativas de nuestros estudiantes para un mundo globalizado.`,
    image: "https://images.unsplash.com/photo-1728404059702-259bae4265a6",
    alt: 'Estudiantes diversos en clase de idiomas con banderas internacionales y material didáctico bilingüe',
    category: 'innovation'
  },
  {
    id: '7',
    year: 2023,
    title: 'Campus Digital Santa Catalina',
    description: `Inauguración de nuestro campus digital, una plataforma integral que conecta a toda la comunidad 
      educativa y facilita el acceso a recursos, información y servicios institucionales.`,
    image: "https://images.unsplash.com/photo-1653566031295-af3f032e0350",
    alt: 'Pantalla de computador mostrando plataforma educativa digital con interfaz moderna y colorida',
    category: 'innovation'
  }];


  const categories = [
  { id: 'all', label: 'Todos', icon: 'Clock' },
  { id: 'foundation', label: 'Fundación', icon: 'Home' },
  { id: 'expansion', label: 'Expansión', icon: 'Building' },
  { id: 'achievement', label: 'Logros', icon: 'Award' },
  { id: 'innovation', label: 'Innovación', icon: 'Lightbulb' }];


  const filteredMilestones = selectedCategory === 'all' ?
  milestones :
  milestones.filter((milestone) => milestone.category === selectedCategory);

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
            Nuestra Historia
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Un recorrido por los momentos más significativos que han marcado el crecimiento y 
            desarrollo de nuestra institución a lo largo de los años.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) =>
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-all duration-normal ${
              selectedCategory === category.id ?
              'bg-primary text-white shadow-md' :
              'bg-white text-text-primary hover:bg-primary/10 hover:text-primary'}`
              }>

                <Icon name={category.icon} size={16} />
                <span>{category.label}</span>
              </button>
            )}
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {filteredMilestones.map((milestone, index) =>
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center mb-12 ${
            index % 2 === 1 ? 'md:flex-row-reverse' : ''}`
            }>

              {/* Timeline Line */}
              <div className="hidden md:flex flex-col items-center mx-8">
                <div className="w-4 h-4 bg-primary rounded-full mb-2"></div>
                {index < filteredMilestones.length - 1 &&
              <div className="w-0.5 h-24 bg-primary/30"></div>
              }
              </div>

              {/* Content */}
              <div className={`flex-1 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                <div className="bg-white rounded-xl shadow-institutional p-6 hover-lift">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary text-white rounded-lg px-3 py-1 text-sm font-body font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-institutional mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-text-primary font-body leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className={`flex-1 mt-6 md:mt-0 ${index % 2 === 1 ? 'md:mr-8' : 'md:ml-8'}`}>
                <div className="relative overflow-hidden rounded-xl shadow-md">
                  <Image
                  src={milestone.image}
                  alt={milestone.alt}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-normal" />

                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default HistoryTimeline;