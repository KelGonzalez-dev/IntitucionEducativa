export interface ContactInfo {
    id: string;
    type: 'phone' | 'email' | 'address' | 'hours';
    label: string;
    value: string;
    icon: string;
    description?: string;
  }
  
  export interface Campus {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    director: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    image: string;
    alt: string;
    services: string[];
    hours: string;
  }
  
  export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: 'academic' | 'administrative' | 'support' | 'extracurricular';
    features: string[];
    contactPerson?: string;
    phone?: string;
    email?: string;
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    campus: string;
    subject: string;
    message: string;
    serviceType: string;
    preferredContact: 'phone' | 'email' | 'whatsapp';
  }
  
  export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
  }
  
  export interface StaffMember {
    id: string;
    name: string;
    position: string;
    department: string;
    campus: string;
    phone: string;
    email: string;
    image: string;
    alt: string;
    availability: string;
  }
  
  export interface ServiceRequest {
    id: string;
    type: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    description: string;
    submittedAt: Date;
    estimatedCompletion?: Date;
  }