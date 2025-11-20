import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { ToastNotification as ToastNotificationType } from '../types';

interface ToastNotificationProps {
  notification: ToastNotificationType;
  onClose: (id: string) => void;
}

const ToastNotification = ({ notification, onClose }: ToastNotificationProps) => {
  useEffect(() => {
    if (notification.duration > 0) {
      const timer = setTimeout(() => {
        onClose(notification.id);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.id, notification.duration, onClose]);

  const getIconName = () => {
    switch (notification.type) {
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getColorClasses = () => {
    switch (notification.type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconColor = () => {
    switch (notification.type) {
      case 'success': return 'text-green-500';
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  if (!notification.isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full animate-fade-in ${
      notification.isVisible ? 'animate-slide-up' : ''
    }`}>
      <div className={`rounded-lg border p-4 shadow-lg ${getColorClasses()}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon 
              name={getIconName()} 
              size={20} 
              className={getIconColor()}
            />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium">{notification.title}</h3>
            {notification.message && (
              <p className="mt-1 text-sm opacity-90">{notification.message}</p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => onClose(notification.id)}
              className="inline-flex rounded-md p-1.5 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;