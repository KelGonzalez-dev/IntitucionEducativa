import React from 'react';
import Icon from '../../../components/AppIcon';
import { DocumentCategory } from '../types';

interface CategoryGridProps {
  categories: DocumentCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryGrid = ({ categories, selectedCategory, onCategorySelect }: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id === selectedCategory ? '' : category.id)}
          className={`p-4 rounded-lg border-2 transition-all duration-normal hover:scale-105 hover-lift ${
            selectedCategory === category.id
              ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card hover:border-primary/30 text-text-primary hover:text-primary'
          }`}
        >
          <div className="flex flex-col items-center space-y-3">
            <div 
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-normal ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : `bg-${category.color} text-white`
              }`}
            >
              <Icon name={category.icon} size={24} />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-text-secondary">
                {category.documentCount} documento{category.documentCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;