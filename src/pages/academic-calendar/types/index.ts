export interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    date: Date;
    startTime?: string;
    endTime?: string;
    type: EventType;
    campus: Campus;
    gradeLevel?: GradeLevel;
    isRecurring: boolean;
    recurringPattern?: RecurringPattern;
    color: string;
    isHoliday: boolean;
    isImportant: boolean;
    location?: string;
    organizer?: string;
    attendees?: string[];
  }
  
  export interface EventType {
    id: string;
    name: string;
    color: string;
    icon: string;
  }
  
  export interface Campus {
    id: string;
    name: string;
    color: string;
  }
  
  export interface GradeLevel {
    id: string;
    name: string;
    range: string;
  }
  
  export interface RecurringPattern {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
    daysOfWeek?: number[];
  }
  
  export interface CalendarFilter {
    campuses: string[];
    eventTypes: string[];
    gradeLevels: string[];
    showHolidays: boolean;
    showImportant: boolean;
  }
  
  export interface CalendarView {
    type: 'month' | 'week' | 'day' | 'agenda';
    currentDate: Date;
  }
  
  export interface ExportOptions {
    format: 'ics' | 'csv' | 'pdf';
    dateRange: {
      start: Date;
      end: Date;
    };
    includeFilters: CalendarFilter;
  }
  
  export interface CalendarNotification {
    id: string;
    eventId: string;
    type: 'reminder' | 'update' | 'cancellation';
    message: string;
    scheduledTime: Date;
    isActive: boolean;
  }