import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { ExportOptions, CalendarFilter } from '../types/index';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
  currentFilters: CalendarFilter;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
  currentFilters
}) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'ics',
    dateRange: {
      start: new Date(),
      end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    },
    includeFilters: currentFilters
  });

  const formatOptions = [
    { value: 'ics', label: 'Calendario (.ics) - Compatible con Google Calendar, Outlook' },
    { value: 'csv', label: 'Excel (.csv) - Para análisis de datos' },
    { value: 'pdf', label: 'PDF - Para impresión y archivo' }
  ];

  const handleExport = () => {
    onExport(exportOptions);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Icon name="Download" size={20} className="text-primary" />
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Exportar Calendario
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="w-8 h-8 p-0"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <Select
              label="Formato de Exportación"
              options={formatOptions}
              value={exportOptions.format}
              onChange={(value) => setExportOptions({
                ...exportOptions,
                format: value as 'ics' | 'csv' | 'pdf'
              })}
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Fecha de Inicio"
              type="date"
              value={exportOptions.dateRange.start.toISOString().split('T')[0]}
              onChange={(e) => setExportOptions({
                ...exportOptions,
                dateRange: {
                  ...exportOptions.dateRange,
                  start: new Date(e.target.value)
                }
              })}
            />
            <Input
              label="Fecha de Fin"
              type="date"
              value={exportOptions.dateRange.end.toISOString().split('T')[0]}
              onChange={(e) => setExportOptions({
                ...exportOptions,
                dateRange: {
                  ...exportOptions.dateRange,
                  end: new Date(e.target.value)
                }
              })}
            />
          </div>

          {/* Filter Options */}
          <div>
            <h3 className="font-medium text-text-primary mb-3">
              Opciones de Filtrado
            </h3>
            <div className="space-y-3">
              <Checkbox
                label="Aplicar filtros actuales"
                description="Exportar solo los eventos que coincidan con los filtros seleccionados"
                checked={JSON.stringify(exportOptions.includeFilters) === JSON.stringify(currentFilters)}
                onChange={(e) => setExportOptions({
                  ...exportOptions,
                  includeFilters: e.target.checked ? currentFilters : {
                    campuses: [],
                    eventTypes: [],
                    gradeLevels: [],
                    showHolidays: true,
                    showImportant: true
                  }
                })}
              />
            </div>
          </div>

          {/* Export Info */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm text-text-secondary">
                <p className="font-medium text-text-primary mb-1">
                  Información sobre la exportación:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Los archivos .ics se pueden importar directamente a Google Calendar, Outlook y Apple Calendar</li>
                  <li>• Los archivos CSV son ideales para análisis en Excel o Google Sheets</li>
                  <li>• Los archivos PDF son perfectos para impresión y archivo físico</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
            className="flex-1 bg-primary hover:bg-secondary"
          >
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;