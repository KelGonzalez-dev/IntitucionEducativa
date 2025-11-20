export interface NewsArticle {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishDate: Date;
    category: 'academic' | 'sports' | 'cultural' | 'community' | 'announcement';
    image: string;
    alt: string;
    tags: string[];
    featured: boolean;
    readTime: number;
    likes: number;
    comments: number;
    shares: number;
  }
  
  export interface Event {
    id: string;
    title: string;
    description: string;
    date: Date;
    endDate?: Date;
    time: string;
    location: string;
    category: 'academic' | 'sports' | 'cultural' | 'meeting' | 'celebration';
    image: string;
    alt: string;
    organizer: string;
    capacity?: number;
    registered: number;
    price?: number;
    requirements?: string[];
    featured: boolean;
    rsvpRequired: boolean;
  }
  
  export interface NewspaperEdition {
    id: string;
    title: string;
    edition: string;
    publishDate: Date;
    coverImage: string;
    alt: string;
    description: string;
    pdfUrl: string;
    articles: string[];
    downloads: number;
  }
  
  export interface Comment {
    id: string;
    author: string;
    avatar: string;
    avatarAlt: string;
    content: string;
    timestamp: Date;
    likes: number;
    replies?: Comment[];
  }
  
  export interface SocialPost {
    id: string;
    platform: 'facebook' | 'instagram' | 'twitter';
    content: string;
    image?: string;
    alt?: string;
    timestamp: Date;
    likes: number;
    shares: number;
    comments: number;
  }
  
  export interface Newsletter {
    email: string;
    preferences: string[];
    subscribed: boolean;
  }
  
  export interface EventRegistration {
    eventId: string;
    name: string;
    email: string;
    phone: string;
    additionalInfo?: string;
  }
  
  export interface PhotoGallery {
    id: string;
    eventId: string;
    title: string;
    photos: {
      id: string;
      url: string;
      alt: string;
      caption?: string;
    }[];
    uploadDate: Date;
  }
  
  export interface FilterOptions {
    category: string;
    dateRange: 'all' | 'week' | 'month' | 'year';
    sortBy: 'date' | 'popularity' | 'title';
    searchQuery: string;
  }