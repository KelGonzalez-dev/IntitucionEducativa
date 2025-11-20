import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { Partnership } from '../types/index';

const PartnershipsSection = () => {
  const partnerships: Partnership[] = [
  {
    id: '1',
    name: 'Universidad Nacional de Colombia',
    type: 'university',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_17679362e-1762433109261.png",
    alt: 'Logo de universidad con edificio académico clásico y escudo institucional',
    description: `Convenio de articulación académica que permite a nuestros estudiantes acceder a programas 
      preuniversitarios y actividades de investigación científica.`,
    since: 2015
  },
  {
    id: '2',
    name: 'Fundación Compartir',
    type: 'ngo',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f146a31b-1762433108858.png",
    alt: 'Logo de fundación educativa con símbolo de manos unidas y libro abierto',
    description: `Alianza estratégica para el fortalecimiento de la calidad educativa y la formación 
      docente a través de programas de capacitación y recursos pedagógicos.`,
    since: 2018
  },
  {
    id: '3',
    name: 'SENA - Servicio Nacional de Aprendizaje',
    type: 'government',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d93732bf-1762433108752.png",
    alt: 'Logo institucional del SENA con escudo nacional y símbolos de educación técnica',
    description: `Programa de articulación con la educación media técnica que permite a nuestros estudiantes 
      obtener certificaciones en competencias laborales.`,
    since: 2012
  },
  {
    id: '4',
    name: 'Microsoft Education',
    type: 'company',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1af58dad9-1762433110199.png",
    alt: 'Logo de Microsoft con cuadrados coloridos representando tecnología educativa',
    description: `Alianza tecnológica que nos permite acceder a herramientas digitales avanzadas y 
      programas de certificación en competencias digitales para estudiantes y docentes.`,
    since: 2020
  },
  {
    id: '5',
    name: 'Alcaldía Municipal',
    type: 'government',
    logo: "https://images.unsplash.com/photo-1578855100660-718e58452005",
    alt: 'Escudo municipal con símbolos patrios y elementos representativos de la ciudad',
    description: `Convenio de cooperación para el desarrollo de proyectos comunitarios, programas 
      deportivos y culturales que benefician a toda la comunidad educativa.`,
    since: 2010
  },
  {
    id: '6',
    name: 'Corporación Universitaria Minuto de Dios',
    type: 'university',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_121a7a312-1762433107469.png",
    alt: 'Logo universitario con cruz y libro representando educación católica y excelencia académica',
    description: `Programa de becas y descuentos especiales para nuestros egresados, facilitando 
      el acceso a la educación superior de calidad.`,
    since: 2017
  }];


  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'university':return 'GraduationCap';
      case 'company':return 'Building2';
      case 'ngo':return 'Heart';
      case 'government':return 'Landmark';
      default:return 'Users';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'university':return 'Universidad';
      case 'company':return 'Empresa';
      case 'ngo':return 'Fundación';
      case 'government':return 'Entidad Pública';
      default:return 'Aliado';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'university':return 'bg-blue-500';
      case 'company':return 'bg-green-500';
      case 'ngo':return 'bg-purple-500';
      case 'government':return 'bg-red-500';
      default:return 'bg-gray-500';
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12">

          <h2 className="text-3xl md:text-4xl font-heading font-bold text-institutional mb-4">
            Alianzas Estratégicas
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Trabajamos en colaboración con instituciones reconocidas para enriquecer la experiencia 
            educativa de nuestros estudiantes y fortalecer los vínculos con la comunidad.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {partnerships.map((partnership, index) =>
          <motion.div
            key={partnership.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-institutional p-6 hover-lift">

              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 bg-gray-100 flex items-center justify-center">
                  <Image
                  src={partnership.logo}
                  alt={partnership.alt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-bold text-institutional mb-1">
                    {partnership.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className={`${getTypeColor(partnership.type)} rounded-full p-1`}>
                      <Icon name={getTypeIcon(partnership.type)} size={12} className="text-white" />
                    </div>
                    <span className="text-sm text-text-secondary font-body">
                      {getTypeLabel(partnership.type)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-text-primary font-body leading-relaxed mb-4">
                {partnership.description}
              </p>

              <div className="flex items-center justify-between text-sm text-text-secondary">
                <div className="flex items-center">
                  <Icon name="Calendar" size={14} className="mr-1" />
                  <span>Desde {partnership.since}</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" size={14} className="mr-1" />
                  <span>{new Date().getFullYear() - partnership.since} años</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-canvas rounded-xl p-8">

          <h3 className="text-2xl font-heading font-bold text-institutional text-center mb-8">
            Beneficios de Nuestras Alianzas
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Icon name="BookOpen" size={24} className="text-white" />
              </div>
              <h4 className="font-heading font-bold text-institutional mb-2">
                Acceso a Recursos
              </h4>
              <p className="text-text-secondary font-body text-sm">
                Materiales educativos, bibliotecas digitales y plataformas especializadas
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} className="text-white" />
              </div>
              <h4 className="font-heading font-bold text-institutional mb-2">
                Formación Docente
              </h4>
              <p className="text-text-secondary font-body text-sm">
                Capacitaciones y actualizaciones pedagógicas para nuestros educadores
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={24} className="text-white" />
              </div>
              <h4 className="font-heading font-bold text-institutional mb-2">
                Certificaciones
              </h4>
              <p className="text-text-secondary font-body text-sm">
                Programas de certificación en competencias técnicas y digitales
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Icon name="Rocket" size={24} className="text-white" />
              </div>
              <h4 className="font-heading font-bold text-institutional mb-2">
                Oportunidades
              </h4>
              <p className="text-text-secondary font-body text-sm">
                Becas, prácticas profesionales y programas de intercambio estudiantil
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default PartnershipsSection;