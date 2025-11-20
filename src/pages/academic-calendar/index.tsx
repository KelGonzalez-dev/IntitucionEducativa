import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header.tsx';
import CalendarHeader from './components/CalendarHeader';
import CalendarFilters from './components/CalendarFilters.tsx';
import CalendarGrid from './components/CalendarGrid.tsx';
import EventModal from './components/EventModal.tsx';
import UpcomingEvents from './components/UpcomingEvents.tsx';
import ExportModal from './components/ExportModal.tsx';
import Icon from '../../components/AppIcon.tsx';
import Button from '../../components/ui/Button.tsx';
import { 
  CalendarEvent, 
  CalendarView, 
  CalendarFilter, 
  Campus, 
  EventType, 
  GradeLevel,
  ExportOptions 
} from './types/index';

const AcademicCalendar: React.FC = () => {
  const [view, setView] = useState<CalendarView>({
    type: 'month',
    currentDate: new Date()
  });
  
  const [filters, setFilters] = useState<CalendarFilter>({
    campuses: [],
    eventTypes: [],
    gradeLevels: [],
    showHolidays: true,
    showImportant: true
  });

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Mock data
  const campuses: Campus[] = [
    { id: 'leyda', name: 'Sede Leyda Garrido', color: '#C00000' },
    { id: 'san-jose', name: 'Sede San José', color: '#8B0000' },
    { id: 'maria-eugenia', name: 'Sede María Eugenia', color: '#FF6B6B' }
  ];

  const eventTypes: EventType[] = [
    { id: 'academic', name: 'Académico', color: '#C00000', icon: 'BookOpen' },
    { id: 'cultural', name: 'Cultural', color: '#8B0000', icon: 'Music' },
    { id: 'sports', name: 'Deportivo', color: '#FF6B6B', icon: 'Trophy' },
    { id: 'administrative', name: 'Administrativo', color: '#6C757D', icon: 'FileText' },
    { id: 'holiday', name: 'Festivo', color: '#28A745', icon: 'Calendar' },
    { id: 'meeting', name: 'Reunión', color: '#FFC107', icon: 'Users' }
  ];

  const gradeLevels: GradeLevel[] = [
    { id: 'preescolar', name: 'Preescolar', range: '3-5 años' },
    { id: 'primaria', name: 'Primaria', range: '1° - 5°' },
    { id: 'secundaria', name: 'Secundaria', range: '6° - 9°' },
    { id: 'media', name: 'Media', range: '10° - 11°' },
    { id: 'todos', name: 'Todos los niveles', range: 'General' }
  ];

  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Inicio de Clases Primer Período',
      description: `Bienvenida a todos los estudiantes para el inicio del año académico 2024. \nActividades de integración y presentación de docentes.\nEntrega de horarios y materiales académicos.`,
      date: new Date(2024, 1, 5), // February 5, 2024
      startTime: '07:00',
      endTime: '12:00',
      type: eventTypes[0],
      campus: campuses[0],
      gradeLevel: gradeLevels[4],
      isRecurring: false,
      color: '#C00000',
      isHoliday: false,
      isImportant: true,
      location: 'Auditorio Principal',
      organizer: 'Coordinación Académica'
    },
    {
      id: '2',
      title: 'Día de la Independencia',
      description: `Celebración del Día de la Independencia de Colombia.\nActividades culturales y cívicas.\nDescanso académico para toda la comunidad educativa.`,
      date: new Date(2024, 6, 20), // July 20, 2024
      type: eventTypes[4],
      campus: campuses[0],
      isRecurring: true,
      recurringPattern: {
        frequency: 'yearly',
        interval: 1
      },
      color: '#28A745',
      isHoliday: true,
      isImportant: true,
      location: 'Todas las sedes'
    },
    {
      id: '3',
      title: 'Festival Cultural Santa Catalina',
      description: `Festival anual de talentos y expresiones culturales.\nParticipación de todos los niveles académicos.\nPresentaciones de danza, música, teatro y artes plásticas.`,
      date: new Date(2024, 3, 15), // April 15, 2024
      startTime: '14:00',
      endTime: '18:00',
      type: eventTypes[1],
      campus: campuses[1],
      gradeLevel: gradeLevels[4],
      isRecurring: true,
      recurringPattern: {
        frequency: 'yearly',
        interval: 1
      },
      color: '#8B0000',
      isHoliday: false,
      isImportant: true,
      location: 'Patio Central',
      organizer: 'Departamento de Artes'
    },
    {
      id: '4',
      title: 'Olimpiadas Deportivas Intercursos',
      description: `Competencias deportivas entre diferentes cursos y niveles.\nDisciplinas: fútbol, baloncesto, voleibol, atletismo.\nPromoviendo valores de respeto, responsabilidad y justicia.`,
      date: new Date(2024, 4, 10), // May 10, 2024
      startTime: '08:00',
      endTime: '16:00',
      type: eventTypes[2],
      campus: campuses[2],
      gradeLevel: gradeLevels[2],
      isRecurring: false,
      color: '#FF6B6B',
      isHoliday: false,
      isImportant: true,
      location: 'Polideportivo',
      organizer: 'Departamento de Educación Física'
    },
    {
      id: '5',
      title: 'Reunión de Padres de Familia',
      description: `Encuentro trimestral con padres de familia para socializar avances académicos.\nEntrega de boletines y orientaciones pedagógicas.\nEspacio para diálogo y retroalimentación.`,
      date: new Date(2024, 2, 20), // March 20, 2024
      startTime: '18:00',
      endTime: '20:00',
      type: eventTypes[5],
      campus: campuses[0],
      gradeLevel: gradeLevels[1],
      isRecurring: true,
      recurringPattern: {
        frequency: 'monthly',
        interval: 3
      },
      color: '#FFC107',
      isHoliday: false,
      isImportant: true,
      location: 'Aulas de clase',
      organizer: 'Coordinación de Convivencia'
    },
    {
      id: '6',
      title: 'Semana de la Ciencia y la Tecnología',
      description: `Feria científica con proyectos estudiantiles innovadores.\nTalleres de robótica, programación y experimentos.\nConferencias magistrales con expertos invitados.`,
      date: new Date(2024, 8, 25), // September 25, 2024
      startTime: '08:00',
      endTime: '17:00',
      type: eventTypes[0],
      campus: campuses[1],
      gradeLevel: gradeLevels[3],
      isRecurring: true,
      recurringPattern: {
        frequency: 'yearly',
        interval: 1
      },
      color: '#C00000',
      isHoliday: false,
      isImportant: true,
      location: 'Laboratorios y Biblioteca',
      organizer: 'Departamento de Ciencias'
    }
  ];

  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);

  // Filter events based on current filters
  const filteredEvents = events.filter(event => {
    if (filters.campuses.length > 0 && !filters.campuses.includes(event.campus.id)) {
      return false;
    }
    if (filters.eventTypes.length > 0 && !filters.eventTypes.includes(event.type.id)) {
      return false;
    }
    if (filters.gradeLevels.length > 0 && event.gradeLevel && !filters.gradeLevels.includes(event.gradeLevel.id)) {
      return false;
    }
    if (!filters.showHolidays && event.isHoliday) {
      return false;
    }
    if (filters.showImportant && !event.isImportant) {
      return false;
    }
    return true;
  });

  // Get upcoming events (next 30 days)
  const upcomingEvents = filteredEvents
    .filter(event => {
      const today = new Date();
      const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      return event.date >= today && event.date <= thirtyDaysFromNow;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const handleViewChange = (newViewType: CalendarView['type']) => {
    setView(prev => ({ ...prev, type: newViewType }));
  };

  const handleNavigate = (direction: 'prev' | 'next' | 'today') => {
    setView(prev => {
      const newDate = new Date(prev.currentDate);
      
      if (direction === 'today') {
        return { ...prev, currentDate: new Date() };
      }
      
      if (prev.type === 'month') {
        if (direction === 'prev') {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
      } else if (prev.type === 'week') {
        if (direction === 'prev') {
          newDate.setDate(newDate.getDate() - 7);
        } else {
          newDate.setDate(newDate.getDate() + 7);
        }
      } else if (prev.type === 'day') {
        if (direction === 'prev') {
          newDate.setDate(newDate.getDate() - 1);
        } else {
          newDate.setDate(newDate.getDate() + 1);
        }
      }
      
      return { ...prev, currentDate: newDate };
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleDateClick = (date: Date) => {
    // Could open a "create event" modal or navigate to day view
    console.log('Date clicked:', date);
  };

  const handleExport = (options: ExportOptions) => {
    // Mock export functionality
    const filename = `calendario-santa-catalina.${options.format}`;
    
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        <span>Calendario exportado como ${filename}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleAddToCalendar = (event: CalendarEvent) => {
    // Mock add to calendar functionality
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14m-7-7h14"/>
        </svg>
        <span>Evento agregado a tu calendario</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const clearFilters = () => {
    setFilters({
      campuses: [],
      eventTypes: [],
      gradeLevels: [],
      showHolidays: true,
      showImportant: true
    });
  };

  return (
    <>
      <Helmet>
        <title>Calendario Académico - Santa Catalina Digital Campus</title>
        <meta 
          name="description" 
          content="Calendario académico interactivo de la Institución Educativa Santa Catalina de Siena. Consulta fechas importantes, eventos, actividades y programación académica."
        />
        <meta name="keywords" content="calendario académico, eventos escolares, fechas importantes, Santa Catalina, educación, cronograma escolar" />
      </Helmet>

      <div className="min-h-screen bg-canvas">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Icon name="Calendar" size={32} className="text-white" />
                  <h1 className="text-3xl lg:text-4xl font-heading font-bold">
                    Calendario Académico
                  </h1>
                </div>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Mantente informado sobre todas las fechas importantes, eventos académicos y actividades 
                  de nuestra comunidad educativa Santa Catalina de Siena.
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Calendar Area */}
              <div className="lg:col-span-3 space-y-6">
                <CalendarHeader
                  currentDate={view.currentDate}
                  view={view}
                  onViewChange={handleViewChange}
                  onNavigate={handleNavigate}
                  onExport={() => setIsExportModalOpen(true)}
                />

                <CalendarFilters
                  filters={filters}
                  campuses={campuses}
                  eventTypes={eventTypes}
                  gradeLevels={gradeLevels}
                  onFiltersChange={setFilters}
                  onClearFilters={clearFilters}
                  isOpen={isFiltersOpen}
                  onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
                />

                <CalendarGrid
                  events={filteredEvents}
                  view={view}
                  onEventClick={handleEventClick}
                  onDateClick={handleDateClick}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <UpcomingEvents
                  events={upcomingEvents}
                  onEventClick={handleEventClick}
                  onViewAll={() => setView({ type: 'agenda', currentDate: new Date() })}
                />

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <Icon name="Zap" size={18} className="text-primary" />
                    Acciones Rápidas
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Plus"
                      iconPosition="left"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Solicitar Evento
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Bell"
                      iconPosition="left"
                      className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                    >
                      Configurar Recordatorios
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Share2"
                      iconPosition="left"
                      className="border-accent text-accent hover:bg-accent hover:text-white"
                    >
                      Compartir Calendario
                    </Button>
                  </div>
                </div>

                {/* Calendar Legend */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <Icon name="Info" size={18} className="text-primary" />
                    Leyenda
                  </h3>
                  <div className="space-y-2">
                    {eventTypes.map((type) => (
                      <div key={type.id} className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: type.color }}
                        />
                        <span className="text-sm text-text-secondary">{type.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <EventModal
          event={selectedEvent}
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
            setSelectedEvent(null);
          }}
          onAddToCalendar={handleAddToCalendar}
        />

        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          onExport={handleExport}
          currentFilters={filters}
        />
      </div>
    </>
  );
};

export default AcademicCalendar;