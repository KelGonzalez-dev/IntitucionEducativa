import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button.tsx';
import Icon from '../../../components/AppIcon.tsx';
import { HeroSection as HeroSectionType } from '../types/index';
import BrandLogo from '../../../components/BrandLogo';
import Ribbons from '../../../components/effects/Ribbons';

interface HeroSectionProps {
  heroData: HeroSectionType;
}

const HeroSection = ({ heroData }: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/5">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20">
          <iframe
            className="w-full h-full object-cover"
            src={heroData.videoUrl}
            title="Campus Life Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-background/20" />
        </div>
        {/* Ribbons effect sobre el video, en tono institucional */}
        <div className="absolute inset-0" style={{ height: '100%', position: 'absolute', overflow: 'hidden' }}>
          <Ribbons
            baseThickness={30}
            colors={['#b91c1c']}
            speedMultiplier={0.5}
            maxAge={500}
            enableFade={false}
            enableShaderEffect={true}
            backgroundColor={[0,0,0,0]}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            {/* Logo más grande (aprox 3x del tamaño previo visible) */}
            <div className="shadow-xl animate-pulse-subtle">
              <BrandLogo size={192} showCircle />
            </div>
          </div>
        </motion.div>

        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-institutional mb-4 leading-tight">
            {heroData.title}
          </h1>
        </motion.div>

        {/* Description Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {heroData.description}
          </p>
        </motion.div>

        {/* CTA Buttons Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {heroData.ctaButtons.map((button, index) => (
            <motion.div
              key={button.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={button.variant}
                size="lg"
                iconName={button.icon as any}
                iconPosition="left"
                className={`${
                  button.variant === 'default' ?'bg-primary hover:bg-secondary text-white shadow-lg' :'border-primary text-primary hover:bg-primary hover:text-white'
                } px-8 py-4 text-lg font-semibold transition-all duration-normal hover-lift`}
                onClick={() => window.location.href = button.href}
              >
                {button.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-text-secondary"
          >
            <span className="text-sm mb-2">Descubre más</span>
            <Icon name="ChevronDown" size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;