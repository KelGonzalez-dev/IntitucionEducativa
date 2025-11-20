export interface HeroSection {
    title: string;
    logo: string;
    logoAlt: string;
    logoWidth: number;
    logoHeight: number;
    logoColor: string;
    logoBackgroundColor: string;
    logoBorderRadius: number;
    logoBorderColor: string;
    logoBorderWidth: number;
    logoBorderStyle: string;
    description: string;
    videoUrl: string;
    ctaButtons: CTAButton[];
  }
  
  export interface CTAButton {
    id: string;
    label: string;
    variant: 'default' | 'outline';
    icon: string;
    href: string;
  }
  
  export interface NewsItem {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    alt: string;
    href: string;
  }
  
  export interface StatItem {
    id: string;
    value: string;
    label: string;
    icon: string;
    description: string;
  }
  
  export interface AwardItem {
    id: string;
    title: string;
    description: string;
    year: string;
    image: string;
    alt: string;
    category: string;
  }
  
  export interface CampusHighlight {
    id: string;
    name: string;
    description: string;
    image: string;
    alt: string;
    features: string[];
  }
  
  export interface QuickAccessItem {
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
    color: string;
  }