export interface Project {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  completionDate?: Date;
  features?: string[];
  challenges?: {
    title: string;
    description: string;
  }[];
  images?: {
    url: string;
    caption?: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
} 