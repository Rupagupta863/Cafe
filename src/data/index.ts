import { MenuItem, Testimonial, TeamMember, GalleryImage, ContactInfo } from "@/types";

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Espresso",
    description: "Rich, full-bodied espresso with a velvety crema.",
    price: 3.5,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80",
    featured: true,
    popular: true,
  },
  {
    id: "2",
    name: "Vanilla Latte",
    description: "Espresso with steamed milk and a touch of Madagascar vanilla.",
    price: 4.8,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&q=80",
    featured: true,
  },
  {
    id: "3",
    name: "Pour Over Costa Rica",
    description: "Single-origin pour over with notes of honey and citrus.",
    price: 5.5,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
    popular: true,
  },
  {
    id: "4",
    name: "Matcha Green Tea",
    description: "Premium ceremonial grade matcha whisked with steamed milk.",
    price: 5.0,
    category: "Tea",
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=800&q=80",
    popular: true,
  },
  {
    id: "5",
    name: "Avocado Toast",
    description: "Smashed avocado on artisanal sourdough with chili flakes and microgreens.",
    price: 9.5,
    category: "Food",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80",
    featured: true,
    popular: true,
  },
  {
    id: "6",
    name: "Almond Croissant",
    description: "Flaky, buttery pastry filled with sweet almond frangipane.",
    price: 4.5,
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=800&q=80",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    role: "Local Artist",
    content: "The best coffee in town. The atmosphere is perfect for getting work done or just relaxing with a book. Their pour-over is simply exceptional.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
  },
  {
    id: "t2",
    name: "Michael Chen",
    role: "Software Engineer",
    content: "I come here every morning. The staff is incredibly friendly, and they always remember my order. The avocado toast is a must-try!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
  },
  {
    id: "t3",
    name: "Emily Rodriguez",
    role: "Food Blogger",
    content: "A hidden gem! The aesthetics are stunning, and the pastries are baked fresh daily. You can taste the quality in every bite.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 4,
  },
];

export const galleryImages: GalleryImage[] = [
  { id: "g1", url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", alt: "Cafe interior showing cozy seating" },
  { id: "g2", url: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80", alt: "Barista pouring latte art" },
  { id: "g3", url: "https://images.unsplash.com/photo-1495474472201-1e6e58ab5bfa?w=800&q=80", alt: "Freshly roasted coffee beans" },
  { id: "g4", url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", alt: "Coffee extraction from espresso machine" },
  { id: "g5", url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80", alt: "Delicious pastry on a plate" },
  { id: "g6", url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80", alt: "People enjoying coffee together" },
];

export const contactInfo: ContactInfo = {
  address: "123 Artisanal Way, Coffee District, CD 90210",
  phone: "+1 (555) 123-4567",
  email: "hello@lumierecafe.com",
  hours: [
    { days: "Monday - Friday", hours: "7:00 AM - 7:00 PM" },
    { days: "Saturday", hours: "8:00 AM - 8:00 PM" },
    { days: "Sunday", hours: "8:00 AM - 5:00 PM" },
  ],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
  },
};

export const whyChooseUs = [
  {
    id: "w1",
    title: "Ethically Sourced",
    description: "We work directly with farmers to ensure fair wages and sustainable practices for every bean we brew.",
    icon: "Leaf",
  },
  {
    id: "w2",
    title: "Master Roasters",
    description: "Our coffee is roasted in-house in small batches to guarantee optimal freshness and complex flavor profiles.",
    icon: "Coffee",
  },
  {
    id: "w3",
    title: "Artisanal Pastries",
    description: "Baked fresh every morning by our expert pastry chefs using organic, locally-sourced ingredients.",
    icon: "Croissant",
  },
  {
    id: "w4",
    title: "Cozy Atmosphere",
    description: "A thoughtfully designed space perfect for deep work, casual meetings, or simply relaxing.",
    icon: "Sofa",
  },
];
