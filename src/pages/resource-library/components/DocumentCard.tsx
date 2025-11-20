import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Document, DownloadProgress } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DocumentCardProps {
  document: Document;
  viewMode: 'grid' | 'list';
  downloadProgress?: DownloadProgress;
  onDownload: (documentId: string) => void;
  onPreview: (documentId: string) => void;
  onToggleFavorite: (documentId: string) => void;
  onBulkSelect?: (documentId: string, selected: boolean) => void;
  isSelected?: boolean;
  showBulkSelect?: boolean;
}

const DocumentCard = ({
  document,
  viewMode,
  downloadProgress,
  onDownload,
  onPreview,
  onToggleFavorite,
  onBulkSelect,
  isSelected = false,
  showBulkSelect = false
}: DocumentCardProps) => {
  const [imageError, setImageError] = useState(false);

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return 'FileText';
      case 'doc': case 'docx': return 'FileText';
      case 'xls': case 'xlsx': return 'Sheet';
      case 'ppt': case 'pptx': return 'Presentation';
      case 'jpg': case 'jpeg': case 'png': case 'gif': return 'Image';
      case 'mp4': case 'avi': case 'mov': return 'Video';
      case 'mp3': case 'wav': return 'Music';
      default: return 'File';
    }
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return 'text-red-600';
      case 'doc': case 'docx': return 'text-blue-600';
      case 'xls': case 'xlsx': return 'text-green-600';
      case 'ppt': case 'pptx': return 'text-orange-600';
      case 'jpg': case 'jpeg': case 'png': case 'gif': return 'text-purple-600';
      case 'mp4': case 'avi': case 'mov': return 'text-pink-600';
      default: return 'text-gray-600';
    }
  };

  const isDownloading = downloadProgress?.status === 'downloading';
  const downloadComplete = downloadProgress?.status === 'completed';

  if (viewMode === 'list') {
    return (
      <div className={`bg-card rounded-lg border border-border p-4 hover:shadow-md transition-all duration-normal ${
        isSelected ? 'ring-2 ring-primary border-primary' : ''
      }`}>
        <div className="flex items-center gap-4">
          {showBulkSelect && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onBulkSelect?.(document.id, e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
          )}
          
          <div className="flex-shrink-0">
            {!imageError && document.thumbnail ? (
              <Image
                src={document.thumbnail}
                alt={document.alt}
                className="w-12 h-12 rounded object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                <Icon name={getFileIcon(document.fileType)} size={24} className={getFileTypeColor(document.fileType)} />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary truncate mb-1">
                  {document.title}
                  {document.isNew && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                      Nuevo
                    </span>
                  )}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2 mb-2">{document.description}</p>
                <div className="flex items-center gap-4 text-xs text-text-secondary">
                  <span>{document.category}</span>
                  <span>{document.fileSize}</span>
                  <span>{format(document.uploadDate, 'dd MMM yyyy', { locale: es })}</span>
                  <span>{document.downloadCount} descargas</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleFavorite(document.id)}
                  className={document.isFavorite ? 'text-primary' : 'text-text-secondary'}
                >
                  <Icon name={document.isFavorite ? 'Heart' : 'Heart'} size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPreview(document.id)}
                  className="text-text-secondary hover:text-primary"
                >
                  <Icon name="Eye" size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDownload(document.id)}
                  disabled={isDownloading}
                  iconName={downloadComplete ? "Check" : isDownloading ? "Loader2" : "Download"}
                  iconPosition="left"
                  className={downloadComplete ? 'text-green-600 border-green-600' : ''}
                >
                  {isDownloading ? 'Descargando...' : downloadComplete ? 'Descargado' : 'Descargar'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {isDownloading && downloadProgress && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-text-secondary">Descargando...</span>
              <span className="text-primary">{downloadProgress.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-normal hover-lift ${
      isSelected ? 'ring-2 ring-primary border-primary' : ''
    }`}>
      {showBulkSelect && (
        <div className="absolute top-3 left-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onBulkSelect?.(document.id, e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary bg-white"
          />
        </div>
      )}

      <div className="relative">
        {!imageError && document.thumbnail ? (
          <Image
            src={document.thumbnail}
            alt={document.alt}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <Icon name={getFileIcon(document.fileType)} size={48} className={getFileTypeColor(document.fileType)} />
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex gap-2">
          {document.isNew && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary text-white">
              Nuevo
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(document.id)}
            className={`bg-white/90 backdrop-blur-sm ${
              document.isFavorite ? 'text-primary' : 'text-text-secondary'
            }`}
          >
            <Icon name={document.isFavorite ? 'Heart' : 'Heart'} size={16} />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-text-primary mb-2 line-clamp-2">{document.title}</h3>
        <p className="text-sm text-text-secondary line-clamp-3 mb-3">{document.description}</p>
        
        <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
          <span>{document.category}</span>
          <span>{document.fileSize}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
          <span>{format(document.uploadDate, 'dd MMM yyyy', { locale: es })}</span>
          <span>{document.downloadCount} descargas</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(document.id)}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            Vista previa
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onDownload(document.id)}
            disabled={isDownloading}
            iconName={downloadComplete ? "Check" : isDownloading ? "Loader2" : "Download"}
            iconPosition="left"
            className={`flex-1 ${downloadComplete ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            {isDownloading ? 'Descargando...' : downloadComplete ? 'Descargado' : 'Descargar'}
          </Button>
        </div>

        {isDownloading && downloadProgress && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-text-secondary">Descargando...</span>
              <span className="text-primary">{downloadProgress.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;