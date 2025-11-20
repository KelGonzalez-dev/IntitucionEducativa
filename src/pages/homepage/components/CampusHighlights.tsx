import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage.tsx';

import Button from '../../../components/ui/Button.tsx';
import { CampusHighlight } from '../types/index';
import { Link } from 'react-router-dom';

interface CampusHighlightsProps {
  campuses: CampusHighlight[];
}

const CampusHighlights = ({ campuses }: CampusHighlightsProps) => {
  return (
    <section className="py-16 bg-canvas">
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
              Nuestras Sedes
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Descubre nuestros campus diseñados para brindar la mejor experiencia educativa
            </p>
          </motion.div>
        </div>

        {/* Campus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {campuses.map((campus, index) => (
            <motion.div
              key={campus.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-background rounded-2xl shadow-md hover:shadow-xl transition-all duration-normal hover-lift overflow-hidden">
                {/* Campus Image */}
                <div className="relative h-64 overflow-hidden">
                  <Link to={`/campus/${(campus.name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')}`}>
                    <Image
                      src={campus.image}
                      alt={campus.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-normal"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-heading font-bold text-white">
                      {campus.name}
                    </h3>
                  </div>
                </div>

                {/* Campus Content */}
                <div className="p-6">
                  {/* Description */}
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {campus.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-heading font-semibold text-text-primary mb-3">
                      Características destacadas:
                    </h4>
                    {campus.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link className="flex-1" to={`/campus/${(campus.name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')}`}>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Building"
                        iconPosition="left"
                        className="w-full bg-primary hover:bg-secondary"
                      >
                        Ver Sede
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MapPin"
                      iconPosition="left"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Ver Ubicación
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Calendar"
                      iconPosition="left"
                      className="flex-1 bg-primary hover:bg-secondary"
                    >
                      Agendar Visita
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore All Campuses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            iconName="Building"
            iconPosition="left"
            className="border-primary text-primary hover:bg-primary hover:text-white"
            onClick={() => window.location.href = '/about'}
          >
            Explorar Todas las Sedes
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CampusHighlights;