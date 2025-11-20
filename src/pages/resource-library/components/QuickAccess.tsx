import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Document } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface QuickAccessProps {
  favoriteDocuments: Document[];
  recentDocuments: Document[];
  onDocumentClick: (documentId: string) => void;
  onViewAllFavorites: () => void;
  onViewAllRecent: () => void;
}

const QuickAccess = ({
  favoriteDocuments,
  recentDocuments,
  onDocumentClick,
  onViewAllFavorites,
  onViewAllRecent
}: QuickAccessProps) => {
  const renderDocumentItem = (document: Document) => (
    <button
      key={document.id}
      onClick={() => onDocumentClick(document.id)}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover transition-colors duration-normal text-left w-full"
    >
      <div className="w-10 h-10 bg-muted rounded flex items-center justify-center flex-shrink-0">
        <Icon name="FileText" size={16} className="text-text-secondary" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-text-primary truncate text-sm">{document.title}</h4>
        <p className="text-xs text-text-secondary truncate">{document.category}</p>
        <p className="text-xs text-text-secondary">
          {format(document.lastModified, 'dd MMM', { locale: es })}
        </p>
      </div>
    </button>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Favorites */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Heart" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-text-primary">Favoritos</h2>
          </div>
          {favoriteDocuments.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewAllFavorites}
              iconName="ArrowRight"
              iconPosition="right"
              className="text-primary hover:text-primary"
            >
              Ver todos
            </Button>
          )}
        </div>

        {favoriteDocuments.length > 0 ? (
          <div className="space-y-2">
            {favoriteDocuments.slice(0, 3).map(renderDocumentItem)}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Heart" size={48} className="text-text-secondary mx-auto mb-3 opacity-50" />
            <p className="text-text-secondary">No tienes documentos favoritos</p>
            <p className="text-sm text-text-secondary mt-1">
              Marca documentos como favoritos para acceso rápido
            </p>
          </div>
        )}
      </div>

      {/* Recent */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-text-primary">Recientes</h2>
          </div>
          {recentDocuments.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewAllRecent}
              iconName="ArrowRight"
              iconPosition="right"
              className="text-primary hover:text-primary"
            >
              Ver todos
            </Button>
          )}
        </div>

        {recentDocuments.length > 0 ? (
          <div className="space-y-2">
            {recentDocuments.slice(0, 3).map(renderDocumentItem)}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Clock" size={48} className="text-text-secondary mx-auto mb-3 opacity-50" />
            <p className="text-text-secondary">No hay documentos recientes</p>
            <p className="text-sm text-text-secondary mt-1">
              Los documentos que veas aparecerán aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickAccess;