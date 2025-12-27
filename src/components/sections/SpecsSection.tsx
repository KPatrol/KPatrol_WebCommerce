'use client';

import { motion } from 'framer-motion';

const specs = [
  { label: 'Kích thước', value: '45 x 35 x 30 cm' },
  { label: 'Trọng lượng', value: '8 kg' },
  { label: 'Tốc độ tối đa', value: '1.2 m/s' },
  { label: 'Pin', value: '5200mAh Li-ion' },
  { label: 'Thời gian hoạt động', value: '4-6 giờ' },
  { label: 'Camera', value: '1080p @ 30fps' },
  { label: 'Kết nối', value: 'WiFi 5G, 4G LTE' },
  { label: 'MCU', value: 'ESP32-S3 + RPi 4' },
  { label: 'Hệ điều hành', value: 'Ubuntu 22.04 + ROS2' },
  { label: 'AI Chip', value: 'Coral Edge TPU' },
  { label: 'Sensors', value: 'LiDAR, IMU, Ultrasonic' },
  { label: 'Điều khiển', value: 'App iOS/Android, Web' },
];

export function SpecsSection() {
  return (
    <section id="specs" className="section-padding bg-dark-900">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Specs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-500 text-sm font-medium uppercase tracking-wider">
              Thông số kỹ thuật
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-4 mb-8">
              Thiết kế <span className="gradient-text">chuyên nghiệp</span>
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {specs.map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-lg p-4"
                >
                  <p className="text-sm text-gray-500">{spec.label}</p>
                  <p className="font-semibold text-primary-400">{spec.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image/3D placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl glass glow-box flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="text-lg">Sơ đồ kỹ thuật</p>
                <p className="text-sm">Technical Diagram</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
