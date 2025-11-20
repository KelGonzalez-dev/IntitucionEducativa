import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon.tsx';
import { StatItem } from '../types/index';

interface StatsSectionProps {
  stats: StatItem[];
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Nuestra Comunidad en Números
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Cifras que reflejan nuestro compromiso con la excelencia educativa
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-normal hover-lift">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-normal">
                    <Icon name={stat.icon} size={32} color="white" />
                  </div>
                </div>

                {/* Value */}
                <div className="mb-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="text-4xl sm:text-5xl font-heading font-bold block"
                  >
                    {stat.value}
                  </motion.span>
                </div>

                {/* Label */}
                <h3 className="text-xl font-heading font-semibold mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Estos números representan más que estadísticas; son el testimonio de vidas transformadas, 
            sueños alcanzados y una comunidad comprometida con la excelencia educativa.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;