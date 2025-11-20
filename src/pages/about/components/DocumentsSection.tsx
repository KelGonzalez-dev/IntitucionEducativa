import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { InstitutionalDocument } from '../types/index';

const DocumentsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const documents: InstitutionalDocument[] = [
    {
      id: '1',
      title: 'Proyecto Educativo Institucional (PEI)',
      type: 'pdf',
      size: '2.5 MB',
      lastUpdated: '2024-01-15',
      category: 'mission',
      downloadUrl: '/documents/pei-santa-catalina.pdf'
    },
    {
      id: '2',
      title: 'Manual de Convivencia Escolar',
      type: 'pdf',
      size: '1.8 MB',
      lastUpdated: '2024-02-01',
      category: 'policies',
      downloadUrl: '/documents/manual-convivencia.pdf'
    },
    {
      id: '3',
      title: 'Informe de Gestión Anual 2023',
      type: 'pdf',
      size: '3.2 MB',
      lastUpdated: '2024-01-30',
      category: 'reports',
      downloadUrl: '/documents/informe-gestion-2023.pdf'
    },
    {
      id: '4',
      title: 'Certificación de Calidad Educativa',
      type: 'pdf',
      size: '1.1 MB',
      lastUpdated: '2023-12-15',
      category: 'certifications',
      downloadUrl: '/documents/certificacion-calidad.pdf'
    },
    {
      id: '5',
      title: 'Reglamento Interno Docente',
      type: 'doc',
      size: '950 KB',
      lastUpdated: '2024-01-10',
      category: 'policies',
      downloadUrl: '/documents/reglamento-docente.doc'
    },
    {
      id: '6',
      title: 'Plan de Mejoramiento Institucional',
      type: 'pdf',
      size: '2.1 MB',
      lastUpdated: '2024-02-10',
      category: 'reports',
      downloadUrl: '/documents/plan-mejoramiento.pdf'
    },
    {
      id: '7',
      title: 'Acreditación Ministerio de Educación',
      type: 'pdf',
      size: '1.5 MB',
      lastUpdated: '2023-11-20',
      category: 'certifications',
      downloadUrl: '/documents/acreditacion-mineducacion.pdf'
    },
    {
      id: '8',
      title: 'Presentación Institucional',
      type: 'ppt',
      size: '4.8 MB',
      lastUpdated: '2024-01-25',
      category: 'mission',
      downloadUrl: '/documents/presentacion-institucional.ppt'
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos los Documentos', icon: 'FileText' },
    { id: 'mission', label: 'Misión y Visión', icon: 'Target' },
    { id: 'policies', label: 'Políticas y Reglamentos', icon: 'Shield' },
    { id: 'reports', label: 'Informes y Reportes', icon: 'BarChart3' },
    { id: 'certifications', label: 'Certificaciones', icon: 'Award' }
  ];

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return 'FileText';
      case 'doc': return 'FileText';
      case 'ppt': return 'Presentation';
      default: return 'File';
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-500';
      case 'doc': return 'text-blue-500';
      case 'ppt': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const handleDownload = async (document: InstitutionalDocument) => {
    setDownloadingId(document.id);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real application, you would trigger the actual download here
    console.log(`Downloading: ${document.title}`);
    
    setDownloadingId(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            Documentos Institucionales
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Accede a nuestros documentos oficiales, políticas institucionales y certificaciones. 
            Mantenemos la transparencia y el acceso a la información como parte de nuestro compromiso 
            con la comunidad educativa.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-all duration-normal ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-text-primary hover:bg-primary/10 hover:text-primary shadow-sm'
              }`}
            >
              <Icon name={category.icon} size={16} />
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-institutional p-6 hover-lift"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className={`${getFileColor(document.type)} flex-shrink-0`}>
                  <Icon name={getFileIcon(document.type)} size={32} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-heading font-bold text-institutional mb-2 line-clamp-2">
                    {document.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                    <div className="flex items-center">
                      <Icon name="HardDrive" size={14} className="mr-1" />
                      <span>{document.size}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Calendar" size={14} className="mr-1" />
                      <span>{formatDate(document.lastUpdated)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-text-secondary font-body uppercase tracking-wide">
                  {document.type.toUpperCase()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(document)}
                  loading={downloadingId === document.id}
                  iconName="Download"
                  iconPosition="left"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  {downloadingId === document.id ? 'Descargando...' : 'Descargar'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-xl shadow-institutional p-8"
        >
          <div className="flex items-center mb-6">
            <Icon name="Info" size={24} className="text-primary mr-3" />
            <h3 className="text-xl font-heading font-bold text-institutional">
              Información sobre Descargas
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-text-secondary font-body">
            <div>
              <h4 className="font-bold text-institutional mb-2">Formatos Disponibles:</h4>
              <ul className="space-y-1">
                <li>• PDF - Documentos oficiales y reportes</li>
                <li>• DOC - Documentos editables</li>
                <li>• PPT - Presentaciones institucionales</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-institutional mb-2">Notas Importantes:</h4>
              <ul className="space-y-1">
                <li>• Los documentos se actualizan periódicamente</li>
                <li>• Algunos archivos requieren software específico</li>
                <li>• Para consultas, contacta nuestra oficina</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentsSection;