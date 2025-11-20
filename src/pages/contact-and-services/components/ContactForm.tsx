import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon.tsx';
import Button from '../../../components/ui/Button.tsx';
import Input from '../../../components/ui/Input.tsx';
import Select from '../../../components/ui/Select.tsx';
import type { ContactFormData, Campus } from '../types/index';

interface ContactFormProps {
  campuses: Campus[];
}

const ContactForm = ({ campuses }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    campus: '',
    subject: '',
    message: '',
    serviceType: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const campusOptions = campuses.map(campus => ({
    value: campus.id,
    label: campus.name
  }));

  const serviceTypeOptions = [
    { value: 'admissions', label: 'Admisiones y Matrículas' },
    { value: 'academic', label: 'Información Académica' },
    { value: 'administrative', label: 'Trámites Administrativos' },
    { value: 'support', label: 'Apoyo Estudiantil' },
    { value: 'extracurricular', label: 'Actividades Extracurriculares' },
    { value: 'other', label: 'Otro' }
  ];

  const contactMethodOptions = [
    { value: 'email', label: 'Correo Electrónico' },
    { value: 'phone', label: 'Teléfono' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        campus: '',
        subject: '',
        message: '',
        serviceType: '',
        preferredContact: 'email'
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto text-center bg-success/10 border border-success/20 rounded-xl p-8"
          >
            <Icon name="CheckCircle" size={64} className="text-success mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold text-success mb-2">
              ¡Mensaje Enviado!
            </h3>
            <p className="text-text-secondary">
              Hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-institutional mb-4">
              Envíanos un Mensaje
            </h2>
            <p className="text-lg text-text-secondary">
              Completa el formulario y nos pondremos en contacto contigo
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-canvas rounded-xl p-8 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input
                label="Nombre Completo"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />

              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />

              <Input
                label="Teléfono"
                type="tel"
                placeholder="+57 300 123 4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />

              <Select
                label="Campus de Interés"
                placeholder="Selecciona un campus"
                options={campusOptions}
                value={formData.campus}
                onChange={(value) => handleInputChange('campus', value as string)}
                required
              />

              <Select
                label="Tipo de Consulta"
                placeholder="Selecciona el tipo"
                options={serviceTypeOptions}
                value={formData.serviceType}
                onChange={(value) => handleInputChange('serviceType', value as string)}
                required
              />

              <Select
                label="Método de Contacto Preferido"
                options={contactMethodOptions}
                value={formData.preferredContact}
                onChange={(value) => handleInputChange('preferredContact', value as string)}
                required
              />
            </div>

            <div className="mb-6">
              <Input
                label="Asunto"
                type="text"
                placeholder="Asunto de tu mensaje"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Mensaje *
              </label>
              <textarea
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={6}
                placeholder="Describe tu consulta o solicitud..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isSubmitting}
                iconName="Send"
                iconPosition="left"
                className="bg-primary hover:bg-secondary"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                size="lg"
                iconName="Phone"
                iconPosition="left"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Llamar Ahora
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 