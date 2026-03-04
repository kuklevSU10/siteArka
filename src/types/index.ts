export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'residential' | 'commercial' | 'hospitality' | 'office';
  description: string;
  coverImage: string;
  images: string[];
  beforeImage?: string;
  afterImage?: string;
  location: string;
  area: string;
  year: number;
  scope: string[];
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    instagram?: string;
    linkedin?: string;
  };
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  projectId?: string;
  avatar?: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    instagram: string;
    telegram: string;
    whatsapp: string;
  };
}
