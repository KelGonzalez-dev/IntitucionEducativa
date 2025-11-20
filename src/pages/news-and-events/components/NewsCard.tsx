import React from 'react';

import Image from '../../../components/AppImage.tsx';
import Icon from '../../../components/AppIcon.tsx';
import Button from '../../../components/ui/Button.tsx';
import { NewsArticle } from '../types/index';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'featured' | 'compact';
}

const NewsCard: React.FC<NewsCardProps> = ({ article, variant = 'default' }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      sports: 'bg-green-100 text-green-800',
      cultural: 'bg-purple-100 text-purple-800',
      community: 'bg-orange-100 text-orange-800',
      announcement: 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  if (variant === 'featured') {
    return (
      <article className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift group">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={article.image}
            alt={article.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-normal"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </span>
          </div>
          {article.featured && (
            <div className="absolute top-4 right-4">
              <div className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <Icon name="Star" size={12} />
                <span>Destacado</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
            <span>{formatDate(article.publishDate)}</span>
            <span>{article.readTime} min lectura</span>
          </div>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-3 line-clamp-2">
            {article.title}
          </h2>
          <p className="text-text-secondary mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={16} />
                <span>{article.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MessageCircle" size={16} />
                <span>{article.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Share2" size={16} />
                <span>{article.shares}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Leer más
            </Button>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="bg-white rounded-lg shadow-md p-4 hover-lift group">
        <div className="flex space-x-4">
          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
            <Image
              src={article.image}
              alt={article.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-normal"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              <span className="text-xs text-text-secondary">{formatDate(article.publishDate)}</span>
            </div>
            <h3 className="text-sm font-medium text-text-primary mb-1 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs text-text-secondary line-clamp-2">
              {article.excerpt}
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover-lift group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.image}
          alt={article.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-normal"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
          <span>{formatDate(article.publishDate)}</span>
          <span>{article.readTime} min</span>
        </div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={14} />
              <span>{article.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={14} />
              <span>{article.comments}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-secondary">
            Leer más
          </Button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;