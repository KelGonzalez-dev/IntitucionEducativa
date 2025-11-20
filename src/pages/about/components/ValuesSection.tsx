import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { InstitutionalValue } from '../types/index';

const ValuesSection = () => {
  const values: InstitutionalValue[] = [
    {
      id: 'respect',
      title: 'Respeto',
      description: `Reconocemos y valoramos la dignidad de cada persona, promoviendo un ambiente de 
      tolerancia, comprensión y aceptación de la diversidad. El respeto es la base de todas nuestras 
      relaciones interpersonales y el fundamento de una convivencia armónica.`,
      icon: 'Heart',
      color: 'bg-primary'
    },
    {
      id: 'responsibility',
      title: 'Responsabilidad',
      description: `Asumimos con compromiso nuestros deberes y obligaciones, siendo conscientes de las 
      consecuencias de nuestros actos. Fomentamos la autonomía y la toma de decisiones reflexivas que 
      contribuyan al bienestar personal y colectivo.`,
      icon: 'Shield',
      color: 'bg-secondary'
    },
    {
      id: 'justice',
      title: 'Justicia',
      description: `Promovemos la equidad, la imparcialidad y el respeto por los derechos de todos. 
      Buscamos crear un ambiente donde prevalezca la honestidad, la transparencia y el trato justo 
      para cada miembro de nuestra comunidad educativa.`,
      icon: 'Scale',
      color: 'bg-accent'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-institutional mb-4">
            Nuestros Valores Fundamentales
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Los valores que nos definen como institución educativa y que guían cada una de nuestras 
            acciones en la formación integral de nuestros estudiantes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-institutional p-8 text-center hover-lift group"
            >
              <div className={`${value.color} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-normal`}>
                <Icon name={value.icon} size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-institutional mb-4">
                {value.title}
              </h3>
              <p className="text-text-primary leading-relaxed font-body">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Values in Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-canvas rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-heading font-bold text-institutional mb-6">
            Valores en Acción
          </h3>
          <p className="text-text-primary font-body leading-relaxed max-w-4xl mx-auto mb-8">
            Nuestros valores no son solo palabras, sino principios que se viven diariamente en cada aula, 
            en cada actividad y en cada interacción dentro de nuestra comunidad educativa. Creemos que 
            la verdadera educación trasciende el conocimiento académico para formar seres humanos íntegros 
            y comprometidos con la sociedad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <span className="text-sm font-body font-medium text-institutional">Convivencia Pacífica</span>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <span className="text-sm font-body font-medium text-institutional">Liderazgo Estudiantil</span>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <span className="text-sm font-body font-medium text-institutional">Servicio Comunitario</span>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <span className="text-sm font-body font-medium text-institutional">Inclusión Educativa</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;