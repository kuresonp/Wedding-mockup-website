import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Phone } from 'lucide-react';

export default function StickyBookNow() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show the button after the user scrolls past 85% of viewport height (i.e. starts scrolling into the story)
      if (window.scrollY > window.innerHeight * 0.85) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToBooking = () => {
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="fixed bottom-6 left-0 right-0 z-40 px-4 md:px-0 pointer-events-none flex justify-center"
        >
          {/* Glassmorphism Bar container */}
          <div className="glass-card px-5 py-3.5 rounded-full border border-white/60 shadow-xl pointer-events-auto flex items-center justify-between gap-6 max-w-lg w-full glow-blush backdrop-blur-md">
            
            {/* Left side text detail */}
            <div className="hidden sm:flex flex-col gap-0.5 text-left">
              <span className="text-[10px] font-mono tracking-wider text-[#D4AF37] uppercase font-bold">
                L'Amour Atelier
              </span>
              <span className="text-xs text-blush-950 font-medium font-sans">
                Ready to capture your forever?
              </span>
            </div>

            {/* Quick action buttons in premium blush gradients */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* WhatsApp direct chat */}
              <a
                href="https://wa.me/15550199?text=Hi!%20I'd%20like%20to%20enquire%20about%20your%20luxury%20proposal%20packages!"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-full border border-white/50 bg-white/35 hover:bg-white/55 text-blush-600 transition-colors duration-200 cursor-pointer shadow-sm"
                title="Instant Chat"
              >
                <Phone className="w-4.5 h-4.5 fill-blush-500/10" />
              </a>

              {/* Primary Sticky Booking triggers */}
              <button
                onClick={handleScrollToBooking}
                className="flex-1 sm:flex-none px-6 py-3 rounded-full btn-peachy-pink font-sans text-xs tracking-widest uppercase font-bold text-[#4a2c2a] transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Now</span>
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
