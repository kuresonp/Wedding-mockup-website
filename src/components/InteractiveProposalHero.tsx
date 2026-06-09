import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';

export default function InteractiveProposalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Monitor scroll progress within the fullscreen animation block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track state for smooth interpolation
  const scrollValueRef = useRef(0);
  const animatedValueRef = useRef(0);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intercept scroll progress to drive the Canvas animation
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      scrollValueRef.current = latest;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Canvas drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = (rect?.width || window.innerWidth) * window.devicePixelRatio;
      canvas.height = (rect?.height || window.innerHeight) * window.devicePixelRatio;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Easing helper
    const lerp = (start: number, end: number, amt: number) => {
      return (1 - amt) * start + amt * end;
    };

    // Render loop
    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      // Clear
      ctx.clearRect(0, 0, w, h);

      // Smooth scroll value interpolation (Spring physics feel)
      // If we are on mobile, let's create a gentle autoplay sine wave loop if they aren't scrolling,
      // which acts as a magnificent live loop fallback!
      let targetValue = scrollValueRef.current;
      if (isMobile) {
        // Overlay a bit of auto-wave so it lives on mobile
        const t = Date.now() * 0.0015;
        const autoScroll = (Math.sin(t) + 1) / 2; // oscillates 0 to 1
        // Mix scroll with auto-scroll if very low, else allow scroll
        if (targetValue < 0.01) {
          targetValue = autoScroll;
        }
      }

      // Smooth lerping
      animatedValueRef.current = lerp(animatedValueRef.current, targetValue, 0.08);
      const progress = animatedValueRef.current;

      // Base scaling factor relative to 1920x1080
      const scale = Math.min(w / 1920, h / 1080) * 1.5;

      // Draw soft vignette sunset-pink backdrop
      const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h) * 0.75);
      bgGrad.addColorStop(0, '#fff0f2');  // Centered soft blush glow
      bgGrad.addColorStop(0.5, '#fce0e3'); // Rose cream
      bgGrad.addColorStop(1, '#fad2d6');   // Deep luxurious warm pink border
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Draw elegant subtle environmental light particles (sparkles) in backgrounds
      ctx.save();
      for (let i = 0; i < 20; i++) {
        const seedValue = Math.sin(i * 45.67 + progress * 0.5);
        const cosValue = Math.cos(i * 12.34);
        const px = (0.5 + seedValue * 0.45) * w;
        const py = (0.5 + cosValue * 0.45) * h - (progress * 150 * (1 + seedValue));
        const pSize = (3 + (seedValue + 1) * 2) * scale;
        
        ctx.beginPath();
        ctx.fillStyle = 'rgba(252, 136, 144, 0.35)';
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow layer for a few sparkles
        if (i % 4 === 0) {
          ctx.beginPath();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.arc(px, py, pSize * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // Floating Hearts in the center (like the user image attachments)
      ctx.save();
      const drawHeart = (x: number, y: number, hScale: number, opacity: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(hScale * scale, hScale * scale);
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.bezierCurveTo(-5, -12, -12, -7, -12, 0);
        ctx.bezierCurveTo(-12, 7, -5, 12, 0, 18);
        ctx.bezierCurveTo(5, 12, 12, 7, 12, 0);
        ctx.bezierCurveTo(12, -7, 5, -12, 0, -6);
        ctx.closePath();
        
        // Gradient for depth
        const heartGrad = ctx.createLinearGradient(-10, -10, 10, 15);
        heartGrad.addColorStop(0, `rgba(252, 136, 144, ${opacity})`);
        heartGrad.addColorStop(1, `rgba(244, 91, 105, ${opacity})`);
        ctx.fillStyle = heartGrad;
        
        // Shadow
        ctx.shadowColor = `rgba(224, 59, 75, ${0.15 * opacity})`;
        ctx.shadowBlur = 10 * scale;
        ctx.shadowOffsetY = 6 * scale;
        
        ctx.fill();
        ctx.restore();
      };

      // Heart positions
      const baselineY = h * 0.28;
      const heart1X = w * 0.48;
      const heart1Y = baselineY - progress * 90 * scale;
      const h1Scale = 1.0 + Math.sin(progress * 5) * 0.1;
      drawHeart(heart1X, heart1Y, h1Scale, 0.85);

      const heart2X = w * 0.56;
      const heart2Y = baselineY - 40 * scale - progress * 130 * scale;
      const h2Scale = 0.7 + Math.sin(progress * 4 + 2) * 0.08;
      drawHeart(heart2X, heart2Y, h2Scale, 0.7);

      const heart3X = w * 0.43;
      const heart3Y = baselineY - 60 * scale - progress * 110 * scale;
      const h3Scale = 0.6 + Math.cos(progress * 6) * 0.05;
      drawHeart(heart3X, heart3Y, h3Scale, 0.65);
      ctx.restore();


      // DRAWING THE WEDDING PROPOSAL HANDS AS GORGEOUS GRADIENT PATHS
      // Right Hand (extended on the right - pink sleeve)
      ctx.save();
      const rHandBaseX = w * 0.65;
      const rHandBaseY = h * 0.58;
      
      // Let's add slight hand hovering animation on progress
      const rHoverY = Math.sin(progress * Math.PI) * 10 * scale;
      const rx = rHandBaseX;
      const ry = rHandBaseY + rHoverY;

      // Shadow setting
      ctx.shadowColor = 'rgba(28, 15, 18, 0.08)';
      ctx.shadowBlur = 25 * scale;
      ctx.shadowOffsetY = 12 * scale;

      // 1. Right Arm Sleeve (Pink)
      ctx.beginPath();
      ctx.moveTo(w, ry + 150 * scale);
      ctx.lineTo(rx + 220 * scale, ry + 80 * scale);
      // Soft cuff curve
      ctx.bezierCurveTo(
        rx + 190 * scale, ry + 40 * scale,
        rx + 190 * scale, ry - 30 * scale,
        rx + 220 * scale, ry - 70 * scale
      );
      ctx.lineTo(w, ry - 140 * scale);
      ctx.closePath();
      
      const rSleeveGrad = ctx.createLinearGradient(rx + 200 * scale, ry, w, ry + 50 * scale);
      rSleeveGrad.addColorStop(0, '#f2abb4'); // Blush pink
      rSleeveGrad.addColorStop(0.5, '#e59fb6');
      rSleeveGrad.addColorStop(1, '#d58fa5'); // Dark pink shadow
      ctx.fillStyle = rSleeveGrad;
      ctx.fill();

      // Right Cuff trim gold line
      ctx.beginPath();
      ctx.moveTo(rx + 220 * scale, ry + 80 * scale);
      ctx.bezierCurveTo(
        rx + 190 * scale, ry + 40 * scale,
        rx + 190 * scale, ry - 30 * scale,
        rx + 220 * scale, ry - 70 * scale
      );
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 14 * scale;
      ctx.lineCap = 'round';
      ctx.stroke();

      // 2. Right Hand Skin / Fingers extended
      ctx.beginPath();
      ctx.moveTo(rx + 195 * scale, ry - 40 * scale); // Near cuff top
      // Arm back to wrist
      ctx.bezierCurveTo(rx + 110 * scale, ry - 42 * scale, rx + 130 * scale, ry - 28 * scale, rx + 90 * scale, ry - 24 * scale);
      
      // Index finger
      ctx.bezierCurveTo(rx + 40 * scale, ry - 30 * scale, rx - 30 * scale, ry - 25 * scale, rx - 40 * scale, ry - 12 * scale);
      ctx.bezierCurveTo(rx - 45 * scale, ry - 2 * scale, rx - 10 * scale, ry + 1 * scale, rx + 10 * scale, ry - 2 * scale);
      
      // Middle finger (extended, where the ring will go!)
      ctx.bezierCurveTo(rx - 40 * scale, ry - 2 * scale, rx - 65 * scale, ry + 2 * scale, rx - 70 * scale, ry + 12 * scale);
      ctx.bezierCurveTo(rx - 73 * scale, ry + 22 * scale, rx - 30 * scale, ry + 26 * scale, rx + 15 * scale, ry + 18 * scale);
      
      // Ring finger
      ctx.bezierCurveTo(rx - 30 * scale, ry + 18 * scale, rx - 55 * scale, ry + 24 * scale, rx - 58 * scale, ry + 34 * scale);
      ctx.bezierCurveTo(rx - 60 * scale, ry + 43 * scale, rx - 20 * scale, ry + 44 * scale, rx + 10 * scale, ry + 32 * scale);
      
      // Little finger
      ctx.bezierCurveTo(rx - 15 * scale, ry + 34 * scale, rx - 35 * scale, ry + 44 * scale, rx - 36 * scale, ry + 51 * scale);
      ctx.bezierCurveTo(rx - 36 * scale, ry + 59 * scale, rx + 5 * scale, ry + 58 * scale, rx + 65 * scale, ry + 42 * scale);
      
      // Palm base
      ctx.bezierCurveTo(rx + 110 * scale, ry + 35 * scale, rx + 170 * scale, ry + 45 * scale, rx + 195 * scale, ry + 45 * scale);
      ctx.closePath();

      const skinGrad = ctx.createLinearGradient(rx - 70 * scale, ry, rx + 200 * scale, ry);
      skinGrad.addColorStop(0, '#f9dfd5'); // Soft skin tone highlight
      skinGrad.addColorStop(0.5, '#f5cebc');
      skinGrad.addColorStop(1, '#eaa992'); // shadow skin tone
      ctx.fillStyle = skinGrad;
      ctx.fill();

      // Delicate love bracelet on the wrist for extra boutique luxury details!
      ctx.beginPath();
      ctx.arc(rx + 185 * scale, ry + 10 * scale, 35 * scale, -Math.PI/2, Math.PI/2);
      ctx.strokeStyle = '#e2b79a'; // Rose gold
      ctx.lineWidth = 4 * scale;
      ctx.stroke();

      // Tiny heart lock on bracelet
      ctx.beginPath();
      ctx.fillStyle = '#f45b69';
      ctx.arc(rx + 185 * scale, ry + 45 * scale, 5 * scale, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();


      // Left Hand (holding the ring, blue sleeve, entering from left)
      ctx.save();
      // Calculate smooth interpolation of left hand sliding in based on progress
      // At progress = 0.0, it is further left. At progress = 0.85, it is right next to the right finger
      const startX = -150 * scale;
      const targetX = w * 0.40;
      const lHandBaseX = lerp(startX, targetX, progress);
      const lHandBaseY = h * 0.52 + Math.cos(progress * Math.PI) * 6 * scale;
      
      const lx = lHandBaseX;
      const ly = lHandBaseY;

      ctx.shadowColor = 'rgba(28, 15, 18, 0.06)';
      ctx.shadowBlur = 20 * scale;
      ctx.shadowOffsetY = 10 * scale;

      // 1. Left Arm Sleeve (Blue)
      ctx.beginPath();
      ctx.moveTo(-100 * scale, ly + 200 * scale);
      ctx.lineTo(lx - 150 * scale, ly + 80 * scale);
      // Cuff curve
      ctx.bezierCurveTo(
        lx - 120 * scale, ly + 40 * scale,
        lx - 120 * scale, ly - 35 * scale,
        lx - 150 * scale, ly - 70 * scale
      );
      ctx.lineTo(-100 * scale, ly - 220 * scale);
      ctx.closePath();
      
      const lSleeveGrad = ctx.createLinearGradient(lx - 200 * scale, ly, lx, ly);
      lSleeveGrad.addColorStop(0, '#3f67aa'); // Soft premium navy / blue
      lSleeveGrad.addColorStop(0.5, '#4b77bd');
      lSleeveGrad.addColorStop(1, '#5684cc');
      ctx.fillStyle = lSleeveGrad;
      ctx.fill();

      // Blue suit cuff gold line
      ctx.beginPath();
      ctx.moveTo(lx - 150 * scale, ly + 80 * scale);
      ctx.bezierCurveTo(
        lx - 120 * scale, ly + 40 * scale,
        lx - 120 * scale, ly - 35 * scale,
        lx - 150 * scale, ly - 70 * scale
      );
      ctx.strokeStyle = '#e2b79a'; // Rose gold button/cufflink detailing
      ctx.lineWidth = 5 * scale;
      ctx.stroke();

      // Cuffling on blue sleeve
      ctx.beginPath();
      ctx.fillStyle = '#e2b79a';
      ctx.arc(lx - 135 * scale, ly - 15 * scale, 6 * scale, 0, Math.PI*2);
      ctx.fill();

      // 2. Proposer Hand (Skin/Fingers gripping the ring)
      ctx.beginPath();
      ctx.moveTo(lx - 130 * scale, ly - 40 * scale);
      ctx.bezierCurveTo(lx - 80 * scale, ly - 42 * scale, lx - 40 * scale, ly - 30 * scale, lx - 10 * scale, ly - 25 * scale);
      
      // Index Finger curled holding the ring
      ctx.bezierCurveTo(lx + 40 * scale, ly - 22 * scale, lx + 70 * scale, ly + 10 * scale, lx + 50 * scale, ly + 36 * scale);
      ctx.bezierCurveTo(lx + 25 * scale, ly + 42 * scale, lx + 5 * scale, ly + 25 * scale, lx + 10 * scale, ly + 10 * scale);
      
      // Thumb curled downwards holding
      ctx.bezierCurveTo(lx + 35 * scale, ly + 28 * scale, lx + 45 * scale, ly + 50 * scale, lx + 20 * scale, ly + 65 * scale);
      ctx.bezierCurveTo(lx - 5 * scale, ly + 68 * scale, lx - 20 * scale, ly + 45 * scale, lx - 10 * scale, ly + 25 * scale);

      // Remaining fingers bent back
      ctx.bezierCurveTo(lx - 25 * scale, ly + 35 * scale, lx - 55 * scale, ly + 45 * scale, lx - 75 * scale, ry + 42 * scale);
      ctx.bezierCurveTo(lx - 90 * scale, ly + 25 * scale, lx - 110 * scale, ly + 10 * scale, lx - 130 * scale, ly + 10 * scale);
      ctx.closePath();

      const lSkinGrad = ctx.createLinearGradient(lx - 130 * scale, ly, lx + 60 * scale, ly);
      lSkinGrad.addColorStop(0, '#f9dfd5');
      lSkinGrad.addColorStop(1, '#eaa992');
      ctx.fillStyle = lSkinGrad;
      ctx.fill();
      ctx.restore();


      // THE GOLD DIAMOND RING
      ctx.save();
      // The ring will stay between both hands.
      // At progress -> 1, progress pushes the ring onto the partner's middle finger!
      // Partner's ring finger midpoint in coordinate space:
      const partnerFingerX = rx - 55 * scale;
      const partnerFingerY = ry + 8 * scale;
      
      // Ring starting position is gripped by left hand
      const gripRingX = lx + 48 * scale;
      const gripRingY = ly + 18 * scale;

      // Interpolate the ring coordinate!
      const ringX = lerp(gripRingX, partnerFingerX, Math.min(progress * 1.15, 1));
      const ringY = lerp(gripRingY, partnerFingerY, Math.min(progress * 1.15, 1));
      
      ctx.translate(ringX, ringY);
      // Slight rotation of the ring as it approaches the finger
      const ringRot = lerp(-0.35, 0.1, progress);
      ctx.rotate(ringRot);

      // Draw Golden Ring Band
      ctx.beginPath();
      ctx.arc(0, 0, 24 * scale, 0, Math.PI * 2);
      ctx.strokeStyle = '#e2b79a'; // gold band
      ctx.lineWidth = 8 * scale;
      ctx.shadowColor = 'rgba(218, 165, 32, 0.4)';
      ctx.shadowBlur = 15;
      ctx.stroke();

      // Band highlight
      ctx.beginPath();
      ctx.arc(0, 0, 24 * scale, -Math.PI / 4, Math.PI+0.1);
      ctx.strokeStyle = '#fff0dd'; // soft gold shining reflection
      ctx.lineWidth = 2.5 * scale;
      ctx.stroke();

      // Diamond Mount / Setting
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-10 * scale, -24 * scale);
      ctx.lineTo(10 * scale, -24 * scale);
      ctx.lineTo(6 * scale, -32 * scale);
      ctx.lineTo(-6 * scale, -32 * scale);
      ctx.closePath();
      ctx.fillStyle = '#e2b79a';
      ctx.fill();

      // Diamond Prism!
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#f0f5ff';
      ctx.beginPath();
      ctx.moveTo(-11 * scale, -32 * scale);
      ctx.lineTo(11 * scale, -32 * scale);
      ctx.lineTo(15 * scale, -37 * scale);
      ctx.lineTo(0, -48 * scale);
      ctx.lineTo(-15 * scale, -37 * scale);
      ctx.closePath();
      ctx.fill();

      // Highlight facets on diamond
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(0, -48 * scale);
      ctx.lineTo(-6 * scale, -37 * scale);
      ctx.lineTo(0, -32 * scale);
      ctx.lineTo(6 * scale, -37 * scale);
      ctx.closePath();
      ctx.fill();

      ctx.restore();


      // THE MAGICAL DIAMOND SPARKLE (Flare Culmination)
      // Play a huge gorgeous twinkle flare when the ring is successfully placed!
      if (progress >= 0.78) {
        ctx.save();
        // Sparkle sits exactly at the diamond tip when ring is set
        // Locate diamond tip of ring coordinate
        const dTipX = ringX + Math.sin(ringRot) * 44 * scale;
        const dTipY = ringY - Math.cos(ringRot) * 44 * scale;
        
        ctx.translate(dTipX, dTipY);
        
        // Flare size scales up rapidly from progress 0.75 and reaches peak at 1.0
        const sparkleProgress = (progress - 0.78) / 0.22; // 0 to 1
        const flareScale = sparkleProgress * 1.8 * scale;
        
        // Gentle rotation of flare
        ctx.rotate(Date.now() * 0.001);

        // Core glow aura
        const glowRad = ctx.createRadialGradient(0, 0, 0, 0, 0, 75 * flareScale);
        glowRad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        glowRad.addColorStop(0.2, 'rgba(255, 225, 230, 0.85)');
        glowRad.addColorStop(0.5, 'rgba(252, 136, 144, 0.45)');
        glowRad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glowRad;
        ctx.beginPath();
        ctx.arc(0, 0, 75 * flareScale, 0, Math.PI * 2);
        ctx.fill();

        // 8-pointed star flare
        ctx.fillStyle = '#ffffff';
        const drawRay = (wRay: number, hRay: number) => {
          ctx.beginPath();
          ctx.moveTo(0, -hRay);
          ctx.quadraticCurveTo(0, 0, wRay, 0);
          ctx.quadraticCurveTo(0, 0, 0, hRay);
          ctx.quadraticCurveTo(0, 0, -wRay, 0);
          ctx.quadraticCurveTo(0, 0, 0, -hRay);
          ctx.fill();
        };

        ctx.shadowColor = '#fff0f2';
        ctx.shadowBlur = 15;

        // Long main rays
        drawRay(15 * flareScale, 60 * flareScale);
        ctx.rotate(Math.PI / 2);
        drawRay(15 * flareScale, 60 * flareScale);
        
        // Sub rays
        ctx.rotate(Math.PI / 4);
        drawRay(8 * flareScale, 35 * flareScale);
        ctx.rotate(Math.PI / 2);
        drawRay(8 * flareScale, 35 * flareScale);

        ctx.restore();
      }

      // Loop frame
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMobile]);

  // Transform spring progress mapping for cinematic text overlays
  // Smoothly fades titles out as user scrolls
  const introOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  // Sparkle mid-text transitions
  const midOpacity = useTransform(scrollYProgress, [0.3, 0.65, 0.8], [0, 1, 0]);
  const midY = useTransform(scrollYProgress, [0.3, 0.65], [30, 0]);

  // Final culmination text transitions
  const finalOpacity = useTransform(scrollYProgress, [0.82, 0.98], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.82, 0.95], [40, 0]);

  return (
    <div id="hero-section" ref={containerRef} className="relative h-[300vh] bg-blush-950">
      {/* Canvas Sticky Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Ambient Warm Gradient Overlay for elegant dark cinematic contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-blush-950/70 via-transparent to-blush-950/45 pointer-events-none" />

        {/* Cinematic Headline Overlay 1 - Introductory */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          <div className="max-w-3xl">
            <span className="font-sans text-xs tracking-[0.4em] uppercase text-luxury-gold font-semibold text-glow block mb-4">
              L'Amour Proposal Atelier
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-white leading-tight tracking-tight text-shadow-md">
              Capture Your <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd4d6] via-[#fc8890] to-luxury-gold italic">
                Moment
              </span>
            </h1>
            <p className="mt-6 text-sm md:text-base text-blush-100 font-light tracking-[0.05em] max-w-lg mx-auto">
              Scroll down to place the digital diamond first, and experience our cinematic romance canvas.
            </p>
          </div>
          <div className="absolute bottom-12 flex flex-col items-center gap-1">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-luxury-gold text-glow">
              Scroll to Propose
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-luxury-gold" />
            </motion.div>
          </div>
        </motion.div>

        {/* Cinematic Headline Overlay 2 - Mid scroll */}
        <motion.div
          style={{ opacity: midOpacity, y: midY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          <div className="max-w-xl glass-card-dark p-8 rounded-3xl mx-auto border border-white/5">
            <Sparkles className="w-6 h-6 text-luxury-gold mx-auto mb-4 animate-pulse" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-blush-300 font-semibold block mb-2">
              Bespoke Romance Architecture
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light leading-relaxed">
              Crafting every breath, light, and shadow.
            </h2>
            <p className="mt-4 text-xs text-blush-200 font-light tracking-wide leading-relaxed">
              We design premium proposal experiences that merge cinematic grandeur with intimate romance.
            </p>
          </div>
        </motion.div>

        {/* Cinematic Headline Overlay 3 - Culmination */}
        <motion.div
          style={{ opacity: finalOpacity, y: finalY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          <div className="max-w-2xl">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#fc8890]/20 to-luxury-gold/20 border border-[#fc8890]/30 mb-6"
            >
              <Heart className="w-4.5 h-4.5 text-[#fc8890] fill-[#fc8890]" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white font-medium">
                The Spark is Set
              </span>
            </motion.div>
            <h2 className="font-serif text-4xl md:text-6xl text-white font-normal tracking-tight leading-tight">
              She Said <span className="italic text-luxury-gold text-glow">Yes.</span>
            </h2>
            <p className="mt-4 text-xs md:text-sm text-blush-100 font-light max-w-md mx-auto leading-relaxed">
              Now let's bring your personal fairytale proposal to life. Book a consult below.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="pointer-events-auto px-8 py-4 rounded-full btn-peachy-pink font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shadow-xl text-[#4a2c2a]"
              >
                Inquire Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
