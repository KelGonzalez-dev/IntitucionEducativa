import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { CalendarFilter, Campus, EventType, GradeLevel } from '../types/index';

interface CalendarFiltersProps {
  filters: CalendarFilter;
  campuses: Campus[];
  eventTypes: EventType[];
  gradeLevels: GradeLevel[];
  onFiltersChange: (filters: CalendarFilter) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  filters,
  campuses,
  eventTypes,
  gradeLevels,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onToggle
}) => {
  const handleCampusChange = (selectedCampuses: string[]) => {
    onFiltersChange({
      ...filters,
      campuses: selectedCampuses
    });
  };

  const handleEventTypeChange = (selectedTypes: string[]) => {
    onFiltersChange({
      ...filters,
      eventTypes: selectedTypes
    });
  };

  const handleGradeLevelChange = (selectedLevels: string[]) => {
    onFiltersChange({
      ...filters,
      gradeLevels: selectedLevels
    });
  };

  const campusOptions = campuses.map(campus => ({
    value: campus.id,
    label: campus.name
  }));

  const eventTypeOptions = eventTypes.map(type => ({
    value: type.id,
    label: type.name
  }));

  const gradeLevelOptions = gradeLevels.map(level => ({
    value: level.id,
    label: `${level.name} (${level.range})`
  }));

  const activeFiltersCount = 
    filters.campuses.length + 
    filters.eventTypes.length + 
    filters.gradeLevels.length +
    (filters.showHolidays ? 1 : 0) +
    (filters.showImportant ? 1 : 0);

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      {/* Filter Toggle Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-text-primary">
            Filtros del Calendario
          </h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-text-secondary hover:text-primary"
            >
              Limpiar
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-8 h-8 p-0"
          >
            <Icon 
              name={isOpen ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="transition-transform duration-200"
            />
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Campus Filter */}
            <div>
              <Select
                label="Sedes"
                placeholder="Seleccionar sedes"
                multiple
                searchable
                clearable
                options={campusOptions}
                value={filters.campuses}
                onChange={handleCampusChange}
                className="w-full"
              />
            </div>

            {/* Event Type Filter */}
            <div>
              <Select
                label="Tipos de Evento"
                placeholder="Seleccionar tipos"
                multiple
                searchable
                clearable
                options={eventTypeOptions}
                value={filters.eventTypes}
                onChange={handleEventTypeChange}
                className="w-full"
              />
            </div>

            {/* Grade Level Filter */}
            <div>
              <Select
                label="Niveles Académicos"
                placeholder="Seleccionar niveles"
                multiple
                searchable
                clearable
                options={gradeLevelOptions}
                value={filters.gradeLevels}
                onChange={handleGradeLevelChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="border-t border-border pt-4">
            <h4 className="font-medium text-text-primary mb-3">Filtros Rápidos</h4>
            <div className="flex flex-wrap gap-4">
              <Checkbox
                label="Mostrar Festivos"
                checked={filters.showHolidays}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  showHolidays: e.target.checked
                })}
              />
              <Checkbox
                label="Solo Eventos Importantes"
                checked={filters.showImportant}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  showImportant: e.target.checked
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarFilters;