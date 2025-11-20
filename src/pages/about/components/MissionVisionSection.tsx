import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MissionVisionSection = () => {
  const sections = [
    {
      id: 'mission',
      title: 'Nuestra Misión',
      icon: 'Target',
      content: `Formar integralmente a niños, niñas y jóvenes en los niveles de preescolar, básica y media, 
      desarrollando competencias académicas, ciudadanas y laborales que les permitan ser personas críticas, 
      reflexivas, autónomas y comprometidas con la transformación positiva de su entorno, fundamentados en 
      los valores de respeto, responsabilidad y justicia, inspirados en el carisma de Santa Catalina de Siena.`,
      color: 'bg-primary'
    },
    {
      id: 'vision',
      title: 'Nuestra Visión',
      icon: 'Eye',
      content: `Para el año 2030, la Institución Educativa No. 3 Santa Catalina de Siena será reconocida 
      como una institución líder en la formación integral de estudiantes, caracterizada por la excelencia 
      académica, la innovación pedagógica y el compromiso social, contribuyendo al desarrollo sostenible 
      de la comunidad y formando ciudadanos competentes para los desafíos del siglo XXI.`,
      color: 'bg-secondary'
    }
  ];

  return (
    <section className="py-16 bg-canvas">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-institutional mb-4">
            Identidad Institucional
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Los pilares fundamentales que guían nuestra labor educativa y definen nuestro compromiso 
            con la excelencia académica y la formación integral.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {sections?.map((section, index) => (
            <motion.div
              key={section?.id}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-institutional p-8 hover-lift"
            >
              <div className="flex items-center mb-6">
                <div className={`${section?.color} rounded-lg p-3 mr-4`}>
                  <Icon name={section?.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-institutional">
                  {section?.title}
                </h3>
              </div>
              <p className="text-text-primary leading-relaxed font-body">
                {section?.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Hymn Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-xl shadow-institutional p-8 max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-accent rounded-lg p-3 mr-4">
              <Icon name="Music" size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-institutional">
              Himno Institucional
            </h3>
          </div>
          <div className="text-text-primary font-body leading-relaxed space-y-4">
            <p className="italic">
              "Con orgullo cantamos a nuestra institución,\n
              Santa Catalina de Siena, fuente de educación.\n
              Respeto, responsabilidad y justicia nos guían,\n
              En el camino del saber que nuestras almas ilumina."
            </p>
            <p className="italic">
              "Formamos ciudadanos íntegros y comprometidos,\n
              Con valores sólidos y conocimientos adquiridos.\n
              Hacia el futuro marchamos con paso firme y seguro,\n
              Santa Catalina de Siena, nuestro hogar más puro."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection;