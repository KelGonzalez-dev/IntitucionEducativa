import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon.tsx';
import { QuickAccessItem } from '../types/index';

interface QuickAccessSectionProps {
  quickAccessItems: QuickAccessItem[];
}

const QuickAccessSection = ({ quickAccessItems }: QuickAccessSectionProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-institutional mb-4">
              Acceso Rápido
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Encuentra rápidamente lo que necesitas con nuestros servicios más utilizados
            </p>
          </motion.div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quickAccessItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => window.location.href = item.href}
            >
              <div className={`bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-normal hover-lift border-l-4 ${item.color}`}>
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-normal">
                  <Icon name={item.icon} size={32} className="text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-heading font-bold text-text-primary group-hover:text-primary transition-colors duration-normal">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Arrow Indicator */}
                <div className="flex justify-end mt-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-normal">
                    <Icon name="ArrowRight" size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-heading font-bold text-institutional mb-4">
              ¿Necesitas ayuda adicional?
            </h3>
            <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
              Nuestro equipo está disponible para asistirte con cualquier consulta o servicio adicional
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-normal flex items-center justify-center space-x-2"
                onClick={() => window.location.href = '/contact-and-services'}
              >
                <Icon name="Phone" size={20} />
                <span>Contactar Soporte</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-normal flex items-center justify-center space-x-2"
                onClick={() => window.location.href = '/resource-library'}
              >
                <Icon name="BookOpen" size={20} />
                <span>Ver Recursos</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickAccessSection;