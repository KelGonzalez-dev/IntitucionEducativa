import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import NewsCard from './components/NewsCard';
import EventCard from './components/EventCard';
import NewspaperCard from './components/NewspaperCard';
import FilterBar from './components/FilterBar';
import NewsletterSubscription from './components/NewsletterSubscription';
import SocialFeed from './components/SocialFeed';
import { NewsArticle, Event, NewspaperEdition, FilterOptions, SocialPost, Newsletter } from './types';

const NewsAndEventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'events' | 'newspaper'>('news');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    dateRange: 'all',
    sortBy: 'date',
    searchQuery: ''
  });
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);

  // Mock data for news articles
  const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Estudiantes de Santa Catalina Ganan Concurso Nacional de Ciencias',
    excerpt: 'Nuestros estudiantes de grado 11 obtuvieron el primer lugar en el concurso nacional de ciencias con su proyecto sobre energías renovables.',
    content: `Los estudiantes María González, Carlos Rodríguez y Ana Martínez del grado 11-A han logrado un hito histórico para nuestra institución al ganar el primer lugar en el Concurso Nacional de Ciencias 2024.\n\nSu proyecto "Energía Solar Comunitaria: Una Solución Sostenible para Zonas Rurales" impresionó al jurado por su innovación y aplicabilidad práctica. El proyecto propone un sistema de paneles solares comunitarios que puede ser implementado en zonas rurales de Colombia.\n\nLa directora académica, Dra. Patricia Hernández, expresó su orgullo: "Este logro refleja el compromiso de nuestros estudiantes con la excelencia académica y su preocupación por el medio ambiente. Es un ejemplo perfecto de cómo la educación puede generar soluciones reales para nuestra sociedad."\n\nLos estudiantes recibirán una beca completa para estudios universitarios y la oportunidad de presentar su proyecto en el Congreso Internacional de Jóvenes Científicos en Brasil.`,
    author: 'Dra. Patricia Hernández',
    publishDate: new Date(2024, 2, 15),
    category: 'academic',
    image: "https://images.unsplash.com/photo-1676905505142-c6bb852c40cf",
    alt: 'Tres estudiantes en uniformes escolares sosteniendo un trofeo dorado en laboratorio de ciencias con equipos científicos al fondo',
    tags: ['ciencias', 'concurso', 'energía renovable', 'estudiantes'],
    featured: true,
    readTime: 5,
    likes: 234,
    comments: 45,
    shares: 67
  },
  {
    id: '2',
    title: 'Nueva Biblioteca Digital Disponible para Toda la Comunidad',
    excerpt: 'Inauguramos nuestra biblioteca digital con más de 10,000 recursos educativos disponibles 24/7 para estudiantes y familias.',
    content: `La Institución Educativa Santa Catalina de Siena se enorgullece en anunciar el lanzamiento de su nueva biblioteca digital, un recurso revolucionario que transformará la manera en que nuestra comunidad accede al conocimiento.\n\nLa biblioteca cuenta con más de 10,000 recursos digitales incluyendo libros electrónicos, revistas académicas, videos educativos, y bases de datos especializadas. Los estudiantes podrán acceder a estos recursos las 24 horas del día, los 7 días de la semana, desde cualquier dispositivo con conexión a internet.\n\nEl coordinador de tecnología educativa, Ing. Roberto Silva, explicó: "Esta biblioteca digital representa nuestro compromiso con la educación del siglo XXI. Estamos eliminando las barreras geográficas y temporales que tradicionalmente limitaban el acceso a la información."\n\nLas familias recibirán capacitación gratuita sobre el uso de la plataforma durante las próximas semanas.`,
    author: 'Ing. Roberto Silva',
    publishDate: new Date(2024, 2, 10),
    category: 'academic',
    image: "https://images.unsplash.com/photo-1615889944278-3aab1d57d543",
    alt: 'Biblioteca moderna con estudiantes usando tablets y computadoras, estanterías digitales y pantallas interactivas',
    tags: ['biblioteca', 'tecnología', 'recursos digitales'],
    featured: false,
    readTime: 3,
    likes: 156,
    comments: 23,
    shares: 34
  },
  {
    id: '3',
    title: 'Equipo de Fútbol Femenino Clasifica a Semifinales Departamentales',
    excerpt: 'Las Leonas de Santa Catalina continúan su racha ganadora y se acercan al título departamental de fútbol femenino.',
    content: `El equipo de fútbol femenino de Santa Catalina, conocido como "Las Leonas", ha logrado clasificar a las semifinales del campeonato departamental tras una temporada excepcional.\n\nCon una racha de 12 partidos sin perder, el equipo dirigido por la entrenadora María Elena Vargas ha demostrado un nivel de juego excepcional que las posiciona como una de las favoritas para el título.\n\nLa capitana del equipo, Sofía Ramírez de grado 10, comentó: "Hemos trabajado muy duro durante todo el año. Este logro es el resultado del esfuerzo de todo el equipo y el apoyo incondicional de nuestra institución y nuestras familias."\n\nLa semifinal se jugará el próximo sábado en el estadio municipal contra el equipo del Colegio San Francisco. La comunidad educativa está invitada a apoyar a nuestras deportistas.`,
    author: 'Prof. María Elena Vargas',
    publishDate: new Date(2024, 2, 8),
    category: 'sports',
    image: "https://images.unsplash.com/photo-1542720264-47dcc2821007",
    alt: 'Equipo de fútbol femenino juvenil celebrando victoria en cancha de fútbol, jugadoras en uniformes rojos abrazándose',
    tags: ['fútbol', 'deportes', 'femenino', 'semifinales'],
    featured: true,
    readTime: 4,
    likes: 189,
    comments: 31,
    shares: 45
  },
  {
    id: '4',
    title: 'Festival Cultural "Tradiciones de Nuestra Tierra" Próximamente',
    excerpt: 'Prepárate para una celebración única de la cultura colombiana con presentaciones, gastronomía y tradiciones ancestrales.',
    content: `El próximo mes de abril, Santa Catalina de Siena será el escenario del Festival Cultural "Tradiciones de Nuestra Tierra", un evento que celebrará la riqueza cultural de Colombia.\n\nEl festival contará con presentaciones de danza folclórica, música tradicional, exposiciones de arte estudiantil y una muestra gastronómica con platos típicos de diferentes regiones del país.\n\nLa coordinadora cultural, Lic. Carmen Delgado, explicó: "Este festival es una oportunidad única para que nuestros estudiantes y familias se conecten con sus raíces culturales y celebren la diversidad que nos caracteriza como colombianos."\n\nSe esperan más de 500 asistentes entre estudiantes, familias y miembros de la comunidad. La entrada será gratuita y habrá actividades para todas las edades.`,
    author: 'Lic. Carmen Delgado',
    publishDate: new Date(2024, 2, 5),
    category: 'cultural',
    image: "https://images.unsplash.com/flagged/photo-1567278880324-e62b20d29996",
    alt: 'Estudiantes en trajes folclóricos colombianos bailando en patio escolar decorado con banderas y flores coloridas',
    tags: ['cultura', 'festival', 'tradiciones', 'colombia'],
    featured: false,
    readTime: 3,
    likes: 145,
    comments: 28,
    shares: 52
  }];


  // Mock data for events
  const events: Event[] = [
  {
    id: '1',
    title: 'Feria de Ciencias y Tecnología 2024',
    description: 'Exposición de proyectos científicos y tecnológicos desarrollados por nuestros estudiantes durante el año académico.',
    date: new Date(2024, 3, 20),
    time: '8:00 AM - 4:00 PM',
    location: 'Auditorio Principal - Sede Central',
    category: 'academic',
    image: "https://images.unsplash.com/photo-1731067356461-9eb417cce8dd",
    alt: 'Estudiantes presentando proyectos científicos en stands con experimentos, robots y maquetas en feria escolar',
    organizer: 'Departamento de Ciencias',
    capacity: 300,
    registered: 245,
    featured: true,
    rsvpRequired: true
  },
  {
    id: '2',
    title: 'Torneo Intercolegial de Ajedrez',
    description: 'Competencia de ajedrez entre instituciones educativas del departamento. Categorías infantil, juvenil y libre.',
    date: new Date(2024, 3, 25),
    time: '9:00 AM - 5:00 PM',
    location: 'Biblioteca - Sede San José',
    category: 'sports',
    image: "https://images.unsplash.com/photo-1728534395899-0d0dc885922a",
    alt: 'Estudiantes concentrados jugando ajedrez en torneo escolar, tableros organizados en salón iluminado',
    organizer: 'Club de Ajedrez',
    capacity: 120,
    registered: 89,
    featured: false,
    rsvpRequired: true
  },
  {
    id: '3',
    title: 'Reunión de Padres de Familia - Grado 11',
    description: 'Información importante sobre el proceso de graduación, universidades y orientación vocacional para estudiantes de último año.',
    date: new Date(2024, 3, 18),
    time: '6:00 PM - 8:00 PM',
    location: 'Auditorio Sede Leyda Garrido',
    category: 'meeting',
    image: "https://images.unsplash.com/photo-1570616969692-54d6ba3d0397",
    alt: 'Padres de familia sentados en auditorio escolar escuchando presentación sobre graduación y universidades',
    organizer: 'Coordinación Académica',
    featured: false,
    rsvpRequired: true
  },
  {
    id: '4',
    title: 'Celebración Día del Idioma',
    description: 'Actividades especiales para celebrar el Día del Idioma con recitales de poesía, obras de teatro y concursos literarios.',
    date: new Date(2024, 3, 23),
    time: '10:00 AM - 12:00 PM',
    location: 'Patio Central - Todas las Sedes',
    category: 'cultural',
    image: "https://images.unsplash.com/photo-1573872989092-1bedea478f73",
    alt: 'Estudiantes recitando poesía en escenario decorado con libros y letras gigantes para celebración del día del idioma',
    organizer: 'Departamento de Español',
    featured: true,
    rsvpRequired: false
  }];


  // Mock data for newspaper editions
  const newspaperEditions: NewspaperEdition[] = [
  {
    id: '1',
    title: 'El Catalino Digital',
    edition: 'Edición Marzo 2024',
    publishDate: new Date(2024, 2, 1),
    coverImage: "https://images.unsplash.com/photo-1709726749646-912dcdfb5f40",
    alt: 'Portada de periódico escolar con titular sobre logros académicos, fotos de estudiantes y diseño colorido institucional',
    description: 'En esta edición especial celebramos los logros académicos del primer trimestre, destacamos el trabajo de nuestros docentes y compartimos las próximas actividades culturales.',
    pdfUrl: '/assets/documents/catalino-marzo-2024.pdf',
    articles: ['Logros Académicos Q1', 'Nuevos Docentes', 'Festival Cultural', 'Deportes', 'Galería Fotográfica'],
    downloads: 1247
  },
  {
    id: '2',
    title: 'El Catalino Digital',
    edition: 'Edición Febrero 2024',
    publishDate: new Date(2024, 1, 1),
    coverImage: "https://images.unsplash.com/photo-1644700309934-077edfd937bf",
    alt: 'Portada de periódico escolar de febrero con tema de San Valentín, corazones rojos y actividades de amistad estudiantil',
    description: 'Edición especial del mes del amor y la amistad con actividades especiales, proyectos colaborativos y celebraciones comunitarias.',
    pdfUrl: '/assets/documents/catalino-febrero-2024.pdf',
    articles: ['Mes del Amor', 'Proyectos Colaborativos', 'Actividades Especiales', 'Comunidad'],
    downloads: 892
  },
  {
    id: '3',
    title: 'El Catalino Digital',
    edition: 'Edición Enero 2024',
    publishDate: new Date(2024, 0, 1),
    coverImage: "https://images.unsplash.com/photo-1690186495606-cd991a96d132",
    alt: 'Portada de periódico escolar de enero con tema de año nuevo, calendarios 2024 y propósitos estudiantiles',
    description: 'Comenzamos el año con nuevas metas, proyectos innovadores y la bienvenida a estudiantes y familias para un 2024 lleno de aprendizaje.',
    pdfUrl: '/assets/documents/catalino-enero-2024.pdf',
    articles: ['Bienvenida 2024', 'Nuevas Metas', 'Proyectos Innovadores', 'Calendario Académico'],
    downloads: 1156
  }];


  // Mock data for social posts
  const socialPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'facebook',
    content: '¡Felicitaciones a nuestros estudiantes ganadores del concurso nacional de ciencias! Su dedicación y creatividad nos llena de orgullo. 🏆🔬 #CienciaJoven #OrgulloSantaCatalina',
    image: "https://images.unsplash.com/photo-1676905505142-c6bb852c40cf",
    alt: 'Estudiantes celebrando con trofeo de ciencias en laboratorio escolar',
    timestamp: new Date(2024, 2, 15, 14, 30),
    likes: 234,
    shares: 45,
    comments: 67
  },
  {
    id: '2',
    platform: 'instagram',
    content: 'Preparándonos para el Festival Cultural "Tradiciones de Nuestra Tierra" 🇨🇴 ¡No te lo puedes perder! #CulturaColombiana #FestivalCultural #SantaCatalina',
    image: "https://images.unsplash.com/photo-1667386429799-e26efed8ba9e",
    alt: 'Estudiantes ensayando danzas folclóricas en trajes tradicionales colombianos',
    timestamp: new Date(2024, 2, 12, 16, 45),
    likes: 189,
    shares: 23,
    comments: 34
  },
  {
    id: '3',
    platform: 'twitter',
    content: 'Nueva biblioteca digital disponible 24/7 para toda nuestra comunidad educativa. ¡El conocimiento no tiene horarios! 📚💻 #BibliotecaDigital #EducaciónSigloXXI',
    timestamp: new Date(2024, 2, 10, 10, 15),
    likes: 156,
    shares: 78,
    comments: 23
  }];


  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      dateRange: 'all',
      sortBy: 'date',
      searchQuery: ''
    });
  };

  const handleEventRSVP = (eventId: string) => {
    console.log('RSVP for event:', eventId);
    // Here you would typically make an API call to register for the event
  };

  const handleNewsletterSubscribe = (newsletter: Newsletter) => {
    console.log('Newsletter subscription:', newsletter);
    // Here you would typically make an API call to subscribe to newsletter
  };

  const handleNewspaperDownload = (editionId: string) => {
    console.log('Download newspaper:', editionId);
    // Here you would typically track the download
  };

  // Filter and sort content based on current filters
  const filteredNews = newsArticles.filter((article) => {
    if (filters.category !== 'all' && article.category !== filters.category) return false;
    if (filters.searchQuery && !article.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
    !article.excerpt.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredEvents = events.filter((event) => {
    if (filters.category !== 'all' && event.category !== filters.category) return false;
    if (filters.searchQuery && !event.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
    !event.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    return true;
  });

  useEffect(() => {
    // Check for newsletter modal trigger (could be based on user behavior, time spent, etc.)
    const timer = setTimeout(() => {
      if (!localStorage.getItem('newsletter_shown')) {
        setShowNewsletterModal(true);
        localStorage.setItem('newsletter_shown', 'true');
      }
    }, 30000); // Show after 30 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Noticias y Eventos - Santa Catalina Digital Campus</title>
        <meta name="description" content="Mantente informado sobre las últimas noticias, eventos y logros de la comunidad educativa Santa Catalina de Siena. Descubre nuestro periódico escolar y suscríbete a nuestro boletín." />
        <meta name="keywords" content="noticias escolares, eventos educativos, periódico escolar, Santa Catalina, actividades estudiantiles, logros académicos" />
      </Helmet>

      <div className="min-h-screen bg-canvas">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Icon name="Newspaper" size={32} className="text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                Noticias y Eventos
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                Mantente conectado con nuestra comunidad educativa. Descubre las últimas noticias, 
                eventos próximos y celebra los logros de nuestros estudiantes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Bell"
                  iconPosition="left"
                  onClick={() => setShowNewsletterModal(true)}
                  className="bg-primary hover:bg-secondary">

                  Suscribirse al Boletín
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left"
                  className="border-primary text-primary hover:bg-primary hover:text-white">

                  Ver Calendario Completo
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-2xl font-bold text-primary mb-1">24</div>
                <div className="text-sm text-text-secondary">Noticias este mes</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-2xl font-bold text-primary mb-1">8</div>
                <div className="text-sm text-text-secondary">Eventos próximos</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-2xl font-bold text-primary mb-1">2.8K</div>
                <div className="text-sm text-text-secondary">Suscriptores</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-2xl font-bold text-primary mb-1">12</div>
                <div className="text-sm text-text-secondary">Ediciones periódico</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <FilterBar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters} />

        </section>

        {/* Tab Navigation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-2">
            <div className="flex space-x-1">
              {[
              { id: 'news', label: 'Noticias', icon: 'Newspaper', count: filteredNews.length },
              { id: 'events', label: 'Eventos', icon: 'Calendar', count: filteredEvents.length },
              { id: 'newspaper', label: 'Periódico Escolar', icon: 'BookOpen', count: newspaperEditions.length }].
              map((tab) =>
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-normal ${
                activeTab === tab.id ?
                'bg-primary text-white shadow-md' :
                'text-text-secondary hover:text-primary hover:bg-gray-50'}`
                }>

                  <Icon name={tab.icon} size={20} />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'}`
                }>
                    {tab.count}
                  </span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Primary Content */}
            <div className="lg:col-span-3">
              {activeTab === 'news' &&
              <div className="space-y-8">
                  {/* Featured News */}
                  {filteredNews.filter((article) => article.featured).length > 0 &&
                <div>
                      <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6 flex items-center space-x-2">
                        <Icon name="Star" size={24} className="text-primary" />
                        <span>Noticias Destacadas</span>
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {filteredNews.filter((article) => article.featured).map((article) =>
                    <NewsCard key={article.id} article={article} variant="featured" />
                    )}
                      </div>
                    </div>
                }

                  {/* Regular News */}
                  <div>
                    <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6 flex items-center space-x-2">
                      <Icon name="Newspaper" size={24} className="text-primary" />
                      <span>Todas las Noticias</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredNews.filter((article) => !article.featured).map((article) =>
                    <NewsCard key={article.id} article={article} />
                    )}
                    </div>
                  </div>
                </div>
              }

              {activeTab === 'events' &&
              <div className="space-y-8">
                  {/* Featured Events */}
                  {filteredEvents.filter((event) => event.featured).length > 0 &&
                <div>
                      <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6 flex items-center space-x-2">
                        <Icon name="Star" size={24} className="text-primary" />
                        <span>Eventos Destacados</span>
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {filteredEvents.filter((event) => event.featured).map((event) =>
                    <EventCard key={event.id} event={event} onRSVP={handleEventRSVP} />
                    )}
                      </div>
                    </div>
                }

                  {/* All Events */}
                  <div>
                    <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6 flex items-center space-x-2">
                      <Icon name="Calendar" size={24} className="text-primary" />
                      <span>Próximos Eventos</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredEvents.filter((event) => !event.featured).map((event) =>
                    <EventCard key={event.id} event={event} onRSVP={handleEventRSVP} />
                    )}
                    </div>
                  </div>
                </div>
              }

              {activeTab === 'newspaper' &&
              <div>
                  <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6 flex items-center space-x-2">
                    <Icon name="BookOpen" size={24} className="text-primary" />
                    <span>El Catalino Digital</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {newspaperEditions.map((edition) =>
                  <NewspaperCard
                    key={edition.id}
                    edition={edition}
                    onDownload={handleNewspaperDownload} />

                  )}
                  </div>
                </div>
              }
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Social Feed */}
              <SocialFeed posts={socialPosts} />

              {/* Newsletter Subscription */}
              {!showNewsletterModal &&
              <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-center">
                    <Icon name="Mail" size={32} className="text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                      Boletín Informativo
                    </h3>
                    <p className="text-text-secondary text-sm mb-4">
                      Recibe las últimas noticias directamente en tu correo
                    </p>
                    <Button
                    variant="default"
                    fullWidth
                    onClick={() => setShowNewsletterModal(true)}
                    className="bg-primary hover:bg-secondary">

                      Suscribirse
                    </Button>
                  </div>
                </div>
              }

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="Link" size={20} className="text-primary" />
                  <span>Enlaces Rápidos</span>
                </h3>
                <div className="space-y-3">
                  <Button variant="ghost" fullWidth className="justify-start">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Calendario Académico
                  </Button>
                  <Button variant="ghost" fullWidth className="justify-start">
                    <Icon name="Download" size={16} className="mr-2" />
                    Recursos Educativos
                  </Button>
                  <Button variant="ghost" fullWidth className="justify-start">
                    <Icon name="Users" size={16} className="mr-2" />
                    Directorio de Contactos
                  </Button>
                  <Button variant="ghost" fullWidth className="justify-start">
                    <Icon name="Phone" size={16} className="mr-2" />
                    Servicios Estudiantiles
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Modal */}
        {showNewsletterModal &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Suscripción al Boletín
                </h2>
                <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNewsletterModal(false)}>

                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="p-6">
                <NewsletterSubscription onSubscribe={handleNewsletterSubscribe} />
              </div>
            </div>
          </div>
        }
      </div>
    </>);

};

export default NewsAndEventsPage;