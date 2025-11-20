import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { LeadershipMember } from '../types/index';

const LeadershipTeam = () => {
  const [selectedMember, setSelectedMember] = useState<LeadershipMember | null>(null);

  const leadership: LeadershipMember[] = [
  {
    id: '1',
    name: 'María Elena Rodríguez',
    position: 'Rectora',
    department: 'Dirección General',
    image: "https://images.unsplash.com/photo-1677594333284-68463516a828",
    alt: 'Mujer profesional de mediana edad con blazer azul marino sonriendo en oficina moderna',
    message: `Como rectora de Santa Catalina de Siena, mi compromiso es liderar una institución que forme 
      no solo estudiantes académicamente excelentes, sino ciudadanos íntegros y comprometidos con su comunidad. 
      Nuestra misión trasciende las aulas para impactar positivamente la sociedad.`,
    email: 'rectoria@santacatalina.edu.co',
    experience: 15
  },
  {
    id: '2',
    name: 'Carlos Alberto Mendoza',
    position: 'Coordinador Académico',
    department: 'Coordinación Académica',
    image: "https://images.unsplash.com/photo-1681164316667-0541ea50f563",
    alt: 'Hombre profesional con camisa blanca y corbata azul en ambiente educativo con libros',
    message: `La excelencia académica es nuestro norte. Trabajamos incansablemente para ofrecer una educación 
      de calidad que prepare a nuestros estudiantes para los desafíos del siglo XXI, manteniendo siempre 
      nuestros valores institucionales como base fundamental.`,
    email: 'coordinacion.academica@santacatalina.edu.co',
    experience: 12
  },
  {
    id: '3',
    name: 'Ana Sofía Herrera',
    position: 'Coordinadora de Convivencia',
    department: 'Bienestar Estudiantil',
    image: "https://images.unsplash.com/photo-1580832991423-5068b9436835",
    alt: 'Mujer joven con cabello castaño y sonrisa cálida en entorno escolar con estudiantes al fondo',
    message: `La convivencia escolar es el corazón de nuestra comunidad educativa. Mi labor se enfoca en 
      crear un ambiente seguro, respetuoso e inclusivo donde cada estudiante pueda desarrollar su potencial 
      en un marco de valores y respeto mutuo.`,
    email: 'convivencia@santacatalina.edu.co',
    experience: 8
  },
  {
    id: '4',
    name: 'Luis Fernando Gómez',
    position: 'Coordinador de Tecnología',
    department: 'Innovación Educativa',
    image: "https://images.unsplash.com/photo-1681164315734-355fb1131685",
    alt: 'Hombre joven con barba y camisa casual en laboratorio de computación con equipos tecnológicos',
    message: `La tecnología es una herramienta poderosa para transformar la educación. Nuestro objetivo es 
      integrar innovaciones tecnológicas que enriquezcan el proceso de aprendizaje y preparen a nuestros 
      estudiantes para un mundo digital en constante evolución.`,
    email: 'tecnologia@santacatalina.edu.co',
    experience: 6
  }];


  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12">

          <h2 className="text-3xl md:text-4xl font-heading font-bold text-institutional mb-4">
            Equipo Directivo
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Conoce a los líderes que guían nuestra institución hacia la excelencia educativa, 
            cada uno comprometido con la misión de formar ciudadanos íntegros y competentes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {leadership.map((member, index) =>
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-institutional p-6 text-center hover-lift cursor-pointer"
            onClick={() => setSelectedMember(member)}>

              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                  <Image
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
              </div>
              <h3 className="text-lg font-heading font-bold text-institutional mb-2">
                {member.name}
              </h3>
              <p className="text-primary font-body font-medium mb-1">
                {member.position}
              </p>
              <p className="text-text-secondary text-sm font-body mb-4">
                {member.department}
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center">
                  <Icon name="Clock" size={14} className="mr-1" />
                  <span>{member.experience} años</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Selected Member Modal */}
        {selectedMember &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMember(null)}>

            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}>

              <div className="flex items-start space-x-6 mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                  src={selectedMember.image}
                  alt={selectedMember.alt}
                  className="w-full h-full object-cover" />

                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-heading font-bold text-institutional mb-2">
                    {selectedMember.name}
                  </h3>
                  <p className="text-primary font-body font-medium mb-1">
                    {selectedMember.position}
                  </p>
                  <p className="text-text-secondary font-body mb-4">
                    {selectedMember.department}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center">
                      <Icon name="Mail" size={14} className="mr-1" />
                      <span>{selectedMember.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Clock" size={14} className="mr-1" />
                      <span>{selectedMember.experience} años de experiencia</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-heading font-bold text-institutional mb-3">
                  Mensaje Personal
                </h4>
                <p className="text-text-primary font-body leading-relaxed">
                  {selectedMember.message}
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                variant="outline"
                onClick={() => setSelectedMember(null)}
                iconName="X"
                iconPosition="left">

                  Cerrar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        }
      </div>
    </section>);

};

export default LeadershipTeam;