import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';


const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-primary min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Icon name="GraduationCap" size={80} className="mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              Nuestra Institución
            </h1>
            <p className="text-xl md:text-2xl font-body opacity-90 max-w-3xl mx-auto">
              Institución Educativa No. 3 Santa Catalina de Siena
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg md:text-xl font-body leading-relaxed mb-8">
              Excelencia educativa arraigada en valores atemporales con un enfoque visionario. 
              Una comunidad académica donde la tradición se encuentra con la innovación, 
              creando un ambiente donde los estudiantes florecen a través del respeto, 
              la responsabilidad y la justicia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-sm font-body font-medium">Excelencia</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-sm font-body font-medium">Valores</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-sm font-body font-medium">Comunidad</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-sm font-body font-medium">Innovación</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;