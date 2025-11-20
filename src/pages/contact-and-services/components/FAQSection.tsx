import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon.tsx';
import Input from '../../../components/ui/Input.tsx';
import type { FAQ } from '../types/index';

interface FAQSectionProps {
  faqs: FAQ[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [...new Set(faqs.map(faq => faq.category))];
  
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
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
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Encuentra respuestas rápidas a las consultas más comunes
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="bg-canvas rounded-xl p-6 shadow-lg">
            <Input
              type="search"
              placeholder="Buscar en preguntas frecuentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                  selectedCategory === 'all' ?'bg-primary text-white' :'bg-white text-text-secondary border border-border hover:border-primary'
                }`}
              >
                Todas
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 capitalize ${
                    selectedCategory === category
                      ? 'bg-primary text-white' :'bg-white text-text-secondary border border-border hover:border-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="bg-canvas rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/50 transition-colors duration-300"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-heading font-semibold text-text-primary pr-4">
                      {faq.question}
                    </h3>
                    <span className="inline-block mt-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
                      {faq.category}
                    </span>
                  </div>
                  <Icon
                    name={expandedFAQ === faq.id ? "ChevronUp" : "ChevronDown"}
                    size={20}
                    className="text-text-secondary flex-shrink-0 transition-transform duration-300"
                  />
                </button>
                
                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 border-t border-border/50">
                        <p className="text-text-secondary leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Icon name="HelpCircle" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary mb-4">
              No se encontraron preguntas que coincidan con tu búsqueda.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-primary hover:underline"
            >
              Limpiar búsqueda
            </button>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 bg-primary/5 rounded-xl p-8"
        >
          <Icon name="MessageCircle" size={48} className="text-primary mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
            ¿No encontraste lo que buscabas?
          </h3>
          <p className="text-text-secondary mb-4">
            Nuestro equipo está listo para ayudarte con cualquier consulta adicional
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300 flex items-center justify-center space-x-2">
              <Icon name="Phone" size={16} />
              <span>Llamar Ahora</span>
            </button>
            <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2">
              <Icon name="Mail" size={16} />
              <span>Enviar Email</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;