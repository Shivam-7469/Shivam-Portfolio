export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  videoUrl?: string; // In a real app, this would be a video source
  imageUrl: string;
  description: string;
}

export interface Photograph {
  id: string;
  url: string;
  alt?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  message: string;
  services: string[];
  date: string;
  read: boolean;
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  isThinking?: boolean;
}