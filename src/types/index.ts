export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface OpeningHours {
  days: string;
  hours: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: OpeningHours[];
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
}
