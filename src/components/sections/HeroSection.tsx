'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Shield, Cpu, Wifi } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 radial-gradient" />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary-500/10 blur-xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-primary-500/5 blur-2xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-primary-400">Công nghệ AIoT tiên tiến</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
              Robot Tuần Tra
              <br />
              <span className="gradient-text">Thông Minh</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-400 mb-8 max-w-lg">
              Giải pháp giám sát an ninh 24/7 với AI nhận diện thông minh. 
              Di chuyển linh hoạt với bánh xe Mecanum, điều khiển từ xa qua Internet.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              <Stat value="24/7" label="Hoạt động" />
              <Stat value="<0.5s" label="Độ trễ" />
              <Stat value="99%" label="Độ chính xác" />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="#contact" className="btn-primary flex items-center gap-2">
                Đặt hàng ngay
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="btn-outline flex items-center gap-2">
                <Play className="w-4 h-4" />
                Xem video demo
              </button>
            </div>
          </motion.div>

          {/* Right: Robot Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Robot placeholder - Replace with 3D model */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-3xl animate-glow" />
              
              {/* Robot image placeholder */}
              <div className="relative w-full h-full rounded-2xl glass flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-2xl bg-primary-500/20 flex items-center justify-center">
                    <Cpu className="w-16 h-16 text-primary-400" />
                  </div>
                  <p className="text-gray-500">3D Robot Model</p>
                  <p className="text-sm text-gray-600">Spline.design integration</p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass px-4 py-2 rounded-lg"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-primary-500" />
                  <span>AI Security</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-lg"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Wifi className="w-4 h-4 text-primary-500" />
                  <span>IoT Connected</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-700 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary-500"
          />
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold font-display text-primary-400">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
