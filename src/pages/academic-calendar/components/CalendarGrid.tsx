import React from 'react';
import Icon from '../../../components/AppIcon';
import { CalendarEvent, CalendarView } from '../types/index';

interface CalendarGridProps {
  events: CalendarEvent[];
  view: CalendarView;
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  events,
  view,
  onEventClick,
  onDateClick
}) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === view.currentDate.getMonth();
  };

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  if (view.type === 'month') {
    const days = getDaysInMonth(view.currentDate);

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Week Headers */}
        <div className="grid grid-cols-7 bg-muted">
          {weekDays.map((day) => (
            <div key={day} className="p-3 text-center">
              <span className="text-sm font-medium text-text-secondary">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 divide-x divide-y divide-border">
          {days.map((date, index) => (
            <div
              key={index}
              className={`min-h-24 lg:min-h-32 p-2 cursor-pointer hover:bg-hover transition-colors ${
                date && !isCurrentMonth(date) ? 'bg-muted/30' : ''
              }`}
              onClick={() => date && onDateClick(date)}
            >
              {date && (
                <>
                  <div className={`text-sm font-medium mb-1 ${
                    isToday(date) 
                      ? 'bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center' 
                      : isCurrentMonth(date) 
                        ? 'text-text-primary' :'text-text-secondary'
                  }`}>
                    {date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {getEventsForDate(date).slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity`}
                        style={{ backgroundColor: event.color + '20', color: event.color }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                      >
                        <div className="flex items-center gap-1">
                          {event.isImportant && (
                            <Icon name="Star" size={10} className="text-yellow-500" />
                          )}
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                    
                    {getEventsForDate(date).length > 3 && (
                      <div className="text-xs text-text-secondary">
                        +{getEventsForDate(date).length - 3} más
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Week and Day views would be implemented similarly
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center text-text-secondary">
        <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
        <p>Vista de {view.type} en desarrollo</p>
      </div>
    </div>
  );
};

export default CalendarGrid;