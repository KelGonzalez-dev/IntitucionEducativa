import React from 'react';
import Image from '../../../components/AppImage.tsx';
import Icon from '../../../components/AppIcon.tsx';
import Button from '../../../components/ui/Button.tsx';
import { NewspaperEdition } from '../types/index';

interface NewspaperCardProps {
  edition: NewspaperEdition;
  onDownload?: (editionId: string) => void;
}

const NewspaperCard: React.FC<NewspaperCardProps> = ({ edition, onDownload }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(edition.id);
    }
    // Simulate download
    const link = document.createElement('a');
    link.href = edition.pdfUrl;
    link.download = `${edition.title}-${edition.edition}.pdf`;
    link.click();
  };

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={edition.coverImage}
          alt={edition.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-normal"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <h3 className="font-heading font-semibold text-text-primary mb-1">
              {edition.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {edition.edition} • {formatDate(edition.publishDate)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-text-secondary mb-4 line-clamp-3">
          {edition.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={16} />
              <span>{edition.articles.length} artículos</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={16} />
              <span>{edition.downloads} descargas</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="default"
            size="sm"
            onClick={handleDownload}
            className="flex-1"
          >
            <Icon name="Download" size={16} className="mr-2" />
            Descargar PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Icon name="Eye" size={16} className="mr-2" />
            Vista Previa
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Compartir:</span>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="Facebook" size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="Twitter" size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="Share2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewspaperCard;