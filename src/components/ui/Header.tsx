import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import LoginModal from '../admin/LoginModal';
import AdminPanel from '../admin/AdminPanel';
import { useAdmin } from '../../context/AdminContext';
import BrandLogo from '../BrandLogo';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAdmin();

  const navigationItems = [
    { path: '/homepage', label: 'Inicio', icon: 'Home' },
    { path: '/about', label: 'Nosotros', icon: 'Users' },
    { path: '/resource-library', label: 'Recursos', icon: 'BookOpen' },
    { path: '/academic-calendar', label: 'Calendario', icon: 'Calendar' },
    { path: '/news-and-events', label: 'Noticias', icon: 'Newspaper' },
    { path: '/contact-and-services', label: 'Contacto', icon: 'Phone' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || (path === '/homepage' && location.pathname === '/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-fixed transition-all duration-normal ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-institutional' 
          : 'bg-background'
      } ${className}`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-3 group animate-logo-entrance"
          >
            <div className="group-hover:scale-105 transition-transform duration-normal">
              <BrandLogo size={40} showCircle />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-institutional leading-tight">
                Santa Catalina
              </h1>
              <p className="text-xs text-text-secondary font-body">
                Digital Campus
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-all duration-normal hover:bg-hover group ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary/5 border-b-2 border-primary' :'text-text-primary hover:text-primary'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={16} 
                  className={`transition-colors duration-normal ${
                    isActivePath(item.path) ? 'text-primary' : 'text-text-secondary group-hover:text-primary'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Agendar Visita
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              className="bg-primary hover:bg-secondary"
            >
              Contactar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Admin"
              onClick={() => (isAdmin ? setIsAdminPanelOpen(true) : setIsLoginOpen(true))}
            >
              <Icon name="Lock" size={20} className={isAdmin ? 'text-primary' : 'text-text-secondary'} />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <Icon 
              name={isMenuOpen ? "X" : "Menu"} 
              size={24} 
              className="transition-transform duration-normal"
            />
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden transition-all duration-normal overflow-hidden ${
            isMenuOpen 
              ? 'max-h-screen opacity-100 border-t border-border' :'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-4 py-4 bg-card space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-body font-medium transition-all duration-normal hover:bg-hover group ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary/10 border-l-4 border-primary' :'text-text-primary hover:text-primary'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`transition-colors duration-normal ${
                    isActivePath(item.path) ? 'text-primary' : 'text-text-secondary group-hover:text-primary'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="px-4">
              <Button variant="ghost" fullWidth iconName="Lock" onClick={() => (isAdmin ? setIsAdminPanelOpen(true) : setIsLoginOpen(true))}>
                {isAdmin ? 'Administrar' : 'Admin'}
              </Button>
            </div>
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3 border-t border-border">
              <Button
                variant="outline"
                fullWidth
                iconName="Calendar"
                iconPosition="left"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Agendar Visita al Campus
              </Button>
              <Button
                variant="default"
                fullWidth
                iconName="Phone"
                iconPosition="left"
                className="bg-primary hover:bg-secondary"
              >
                Contactar Ahora
              </Button>
            </div>
          </nav>
        </div>

        {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
        {isAdminPanelOpen && <AdminPanel isOpen={isAdminPanelOpen} onClose={() => setIsAdminPanelOpen(false)} />}
      </div>
    </header>
  );
};

export default Header;