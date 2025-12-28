'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Shield, Cpu, Wifi, Zap, ChevronDown, Bot, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Floating Particles Component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-kpatrol-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated Background Orbs
function BackgroundOrbs() {
  return (
    <>
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/4 w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

// 3D Robot Visualization Placeholder
function RobotVisualization() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-2xl mx-auto">
      {/* Main Robot Container */}
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      >
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #3b82f6, #0ea5e9, #3b82f6)',
            filter: 'blur(40px)',
            opacity: 0.3,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Robot Display */}
        <div className="absolute inset-8 rounded-3xl glass-strong overflow-hidden glow-box">
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-grid opacity-50" />
          
          {/* Central Icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-kpatrol-500 to-accent-500 flex items-center justify-center shadow-glow-lg">
                <Bot className="w-16 h-16 text-white" />
              </div>
              
              {/* Pulse Rings */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-kpatrol-500"
                animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-kpatrol-500"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>

            <p className="mt-6 text-lg font-display text-light-300">K-Patrol Robot</p>
            <p className="text-sm text-dark-500">3D Interactive Preview</p>
          </div>
        </div>

        {/* Floating Tech Badges */}
        <motion.div
          className="absolute -top-4 right-8 glass rounded-xl px-4 py-3 shadow-glow-sm"
          animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">AI Active</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 -left-4 glass rounded-xl px-4 py-3 shadow-glow-sm"
          animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-kpatrol-400" />
            <span className="text-sm font-medium">Security Mode</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-1/3 -right-8 glass rounded-xl px-4 py-3 shadow-glow-sm"
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-medium">IoT Connected</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Rotating Orbit */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-kpatrol-500 shadow-glow" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-500 shadow-glow" />
      </motion.div>
    </div>
  );
}

// Stat Item Component
function StatItem({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <motion.div
      className="text-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-kpatrol-400" />
        <span className="text-2xl md:text-3xl font-bold font-display gradient-text">{value}</span>
      </div>
      <span className="text-sm text-dark-500">{label}</span>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-radial-top" />
      <BackgroundOrbs />
      <FloatingParticles />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-8"
            >
              <Sparkles className="w-4 h-4 text-kpatrol-400" />
              <span className="text-sm font-medium text-kpatrol-300">Công nghệ AIoT tiên tiến</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="heading-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6"
            >
              <span className="text-white">Robot Tuần Tra</span>
              <br />
              <span className="gradient-text text-glow">Thông Minh</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-dark-500 mb-10 max-w-xl leading-relaxed"
            >
              Giải pháp giám sát an ninh 24/7 với AI nhận diện thông minh. 
              Di chuyển linh hoạt với bánh xe Mecanum, điều khiển từ xa qua Internet.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-8 md:gap-12 mb-10"
            >
              <StatItem value="24/7" label="Hoạt động liên tục" icon={Shield} />
              <StatItem value="<0.5s" label="Độ trễ phản hồi" icon={Zap} />
              <StatItem value="99.9%" label="Độ chính xác AI" icon={Cpu} />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="#contact" className="btn-primary group">
                <span>Đặt hàng ngay</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary group">
                <Play className="w-5 h-5" />
                <span>Xem video demo</span>
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <p className="text-sm text-dark-600 mb-4">Được tin dùng bởi</p>
              <div className="flex flex-wrap gap-6 items-center opacity-50">
                {['TechCorp', 'SecureVN', 'SmartHome', 'IoT Labs'].map((name) => (
                  <span key={name} className="text-lg font-display text-dark-500">{name}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Robot Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <RobotVisualization />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-dark-500 uppercase tracking-wider">Khám phá thêm</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-10 h-14 rounded-full border-2 border-dark-700 flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-kpatrol-500"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
