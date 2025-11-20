import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Document, DocumentPreview as DocumentPreviewType } from '../types';

interface DocumentPreviewProps {
  document: Document;
  preview: DocumentPreviewType;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (documentId: string) => void;
}

const DocumentPreview = ({ document, preview, isOpen, onClose, onDownload }: DocumentPreviewProps) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderPreviewContent = () => {
    if (preview.isLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-text-secondary">Cargando vista previa...</p>
          </div>
        </div>
      );
    }

    if (preview.error) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
            <p className="text-text-secondary mb-4">No se pudo cargar la vista previa</p>
            <Button
              variant="outline"
              onClick={() => onDownload(document.id)}
              iconName="Download"
              iconPosition="left"
            >
              Descargar documento
            </Button>
          </div>
        </div>
      );
    }

    // Handle different file types
    if (document.fileType.toLowerCase() === 'pdf') {
      return (
        <iframe
          src={preview.previewUrl}
          className="w-full h-96 border border-border rounded"
          title={`Vista previa de ${document.title}`}
        />
      );
    }

    if (['jpg', 'jpeg', 'png', 'gif'].includes(document.fileType.toLowerCase())) {
      return (
        <div className="flex justify-center">
          <Image
            src={preview.previewUrl}
            alt={document.alt}
            className="max-w-full max-h-96 object-contain rounded"
            onError={() => setImageError(true)}
          />
        </div>
      );
    }

    // For other file types, show document info
    return (
      <div className="text-center py-12">
        <Icon name="File" size={64} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">Vista previa no disponible</h3>
        <p className="text-text-secondary mb-6">
          Este tipo de archivo ({document.fileType.toUpperCase()}) no admite vista previa en el navegador.
        </p>
        <Button
          variant="default"
          onClick={() => onDownload(document.id)}
          iconName="Download"
          iconPosition="left"
        >
          Descargar para ver contenido
        </Button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-text-primary truncate">{document.title}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
              <span>{document.fileType.toUpperCase()}</span>
              <span>{document.fileSize}</span>
              <span>{document.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              onClick={() => onDownload(document.id)}
              iconName="Download"
              iconPosition="left"
            >
              Descargar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-140px)]">
          {renderPreviewContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-text-secondary">
            <p>{document.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <span>Autor: {document.author}</span>
              <span>Versión: {document.version}</span>
              <span>Descargas: {document.downloadCount}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
            <Button
              variant="default"
              onClick={() => onDownload(document.id)}
              iconName="Download"
              iconPosition="left"
            >
              Descargar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;