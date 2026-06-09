import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Star, Calendar, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import InteractiveProposalHero from './components/InteractiveProposalHero';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import BookingAndContactSection from './components/BookingAndContactSection';
import StickyBookNow from './components/StickyBookNow';
import { services } from './data';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans antialiased text-blush-950 frosted-bg">
      {/* 1. Translucent Soft Pink Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 md:py-4 rounded-full border border-white/45 bg-white/30 backdrop-blur-lg shadow-lg shadow-pink-200/10 pointer-events-auto">
          
          {/* Logo Brand */}
          <a href="#hero-section" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-luxury-gold to-[#FFD1DC] flex items-center justify-center text-white font-serif font-bold text-sm shadow-sm group-hover:scale-105 transition-transform duration-300">
              L
            </div>
            <span className="font-serif text-lg tracking-[0.25em] font-normal text-blush-950 uppercase group-hover:text-luxury-gold transition-colors duration-200">
              L'Amour
            </span>
          </a>

          {/* Quick Menu Links */}
          <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase font-semibold text-blush-950/70">
            <a href="#hero-section" className="hover:text-blush-600 transition-colors duration-200">Intro</a>
            <a href="#experience-section" className="hover:text-blush-600 transition-colors duration-200">Packages</a>
            <a href="#gallery-section" className="hover:text-blush-600 transition-colors duration-200">Portfolio</a>
            <a href="#booking-section" className="hover:text-blush-600 transition-colors duration-200">Inquire</a>
          </div>

          {/* Nav Actions Button with classic lavender pink gradient */}
          <div>
            <button
              onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 rounded-full btn-lavender-pink font-sans text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 shadow active:scale-95 cursor-pointer"
            >
              Book Consultation
            </button>
          </div>

        </div>
      </nav>

      {/* 2. Fullscreen Scroll-driven Frame Animation Hero Section */}
      <InteractiveProposalHero />

      {/* 3. The Atelier Philosophy Segment (Introduction) */}
      <section id="philosophy-section" className="py-28 px-4 relative overflow-hidden bg-transparent">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#fbc2eb]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#ffd1dc]/15 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 p-8 md:p-14 rounded-[40px] glass-card-premium border border-white/50 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-bold block mb-2">
              Philosophie de L'Amour
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-blush-950 font-normal leading-tight tracking-tight">
              Where Elegant Geometry Meets <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blush-600 to-luxury-gold">Unforgettable Romance</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blush-300 to-luxury-gold mx-auto my-6" />
            <p className="text-base md:text-lg text-blush-950/80 font-light leading-relaxed max-w-2xl mx-auto font-sans leading-relaxed">
              We do not simply set stages; we write cinematic screenplays. Every element of our layouts is mathematically crafted with custom lighting, soft-glow blush flowers, precise candle dimensions, and exquisite rose gold contours to elevate your private fairytale.
            </p>
            
            {/* Elegant Trust badges with Frosted backgrounds */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
              <div className="p-6 rounded-[28px] bg-white/30 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                <Sparkles className="w-5 h-5 text-blush-500 mx-auto mb-2" />
                <h4 className="font-serif text-base text-[#4a2c2a] font-normal">Custom Designed</h4>
                <p className="text-xs text-[#4a2c2a]/70 font-light mt-1 font-sans">Unique details derived from your story lines.</p>
              </div>
              <div className="p-6 rounded-[28px] bg-white/30 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                <Heart className="w-5 h-5 text-blush-500 mx-auto mb-2" />
                <h4 className="font-serif text-base text-[#4a2c2a] font-normal">Premium Floristry</h4>
                <p className="text-xs text-[#4a2c2a]/70 font-light mt-1 font-sans">Sustainably sourced, fresh, high-end blush roses.</p>
              </div>
              <div className="p-6 rounded-[28px] bg-white/30 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                <ShieldCheck className="w-5 h-5 text-blush-500 mx-auto mb-2" />
                <h4 className="font-serif text-base text-[#4a2c2a] font-normal">Absolute Secrecy</h4>
                <p className="text-xs text-[#4a2c2a]/70 font-light mt-1 font-sans">Meticulous planning and discreet staff execution.</p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 4. Luxury Experience Packages Section */}
      <section id="experience-section" className="py-24 px-4 bg-transparent relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#fbcbc9]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-bold block mb-3">
              Curated Masterpieces
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-blush-950 font-normal tracking-tight">
              Our Proposal <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blush-600 to-luxury-gold">Collections</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blush-400 to-luxury-gold mx-auto mt-6" />
          </div>

          {/* Experience Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card hover:bg-white/40 rounded-[36px] overflow-hidden border border-white hover:border-white transition-all duration-500 shadow-xl flex flex-col md:flex-row group"
              >
                {/* Product/Service Image Column */}
                <div className="w-full md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[350px] overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4a2c2a]/45 via-transparent to-transparent" />
                  
                  {/* Luxury Signature Tag */}
                  <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[9px] tracking-widest uppercase font-semibold">
                    Atelier Standard
                  </div>
                </div>

                {/* Narrative Detail Column */}
                <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-blush-950/80">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blush-500" />
                        <span>{service.duration}</span>
                      </div>
                      <span className="font-semibold text-blush-600 font-sans">{service.price}</span>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl text-blush-950 font-normal leading-tight group-hover:text-blush-600 transition-colors duration-200">
                      {service.name}
                    </h3>
                    
                    <p className="text-xs text-blush-950/80 font-light leading-relaxed font-sans">
                      {service.description}
                    </p>

                    {/* Features checklist */}
                    <ul className="space-y-1.5 pt-2">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-blush-950/80 leading-normal font-sans">
                          <Star className="w-3 h-3 text-luxury-gold fill-luxury-gold mt-1 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Trigger buttons using our beautiful peachy pink style on group hover */}
                  <div className="mt-8 pt-4 border-t border-white/20">
                    <button
                      onClick={() => handleSelectService(service.id)}
                      className="w-full py-3 rounded-2xl border border-white/50 bg-white/40 hover:btn-peachy-pink text-blush-950 font-sans text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md"
                    >
                      <span>Inquire This Package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Responsive Portfolio Gallery Grid */}
      <GallerySection />

      {/* 6. Love-Quote Testimonials Slideshow */}
      <TestimonialsSection />

      {/* 7. Comprehensive Booking Questionnaire, Direct Contacts, Map Location Section */}
      <BookingAndContactSection />

      {/* 8. Sticky Pink Booking Activation Pills */}
      <StickyBookNow />

      {/* 9. Elegant High-End Boutique Footer */}
      <footer className="bg-blush-950 text-blush-100 py-16 px-4 relative overflow-hidden">
        {/* Soft decorative glow background */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-36 bg-blush-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-12">
            
            {/* Core Footer Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#fc8890] to-luxury-gold flex items-center justify-center text-white font-serif font-bold text-xs">
                  L
                </div>
                <span className="font-serif text-base tracking-[0.2em] uppercase text-white font-medium">
                  L'Amour
                </span>
              </div>
              <p className="text-xs text-blush-200/60 font-light leading-relaxed max-w-xs">
                HANDCRAFTING LUXURY PROPOSALS, BESPOKE ROMANCE EVENTS, AND CINEMATIC ENGAGEMENTS WORLDWIDE.
              </p>
              <p className="text-[10px] text-luxury-gold font-mono tracking-widest">
                ★ FLAGSHIP BOUTIQUE: BEVERLY HILLS, CA
              </p>
            </div>

            {/* Quick Navigation anchors */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm text-white tracking-widest uppercase">The Experience</h4>
              <ul className="space-y-2 text-xs text-blush-200/50 font-light">
                <li><a href="#hero-section" className="hover:text-blush-300">Interact Hero</a></li>
                <li><a href="#experience-section" className="hover:text-blush-300">Proposal Packages</a></li>
                <li><a href="#gallery-section" className="hover:text-blush-400">Atelier Gallery</a></li>
                <li><a href="#booking-section" className="hover:text-blush-400">Book Appointment</a></li>
              </ul>
            </div>

            {/* Experiences detail info */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm text-white tracking-widest uppercase">Our Collections</h4>
              <ul className="space-y-2 text-xs text-blush-200/50 font-light">
                <li><span>Sunset Rooftop Serenade</span></li>
                <li><span>Twilight Ocean Pavilion</span></li>
                <li><span>Custom Floral Fantasy</span></li>
                <li><span>Bespoke Jewelry Concierge</span></li>
              </ul>
            </div>

            {/* Working Salon Hours */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm text-white tracking-widest uppercase">Salon Hours</h4>
              <ul className="space-y-2 text-xs text-blush-200/50 font-light">
                <li><span>Monday - Friday: 10:00 AM - 08:00 PM</span></li>
                <li><span>Saturday: 09:00 AM - 09:00 PM (By Appt Only)</span></li>
                <li><span>Sunday: Closed (Event Service Active)</span></li>
                <li><span className="text-luxury-gold">Active WhatsApp Planner Available 24/7</span></li>
              </ul>
            </div>

          </div>

          {/* Trademark + Terms */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-blush-200/40 font-light">
            <span>
              &copy; {new Date().getFullYear()} L'AMOUR ATELIER. ALL RIGHTS RESERVED WORLDWIDE.
            </span>
            <div className="flex gap-4">
              <a href="#booking-section" className="hover:text-blush-300">Privacy Policy</a>
              <span>&bull;</span>
              <a href="#booking-section" className="hover:text-blush-300">Terms of Service</a>
              <span>&bull;</span>
              <a href="#booking-section" className="hover:text-blush-300">Media Kits</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
