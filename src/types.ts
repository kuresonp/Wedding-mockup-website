export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  image: string;
}

export interface BookingData {
  fullName: string;
  email: string;
  serviceType: string;
  date: string;
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}
