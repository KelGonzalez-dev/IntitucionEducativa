import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Newsletter } from '../types';

interface NewsletterSubscriptionProps {
  onSubscribe?: (newsletter: Newsletter) => void;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const preferenceOptions = [
    { id: 'academic', label: 'Noticias Académicas', description: 'Logros estudiantiles y actualizaciones curriculares' },
    { id: 'events', label: 'Eventos y Actividades', description: 'Próximos eventos y celebraciones escolares' },
    { id: 'sports', label: 'Deportes', description: 'Resultados deportivos y competencias' },
    { id: 'cultural', label: 'Actividades Culturales', description: 'Eventos artísticos y culturales' },
    { id: 'announcements', label: 'Anuncios Importantes', description: 'Comunicados oficiales y fechas importantes' }
  ];

  const handlePreferenceChange = (preferenceId: string, checked: boolean) => {
    if (checked) {
      setPreferences(prev => [...prev, preferenceId]);
    } else {
      setPreferences(prev => prev.filter(id => id !== preferenceId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || preferences.length === 0) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newsletter: Newsletter = {
        email,
        preferences,
        subscribed: true
      };
      
      if (onSubscribe) {
        onSubscribe(newsletter);
      }
      
      setIsSubscribed(true);
      setIsLoading(false);
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Check" size={32} color="white" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-green-800 mb-2">
          ¡Suscripción Exitosa!
        </h3>
        <p className="text-green-700 mb-4">
          Te has suscrito exitosamente a nuestro boletín. Recibirás las últimas noticias y eventos directamente en tu correo.
        </p>
        <div className="bg-white/50 rounded-lg p-4">
          <p className="text-sm text-green-600 mb-2">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-sm text-green-600">
            <strong>Preferencias:</strong> {preferences.length} categorías seleccionadas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={32} className="text-primary" />
        </div>
        <h3 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Suscríbete a Nuestro Boletín
        </h3>
        <p className="text-text-secondary">
          Mantente informado sobre las últimas noticias, eventos y logros de nuestra comunidad educativa.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="email"
            label="Correo Electrónico"
            placeholder="tu.email@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Selecciona tus preferencias de contenido:
          </label>
          <div className="space-y-3">
            {preferenceOptions.map((option) => (
              <div key={option.id} className="border border-border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <Checkbox
                  label={option.label}
                  description={option.description}
                  checked={preferences.includes(option.id)}
                  onChange={(e) => handlePreferenceChange(option.id, e.target.checked)}
                />
              </div>
            ))}
          </div>
          {preferences.length === 0 && (
            <p className="text-sm text-red-600 mt-2">
              Por favor selecciona al menos una preferencia de contenido.
            </p>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-green-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">
                Compromiso de Privacidad
              </h4>
              <p className="text-xs text-text-secondary">
                Tu información está segura con nosotros. No compartimos datos con terceros y puedes cancelar tu suscripción en cualquier momento.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={!email || preferences.length === 0}
          className="bg-primary hover:bg-secondary"
        >
          {isLoading ? (
            "Procesando suscripción..."
          ) : (
            <>
              <Icon name="Mail" size={16} className="mr-2" />
              Suscribirse al Boletín
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} />
            <span>2,847 suscriptores</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>Boletín semanal</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={16} />
            <span>Contenido exclusivo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;