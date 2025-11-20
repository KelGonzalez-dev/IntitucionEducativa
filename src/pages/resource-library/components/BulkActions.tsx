import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { BulkDownloadRequest } from '../types';

interface BulkActionsProps {
  selectedDocuments: string[];
  totalDocuments: number;
  onBulkDownload: (request: BulkDownloadRequest) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  isVisible: boolean;
}

const BulkActions = ({
  selectedDocuments,
  totalDocuments,
  onBulkDownload,
  onSelectAll,
  onClearSelection,
  isVisible
}: BulkActionsProps) => {
  const [downloadFormat, setDownloadFormat] = useState<'zip' | 'individual'>('zip');
  const [includeMetadata, setIncludeMetadata] = useState(true);

  const formatOptions = [
    { value: 'zip', label: 'Archivo ZIP' },
    { value: 'individual', label: 'Archivos individuales' }
  ];

  const handleBulkDownload = () => {
    const request: BulkDownloadRequest = {
      documentIds: selectedDocuments,
      format: downloadFormat,
      includeMetadata
    };
    onBulkDownload(request);
  };

  if (!isVisible || selectedDocuments.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 animate-slide-up">
      <div className="bg-card border border-border rounded-lg shadow-xl p-4 min-w-96">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-text-primary">
                {selectedDocuments.length} documento{selectedDocuments.length !== 1 ? 's' : ''} seleccionado{selectedDocuments.length !== 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-text-secondary">
                de {totalDocuments} total{totalDocuments !== 1 ? 'es' : ''}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSelection}
            className="text-text-secondary hover:text-primary"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Select
            label="Formato de descarga"
            options={formatOptions}
            value={downloadFormat}
            onChange={(value) => setDownloadFormat(value as 'zip' | 'individual')}
            className="flex-1"
          />
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="includeMetadata"
              checked={includeMetadata}
              onChange={(e) => setIncludeMetadata(e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <label htmlFor="includeMetadata" className="text-sm text-text-primary">
              Incluir metadatos
            </label>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={selectedDocuments.length === totalDocuments ? onClearSelection : onSelectAll}
            iconName={selectedDocuments.length === totalDocuments ? "Square" : "CheckSquare"}
            iconPosition="left"
            className="flex-1"
          >
            {selectedDocuments.length === totalDocuments ? 'Deseleccionar todo' : 'Seleccionar todo'}
          </Button>
          <Button
            variant="default"
            onClick={handleBulkDownload}
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            Descargar seleccionados
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;