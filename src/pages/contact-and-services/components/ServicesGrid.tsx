import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon.tsx';
import Button from '../../../components/ui/Button.tsx';
import type { Service } from '../types/index';

interface ServicesGridProps {
  services: Service[];
}

const ServicesGrid = ({ services }: ServicesGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'Todos los Servicios', icon: 'Grid3X3' },
    { value: 'academic', label: 'Académicos', icon: 'BookOpen' },
    { value: 'administrative', label: 'Administrativos', icon: 'FileText' },
    { value: 'support', label: 'Apoyo', icon: 'Heart' },
    { value: 'extracurricular', label: 'Extracurriculares', icon: 'Trophy' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-700 border-blue-200',
      administrative: 'bg-green-100 text-green-700 border-green-200',
      support: 'bg-purple-100 text-purple-700 border-purple-200',
      extracurricular: 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-institutional mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Descubre la amplia gama de servicios educativos que ofrecemos para apoyar tu crecimiento académico y personal
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'bg-primary text-white border-primary shadow-lg'
                  : 'bg-white text-text-secondary border-border hover:border-primary hover:text-primary'
              }`}
            >
              <Icon name={category.icon} size={16} />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-canvas rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={service.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      {service.title}
                    </h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getCategoryColor(service.category)}`}>
                      {service.category === 'academic' && 'Académico'}
                      {service.category === 'administrative' && 'Administrativo'}
                      {service.category === 'support' && 'Apoyo'}
                      {service.category === 'extracurricular' && 'Extracurricular'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-text-primary mb-2">Características:</h4>
                <ul className="space-y-1">
                  {service.features.slice(0, expandedService === service.id ? undefined : 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {service.features.length > 3 && (
                  <button
                    onClick={() => toggleServiceExpansion(service.id)}
                    className="text-primary text-sm font-medium mt-2 hover:underline"
                  >
                    {expandedService === service.id ? 'Ver menos' : `Ver ${service.features.length - 3} más`}
                  </button>
                )}
              </div>

              {service.contactPerson && (
                <div className="border-t border-border/50 pt-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="User" size={14} />
                    <span>{service.contactPerson}</span>
                  </div>
                  {service.phone && (
                    <div className="flex items-center space-x-2 text-sm text-text-secondary mt-1">
                      <Icon name="Phone" size={14} />
                      <a href={`tel:${service.phone}`} className="hover:text-primary transition-colors">
                        {service.phone}
                      </a>
                    </div>
                  )}
                  {service.email && (
                    <div className="flex items-center space-x-2 text-sm text-text-secondary mt-1">
                      <Icon name="Mail" size={14} />
                      <a href={`mailto:${service.email}`} className="hover:text-primary transition-colors">
                        {service.email}
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Info"
                  iconPosition="left"
                  className="flex-1 text-xs"
                >
                  Más Info
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="flex-1 text-xs"
                >
                  Consultar
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No se encontraron servicios en esta categoría.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;