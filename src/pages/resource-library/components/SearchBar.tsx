import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { SearchFilters, FilterOptions } from '../types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  totalResults: number;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, totalResults, isLoading }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    subject: '',
    gradeLevel: '',
    fileType: '',
    campus: '',
    dateRange: ''
  });
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'downloads' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    { value: 'academic', label: 'Material Académico' },
    { value: 'administrative', label: 'Documentos Administrativos' },
    { value: 'forms', label: 'Formularios' },
    { value: 'policies', label: 'Políticas y Reglamentos' },
    { value: 'newsletters', label: 'Boletines' },
    { value: 'events', label: 'Eventos' }
  ];

  const subjectOptions = [
    { value: '', label: 'Todas las materias' },
    { value: 'mathematics', label: 'Matemáticas' },
    { value: 'spanish', label: 'Español' },
    { value: 'science', label: 'Ciencias' },
    { value: 'social-studies', label: 'Ciencias Sociales' },
    { value: 'english', label: 'Inglés' },
    { value: 'arts', label: 'Artes' },
    { value: 'physical-education', label: 'Educación Física' }
  ];

  const gradeLevelOptions = [
    { value: '', label: 'Todos los grados' },
    { value: 'preescolar', label: 'Preescolar' },
    { value: '1-5', label: 'Primaria (1° - 5°)' },
    { value: '6-9', label: 'Secundaria (6° - 9°)' },
    { value: '10-11', label: 'Media (10° - 11°)' },
    { value: 'general', label: 'General' }
  ];

  const fileTypeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'pdf', label: 'PDF' },
    { value: 'doc', label: 'Word' },
    { value: 'xls', label: 'Excel' },
    { value: 'ppt', label: 'PowerPoint' },
    { value: 'img', label: 'Imagen' },
    { value: 'video', label: 'Video' }
  ];

  const campusOptions = [
    { value: '', label: 'Todas las sedes' },
    { value: 'leyda-garrido', label: 'Leyda Garrido' },
    { value: 'san-jose', label: 'San José' },
    { value: 'maria-eugenia', label: 'María Eugenia' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Fecha' },
    { value: 'title', label: 'Título' },
    { value: 'downloads', label: 'Descargas' },
    { value: 'size', label: 'Tamaño' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'Cualquier fecha' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'quarter', label: 'Este trimestre' },
    { value: 'year', label: 'Este año' }
  ];

  useEffect(() => {
    const searchFilters: SearchFilters = {
      query: searchQuery,
      filters,
      sortBy,
      sortOrder
    };
    onSearch(searchFilters);
  }, [searchQuery, filters, sortBy, sortOrder, onSearch]);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      category: '',
      subject: '',
      gradeLevel: '',
      fileType: '',
      campus: '',
      dateRange: ''
    });
    setSortBy('date');
    setSortOrder('desc');
  };

  const hasActiveFilters = searchQuery || Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-card rounded-lg p-6 shadow-institutional">
      {/* Main Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Buscar documentos, materiales, formularios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Filtros Avanzados
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              className="text-text-secondary hover:text-primary"
            >
              Limpiar
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t border-border pt-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            <Select
              label="Categoría"
              options={categoryOptions}
              value={filters.category}
              onChange={(value) => handleFilterChange('category', value as string)}
            />
            <Select
              label="Materia"
              options={subjectOptions}
              value={filters.subject}
              onChange={(value) => handleFilterChange('subject', value as string)}
            />
            <Select
              label="Grado"
              options={gradeLevelOptions}
              value={filters.gradeLevel}
              onChange={(value) => handleFilterChange('gradeLevel', value as string)}
            />
            <Select
              label="Tipo de archivo"
              options={fileTypeOptions}
              value={filters.fileType}
              onChange={(value) => handleFilterChange('fileType', value as string)}
            />
            <Select
              label="Sede"
              options={campusOptions}
              value={filters.campus}
              onChange={(value) => handleFilterChange('campus', value as string)}
            />
            <Select
              label="Fecha"
              options={dateRangeOptions}
              value={filters.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value as string)}
            />
          </div>

          {/* Sort Options */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <Select
              label="Ordenar por"
              options={sortOptions}
              value={sortBy}
              onChange={(value) => setSortBy(value as 'title' | 'date' | 'downloads' | 'size')}
              className="w-full sm:w-48"
            />
            <div className="flex gap-2">
              <Button
                variant={sortOrder === 'asc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortOrder('asc')}
                iconName="ArrowUp"
                iconPosition="left"
              >
                Ascendente
              </Button>
              <Button
                variant={sortOrder === 'desc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortOrder('desc')}
                iconName="ArrowDown"
                iconPosition="left"
              >
                Descendente
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Icon name="Search" size={16} />
          <span>
            {isLoading ? 'Buscando...' : `${totalResults} documento${totalResults !== 1 ? 's' : ''} encontrado${totalResults !== 1 ? 's' : ''}`}
          </span>
        </div>
        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <Icon name="Filter" size={16} />
            <span>Filtros activos</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;