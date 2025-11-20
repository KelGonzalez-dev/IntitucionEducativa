import React from 'react';
import Icon from '../../../components/AppIcon.tsx';
import Button from '../../../components/ui/Button.tsx';
import Input from '../../../components/ui/Input.tsx';
import Select from '../../../components/ui/Select.tsx';
import { FilterOptions } from '../types/index';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange, onClearFilters }) => {
  const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'academic', label: 'Académico' },
    { value: 'sports', label: 'Deportes' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'community', label: 'Comunidad' },
    { value: 'announcement', label: 'Anuncios' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Todo el tiempo' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'year', label: 'Este año' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Más reciente' },
    { value: 'popularity', label: 'Más popular' },
    { value: 'title', label: 'Alfabético' }
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = filters.category !== 'all' || 
                          filters.dateRange !== 'all' || 
                          filters.searchQuery !== '' ||
                          filters.sortBy !== 'date';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <span>Filtros de Búsqueda</span>
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-text-secondary hover:text-primary"
          >
            <Icon name="X" size={16} className="mr-1" />
            Limpiar filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <Input
            type="search"
            placeholder="Buscar noticias y eventos..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Select
            options={categoryOptions}
            value={filters.category}
            onChange={(value) => handleFilterChange('category', value as string)}
            placeholder="Seleccionar categoría"
          />
        </div>

        <div>
          <Select
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value as string)}
            placeholder="Rango de fecha"
          />
        </div>

        <div>
          <Select
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value as string)}
            placeholder="Ordenar por"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center space-x-4">
          <span>Filtros activos:</span>
          <div className="flex items-center space-x-2">
            {filters.category !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {categoryOptions.find(opt => opt.value === filters.category)?.label}
              </span>
            )}
            {filters.dateRange !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
              </span>
            )}
            {filters.searchQuery && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                "{filters.searchQuery}"
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} />
          <span>Actualizando en tiempo real</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;