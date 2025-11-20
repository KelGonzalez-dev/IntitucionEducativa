export interface InstitutionalValue {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
  }
  
  export interface HistoryMilestone {
    id: string;
    year: number;
    title: string;
    description: string;
    image: string;
    alt: string;
    category: 'foundation' | 'expansion' | 'achievement' | 'innovation';
  }
  
  export interface LeadershipMember {
    id: string;
    name: string;
    position: string;
    department: string;
    image: string;
    alt: string;
    message: string;
    email: string;
    experience: number;
  }
  
  export interface TestimonialVideo {
    id: string;
    title: string;
    speaker: string;
    role: string;
    thumbnail: string;
    alt: string;
    duration: string;
    category: 'values' | 'community' | 'excellence';
  }
  
  export interface AlumniStory {
    id: string;
    name: string;
    graduationYear: number;
    currentPosition: string;
    company: string;
    image: string;
    alt: string;
    story: string;
    achievement: string;
  }
  
  export interface Partnership {
    id: string;
    name: string;
    type: 'university' | 'company' | 'ngo' | 'government';
    logo: string;
    alt: string;
    description: string;
    since: number;
  }
  
  export interface ImpactMetric {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: string;
    trend: 'up' | 'stable' | 'down';
  }
  
  export interface InstitutionalDocument {
    id: string;
    title: string;
    type: 'pdf' | 'doc' | 'ppt';
    size: string;
    lastUpdated: string;
    category: 'mission' | 'policies' | 'reports' | 'certifications';
    downloadUrl: string;
  }
  
  export interface CultureShowcase {
    id: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    category: 'traditions' | 'events' | 'facilities' | 'activities';
  }