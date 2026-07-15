// Types mirroring the FastAPI backend response schemas.

export interface Founder {
  id: number;
  name: string;
  title: string | null;
  bio: string | null;
  quote: string | null;
  photo_url: string | null;
  years_experience: number | null;
  social_links: Record<string, string> | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Trainer {
  id: number;
  name: string;
  slug: string;
  specialization: string | null;
  bio: string | null;
  photo_url: string | null;
  experience_years: number | null;
  certifications: string[] | null;
  social_links: Record<string, string> | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  level: string | null;
  duration: string | null;
  image_url: string | null;
  features: string[] | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Pricing {
  id: number;
  plan_name: string;
  price: string; // Decimal serialized as string
  currency: string;
  billing_period: string | null;
  description: string | null;
  features: string[] | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: number;
  image_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  category: string | null;
  cloudinary_public_id: string | null;
  display_order: number;
  created_at: string;
}

export interface Testimonial {
  id: number;
  author_name: string;
  author_context: string | null;
  content: string;
  rating: number | null;
  photo_url: string | null;
  is_transformation: boolean;
  before_image_url: string | null;
  after_image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface HomeData {
  founder: Founder | null;
  trainers: Trainer[];
  programs: Program[];
  pricing: Pricing[];
  testimonials: Testimonial[];
}

export interface Admin {
  id: number;
  email: string;
  full_name: string | null;
  is_active: boolean;
}
