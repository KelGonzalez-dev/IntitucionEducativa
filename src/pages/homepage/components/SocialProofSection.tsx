import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage.tsx';
import Icon from '../../../components/AppIcon.tsx';
import { AwardItem } from '../types/index';

interface SocialProofSectionProps {
  awards: AwardItem[];
}

const SocialProofSection = ({ awards }: SocialProofSectionProps) => {
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
              Reconocimientos y Logros
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Nuestros premios y reconocimientos reflejan el compromiso con la excelencia educativa
            </p>
          </motion.div>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-normal hover-lift">
                {/* Award Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <Image
                    src={award.image}
                    alt={award.alt}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-normal"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {award.year}
                    </div>
                  </div>
                </div>

                {/* Award Content */}
                <div className="space-y-4">
                  {/* Category Badge */}
                  <div className="flex items-center space-x-2">
                    <Icon name="Award" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {award.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-text-primary group-hover:text-primary transition-colors duration-normal">
                    {award.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary leading-relaxed">
                    {award.description}
                  </p>

                  {/* Achievement Indicator */}
                  <div className="flex items-center space-x-2 pt-2 border-t border-border">
                    <Icon name="Trophy" size={16} className="text-secondary" />
                    <span className="text-sm font-medium text-secondary">
                      Reconocimiento Oficial
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-heading font-bold text-institutional mb-4">
              Únete a Nuestra Tradición de Excelencia
            </h3>
            <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
              Forma parte de una institución con más de décadas de compromiso con la educación de calidad
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-normal flex items-center justify-center space-x-2"
                onClick={() => window.location.href = '/about'}
              >
                <Icon name="Info" size={20} />
                <span>Conoce Más</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-normal flex items-center justify-center space-x-2"
                onClick={() => window.location.href = '/contact-and-services'}
              >
                <Icon name="Calendar" size={20} />
                <span>Agendar Visita</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;  