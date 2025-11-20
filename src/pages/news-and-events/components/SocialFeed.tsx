import React from 'react';
import Image from '../../../components/AppImage.tsx';
import Icon from '../../../components/AppIcon.tsx';
import Button from '../../../components/ui/Button.tsx';
import { SocialPost } from '../types/index';

interface SocialFeedProps {
  posts: SocialPost[];
}

const SocialFeed: React.FC<SocialFeedProps> = ({ posts }) => {
  const getPlatformIcon = (platform: string) => {
    const icons = {
      facebook: 'Facebook',
      instagram: 'Instagram',
      twitter: 'Twitter'
    };
    return icons[platform as keyof typeof icons] || 'Share2';
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      facebook: 'text-blue-600',
      instagram: 'text-pink-600',
      twitter: 'text-blue-400'
    };
    return colors[platform as keyof typeof colors] || 'text-gray-600';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace unos minutos';
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    if (diffInHours < 168) return `Hace ${Math.floor(diffInHours / 24)}d`;
    return date.toLocaleDateString('es-CO');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Hash" size={20} className="text-primary" />
          <span>Redes Sociales</span>
        </h3>
        <Button variant="outline" size="sm">
          <Icon name="ExternalLink" size={16} className="mr-1" />
          Ver todas
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="border border-border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon 
                    name={getPlatformIcon(post.platform)} 
                    size={20} 
                    className={getPlatformColor(post.platform)}
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-text-primary">
                    Santa Catalina Digital
                  </span>
                  <span className="text-xs text-text-secondary">
                    {formatTimeAgo(post.timestamp)}
                  </span>
                </div>
                
                <p className="text-text-secondary text-sm mb-3 line-clamp-3">
                  {post.content}
                </p>
                
                {post.image && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.alt || "Imagen de publicación en redes sociales"}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={14} />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={14} />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Share2" size={14} />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-xs">
                    Ver en {post.platform}
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-text-secondary mb-4">
            Síguenos en nuestras redes sociales para más contenido
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              <Icon name="Facebook" size={16} className="mr-1" />
              Facebook
            </Button>
            <Button variant="outline" size="sm" className="text-pink-600 border-pink-600 hover:bg-pink-50">
              <Icon name="Instagram" size={16} className="mr-1" />
              Instagram
            </Button>
            <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-50">
              <Icon name="Twitter" size={16} className="mr-1" />
              Twitter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialFeed;