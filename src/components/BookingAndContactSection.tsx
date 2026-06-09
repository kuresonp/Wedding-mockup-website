import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Instagram, MapPin, Navigation, Send, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { services } from '../data';

export default function BookingAndContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    serviceType: services[0].id,
    date: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.date) {
      alert('Please fill out your name and desired date.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate luxury concierge API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      serviceType: services[0].id,
      date: '',
      message: ''
    });
    setIsSuccess(false);
  };

  const getServiceName = (id: string) => {
    return services.find(s => s.id === id)?.name || id;
  };

  const mapIframeUrl = "https://maps.google.com/maps?q=Beverly%20Hills,%20California&t=&z=14&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="booking-section" className="py-24 px-4 bg-transparent relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blush-100/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/10 right-1/4 w-[400px] h-[400px] rounded-full bg-[#fbcbc9]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-bold block mb-3">
            Bespoke Orchestration
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-blush-950 font-normal tracking-tight">
            Begin Your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blush-600 to-luxury-gold">Love Chapter</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blush-300 to-luxury-gold mx-auto mt-6" />
          <p className="mt-6 text-sm text-blush-950/80 max-w-xl mx-auto font-light leading-relaxed font-sans">
            Fill out our intimate concierge questionnaire below, or directly connect with our dedicated luxury proposal planners on social lines.
          </p>
        </div>

        {/* Content Box: Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Booking Form (Glassmorphism card) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 md:p-10 rounded-[36px] border border-white/50 shadow-xl relative overflow-hidden backdrop-blur-xl">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="border-b border-white/30 pb-4 mb-4">
                      <h3 className="font-serif text-2xl text-blush-950 font-normal">
                        Proposal Inquiry Form
                      </h3>
                      <p className="text-xs text-blush-500 font-light mt-1 font-sans">
                        Tell us your dream scenario. Our team will design a tailor-made proposal moodboard.
                      </p>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-[#4a2c2a] mb-2 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Julian Montgomery"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl border border-white/50 bg-white/40 text-blush-950 focus:outline-none focus:ring-2 focus:ring-[#FF9A9E]/40 focus:border-transparent transition-all duration-300 text-sm font-sans"
                      />
                    </div>

                    {/* Grid of Email and Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email (Optional) */}
                      <div>
                        <label className="block text-xs font-mono tracking-widest uppercase text-[#4a2c2a] mb-2 font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. julian@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3.5 rounded-xl border border-white/50 bg-white/40 text-blush-950 focus:outline-none focus:ring-2 focus:ring-[#FF9A9E]/40 focus:border-transparent transition-all duration-300 text-sm font-sans"
                        />
                      </div>

                      {/* Desired Date */}
                      <div>
                        <label className="block text-xs font-mono tracking-widest uppercase text-[#4a2c2a] mb-2 font-medium">
                          Target Date *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full px-4 py-3.5 rounded-xl border border-white/50 bg-white/40 text-blush-950 focus:outline-none focus:ring-2 focus:ring-[#FF9A9E]/40 focus:border-transparent transition-all duration-300 text-sm font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Type Selection */}
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-[#4a2c2a] mb-2 font-medium">
                        Select Experience
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl border border-white/50 bg-white/40 text-[#4a2c2a] focus:outline-none focus:ring-2 focus:ring-[#FF9A9E]/40 focus:border-transparent transition-all duration-300 text-sm font-sans cursor-pointer"
                      >
                        {services.map((service) => (
                          <option key={service.id} value={service.id} className="text-[#4a2c2a] bg-stone-50">
                            {service.name}
                          </option>
                        ))}
                        <option value="custom" className="text-[#4a2c2a] bg-stone-50">Custom Fantasy Proposal Design</option>
                      </select>
                    </div>

                    {/* Message / Message Box */}
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-[#4a2c2a] mb-2 font-medium">
                        Romantic Details & Vision
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about how you met, her/his preferences, any details of their dream proposal (roses, lights, acoustic violin)..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl border border-white/50 bg-white/40 text-blush-950 focus:outline-none focus:ring-2 focus:ring-[#FF9A9E]/40 focus:border-transparent transition-all duration-300 text-sm font-sans resize-none"
                      />
                    </div>

                    {/* Submit Button in Premium Peachy Pink Gradient */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-2xl btn-peachy-pink font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-pink-200/60 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-blush-950 border-t-transparent rounded-full animate-spin" />
                            <span>Orchestrating...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-blush-950" />
                            <span>Book Consultation Appointment</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-card"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="p-6 text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full btn-peachy-pink mx-auto flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-10 h-10 text-white fill-blush-950" />
                    </div>
                    <div>
                      <h3 className="font-serif text-3xl text-blush-950 font-normal">
                        Proposal Set in Motion
                      </h3>
                      <p className="text-sm text-blush-950/80 font-light mt-3 leading-relaxed max-w-md mx-auto font-sans">
                        Dear <span className="font-semibold text-blush-600">{formData.fullName}</span>, your inquiry for <span className="font-semibold text-blush-600">{getServiceName(formData.serviceType)}</span> on <span className="font-semibold text-blush-600">{formData.date}</span> is received.
                      </p>
                      <p className="text-xs text-blush-500 font-light mt-4 leading-relaxed max-w-sm mx-auto font-sans">
                        Our private romantic event architect will reach out to you within 2 hours with customized aesthetic drafts on your email or mobile lines.
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-xl border border-blush-300 text-blush-600 font-sans text-[11px] tracking-widest uppercase font-semibold hover:bg-white/10 transition-colors duration-200"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Options & Embedded Live Google Map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Contact Actions Box */}
            <div className="glass-card p-8 rounded-[36px] border border-white/50 shadow-xl space-y-6">
              <h3 className="font-serif text-2xl text-blush-950 font-normal">
                Direct Consultations
              </h3>
              <p className="text-xs text-blush-950/70 font-light -mt-2 leading-relaxed font-sans">
                Skip form filing! Speak immediately and securely with our direct boutique design planners.
              </p>

              {/* Action Buttons list */}
              <div className="space-y-4">
                
                {/* 1. WhatsApp styled in soft pink premium design */}
                <a
                  href="https://wa.me/15550199?text=Hi%20L'Amour%20Proposal%20Atelier!%20I'd%20like%20to%20discuss%20designing%20a%20luxury%20proposal%20event."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-[20px] bg-white/20 hover:bg-white/45 border border-white/30 shadow-sm transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/40 flex items-center justify-center text-blush-500 shadow-sm border border-white/30">
                      <Phone className="w-5 h-5 fill-blush-500/10" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-mono tracking-wider font-semibold text-blush-600 uppercase">
                        WhatsApp Line
                      </span>
                      <span className="text-xs text-blush-950/70 font-light font-sans">
                        Click-to-chat instantly (24/7 Support)
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blush-400 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

                {/* 2. Instagram profile link with modern pink accent */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-[20px] bg-white/20 hover:bg-white/45 border border-white/30 shadow-sm transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/40 flex items-center justify-center text-blush-500 shadow-sm border border-white/30">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-mono tracking-wider font-semibold text-blush-600 uppercase">
                        Instagram Atelier
                      </span>
                      <span className="text-xs text-blush-950/70 font-light font-sans">
                        Follow our fairytale proposals
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blush-400 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

                {/* 3. Email button with elegant rose highlight */}
                <a
                  href="mailto:hello@lamourproposals.com?subject= Bepsoke Proposal Inquiry"
                  className="flex items-center justify-between p-4 rounded-[20px] bg-white/20 hover:bg-white/45 border border-white/30 shadow-sm transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/40 flex items-center justify-center text-[#e2b79a] shadow-sm border border-white/30">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-mono tracking-wider font-semibold text-blush-600 uppercase">
                        Email Concierge
                      </span>
                      <span className="text-xs text-blush-950/70 font-light font-sans">
                        hello@lamourproposals.com
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#e2b79a]/80 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

              </div>
            </div>

            {/* LOCATION BOX: Live Google Map Layout */}
            <div className="glass-card p-6 rounded-[36px] border border-white/50 shadow-xl space-y-4 overflow-hidden relative">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-blush-600 shadow-sm border border-white/30">
                  <MapPin className="w-4 h-4 fill-blush-600/10" />
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-lg text-blush-950 font-normal">
                    L'Amour physical salon
                  </h4>
                  <p className="text-[10px] text-blush-500 font-mono tracking-wide">
                    Beverly Hills Boutique, California
                  </p>
                </div>
              </div>

              {/* Embedded Live Google Map with Custom Rose Border Frame */}
              <div className="relative rounded-2xl overflow-hidden h-48 border border-white/40 shadow-inner group">
                <iframe
                  title="Bespoke Salon Map"
                  src={mapIframeUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="filter grayscale saturate-150 group-hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Soft pink ambient lighting tint on map border */}
                <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />
              </div>

              {/* "Get Directions" button styled in premium peachy pink gradient */}
              <div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Beverly+Hills,+CA,+USA"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-2xl btn-peachy-pink font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:scale-[1.01] hover:shadow-xl flex items-center justify-center gap-2 shadow"
                >
                  <Navigation className="w-3.5 h-3.5 fill-white/10 text-blush-950" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
