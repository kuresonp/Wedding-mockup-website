import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../data';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Autoplay slider gently
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="py-24 px-4 bg-transparent relative overflow-hidden">
      {/* Cinematic background glowing radial overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blush-200/10 to-luxury-rose/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-bold block mb-2">
            Cherished Love Stories
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-blush-950 font-normal leading-tight">
            Our Happy <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blush-600 to-luxury-gold">Couples</span>
          </h2>
          <div className="w-12 h-0.5 bg-luxury-gold mx-auto mt-4" />
        </div>

        {/* Testimonial Box Wrapper with Pink glassmorphism tint */}
        <div className="relative min-h-[380px] md:min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full glass-card p-8 md:p-12 rounded-[36px] border border-white/50 max-w-3xl shadow-xl flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Couple's Photo Frame */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-3 border-white/60 shadow-md relative z-10">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Heart Icon tag */}
                <div className="absolute -bottom-1 -right-1 z-20 w-8 h-8 rounded-full btn-peachy-pink flex items-center justify-center text-[#4a2c2a] shadow-md border border-white/40">
                  <Heart className="w-4 h-4 fill-[#4a2c2a]" />
                </div>
              </div>

              {/* Text Area */}
              <div className="flex-1 text-center md:text-left">
                {/* Gold Rating Stars */}
                <div className="flex justify-center md:justify-start items-center gap-1.5 mb-4">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-luxury-gold text-luxury-gold/90" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#fc8890]/25 mb-3 mx-auto md:mx-0" />

                <p className="font-serif text-base md:text-lg text-blush-950 font-light italic leading-relaxed mb-6">
                  {activeTestimonial.quote}
                </p>

                <div>
                  <h4 className="font-sans text-sm tracking-widest uppercase font-semibold text-blush-950">
                    {activeTestimonial.name}
                  </h4>
                  <p className="text-xs text-blush-500 font-mono mt-1">
                    {activeTestimonial.event}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left / Right arrows styled in premium translucent blush pink */}
          <div className="absolute top-[102%] md:top-1/2 left-0 right-0 md:-left-12 md:-right-12 flex justify-center md:justify-between items-center gap-6 md:gap-0 pointer-events-none">
            <button
              onClick={prevSlide}
              className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/45 text-[#4a2c2a] border border-white/50 flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-md hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5 pointer-events-none" />
            </button>
            <button
              onClick={nextSlide}
              className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/45 text-[#4a2c2a] border border-white/50 flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-md hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === index
                  ? 'w-6 btn-peachy-pink'
                  : 'w-2 bg-white/30 border border-white/20 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
