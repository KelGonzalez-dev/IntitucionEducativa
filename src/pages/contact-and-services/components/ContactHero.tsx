import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon.tsx';

const ContactHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Icon name="Phone" size={64} className="mx-auto mb-6 text-white/90" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-heading font-bold mb-6 leading-tight"
          >
            Contacto y Servicios
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl lg:text-2xl font-body text-white/90 mb-8 leading-relaxed"
          >
            Estamos aquí para apoyarte en cada paso de tu experiencia educativa. 
            Conecta con nosotros y descubre todos nuestros servicios.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Icon name="Clock" size={20} />
              <span className="text-sm font-medium">Atención 24/7</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Icon name="MapPin" size={20} />
              <span className="text-sm font-medium">3 Campus</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Icon name="Users" size={20} />
              <span className="text-sm font-medium">Equipo Especializado</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;