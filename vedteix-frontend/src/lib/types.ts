export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  applyUrl?: string;
  applyEmail?: string;
  skills: string[];
  techStack: string[];
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Portfolio {
  _id: string;
  title: string;
  category: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  techStack: string[];
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl?: string;
  featured: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Technology {
  _id: string;
  name: string;
  logoUrl: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  designation: string;
  message: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteSettings {
  _id?: string;
  companyName: string;
  companyTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  officeName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  stats: {
    projectsCompleted: number;
    happyClients: number;
  };
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'reviewed' | 'resolved';
  createdAt?: string;
}

export interface NewsletterSubscription {
  _id: string;
  email: string;
  createdAt?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalJobs: number;
  totalPortfolios: number;
  totalServices: number;
  totalContacts: number;
  totalSubscriptions: number;
  latestJobs: Job[];
  latestPortfolios: Portfolio[];
  latestContacts: ContactMessage[];
  latestSubscriptions: NewsletterSubscription[];
  siteConfigured: boolean;
}
