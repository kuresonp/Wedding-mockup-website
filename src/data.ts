import { Service, Testimonial, GalleryItem } from './types';

// Importing generated premium image assets
import rooftopProposal from './assets/images/rooftop_proposal_1781025988460.png';
import engagementRing from './assets/images/engagement_ring_1781026004634.png';
import beachProposal from './assets/images/beach_proposal_1781026021095.png';
import champagneDetails from './assets/images/champagne_details_1781026035273.png';

export const services: Service[] = [
  {
    id: 'rooftop',
    name: 'The Dream Rooftop Sunset',
    description: 'A breathtaking private terrace experience decorated with hundreds of luxury blush roses, glowing fairy lights, premium soft cushions, and a scenic skyline view at golden hour.',
    price: 'Starting from $1,800',
    duration: '3 hours',
    features: [
      'Private luxury rooftop reservation',
      'Plush pink rose arrangements & floral arch',
      'Professional cinematic photographer & video reel',
      'Premium champagne & gourmet macaron platter',
      'Custom acoustic background musician'
    ],
    image: rooftopProposal
  },
  {
    id: 'beach',
    name: 'The Twilight Ocean Canopy',
    description: 'An enchanting beachside pavilion draped in ivory silk and adorned with dozens of candles, soft blush flower bundles, and a glowing custom neon declaration reflecting onto the calm waves.',
    price: 'Starting from $2,200',
    duration: '4 hours',
    features: [
      'Exclusive private beach section',
      'Handcrafted rose gold metal canopy structure',
      'Over 100 warm flameless led candles',
      'Full cinematic photoshoot & video',
      'Gourmet strawberry champagne celebration toast'
    ],
    image: beachProposal
  },
  {
    id: 'celebration',
    name: 'The Royal Rose Champagne Toast',
    description: 'Our signature intimate celebration setup focusing on premium table design. Featuring rose gold tableware, elegant blush centerpieces, crystal glassware, and customized luxury proposals.',
    price: 'Starting from $1,200',
    duration: '2 hours',
    features: [
      'Custom styled rose gold table landscape',
      'Signature pink petal floor carpet path',
      'Violin or harp soloist performance',
      'Gourmet dessert pairing course',
      'HD digital photo package (50+ retouched frames)'
    ],
    image: champagneDetails
  },
  {
    id: 'ring-concierge',
    name: 'The Diamond Box Experience',
    description: 'For those looking for absolute perfection. Includes custom ringside consultations, bespoke ring placement design, premium velvet packaging, and coordination of the ring delivery moment.',
    price: 'Starting from $950',
    duration: 'Bespoke consult',
    features: [
      'Bespoke ring box styling (custom velvet colors)',
      'Diamond sparkle visual synchronization',
      'VIP secure transit of ring to proposal site',
      'Macro close-up photography of the ring',
      'Secret pocket box design (virtually invisible)'
    ],
    image: engagementRing
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'A Sunset Skyline Promise',
    description: 'Sophisticated rooftop proposal decorated with premium blush roses as the city skyline catches the golden sunset light.',
    category: 'Rooftop Skyline',
    imageUrl: rooftopProposal
  },
  {
    id: 'g2',
    title: 'The Eternal Sparkle',
    description: 'Bespoke diamond band lying inside a premium pink velvet holder, surrounded by delicate rose petals and gold accents.',
    category: 'Bespoke Details',
    imageUrl: engagementRing
  },
  {
    id: 'g3',
    title: 'Candlelit Ocean Whisper',
    description: 'An elegant custom pavilion on the coastline, surrounded by twilight ambiance, candles, and a glowing pink neon sign.',
    category: 'Ocean Coastal',
    imageUrl: beachProposal
  },
  {
    id: 'g4',
    title: 'Toast to Forever After',
    description: 'Luxury celebratory landscape featuring custom rose gold champagne flutes, pink orchids, and romantic dinner styling.',
    category: 'Celebration Styling',
    imageUrl: champagneDetails
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sophia & Daniel',
    event: 'The Dream Skyline Rooftop',
    quote: '"It felt like stepping straight into a cinema. The pink floral arrangements, the coordinates printed in rose gold, and the soft acoustic music playing as he knelt down... It was everything I ever dreamed of and more."',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop'
  },
  {
    id: 't2',
    name: 'Marcus & Jasmine',
    event: 'Twilight Ocean Canopy',
    quote: '"The team was absolutely phenomenal, handling every detail via WhatsApp. We did not have to worry about a thing! When Jasmine saw the glowing pavilion on the water, she was in tears. A perfect masterpiece."',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop'
  },
  {
    id: 't3',
    name: 'Isabella & Liam',
    event: 'Rose Gold Celebration Table',
    quote: '"Absolutely stunning attention to detail, professional design, and world-class photos. The luxury pink aesthetic was cohesive, soft, and breathtakingly romantic. Recommending this to everyone!"',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop'
  }
];
