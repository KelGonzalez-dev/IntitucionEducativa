import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { CalendarView } from '../types/index';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView['type']) => void;
  onNavigate: (direction: 'prev' | 'next' | 'today') => void;
  onExport: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onViewChange,
  onNavigate,
  onExport
}) => {
  const formatHeaderDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      locale: 'es-CO'
    };
    
    if (view.type === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} de ${startOfWeek.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}`;
    }
    
    if (view.type === 'day') {
      return currentDate.toLocaleDateString('es-CO', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    return currentDate.toLocaleDateString('es-CO', options);
  };

  const viewButtons = [
    { type: 'month' as const, label: 'Mes', icon: 'Calendar' },
    { type: 'week' as const, label: 'Semana', icon: 'CalendarDays' },
    { type: 'day' as const, label: 'Día', icon: 'CalendarCheck' },
    { type: 'agenda' as const, label: 'Agenda', icon: 'List' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Navigation Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('prev')}
              className="w-10 h-10 p-0"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('today')}
              className="px-4"
            >
              Hoy
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('next')}
              className="w-10 h-10 p-0"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
          
          <h2 className="text-xl font-heading font-semibold text-text-primary capitalize">
            {formatHeaderDate()}
          </h2>
        </div>

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center bg-muted rounded-lg p-1">
            {viewButtons.map((button) => (
              <Button
                key={button.type}
                variant={view.type === button.type ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(button.type)}
                className={`px-3 py-2 text-xs font-medium ${
                  view.type === button.type 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={button.icon} size={14} className="mr-1" />
                {button.label}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;