import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { CalendarEvent } from '../types/index';

interface UpcomingEventsProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onViewAll: () => void;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  events,
  onEventClick,
  onViewAll
}) => {
  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-CO', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDaysUntilEvent = (date: Date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="Clock" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-text-primary">
            Próximos Eventos
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="text-primary hover:text-primary hover:bg-primary/10"
        >
          Ver todos
        </Button>
      </div>

      {/* Events List */}
      <div className="divide-y divide-border">
        {events.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-text-secondary">No hay eventos próximos</p>
          </div>
        ) : (
          events.slice(0, 5).map((event) => (
            <div
              key={event.id}
              className="p-4 hover:bg-hover cursor-pointer transition-colors"
              onClick={() => onEventClick(event)}
            >
              <div className="flex items-start gap-4">
                {/* Date Badge */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center text-xs font-medium ${
                    getDaysUntilEvent(event.date) === 0 
                      ? 'bg-primary text-white' 
                      : getDaysUntilEvent(event.date) === 1
                        ? 'bg-accent text-white' :'bg-muted text-text-secondary'
                  }`}>
                    <span className="text-xs leading-none">
                      {event.date.getDate()}
                    </span>
                    <span className="text-xs leading-none uppercase">
                      {event.date.toLocaleDateString('es-CO', { month: 'short' })}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: event.color }}
                        />
                        <h4 className="font-medium text-text-primary truncate">
                          {event.title}
                        </h4>
                        {event.isImportant && (
                          <Icon name="Star" size={14} className="text-yellow-500 flex-shrink-0" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span>{formatDate(event.date)}</span>
                        {event.startTime && (
                          <span>{formatTime(event.startTime)}</span>
                        )}
                        <span className="flex items-center gap-1">
                          <Icon name="Building" size={12} />
                          {event.campus.name}
                        </span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-text-secondary">
                          <Icon name="MapPin" size={12} />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Event Type Badge */}
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded-full flex-shrink-0"
                      style={{ 
                        backgroundColor: event.color + '20', 
                        color: event.color 
                      }}
                    >
                      {event.type.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View More */}
      {events.length > 5 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            onClick={onViewAll}
            iconName="ArrowRight"
            iconPosition="right"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Ver {events.length - 5} eventos más
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;