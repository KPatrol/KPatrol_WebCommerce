'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Scan, 
  Wifi, 
  Battery, 
  Shield, 
  Smartphone, 
  Map,
  Video,
  Bell,
  Cpu,
  Zap,
  Eye,
  Radio,
  LucideIcon
} from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  size?: 'large' | 'medium' | 'small';
}

const features: Feature[] = [
  {
    icon: Scan,
    title: 'Di chuyển đa hướng',
    description: 'Bánh xe Mecanum cho phép di chuyển 360° - tiến, lùi, ngang, xoay tại chỗ với độ chính xác cao.',
    gradient: 'from-blue-500 to-cyan-500',
    size: 'large',
  },
  {
    icon: Video,
    title: 'Camera HD Livestream',
    description: 'Stream video real-time 1080p với độ trễ <500ms qua WebRTC.',
    gradient: 'from-purple-500 to-pink-500',
    size: 'medium',
  },
  {
    icon: Shield,
    title: 'AI phát hiện xâm nhập',
    description: 'YOLOv8 nhận diện người và vật thể với độ chính xác 99.9%.',
    gradient: 'from-emerald-500 to-teal-500',
    size: 'medium',
  },
  {
    icon: Smartphone,
    title: 'Điều khiển từ xa',
    description: 'App điều khiển trực quan trên mọi thiết bị qua Internet.',
    gradient: 'from-orange-500 to-amber-500',
    size: 'small',
  },
  {
    icon: Map,
    title: 'Bản đồ & SLAM',
    description: 'Tự động tạo bản đồ và định vị chính xác với ROS2.',
    gradient: 'from-indigo-500 to-violet-500',
    size: 'small',
  },
  {
    icon: Battery,
    title: 'Pin siêu bền',
    description: 'Li-ion 5200mAh, hoạt động 4-6 giờ, tự động sạc.',
    gradient: 'from-green-500 to-emerald-500',
    size: 'small',
  },
  {
    icon: Wifi,
    title: 'Kết nối IoT đa năng',
    description: 'WiFi 5G + 4G LTE, tích hợp smarthome và cloud platform.',
    gradient: 'from-cyan-500 to-blue-500',
    size: 'small',
  },
  {
    icon: Bell,
    title: 'Cảnh báo thông minh',
    description: 'Push notification qua Telegram, Email, SMS khi phát hiện bất thường.',
    gradient: 'from-rose-500 to-red-500',
    size: 'medium',
  },
];

// Feature Card with Mouse Tracking Effect
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative rounded-3xl p-6 md:p-8 overflow-hidden cursor-pointer group h-full
        bg-gradient-to-br from-dark-800/80 to-dark-900/80 
        border border-white/10 hover:border-kpatrol-500/40
        transition-all duration-500 ease-out
      `}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Mouse Follow Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full rounded-2xl bg-dark-900 flex items-center justify-center">
            <Icon className="w-7 h-7 text-white" />
          </div>
        </motion.div>

        {/* Text */}
        <h3 className="text-xl font-bold font-display mb-3 text-white group-hover:text-kpatrol-300 transition-colors">
          {feature.title}
        </h3>
        <p className="text-dark-500 group-hover:text-dark-400 transition-colors leading-relaxed">
          {feature.description}
        </p>

        {/* Animated Line */}
        <motion.div
          className={`h-0.5 mt-6 rounded-full bg-gradient-to-r ${feature.gradient}`}
          initial={{ width: 0 }}
          whileInView={{ width: '40%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
        />
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className={`w-full h-full bg-gradient-to-br ${feature.gradient} blur-3xl`} />
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="section relative">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-center" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-kpatrol-500/10 blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-accent-500/10 blur-[100px]" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Zap className="w-4 h-4 text-kpatrol-400" />
            <span className="text-sm font-medium text-kpatrol-300">Tính năng nổi bật</span>
          </motion.div>
          
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl mb-6">
            Công nghệ <span className="gradient-text">vượt trội</span>
          </h2>
          <p className="text-dark-500 text-lg max-w-2xl mx-auto leading-relaxed">
            K-Patrol được trang bị những công nghệ tiên tiến nhất, 
            mang đến giải pháp giám sát an ninh toàn diện và thông minh.
          </p>
        </motion.div>

        {/* Bento Grid - Layout giống screenshot */}
        <div className="space-y-5">
          {/* Row 1: 3 columns - 1 large left, 2 medium right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FeatureCard feature={features[0]} index={0} />
            <FeatureCard feature={features[1]} index={1} />
            <FeatureCard feature={features[2]} index={2} />
          </div>
          
          {/* Row 2: 2 columns equal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FeatureCard feature={features[3]} index={3} />
            <FeatureCard feature={features[4]} index={4} />
          </div>
          
          {/* Row 3: 3 columns equal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FeatureCard feature={features[5]} index={5} />
            <FeatureCard feature={features[6]} index={6} />
            <FeatureCard feature={features[7]} index={7} />
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '8+', label: 'Tính năng chính', icon: Cpu },
            { value: '24/7', label: 'Hoạt động', icon: Eye },
            { value: '<500ms', label: 'Độ trễ', icon: Radio },
            { value: '99.9%', label: 'Uptime', icon: Shield },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl glass hover:border-kpatrol-500/30 transition-colors"
            >
              <stat.icon className="w-6 h-6 text-kpatrol-400 mx-auto mb-3" />
              <p className="text-3xl font-bold font-display gradient-text mb-1">{stat.value}</p>
              <p className="text-sm text-dark-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
