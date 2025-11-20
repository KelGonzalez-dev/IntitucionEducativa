import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import CategoryGrid from './components/CategoryGrid';
import DocumentCard from './components/DocumentCard';
import DocumentPreview from './components/DocumentPreview';
import ToastNotification from './components/ToastNotification';
import BulkActions from './components/BulkActions';
import QuickAccess from './components/QuickAccess';
import {
  Document,
  DocumentCategory,
  SearchFilters,
  DownloadProgress,
  UserPreferences,
  ToastNotification as ToastNotificationType,
  BulkDownloadRequest,
  DocumentPreview as DocumentPreviewType } from
'./types';

const ResourceLibrary = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<Record<string, DownloadProgress>>({});
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    favoriteDocuments: [],
    recentlyAccessed: [],
    downloadHistory: [],
    preferredView: 'grid',
    defaultFilters: {}
  });
  const [toastNotifications, setToastNotifications] = useState<ToastNotificationType[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showBulkSelect, setShowBulkSelect] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  const [documentPreview, setDocumentPreview] = useState<DocumentPreviewType | null>(null);

  // Mock data
  const mockCategories: DocumentCategory[] = [
  {
    id: 'academic',
    name: 'Material Académico',
    description: 'Guías de estudio, planes de clase y recursos educativos',
    icon: 'BookOpen',
    documentCount: 45,
    color: 'blue-500'
  },
  {
    id: 'administrative',
    name: 'Documentos Administrativos',
    description: 'Formularios, políticas y procedimientos institucionales',
    icon: 'FileText',
    documentCount: 23,
    color: 'green-500'
  },
  {
    id: 'forms',
    name: 'Formularios',
    description: 'Formularios de inscripción, solicitudes y permisos',
    icon: 'ClipboardList',
    documentCount: 18,
    color: 'purple-500'
  },
  {
    id: 'policies',
    name: 'Políticas y Reglamentos',
    description: 'Manual del estudiante, código de conducta y reglamentos',
    icon: 'Shield',
    documentCount: 12,
    color: 'red-500'
  },
  {
    id: 'newsletters',
    name: 'Boletines',
    description: 'Boletines informativos y comunicados institucionales',
    icon: 'Newspaper',
    documentCount: 8,
    color: 'yellow-500'
  },
  {
    id: 'events',
    name: 'Eventos',
    description: 'Programas de eventos, cronogramas y actividades',
    icon: 'Calendar',
    documentCount: 15,
    color: 'pink-500'
  }];


  const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Guía de Matemáticas - Álgebra Básica',
    description: 'Guía completa de álgebra básica para estudiantes de 8° grado. Incluye ejercicios prácticos, ejemplos resueltos y evaluaciones.',
    category: 'Material Académico',
    subject: 'mathematics',
    gradeLevel: '6-9',
    fileType: 'pdf',
    fileSize: '2.5 MB',
    downloadUrl: '/documents/algebra-basica.pdf',
    uploadDate: new Date('2024-01-15'),
    lastModified: new Date('2024-01-20'),
    version: '1.2',
    downloadCount: 156,
    isNew: true,
    isFavorite: false,
    thumbnail: "https://images.unsplash.com/photo-1511687863516-5efd7f27770a",
    alt: 'Libro de matemáticas abierto mostrando ecuaciones algebraicas en una mesa de estudio',
    tags: ['matemáticas', 'álgebra', 'secundaria'],
    author: 'Prof. María González',
    campus: 'leyda-garrido'
  },
  {
    id: '2',
    title: 'Manual del Estudiante 2024',
    description: 'Manual completo con normas, procedimientos y políticas institucionales para el año académico 2024.',
    category: 'Documentos Administrativos',
    subject: 'general',
    gradeLevel: 'general',
    fileType: 'pdf',
    fileSize: '5.8 MB',
    downloadUrl: '/documents/manual-estudiante-2024.pdf',
    uploadDate: new Date('2024-01-10'),
    lastModified: new Date('2024-01-25'),
    version: '2.0',
    downloadCount: 289,
    isNew: false,
    isFavorite: true,
    thumbnail: "https://images.unsplash.com/photo-1486008035481-6d7e773e5622",
    alt: 'Manual institucional abierto sobre escritorio con logo de la institución visible',
    tags: ['manual', 'normas', 'políticas'],
    author: 'Coordinación Académica',
    campus: 'san-jose'
  },
  {
    id: '3',
    title: 'Formulario de Inscripción 2024',
    description: 'Formulario oficial para inscripción de nuevos estudiantes. Incluye requisitos y documentación necesaria.',
    category: 'Formularios',
    subject: 'general',
    gradeLevel: 'general',
    fileType: 'doc',
    fileSize: '1.2 MB',
    downloadUrl: '/documents/formulario-inscripcion.doc',
    uploadDate: new Date('2024-01-05'),
    lastModified: new Date('2024-01-15'),
    version: '1.0',
    downloadCount: 78,
    isNew: true,
    isFavorite: false,
    thumbnail: "https://images.unsplash.com/photo-1527479910153-90c81554cb35",
    alt: 'Formulario de inscripción en blanco sobre escritorio con bolígrafo azul',
    tags: ['inscripción', 'formulario', 'admisiones'],
    author: 'Secretaría Académica',
    campus: 'maria-eugenia'
  },
  {
    id: '4',
    title: 'Plan de Estudios - Ciencias Naturales',
    description: 'Plan curricular completo de ciencias naturales para educación básica secundaria.',
    category: 'Material Académico',
    subject: 'science',
    gradeLevel: '6-9',
    fileType: 'pdf',
    fileSize: '3.1 MB',
    downloadUrl: '/documents/plan-ciencias-naturales.pdf',
    uploadDate: new Date('2024-01-12'),
    lastModified: new Date('2024-01-18'),
    version: '1.1',
    downloadCount: 134,
    isNew: false,
    isFavorite: true,
    thumbnail: "https://images.unsplash.com/photo-1666204575733-cda4725fc162",
    alt: 'Microscopio y libros de ciencias sobre mesa de laboratorio con plantas en el fondo',
    tags: ['ciencias', 'plan curricular', 'secundaria'],
    author: 'Dpto. de Ciencias',
    campus: 'leyda-garrido'
  },
  {
    id: '5',
    title: 'Boletín Informativo - Enero 2024',
    description: 'Boletín mensual con noticias, eventos y logros de la comunidad educativa Santa Catalina.',
    category: 'Boletines',
    subject: 'general',
    gradeLevel: 'general',
    fileType: 'pdf',
    fileSize: '4.2 MB',
    downloadUrl: '/documents/boletin-enero-2024.pdf',
    uploadDate: new Date('2024-01-30'),
    lastModified: new Date('2024-01-30'),
    version: '1.0',
    downloadCount: 67,
    isNew: true,
    isFavorite: false,
    thumbnail: "https://images.unsplash.com/photo-1629528026812-046ce5f40936",
    alt: 'Boletín informativo colorido con fotografías de estudiantes y actividades escolares',
    tags: ['boletín', 'noticias', 'comunidad'],
    author: 'Comunicaciones',
    campus: 'san-jose'
  },
  {
    id: '6',
    title: 'Cronograma de Actividades - Primer Semestre',
    description: 'Calendario detallado de actividades académicas, culturales y deportivas del primer semestre 2024.',
    category: 'Eventos',
    subject: 'general',
    gradeLevel: 'general',
    fileType: 'xls',
    fileSize: '890 KB',
    downloadUrl: '/documents/cronograma-primer-semestre.xls',
    uploadDate: new Date('2024-01-08'),
    lastModified: new Date('2024-01-22'),
    version: '1.3',
    downloadCount: 203,
    isNew: false,
    isFavorite: true,
    thumbnail: "https://images.unsplash.com/photo-1703300450387-047da16a89c4",
    alt: 'Calendario de escritorio mostrando fechas importantes marcadas con colores',
    tags: ['cronograma', 'actividades', 'calendario'],
    author: 'Coordinación General',
    campus: 'maria-eugenia'
  }];


  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDocuments(mockDocuments);
      setFilteredDocuments(mockDocuments);
      setCategories(mockCategories);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = useCallback((searchFilters: SearchFilters) => {
    setIsLoading(true);

    setTimeout(() => {
      let filtered = [...documents];

      // Apply text search
      if (searchFilters.query) {
        const query = searchFilters.query.toLowerCase();
        filtered = filtered.filter((doc) =>
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      // Apply filters
      if (searchFilters.filters.category) {
        filtered = filtered.filter((doc) => doc.category === searchFilters.filters.category);
      }
      if (searchFilters.filters.subject) {
        filtered = filtered.filter((doc) => doc.subject === searchFilters.filters.subject);
      }
      if (searchFilters.filters.gradeLevel) {
        filtered = filtered.filter((doc) => doc.gradeLevel === searchFilters.filters.gradeLevel);
      }
      if (searchFilters.filters.fileType) {
        filtered = filtered.filter((doc) => doc.fileType === searchFilters.filters.fileType);
      }
      if (searchFilters.filters.campus) {
        filtered = filtered.filter((doc) => doc.campus === searchFilters.filters.campus);
      }

      // Apply sorting
      filtered.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (searchFilters.sortBy) {
          case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case 'date':
            aValue = a.uploadDate.getTime();
            bValue = b.uploadDate.getTime();
            break;
          case 'downloads':
            aValue = a.downloadCount;
            bValue = b.downloadCount;
            break;
          case 'size':
            aValue = parseFloat(a.fileSize);
            bValue = parseFloat(b.fileSize);
            break;
          default:
            return 0;
        }

        if (searchFilters.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      setFilteredDocuments(filtered);
      setIsLoading(false);
    }, 500);
  }, [documents]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryName = categories.find((cat) => cat.id === categoryId)?.name || '';
    handleSearch({
      query: '',
      filters: { category: categoryName, subject: '', gradeLevel: '', fileType: '', campus: '', dateRange: '' },
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const handleDownload = (documentId: string) => {
    const document = documents.find((doc) => doc.id === documentId);
    if (!document) return;

    // Start download progress
    setDownloadProgress((prev) => ({
      ...prev,
      [documentId]: { documentId, progress: 0, status: 'downloading' }
    }));

    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        // Complete download
        setDownloadProgress((prev) => ({
          ...prev,
          [documentId]: { documentId, progress: 100, status: 'completed' }
        }));

        // Update download count
        setDocuments((prev) => prev.map((doc) =>
        doc.id === documentId ? { ...doc, downloadCount: doc.downloadCount + 1 } : doc
        ));

        // Show success toast
        showToast({
          type: 'success',
          title: 'Descarga completada',
          message: `${document.title} se ha descargado correctamente`,
          duration: 5000
        });

        // Update user preferences
        setUserPreferences((prev) => ({
          ...prev,
          downloadHistory: [documentId, ...prev.downloadHistory.filter((id) => id !== documentId)].slice(0, 50)
        }));

        // Clear progress after delay
        setTimeout(() => {
          setDownloadProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[documentId];
            return newProgress;
          });
        }, 3000);
      } else {
        setDownloadProgress((prev) => ({
          ...prev,
          [documentId]: { documentId, progress: Math.round(progress), status: 'downloading' }
        }));
      }
    }, 200);
  };

  const handlePreview = (documentId: string) => {
    const document = documents.find((doc) => doc.id === documentId);
    if (!document) return;

    setPreviewDocument(document);
    setDocumentPreview({
      documentId,
      previewUrl: `https://docs.google.com/viewer?url=${encodeURIComponent(document.downloadUrl)}&embedded=true`,
      isLoading: true
    });

    // Simulate preview loading
    setTimeout(() => {
      setDocumentPreview((prev) => prev ? { ...prev, isLoading: false } : null);
    }, 1500);

    // Update recently accessed
    setUserPreferences((prev) => ({
      ...prev,
      recentlyAccessed: [documentId, ...prev.recentlyAccessed.filter((id) => id !== documentId)].slice(0, 20)
    }));
  };

  const handleToggleFavorite = (documentId: string) => {
    const document = documents.find((doc) => doc.id === documentId);
    if (!document) return;

    const isFavorite = userPreferences.favoriteDocuments.includes(documentId);

    setUserPreferences((prev) => ({
      ...prev,
      favoriteDocuments: isFavorite ?
      prev.favoriteDocuments.filter((id) => id !== documentId) :
      [...prev.favoriteDocuments, documentId]
    }));

    setDocuments((prev) => prev.map((doc) =>
    doc.id === documentId ? { ...doc, isFavorite: !isFavorite } : doc
    ));

    showToast({
      type: 'info',
      title: isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos',
      message: `${document.title}`,
      duration: 3000
    });
  };

  const handleBulkSelect = (documentId: string, selected: boolean) => {
    setSelectedDocuments((prev) =>
    selected ?
    [...prev, documentId] :
    prev.filter((id) => id !== documentId)
    );
  };

  const handleSelectAll = () => {
    setSelectedDocuments(filteredDocuments.map((doc) => doc.id));
  };

  const handleClearSelection = () => {
    setSelectedDocuments([]);
  };

  const handleBulkDownload = (request: BulkDownloadRequest) => {
    showToast({
      type: 'info',
      title: 'Preparando descarga',
      message: `Preparando ${request.documentIds.length} documentos para descarga...`,
      duration: 5000
    });

    // Simulate bulk download preparation
    setTimeout(() => {
      showToast({
        type: 'success',
        title: 'Descarga iniciada',
        message: `La descarga de ${request.documentIds.length} documentos ha comenzado`,
        duration: 5000
      });
      setSelectedDocuments([]);
    }, 2000);
  };

  const showToast = (notification: Omit<ToastNotificationType, 'id' | 'isVisible'>) => {
    const id = Date.now().toString();
    const toast: ToastNotificationType = {
      ...notification,
      id,
      isVisible: true
    };

    setToastNotifications((prev) => [...prev, toast]);
  };

  const hideToast = (id: string) => {
    setToastNotifications((prev) =>
    prev.map((toast) =>
    toast.id === id ? { ...toast, isVisible: false } : toast
    )
    );

    setTimeout(() => {
      setToastNotifications((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  };

  const favoriteDocuments = documents.filter((doc) => userPreferences.favoriteDocuments.includes(doc.id));
  const recentDocuments = documents.filter((doc) => userPreferences.recentlyAccessed.includes(doc.id)).
  sort((a, b) => {
    const aIndex = userPreferences.recentlyAccessed.indexOf(a.id);
    const bIndex = userPreferences.recentlyAccessed.indexOf(b.id);
    return aIndex - bIndex;
  });

  return (
    <>
      <Helmet>
        <title>Biblioteca de Recursos - Santa Catalina Digital Campus</title>
        <meta name="description" content="Accede a documentos académicos, formularios, políticas y recursos educativos de la Institución Educativa Santa Catalina de Siena." />
        <meta name="keywords" content="recursos educativos, documentos académicos, formularios, biblioteca digital, Santa Catalina" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse-subtle">
                    <Icon name="BookOpen" size={32} className="text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                  Biblioteca de <span className="text-gradient">Recursos</span>
                </h1>
                <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                  Accede a documentos académicos, formularios, políticas y recursos educativos 
                  organizados para facilitar tu experiencia educativa en Santa Catalina.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {documents.length}
                  </div>
                  <div className="text-sm text-text-secondary">Documentos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {categories.length}
                  </div>
                  <div className="text-sm text-text-secondary">Categorías</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}
                  </div>
                  <div className="text-sm text-text-secondary">Descargas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-text-secondary">Sedes</div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Quick Access */}
              <QuickAccess
                favoriteDocuments={favoriteDocuments}
                recentDocuments={recentDocuments}
                onDocumentClick={handlePreview}
                onViewAllFavorites={() => handleSearch({
                  query: '',
                  filters: { category: '', subject: '', gradeLevel: '', fileType: '', campus: '', dateRange: '' },
                  sortBy: 'date',
                  sortOrder: 'desc'
                })}
                onViewAllRecent={() => handleSearch({
                  query: '',
                  filters: { category: '', subject: '', gradeLevel: '', fileType: '', campus: '', dateRange: '' },
                  sortBy: 'date',
                  sortOrder: 'desc'
                })} />


              {/* Search Bar */}
              <SearchBar
                onSearch={handleSearch}
                totalResults={filteredDocuments.length}
                isLoading={isLoading} />


              {/* Category Grid */}
              <div className="mt-8">
                <CategoryGrid
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect} />

              </div>

              {/* View Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-text-primary">
                    {selectedCategory ?
                    categories.find((cat) => cat.id === selectedCategory)?.name :
                    'Todos los documentos'
                    }
                  </h2>
                  <span className="text-sm text-text-secondary">
                    ({filteredDocuments.length} documento{filteredDocuments.length !== 1 ? 's' : ''})
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBulkSelect(!showBulkSelect)}
                    iconName="CheckSquare"
                    iconPosition="left"
                    className={showBulkSelect ? 'bg-primary/10 text-primary border-primary' : ''}>

                    Selección múltiple
                  </Button>
                  <div className="flex border border-border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      iconName="Grid3X3"
                      className="rounded-none" />

                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      iconName="List"
                      className="rounded-none" />

                  </div>
                </div>
              </div>

              {/* Documents Grid/List */}
              {isLoading ?
              <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
                    <p className="text-text-secondary">Cargando documentos...</p>
                  </div>
                </div> :
              filteredDocuments.length > 0 ?
              <div className={
              viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'
              }>
                  {filteredDocuments.map((document) =>
                <DocumentCard
                  key={document.id}
                  document={document}
                  viewMode={viewMode}
                  downloadProgress={downloadProgress[document.id]}
                  onDownload={handleDownload}
                  onPreview={handlePreview}
                  onToggleFavorite={handleToggleFavorite}
                  onBulkSelect={handleBulkSelect}
                  isSelected={selectedDocuments.includes(document.id)}
                  showBulkSelect={showBulkSelect} />

                )}
                </div> :

              <div className="text-center py-16">
                  <Icon name="Search" size={64} className="text-text-secondary mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-medium text-text-primary mb-2">No se encontraron documentos</h3>
                  <p className="text-text-secondary mb-6">
                    Intenta ajustar los filtros de búsqueda o explora otras categorías.
                  </p>
                  <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('');
                    handleSearch({
                      query: '',
                      filters: { category: '', subject: '', gradeLevel: '', fileType: '', campus: '', dateRange: '' },
                      sortBy: 'date',
                      sortOrder: 'desc'
                    });
                  }}
                  iconName="RefreshCw"
                  iconPosition="left">

                    Mostrar todos los documentos
                  </Button>
                </div>
              }
            </div>
          </section>
        </main>

        {/* Bulk Actions */}
        <BulkActions
          selectedDocuments={selectedDocuments}
          totalDocuments={filteredDocuments.length}
          onBulkDownload={handleBulkDownload}
          onSelectAll={handleSelectAll}
          onClearSelection={handleClearSelection}
          isVisible={showBulkSelect} />


        {/* Document Preview Modal */}
        {previewDocument && documentPreview &&
        <DocumentPreview
          document={previewDocument}
          preview={documentPreview}
          isOpen={!!previewDocument}
          onClose={() => {
            setPreviewDocument(null);
            setDocumentPreview(null);
          }}
          onDownload={handleDownload} />

        }

        {/* Toast Notifications */}
        {toastNotifications.map((notification) =>
        <ToastNotification
          key={notification.id}
          notification={notification}
          onClose={hideToast} />

        )}

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Icon name="BookOpen" size={24} className="text-primary" />
              </div>
              <p className="text-text-secondary">
                © {new Date().getFullYear()} Institución Educativa Santa Catalina de Siena. 
                Todos los derechos reservados.
              </p>
              <p className="text-sm text-text-secondary mt-2">
                Biblioteca Digital - Acceso a recursos educativos las 24 horas
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>);

};

export default ResourceLibrary;