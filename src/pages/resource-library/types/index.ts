export interface Document {
    id: string;
    title: string;
    description: string;
    category: string;
    subject: string;
    gradeLevel: string;
    fileType: string;
    fileSize: string;
    downloadUrl: string;
    uploadDate: Date;
    lastModified: Date;
    version: string;
    downloadCount: number;
    isNew: boolean;
    isFavorite: boolean;
    thumbnail: string;
    alt: string;
    tags: string[];
    author: string;
    campus: string;
  }
  
  export interface DocumentCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
    documentCount: number;
    color: string;
  }
  
  export interface FilterOptions {
    category: string;
    subject: string;
    gradeLevel: string;
    fileType: string;
    campus: string;
    dateRange: string;
  }
  
  export interface SearchFilters {
    query: string;
    filters: FilterOptions;
    sortBy: 'title' | 'date' | 'downloads' | 'size';
    sortOrder: 'asc' | 'desc';
  }
  
  export interface DownloadProgress {
    documentId: string;
    progress: number;
    status: 'pending' | 'downloading' | 'completed' | 'error';
  }
  
  export interface UserPreferences {
    favoriteDocuments: string[];
    recentlyAccessed: string[];
    downloadHistory: string[];
    preferredView: 'grid' | 'list';
    defaultFilters: Partial<FilterOptions>;
  }
  
  export interface ToastNotification {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message: string;
    duration: number;
    isVisible: boolean;
  }
  
  export interface BulkDownloadRequest {
    documentIds: string[];
    format: 'zip' | 'individual';
    includeMetadata: boolean;
  }
  
  export interface DocumentPreview {
    documentId: string;
    previewUrl: string;
    isLoading: boolean;
    error?: string;
  }