import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { CalendarEvent } from '../types/index';

interface EventModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
  onAddToCalendar?: (event: CalendarEvent) => void;
}

const EventModal: React.FC<EventModalProps> = ({
  event,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onAddToCalendar
}) => {
  if (!isOpen || !event) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: event.color }}
              />
              <span className="text-sm font-medium text-text-secondary">
                {event.type.name}
              </span>
              {event.isImportant && (
                <Icon name="Star" size={14} className="text-yellow-500" />
              )}
              {event.isHoliday && (
                <Icon name="Calendar" size={14} className="text-green-500" />
              )}
            </div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              {event.title}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="w-8 h-8 p-0 -mt-1"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Date and Time */}
          <div className="flex items-start gap-3">
            <Icon name="Calendar" size={18} className="text-primary mt-0.5" />
            <div>
              <p className="font-medium text-text-primary">
                {formatDate(event.date)}
              </p>
              {(event.startTime || event.endTime) && (
                <p className="text-sm text-text-secondary">
                  {event.startTime && formatTime(event.startTime)}
                  {event.startTime && event.endTime && ' - '}
                  {event.endTime && formatTime(event.endTime)}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-start gap-3">
              <Icon name="MapPin" size={18} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-text-primary">Ubicación</p>
                <p className="text-sm text-text-secondary">{event.location}</p>
              </div>
            </div>
          )}

          {/* Campus */}
          <div className="flex items-start gap-3">
            <Icon name="Building" size={18} className="text-primary mt-0.5" />
            <div>
              <p className="font-medium text-text-primary">Sede</p>
              <p className="text-sm text-text-secondary">{event.campus.name}</p>
            </div>
          </div>

          {/* Grade Level */}
          {event.gradeLevel && (
            <div className="flex items-start gap-3">
              <Icon name="GraduationCap" size={18} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-text-primary">Nivel Académico</p>
                <p className="text-sm text-text-secondary">
                  {event.gradeLevel.name} ({event.gradeLevel.range})
                </p>
              </div>
            </div>
          )}

          {/* Organizer */}
          {event.organizer && (
            <div className="flex items-start gap-3">
              <Icon name="User" size={18} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-text-primary">Organizador</p>
                <p className="text-sm text-text-secondary">{event.organizer}</p>
              </div>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="flex items-start gap-3">
              <Icon name="FileText" size={18} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-text-primary">Descripción</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          )}

          {/* Recurring Pattern */}
          {event.isRecurring && event.recurringPattern && (
            <div className="flex items-start gap-3">
              <Icon name="Repeat" size={18} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-text-primary">Evento Recurrente</p>
                <p className="text-sm text-text-secondary">
                  Se repite {event.recurringPattern.frequency === 'weekly' ? 'semanalmente' : 
                           event.recurringPattern.frequency === 'monthly' ? 'mensualmente' : 
                           event.recurringPattern.frequency === 'yearly' ? 'anualmente' : 'diariamente'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-border">
          {onAddToCalendar && (
            <Button
              variant="outline"
              onClick={() => onAddToCalendar(event)}
              iconName="Plus"
              iconPosition="left"
              className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
            >
              Agregar a mi Calendario
            </Button>
          )}
          
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(event)}
                iconName="Edit"
                iconPosition="left"
              >
                Editar
              </Button>
            )}
            
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(event.id)}
                iconName="Trash2"
                iconPosition="left"
              >
                Eliminar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;