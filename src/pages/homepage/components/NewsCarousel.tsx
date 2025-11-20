import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button.tsx';
import Image from '../../../components/AppImage.tsx';
import Icon from '../../../components/AppIcon.tsx';
import { NewsItem } from '../types/index';

interface NewsCarouselProps {
  newsItems: NewsItem[];
}

const NewsCarousel = ({ newsItems }: NewsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [newsItems.length, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const openPreview = (index: number) => {
    setCurrentIndex(index);
    setIsPreviewOpen(true);
    setIsAutoPlaying(false);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setIsAutoPlaying(true);
  };

  if (!newsItems.length) return null;

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
              Noticias Destacadas
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Mantente al día con los últimos logros y eventos de nuestra comunidad educativa
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  {(newsItems[currentIndex].image.startsWith('data:video') || newsItems[currentIndex].image.endsWith('.mp4')) ? (
                    <video
                      src={newsItems[currentIndex].image}
                      className="w-full h-full object-cover"
                      controls
                      onClick={() => openPreview(currentIndex)}
                    />
                  ) : (
                    <Image
                      src={newsItems[currentIndex].image}
                      alt={newsItems[currentIndex].alt}
                      className="w-full h-full object-cover"
                      onClick={() => openPreview(currentIndex)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                    <div className="max-w-4xl">
                      <span className="inline-block px-3 py-1 bg-primary rounded-full text-sm font-medium mb-4">
                        {newsItems[currentIndex].category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-4 leading-tight">
                        {newsItems[currentIndex].title}
                      </h3>
                      <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                        {newsItems[currentIndex].excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">
                          {newsItems[currentIndex].date}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="ArrowRight"
                          iconPosition="right"
                          className="border-white text-white hover:bg-white hover:text-primary"
                          onClick={() => window.location.href = newsItems[currentIndex].href}
                        >
                          Leer más
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-normal"
              aria-label="Noticia anterior"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-normal"
              aria-label="Siguiente noticia"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-6 space-x-2 overflow-x-auto pb-2">
            {newsItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all duration-normal ${
                  index === currentIndex
                    ? 'border-primary shadow-lg scale-105'
                    : 'border-transparent hover:border-primary/50'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-normal ${
                  index === currentIndex
                    ? 'bg-primary w-8' :'bg-gray-300 hover:bg-primary/50'
                }`}
                aria-label={`Ir a noticia ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Preview Lightbox */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[1500] bg-black/90 backdrop-blur-md flex items-center justify-center">
            <button
              className="absolute top-6 right-6 p-3 rounded-full bg-white/15 hover:bg-white/25 transition"
              onClick={closePreview}
              aria-label="Cerrar vista previa"
            >
              <Icon name="X" size={20} className="text-white" />
            </button>
            <button
              onClick={goToPrevious}
              className="absolute left-4 md:left-12 p-3 rounded-full bg-white/15 hover:bg-white/25 transition"
              aria-label="Anterior"
            >
              <Icon name="ChevronLeft" size={24} className="text-white" />
            </button>
            <div className="max-w-6xl w-[92%] aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              {(newsItems[currentIndex].image.startsWith('data:video') || newsItems[currentIndex].image.endsWith('.mp4')) ? (
                <video src={newsItems[currentIndex].image} className="w-full h-full object-contain" controls autoPlay />
              ) : (
                <img src={newsItems[currentIndex].image} alt={newsItems[currentIndex].alt} className="w-full h-full object-contain" />
              )}
            </div>
            <button
              onClick={goToNext}
              className="absolute right-4 md:right-12 p-3 rounded-full bg-white/15 hover:bg-white/25 transition"
              aria-label="Siguiente"
            >
              <Icon name="ChevronRight" size={24} className="text-white" />
            </button>
          </div>
        )}

        {/* View All News Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            iconName="Newspaper"
            iconPosition="left"
            className="border-primary text-primary hover:bg-primary hover:text-white"
            onClick={() => window.location.href = '/news-and-events'}
          >
            Ver todas las noticias
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;