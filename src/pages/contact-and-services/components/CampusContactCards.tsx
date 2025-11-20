import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon.tsx';
import Image from '../../../components/AppImage.tsx';
import Button from '../../../components/ui/Button.tsx';
import type { Campus } from '../types/index';
import { Link } from 'react-router-dom';

interface CampusContactCardsProps {
  campuses: Campus[];
}

const CampusContactCards = ({ campuses }: CampusContactCardsProps) => {
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);

  const handleViewMap = (campus: Campus) => {
    setSelectedCampus(selectedCampus === campus.id ? null : campus.id);
  };

  return (
    <section className="py-16 bg-canvas">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-institutional mb-4">
            Nuestros Campus
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Encuentra la sede más cercana y conecta directamente con nuestro equipo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {campuses.map((campus, index) => (
            <motion.div
              key={campus.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <Link to={`/campus/${campus.id}`}>
                  <Image
                    src={campus.image}
                    alt={campus.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-heading font-bold">{campus.name}</h3>
                  <p className="text-sm opacity-90">{campus.director}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-sm text-text-secondary">{campus.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={20} className="text-primary flex-shrink-0" />
                    <a 
                      href={`tel:${campus.phone}`}
                      className="text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      {campus.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={20} className="text-primary flex-shrink-0" />
                    <a 
                      href={`mailto:${campus.email}`}
                      className="text-sm text-text-secondary hover:text-primary transition-colors"
                    >
                      {campus.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={20} className="text-primary flex-shrink-0" />
                    <p className="text-sm text-text-secondary">{campus.hours}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Servicios Disponibles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {campus.services.slice(0, 3).map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                    {campus.services.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                        +{campus.services.length - 3} más
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link className="flex-1" to={`/campus/${campus.id}`}>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Building"
                      iconPosition="left"
                      className="w-full bg-primary hover:bg-secondary"
                    >
                      Ver sede
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Map"
                    iconPosition="left"
                    onClick={() => handleViewMap(campus)}
                    className="flex-1"
                  >
                    {selectedCampus === campus.id ? 'Ocultar' : 'Ver Mapa'}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Phone"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Contactar
                  </Button>
                </div>

                {selectedCampus === campus.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 rounded-lg overflow-hidden"
                  >
                    <iframe
                      width="100%"
                      height="200"
                      loading="lazy"
                      title={`Mapa de ${campus.name}`}
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${campus.coordinates.lat},${campus.coordinates.lng}&z=15&output=embed`}
                      className="border-0 rounded-lg"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampusContactCards;