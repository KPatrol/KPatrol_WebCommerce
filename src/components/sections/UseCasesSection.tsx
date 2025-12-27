'use client';

import { motion } from 'framer-motion';
import { Building2, Home, Warehouse, Hospital } from 'lucide-react';

const useCases = [
  {
    icon: Building2,
    title: 'Tòa nhà văn phòng',
    description: 'Tuần tra hành lang, kiểm tra phòng họp, giám sát khu vực ra vào.',
    image: '/images/office.jpg',
  },
  {
    icon: Warehouse,
    title: 'Nhà kho & Nhà máy',
    description: 'Giám sát hàng hóa, phát hiện xâm nhập, kiểm tra an toàn 24/7.',
    image: '/images/warehouse.jpg',
  },
  {
    icon: Home,
    title: 'Biệt thự & Căn hộ',
    description: 'Bảo vệ gia đình, tuần tra sân vườn, cảnh báo người lạ.',
    image: '/images/home.jpg',
  },
  {
    icon: Hospital,
    title: 'Bệnh viện & Trường học',
    description: 'Giám sát hành lang, hỗ trợ y tế, đảm bảo an toàn khuôn viên.',
    image: '/images/hospital.jpg',
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="section-padding relative overflow-hidden">
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
            Ứng dụng thực tế
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display mt-4">
            Đa dạng <span className="gradient-text">môi trường</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            K-Patrol phù hợp với nhiều loại hình không gian, 
            từ văn phòng đến nhà ở và khu công nghiệp.
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden group hover:border-primary-500/50 transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-dark-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                  <useCase.icon className="w-16 h-16 opacity-20" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                    <useCase.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold">{useCase.title}</h3>
                </div>
                <p className="text-gray-400">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
