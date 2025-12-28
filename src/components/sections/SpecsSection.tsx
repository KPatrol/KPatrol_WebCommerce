'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Cpu, 
  Battery, 
  Camera, 
  Wifi, 
  Gauge, 
  Box, 
  CircuitBoard, 
  HardDrive,
  Cog,
  Radio,
  Monitor,
  Smartphone,
  LucideIcon
} from 'lucide-react';

interface Spec {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
}

interface SpecCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  specs: Spec[];
}

const specCategories = [
  {
    id: 'hardware',
    label: 'Phần cứng',
    icon: Cpu,
    specs: [
      { icon: Box, label: 'Kích thước', value: '45 × 35 × 30 cm', description: 'Thiết kế compact' },
      { icon: Gauge, label: 'Trọng lượng', value: '8 kg', description: 'Nhẹ và linh hoạt' },
      { icon: CircuitBoard, label: 'MCU chính', value: 'Raspberry Pi 4', description: '8GB RAM' },
      { icon: Cpu, label: 'Motor Controller', value: 'ESP32-S3', description: 'WiFi + BLE' },
      { icon: HardDrive, label: 'AI Accelerator', value: 'Coral Edge TPU', description: '4 TOPS' },
      { icon: Cog, label: 'Động cơ', value: '4× DC Motor', description: 'Encoder tích hợp' },
    ],
  },
  {
    id: 'performance',
    label: 'Hiệu năng',
    icon: Gauge,
    specs: [
      { icon: Gauge, label: 'Tốc độ tối đa', value: '1.2 m/s', description: 'Điều chỉnh được' },
      { icon: Battery, label: 'Pin', value: '5200mAh', description: 'Li-ion cao cấp' },
      { icon: Battery, label: 'Thời gian hoạt động', value: '4-6 giờ', description: 'Tuỳ chế độ' },
      { icon: Radio, label: 'Độ trễ điều khiển', value: '<500ms', description: 'Real-time' },
      { icon: Cpu, label: 'Xử lý AI', value: '30 FPS', description: 'Object detection' },
      { icon: Gauge, label: 'Độ chính xác', value: '99.9%', description: 'AI recognition' },
    ],
  },
  {
    id: 'connectivity',
    label: 'Kết nối',
    icon: Wifi,
    specs: [
      { icon: Wifi, label: 'WiFi', value: 'Dual-band 5GHz', description: '802.11ac' },
      { icon: Radio, label: 'Cellular', value: '4G LTE', description: 'SIM support' },
      { icon: Monitor, label: 'Video Stream', value: 'WebRTC', description: '<500ms latency' },
      { icon: HardDrive, label: 'Cloud', value: 'AWS IoT', description: 'Secure MQTT' },
      { icon: Smartphone, label: 'App', value: 'iOS & Android', description: 'Cross-platform' },
      { icon: Cpu, label: 'API', value: 'REST + WebSocket', description: 'Real-time' },
    ],
  },
  {
    id: 'camera',
    label: 'Camera & Sensors',
    icon: Camera,
    specs: [
      { icon: Camera, label: 'Camera chính', value: '1080p @ 30fps', description: 'Wide angle' },
      { icon: Camera, label: 'Night Vision', value: 'IR LED', description: 'Tự động bật' },
      { icon: Radio, label: 'LiDAR', value: 'RPLiDAR A1', description: '360° scanning' },
      { icon: Gauge, label: 'IMU', value: 'MPU6050', description: '6-axis' },
      { icon: Radio, label: 'Ultrasonic', value: '4× HC-SR04', description: 'Obstacle detect' },
      { icon: CircuitBoard, label: 'Encoder', value: 'Optical', description: 'High precision' },
    ],
  },
] as const satisfies SpecCategory[];

function SpecCard({ spec, index }: { spec: Spec; index: number }) {
  const IconComponent = spec.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className="group relative p-6 rounded-2xl glass hover:border-kpatrol-500/40 transition-all duration-300"
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-kpatrol-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kpatrol-500/20 to-accent-500/20 flex items-center justify-center shrink-0">
          <IconComponent className="w-6 h-6 text-kpatrol-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm text-dark-500 mb-1">{spec.label}</p>
          <p className="text-xl font-bold font-display text-white mb-1">{spec.value}</p>
          <p className="text-sm text-dark-600">{spec.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryTab({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: SpecCategory; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const Icon = category.icon;
  
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300
        ${isActive 
          ? 'bg-kpatrol-500/20 border border-kpatrol-500/40 text-white' 
          : 'bg-dark-800/50 border border-white/5 text-dark-500 hover:text-white hover:bg-dark-800'
        }
      `}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-kpatrol-400' : ''}`} />
      <span className="font-medium">{category.label}</span>
      
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-xl border-2 border-kpatrol-500/50"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}

export function SpecsSection() {
  const [activeCategory, setActiveCategory] = useState('hardware');
  const currentCategory = specCategories.find(c => c.id === activeCategory)!;

  return (
    <section id="specs" className="section relative bg-dark-950">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-dense opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-transparent to-dark-900" />
      
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kpatrol-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kpatrol-500/30 to-transparent" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header & Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Cog className="w-4 h-4 text-kpatrol-400 animate-spin-slow" />
              <span className="text-sm font-medium text-kpatrol-300">Thông số kỹ thuật</span>
            </div>
            
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl mb-6">
              Thiết kế <span className="gradient-text">chuyên nghiệp</span>
            </h2>
            
            <p className="text-dark-500 text-lg mb-10 leading-relaxed">
              K-Patrol được thiết kế với linh kiện cao cấp, 
              đảm bảo độ bền và hiệu suất vượt trội trong mọi điều kiện.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3">
              {specCategories.map((category) => (
                <CategoryTab
                  key={category.id}
                  category={category}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </div>

            {/* Visual Diagram Placeholder */}
            <motion.div
              className="mt-10 aspect-video rounded-2xl glass-strong overflow-hidden hidden lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-full bg-gradient-to-br from-kpatrol-500/10 to-accent-500/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-kpatrol-500/20 flex items-center justify-center">
                    <Box className="w-10 h-10 text-kpatrol-400" />
                  </div>
                  <p className="text-dark-400 font-display">Technical Diagram</p>
                  <p className="text-sm text-dark-600">3D Model Preview</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Specs Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4"
              >
                {currentCategory.specs.map((spec, index) => (
                  <SpecCard key={spec.label} spec={spec} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 p-6 rounded-2xl border border-dashed border-dark-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <CircuitBoard className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Hệ điều hành & Phần mềm</p>
                  <p className="text-sm text-dark-500">
                    Ubuntu 22.04 LTS + ROS2 Humble • Python 3.10 • TensorFlow Lite • 
                    Custom firmware ESP32-S3
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
