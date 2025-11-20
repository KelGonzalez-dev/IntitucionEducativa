import React, { useState } from 'react';
import Image from '../../../components/AppImage.tsx';
import Icon from '../../../components/AppIcon.tsx';
import Button from '../../../components/ui/Button.tsx';
import { Event } from '../types/index';

interface EventCardProps {
  event: Event;
  onRSVP?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRSVP }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  const getCategoryIcon = (category: string) => {
    const icons = {
      academic: 'BookOpen',
      sports: 'Trophy',
      cultural: 'Music',
      meeting: 'Users',
      celebration: 'PartyPopper'
    };
    return icons[category as keyof typeof icons] || 'Calendar';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      sports: 'bg-green-100 text-green-800',
      cultural: 'bg-purple-100 text-purple-800',
      meeting: 'bg-orange-100 text-orange-800',
      celebration: 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const handleRSVP = () => {
    if (onRSVP) {
      onRSVP(event.id);
      setIsRegistered(true);
    }
  };

  const isEventPast = event.date < new Date();
  const isEventFull = event.capacity && event.registered >= event.capacity;

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image}
          alt={event.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-normal"
        />
        <div className="absolute top-4 left-4">
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
            <Icon name={getCategoryIcon(event.category)} size={14} />
            <span>{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
          </div>
        </div>
        {event.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Icon name="Star" size={12} />
              <span>Destacado</span>
            </div>
          </div>
        )}
        {isEventPast && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Evento Finalizado</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-2 line-clamp-2">
              {event.title}
            </h3>
            <p className="text-text-secondary mb-3 line-clamp-2">
              {event.description}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3 text-sm text-text-secondary">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-text-secondary">
            <Icon name="Clock" size={16} className="text-primary" />
            <span>{formatTime(event.time)}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-text-secondary">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-text-secondary">
            <Icon name="User" size={16} className="text-primary" />
            <span>Organizado por {event.organizer}</span>
          </div>
        </div>

        {event.capacity && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
              <span>Participantes</span>
              <span>{event.registered}/{event.capacity}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-normal"
                style={{ width: `${Math.min((event.registered / event.capacity) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {event.price && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Precio:</span>
              <span className="text-lg font-semibold text-primary">
                ${event.price.toLocaleString('es-CO')} COP
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:text-primary"
            >
              <Icon name="Share2" size={16} className="mr-1" />
              Compartir
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:text-primary"
            >
              <Icon name="Calendar" size={16} className="mr-1" />
              Agregar
            </Button>
          </div>

          {event.rsvpRequired && !isEventPast && (
            <Button
              variant={isRegistered ? "success" : "default"}
              size="sm"
              disabled={isEventFull || isRegistered}
              onClick={handleRSVP}
              className={isRegistered ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {isRegistered ? (
                <>
                  <Icon name="Check" size={16} className="mr-1" />
                  Registrado
                </>
              ) : isEventFull ? (
                "Lleno"
              ) : (
                <>
                  <Icon name="UserPlus" size={16} className="mr-1" />
                  RSVP
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default EventCard;