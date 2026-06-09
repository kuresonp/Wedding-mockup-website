import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, Heart } from 'lucide-react';
import { galleryItems } from '../data';
import { GalleryItem } from '../types';

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery-section" className="py-24 px-4 bg-transparent relative overflow-hidden">
      {/* Soft Pink Background Glow Splotches */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-blush-200/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-luxury-rose/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-bold block mb-3">
            Atelier Portfolio
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-blush-950 font-normal tracking-tight">
            Our Chapters of <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blush-600 to-luxury-gold">Love</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blush-300 to-luxury-gold mx-auto mt-6" />
          <p className="mt-6 text-sm text-blush-950/80 max-w-xl mx-auto font-light leading-relaxed font-sans">
            Every setup we handcraft is custom-designed, tailored directly to the romantic storyline of your relationship. Browse some of our curated setups below.
          </p>
        </div>

        {/* Responsive Image Grid with Rose Gold Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative group cursor-pointer overflow-hidden rounded-[24px] glass-card border border-white hover:border-white transition-all duration-500 shadow-md hover:shadow-xl"
              onClick={() => setSelectedItem(item)}
            >
              {/* Aspect Ratio Box (4:3 or customized) */}
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Elegant Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a2c2a]/85 via-[#4a2c2a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="font-sans text-[9px] tracking-widest uppercase text-luxury-gold font-semibold mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg text-white font-light">
                      {item.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-white/80">
                      <ZoomIn className="w-4 h-4 text-luxury-gold" />
                      <span>View Gallery</span>
                    </div>
                  </div>
                </div>

                {/* Subtle outer glow border on hover */}
                <div className="absolute inset-x-0 inset-y-0 border-0 group-hover:border-[3px] border-white/40 rounded-[24px] transition-all duration-300 pointer-events-none" />
              </div>
              
              {/* Fallback card footer text for clear visibility on mobile */}
              <div className="p-4 bg-white/25 backdrop-blur-md transition-colors duration-300 border-t border-white/20 group-hover:bg-white/40">
                <span className="text-[10px] tracking-wider text-[#D4AF37] uppercase font-bold font-sans">
                  {item.category}
                </span>
                <h4 className="font-serif text-base text-blush-950 font-normal mt-0.5 transition-colors duration-300">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Click-to-Expand Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#4a2c2a]/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-4xl w-full glass-card rounded-[32px] overflow-hidden shadow-2xl border border-white/40 flex flex-col md:flex-row shadow-2xl shadow-pink-200/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Absolute top right close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row h-full w-full">
                {/* Left side image */}
                <div className="w-full md:w-3/5 aspect-video md:aspect-auto md:min-h-[500px] relative">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
                </div>

                {/* Right side narrative detail */}
                <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-white/35 backdrop-blur-lg border-t md:border-t-0 md:border-l border-white/20">
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-4 h-4 text-blush-500 fill-blush-600" />
                      <span className="font-sans text-[10px] tracking-widest uppercase text-blush-600 font-semibold">
                        {selectedItem.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-blush-950 font-normal leading-tight mb-4">
                      {selectedItem.title}
                    </h3>
                    
                    <div className="w-8 h-0.5 bg-luxury-gold mb-4" />
                    
                    <p className="text-sm text-blush-950/80 font-light leading-relaxed mb-6 font-sans">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="border-t border-white/20 pt-6 mt-6 flex flex-col gap-3 text-left">
                    <p className="text-[11px] text-[#D4AF37] font-mono tracking-wider font-bold">
                      ★ BESPOKE DECORATION ATELIER
                    </p>
                    <button
                      onClick={() => {
                        setSelectedItem(null);
                        document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3 rounded-xl btn-peachy-pink font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 text-center shadow cursor-pointer"
                    >
                      Enquire For Setup
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
