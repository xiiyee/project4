import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Phone, MapPin, Clock, Star, ArrowRight, Menu, X, Shield, 
  Award, Droplets, Heart, Send, Check, Waves, Sparkles, 
  Activity, Wind, Leaf, Sun, Moon, RefreshCw
} from 'lucide-react';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', message: '' });
  const [emailSubscribe, setEmailSubscribe] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  const sections = ['home', 'about', 'services', 'gallery', 'testimonials', 'contact'];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      sections.forEach(section => {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(section);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
    setFormData({ name: '', email: '', phone: '', location: '', message: '' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmailSubscribe('');
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  const galleryImages = [
    'https://images.unsplash.com/photo-1572331165267-854da2b021b1?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800&h=600'
  ];

  const WaterParticle = ({ delay, left, size }: { delay: number; left: string; size: number }) => (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-aqua-300 to-ocean-400"
      style={{ left, width: size, height: size, top: '-20px' }}
      animate={{
        y: ['0vh', '110vh'],
        opacity: [0, 0.3, 0],
        scale: [0.5, 1, 0.5],
        x: [0, 10, -10, 5, 0]
      }}
      transition={{
        duration: 10 + Math.random() * 6,
        repeat: Infinity,
        delay,
        ease: 'easeInOut'
      }}
    />
  );

  const WaveDecoration = ({ className = '' }: { className?: string }) => (
    <div className={`absolute w-full overflow-hidden ${className}`}>
      <svg className="relative block w-full h-24 animate-surface-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill="url(#waveGradient)"
          className="opacity-25"
        />
      </svg>
    </div>
  );

  const RippleEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-aqua-400/20"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            width: 100,
            height: 100,
          }}
          animate={{
            scale: [1, 3],
            opacity: [0.3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6
          }}
        />
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="relative bg-slate-950 text-white overflow-x-hidden bg-mesh-gradient">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-aqua-400 via-ocean-500 to-aqua-400 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <nav className="fixed top-0 w-full z-40 backdrop-blur-2xl bg-slate-950/60 border-b border-aqua-500/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aqua-400/20 to-ocean-500/20 border border-aqua-400/30 flex items-center justify-center"
              >
                <Waves className="w-6 h-6 text-aqua-400" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-aqua-400"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-aqua-200 via-ocean-300 to-aqua-200 bg-clip-text text-transparent text-shadow-glow">
                Sparkling Waters
              </h1>
              <p className="text-xs text-aqua-500/60">USA, CO INC. • EST. 1984</p>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            {sections.map(section => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className={`relative text-sm font-medium capitalize transition-all duration-500 group ${activeSection === section ? 'text-aqua-400' : 'text-slate-400 hover:text-aqua-300'}`}
              >
                <span className="relative">
                  {section}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aqua-400 group-hover:w-full transition-all duration-500" />
                </span>
                {activeSection === section && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-aqua-400 to-ocean-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <a
              href="tel:5162952447"
              className="group flex items-center gap-2 bg-gradient-to-r from-aqua-500 to-ocean-600 px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-aqua-500/30 transition-all duration-500 hover:scale-105"
            >
              <Phone className="w-4 h-4 group-hover:animate-pulse" />
              Call Today
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-aqua-400 p-2">
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden glass-card border-t border-aqua-500/10"
            >
              <div className="px-4 py-6 space-y-4">
                {sections.map((section, i) => (
                  <motion.button
                    key={section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => scrollTo(section)}
                    className="block w-full text-left capitalize text-slate-300 hover:text-aqua-400 transition-all duration-300 py-2"
                  >
                    {section}
                  </motion.button>
                ))}
                <a
                  href="tel:5162952447"
                  className="flex items-center gap-2 text-aqua-400 font-semibold py-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Today
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <RippleEffect />
        
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1572331165267-854da2b021b1?auto=format&fit=crop&q=80&w=1920&h=1080"
              alt="Luxury Pool"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-deep-950/60 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/30 via-deep-900/20 to-aqua-900/30" />
          <div className="absolute inset-0 water-overlay" />
        </div>

        {[...Array(15)].map((_, i) => (
          <WaterParticle key={i} delay={i * 0.6} left={`${Math.random() * 100}%`} size={3 + Math.random() * 6} />
        ))}

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 text-center max-w-6xl mx-auto px-4 pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 bg-aqua-500/10 border border-aqua-500/20 rounded-full px-6 py-3 mb-10 backdrop-blur-sm floating-element"
          >
            <span className="relative w-3 h-3 rounded-full bg-aqua-400">
              <span className="absolute inset-0 rounded-full bg-aqua-400 animate-ripple" />
            </span>
            <span className="text-aqua-300 text-sm font-semibold tracking-wide">✦ PREMIUM AQUATIC WELLNESS ✦</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="block mb-2">
              <span className="bg-gradient-to-r from-white via-aqua-100 to-ocean-100 bg-clip-text text-transparent text-shadow-glow">
                Swimming Training
              </span>
            </span>
            <span className="block mb-2">
              <span className="bg-gradient-to-r from-aqua-300 via-ocean-400 to-aqua-300 bg-clip-text text-transparent text-shadow-glow">
                & Spa Excellence
              </span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 w-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-transparent via-aqua-400 to-transparent animate-shimmer"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Enjoy your family with Sparkling Waters. Now is the time to plan for happy, healthy swimming with the finest name brand pool supplies.
            Experience the future of aquatic wellness with our premium swimming training programs and serene spa treatments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <button
              onClick={() => scrollTo('services')}
              className="group relative flex items-center gap-3 bg-gradient-to-r from-aqua-500 to-ocean-600 px-10 py-4.5 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-aqua-500/40 transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 shimmer-bg animate-shimmer" />
              <span className="relative z-10">Explore Services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
            </button>
            <a
              href="tel:5162952447"
              className="group flex items-center gap-3 border-gradient rounded-full hover:shadow-xl transition-all duration-500 hover:scale-105"
            >
              <span className="flex items-center gap-3 bg-slate-900 px-10 py-4.5 rounded-full text-lg font-semibold">
                <Phone className="w-5 h-5 text-aqua-400 group-hover:animate-pulse" />
                <span className="bg-gradient-to-r from-aqua-300 to-ocean-400 bg-clip-text text-transparent">
                  (516) 295-2447
                </span>
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-8"
          >
            {[
              { icon: <Award className="w-6 h-6" />, text: '40+ Years Excellence' },
              { icon: <Shield className="w-6 h-6" />, text: 'EPA Approved Products' },
              { icon: <Sparkles className="w-6 h-6" />, text: 'Premium Quality' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="text-aqua-400">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <WaveDecoration className="bottom-0" />
        
        <motion.div
          animate={{ y: [0, 12, 0], x: [0, 2, -2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 z-10 cursor-pointer group"
          onClick={() => scrollTo('about')}
        >
          <div className="w-12 h-20 rounded-full border-2 border-aqua-500/30 flex items-start justify-center p-2 group-hover:border-aqua-400/50 transition-colors">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-4 rounded-full bg-gradient-to-b from-aqua-400 to-ocean-500"
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-ocean-950/20 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid lg:grid-cols-2 gap-20 items-center"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 text-aqua-400 text-sm font-bold tracking-widest uppercase mb-6">
                <span className="w-8 h-px bg-aqua-400/50" />
                ABOUT US
                <span className="w-8 h-px bg-aqua-400/50" />
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white to-aqua-200 bg-clip-text text-transparent">
                  Four Decades of
                </span>
                <br />
                <span className="bg-gradient-to-r from-aqua-400 via-ocean-400 to-aqua-400 bg-clip-text text-transparent">
                  Aquatic Excellence
                </span>
              </h2>
              
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed mb-10">
                <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-aqua-400 first-letter:float-left first-letter:mr-3">
                  Since 1984, Sparkling Waters has proudly managed pools by providing <span className="text-aqua-400 font-bold">Prompt, Reliable and Courteous</span> pool service. We offer EPA approved water testing equipment made in the USA.
                </p>
                <p>
                  <span className="text-2xl text-aqua-400 font-serif italic">"</span>
                  Hassle free pool ownership with Personal Service — that's our promise to every client.
                  Experience the pinnacle of aquatic wellness with our comprehensive swimming training and hydrotherapy spa treatments.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'Repair & replacement service for damaged pool covers',
                  'Highest quality name brand products for pools and spas',
                  'Expert swimming training for all skill levels',
                  'Premium hydrotherapy and spa treatments'
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 bg-slate-900/50 border border-aqua-500/10 rounded-2xl p-5 hover:border-aqua-500/30 transition-all duration-500 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua-500/20 to-ocean-500/20 border border-aqua-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Check className="w-5 h-5 text-aqua-400" />
                    </div>
                    <span className="text-slate-300 group-hover:text-aqua-200 transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={scaleIn} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-ocean-900/50">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.7 }}
                  className="overflow-hidden rounded-3xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=900&h=1100"
                    alt="Swimming Training & Spa"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
                
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-aqua-400/20 rounded-3xl pointer-events-none"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: -40, y: 20 }}
                whileInView={{ opacity: 1, x: -20, y: 40 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="absolute -bottom-8 -left-8 floating-element"
              >
                <div className="bg-gradient-to-br from-aqua-500 to-ocean-600 rounded-3xl p-8 shadow-2xl shadow-aqua-500/30">
                  <div className="text-5xl font-black mb-2">40+</div>
                  <div className="text-aqua-100 font-medium">Years of Service</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 40, y: -20 }}
                whileInView={{ opacity: 1, x: 40, y: -40 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="absolute -top-8 -right-8 floating-element-delayed"
              >
                <div className="bg-slate-900 border border-aqua-500/20 rounded-3xl p-7 shadow-2xl backdrop-blur-xl">
                  <Award className="w-10 h-10 text-aqua-400 mb-3" />
                  <div className="font-bold">Jandy ServicePro</div>
                  <div className="text-sm text-slate-400">Registered Partner</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: 'spring' }}
                className="absolute bottom-20 -right-4"
              >
                <div className="w-20 h-20 rounded-full border-gradient">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <Droplets className="w-8 h-8 text-aqua-400 mx-auto" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-deep-950/30 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 text-aqua-400 text-sm font-bold tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-aqua-400/50" />
              OUR SERVICES
              <span className="w-8 h-px bg-aqua-400/50" />
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-aqua-200 bg-clip-text text-transparent">
                Premium Aquatic Solutions
              </span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Pools and Spas with no nonsense delivery and expert support — your trusted Aqua Mechanics.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {[
              {
                icon: <Activity className="w-8 h-8" />,
                title: 'Swimming Training',
                desc: 'Professional swimming programs for all ages with certified instructors and state-of-the-art facilities.',
                img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=500&h=350',
                color: 'from-aqua-500 to-cyan-400'
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: 'Spa Treatments',
                desc: 'Luxurious spa treatments and massage therapies designed for ultimate relaxation and rejuvenation.',
                img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=500&h=350',
                color: 'from-ocean-500 to-blue-400'
              },
              {
                icon: <Wind className="w-8 h-8" />,
                title: 'Hydrotherapy',
                desc: 'Advanced hydrotherapy for recovery, pain relief, and overall wellness enhancement.',
                img: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=500&h=350',
                color: 'from-deep-500 to-indigo-400'
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Wellness Packages',
                desc: 'Custom wellness packages combining training, spa access, and nutritional guidance.',
                img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&q=80&w=500&h=350',
                color: 'from-emerald-500 to-teal-400'
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -12, transition: { duration: 0.4 } }}
                className="group relative rounded-3xl overflow-hidden"
              >
                <div className="absolute inset-0 border-gradient rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-slate-900/80 border border-aqua-500/10 rounded-3xl h-full overflow-hidden group-hover:border-aqua-500/30 transition-all duration-500">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                    <div className={`absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-aqua-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            {[
              {
                icon: <Droplets className="w-12 h-12" />,
                title: 'Pool Management',
                desc: 'Complete pool management with EPA approved water testing. Free expert advice and maintenance services for hassle-free ownership.',
                highlight: 'FREE ADVICE'
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: 'Cover Repair Service',
                desc: 'Professional repair and replacement for damaged pool covers. Keep your pool safe, clean, and protected year-round.',
                highlight: 'EXPERT REPAIR'
              },
              {
                icon: <Award className="w-12 h-12" />,
                title: 'FLUIDRA Products',
                desc: 'All FLUIDRA branded products backed with a full two year manufacturer warranty. Registered Jandy ServicePro partners.',
                highlight: '2 YEAR WARRANTY'
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-aqua-500/10 to-ocean-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-slate-900/60 border border-aqua-500/10 rounded-3xl p-8 hover:border-aqua-500/30 transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aqua-500/20 to-ocean-500/20 border border-aqua-500/20 flex items-center justify-center text-aqua-400 group-hover:scale-110 transition-transform duration-500">
                      {service.icon}
                    </div>
                    <span className="text-xs font-bold text-aqua-400 bg-aqua-500/10 px-3 py-1 rounded-full">
                      {service.highlight}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-aqua-600 via-ocean-600 to-deep-600" />
            <div className="absolute inset-0 opacity-20">
              <img
                src="https://images.unsplash.com/photo-1572331165267-854da2b021b1?auto=format&fit=crop&q=80&w=1400&h=500"
                alt="Pool background"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              animate={{ x: ['0%', '50%', '0%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 water-wave opacity-30"
            />
            <div className="relative p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-semibold">EXCLUSIVE OFFER</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">FREE Pool Management Advice</h3>
                <p className="text-aqua-100 text-lg">Giving you options on how to maintain your pool — no nonsense, expert guidance.</p>
              </div>
              <a
                href="tel:5162952447"
                className="flex-shrink-0 group flex items-center gap-3 bg-white text-deep-700 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <Phone className="w-5 h-5 group-hover:animate-bounce" />
                Call (516) 295-2447
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-aqua-950/20 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 text-aqua-400 text-sm font-bold tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-aqua-400/50" />
              GALLERY
              <span className="w-8 h-px bg-aqua-400/50" />
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-aqua-200 bg-clip-text text-transparent">
                Photo Gallery
              </span>
            </h2>
            <p className="text-slate-400 text-xl max-w-xl mx-auto">
              Explore our stunning pool installations, training facilities, and serene spa environments.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${i === 0 || i === 5 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover min-h-56 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-aqua-500 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-aqua-300">View Project</span>
                  </motion.div>
                </div>
                <div className="absolute inset-0 border-2 border-aqua-400/0 rounded-2xl group-hover:border-aqua-400/30 transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-deep-950/30 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 text-aqua-400 text-sm font-bold tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-aqua-400/50" />
              TESTIMONIALS
              <span className="w-8 h-px bg-aqua-400/50" />
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-aqua-200 bg-clip-text text-transparent">
                What Our Clients Say
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                name: 'Robert M.',
                location: 'Atlantic Beach, NY',
                text: 'Sparkling Waters has been maintaining our pool for over 15 years. Their service is always prompt, professional, and reliable. The swimming training programs have transformed how our family enjoys the pool! Wouldn\'t trust anyone else!',
                rating: 5,
                avatar: 'R'
              },
              {
                name: 'Jennifer L.',
                location: 'Long Beach, NY',
                text: 'The spa treatments and hydrotherapy sessions are absolutely divine. The team replaced our pool cover and it looks fantastic. They use only top-quality products and their customer service is exceptional. Highly recommended!',
                rating: 5,
                avatar: 'J'
              },
              {
                name: 'David S.',
                location: 'Oceanside, NY',
                text: 'As a Jandy ServicePro partner, they really know their stuff. My kids love their swimming lessons and the wellness packages offer incredible value. The two-year warranty on FLUIDRA products gives us great peace of mind. Outstanding service!',
                rating: 5,
                avatar: 'D'
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-aqua-500/5 to-ocean-500/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-slate-900/60 border border-aqua-500/10 rounded-3xl p-8 hover:border-aqua-500/25 transition-all duration-500 h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-aqua-400 text-aqua-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-8 italic text-lg">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-aqua-500/10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aqua-400 to-ocean-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-aqua-500/20">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-ocean-950/20" />
        <div className="relative max-w-3xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 border-gradient rounded-3xl" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-12 text-center border border-aqua-500/15">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aqua-500/20 to-ocean-500/20 border border-aqua-500/20 flex items-center justify-center mx-auto mb-6 floating-element">
                <Sparkles className="w-8 h-8 text-aqua-400" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-aqua-200 bg-clip-text text-transparent">
                Stay Connected
              </h3>
              <p className="text-slate-400 mb-10 text-lg">Sign up to hear from us about the latest pool care tips, wellness offers, and exclusive deals.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={emailSubscribe}
                  onChange={e => setEmailSubscribe(e.target.value)}
                  required
                  className="flex-1 bg-slate-800/50 border border-aqua-500/20 rounded-full px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-aqua-400 transition-all duration-300 focus:shadow-lg focus:shadow-aqua-500/10"
                />
                <button
                  type="submit"
                  className="group bg-gradient-to-r from-aqua-500 to-ocean-600 px-8 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-aqua-500/30 transition-all duration-500 hover:scale-105"
                >
                  {subscribed ? (
                    <span className="flex items-center gap-2"><Check className="w-5 h-5" /> Subscribed!</span>
                  ) : (
                    <span className="flex items-center gap-2">Sign Up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-28 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/20 via-slate-950 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 text-aqua-400 text-sm font-bold tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-aqua-400/50" />
              GET IN TOUCH
              <span className="w-8 h-px bg-aqua-400/50" />
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-aqua-200 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto">
              To get an estimate, please reach out to discuss how we can assist you with custom critical products, swimming training, spa services, and equipment.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 border-gradient rounded-3xl" />
                <form onSubmit={handleSubmit} className="relative bg-slate-900/60 border border-aqua-500/10 rounded-3xl p-10 md:p-12 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-800/50 border border-aqua-500/15 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-aqua-400 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full bg-slate-800/50 border border-aqua-500/15 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-aqua-400 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-800/50 border border-aqua-500/15 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-aqua-400 transition-all duration-300"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-3">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-slate-800/50 border border-aqua-500/15 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-aqua-400 transition-all duration-300"
                        placeholder="Street, City, Zip Code"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full bg-slate-800/50 border border-aqua-500/15 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-aqua-400 transition-all duration-300 resize-none"
                      placeholder="Tell us about your pool, spa, or training needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-aqua-500 to-ocean-600 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-aqua-500/30 transition-all duration-500 hover:scale-105 overflow-hidden"
                  >
                    <span className="absolute inset-0 shimmer-bg animate-shimmer" />
                    {messageSent ? (
                      <span className="relative z-10 flex items-center gap-2"><Check className="w-6 h-6" /> Message Sent Successfully!</span>
                    ) : (
                      <span className="relative z-10 flex items-center gap-2"><Send className="w-5 h-5" /> Send Message</span>
                    )}
                  </button>
                  <p className="text-xs text-slate-500 text-center">
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                  </p>
                </form>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-aqua-500/10 to-ocean-600/10 border border-aqua-500/20 rounded-3xl p-8">
                <RefreshCw className="w-8 h-8 text-aqua-400 mb-4 animate-spin" style={{ animationDuration: '8s' }} />
                <h4 className="text-xl font-bold mb-3 text-aqua-300">Your Pool Management Source</h4>
                <p className="text-slate-400 leading-relaxed">
                  We are registered Jandy ServicePro partners and as a benefit, we back all FLUIDRA branded products with a full two year manufacturer warranty.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-slate-900/60 border border-aqua-500/10 rounded-3xl p-8 space-y-6">
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aqua-500/20 to-ocean-500/20 border border-aqua-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-aqua-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg mb-1">Sparkling Waters USA CO., Inc.</div>
                    <div className="text-slate-400">PO Box 245 Atlantic Beach NY 11509</div>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aqua-500/20 to-ocean-500/20 border border-aqua-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-aqua-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg mb-1">Phone</div>
                    <a href="tel:5162952447" className="text-aqua-400 hover:text-aqua-300 transition-colors text-xl font-semibold">(516) 295-2447</a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aqua-500/20 to-ocean-500/20 border border-aqua-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 text-aqua-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg mb-2">Business Hours</div>
                    <div className="text-slate-400 space-y-1">
                      <p className="flex items-center gap-2"><Sun className="w-4 h-4 text-aqua-400/60" /> Monday - Friday: 9am - 5pm</p>
                      <p className="flex items-center gap-2"><Moon className="w-4 h-4 text-slate-500" /> Saturday: Closed</p>
                      <p className="flex items-center gap-2"><Sun className="w-4 h-4 text-aqua-400/60" /> Sunday: 9am - 1pm</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-aqua-500/10 to-ocean-600/10 border border-aqua-500/20 rounded-3xl p-8"
              >
                <Droplets className="w-10 h-10 text-aqua-400 mb-4" />
                <h4 className="font-bold text-white text-lg mb-2">No-Nonsense Delivery</h4>
                <p className="text-slate-400">Expert support and delivery of critical products and equipment directly to you.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-aqua-500/10">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Waves className="w-8 h-8 text-aqua-400" />
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-aqua-300 to-ocean-400 bg-clip-text text-transparent">
                    Sparkling Waters
                  </h3>
                  <p className="text-xs text-aqua-500/60">USA, CO INC.</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Since 1984, providing prompt, reliable, and courteous pool service. Your trusted pool management source.
                Swimming training, spa treatments, and hydrotherapy �� the complete aquatic wellness solution.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                {sections.map(section => (
                  <button
                    key={section}
                    onClick={() => scrollTo(section)}
                    className="block capitalize text-slate-400 hover:text-aqua-400 transition-colors text-sm"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contact Info</h4>
              <div className="space-y-3 text-sm text-slate-400">
                <p>PO Box 245 Atlantic Beach NY 11509</p>
                <p><a href="tel:5162952447" className="text-aqua-400 hover:text-aqua-300">(516) 295-2447</a></p>
                <p>Mon-Fri: 9am - 5pm</p>
                <p>Sunday: 9am - 1pm</p>
              </div>
            </div>
          </div>

          <div className="border-t border-aqua-500/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              ? {new Date().getFullYear()} Sparkling Waters USA CO., Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-slate-500 text-xs">
              <span>Registered Jandy ServicePro Partners</span>
              <span>?</span>
              <span>FLUIDRA Authorized Dealer</span>
              <span>?</span>
              <span>No-Nonsense Delivery & Expert Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
