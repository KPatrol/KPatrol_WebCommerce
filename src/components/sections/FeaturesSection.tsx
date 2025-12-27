'use client';

import { motion } from 'framer-motion';
import { 
  Scan, 
  Wifi, 
  Battery, 
  Shield, 
  Smartphone, 
  Map,
  Video,
  Bell
} from 'lucide-react';

const features = [
  {
    icon: Scan,
    title: 'Di chuyển đa hướng',
    description: 'Bánh xe Mecanum cho phép di chuyển theo mọi hướng: tiến, lùi, ngang, xoay tại chỗ.',
  },
  {
    icon: Video,
    title: 'Camera HD trực tiếp',
    description: 'Stream video real-time với độ trễ <500ms qua giao thức WebRTC tiên tiến.',
  },
  {
    icon: Shield,
    title: 'AI phát hiện xâm nhập',
    description: 'Tích hợp YOLOv8 nhận diện người, vật cản và gửi cảnh báo tự động.',
  },
  {
    icon: Smartphone,
    title: 'Điều khiển từ xa',
    description: 'App điều khiển trực quan trên điện thoại hoặc máy tính qua Internet.',
  },
  {
    icon: Map,
    title: 'Bản đồ & định vị',
    description: 'Tích hợp ROS2 SLAM để tạo bản đồ và định vị chính xác trong không gian.',
  },
  {
    icon: Battery,
    title: 'Pin bền bỉ',
    description: 'Pin Li-ion dung lượng cao, hoạt động liên tục 4-6 giờ, tự động sạc.',
  },
  {
    icon: Wifi,
    title: 'Kết nối IoT',
    description: 'Giao tiếp qua WiFi/4G, tích hợp với hệ thống smarthome và cloud.',
  },
  {
    icon: Bell,
    title: 'Thông báo thông minh',
    description: 'Push notification khi phát hiện bất thường, tích hợp Telegram/Email.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 text-sm font-medium uppercase tracking-wider">
            Tính năng
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display mt-4">
            Công nghệ <span className="gradient-text">vượt trội</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            K-Patrol được trang bị những công nghệ tiên tiến nhất, 
            mang đến giải pháp giám sát an ninh toàn diện.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                <feature.icon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
