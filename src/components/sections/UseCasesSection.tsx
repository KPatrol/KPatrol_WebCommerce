'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Building2, 
  Home, 
  Warehouse, 
  Cross, 
  GraduationCap,
  Factory,
  ArrowRight,
  CheckCircle,
  Users,
  Target
} from 'lucide-react';

const useCases = [
  {
    icon: Building2,
    title: 'Tòa nhà văn phòng',
    shortDescription: 'Tuần tra hành lang, kiểm tra phòng họp, giám sát khu vực ra vào.',
    fullDescription: 'K-Patrol giám sát tự động các tầng văn phòng, phát hiện người lạ ngoài giờ làm việc, và gửi cảnh báo real-time cho bảo vệ.',
    benefits: ['Giảm 70% chi phí bảo vệ', 'Hoạt động 24/7 không gián đoạn', 'Tích hợp hệ thống access control'],
    gradient: 'from-blue-500 to-indigo-600',
    stats: { value: '500+', label: 'Tòa nhà' },
  },
  {
    icon: Warehouse,
    title: 'Nhà kho & Logistics',
    shortDescription: 'Giám sát hàng hóa, phát hiện xâm nhập, kiểm tra an toàn 24/7.',
    fullDescription: 'Tự động tuần tra theo lịch trình, kiểm tra hàng hóa bằng AI, phát hiện cháy nổ và đột nhập sớm nhất.',
    benefits: ['Phát hiện mất mát ngay lập tức', 'Kiểm tra tồn kho tự động', 'Cảnh báo cháy nổ sớm'],
    gradient: 'from-emerald-500 to-teal-600',
    stats: { value: '24/7', label: 'Giám sát' },
  },
  {
    icon: Home,
    title: 'Biệt thự & Căn hộ',
    shortDescription: 'Bảo vệ gia đình, tuần tra sân vườn, cảnh báo người lạ.',
    fullDescription: 'Robot thông minh bảo vệ ngôi nhà của bạn. Nhận diện khuôn mặt gia đình, cảnh báo người lạ qua app.',
    benefits: ['Nhận diện khuôn mặt gia đình', 'Cảnh báo push notification', 'Điều khiển từ xa mọi lúc'],
    gradient: 'from-orange-500 to-amber-600',
    stats: { value: '99.9%', label: 'Chính xác' },
  },
  {
    icon: Cross,
    title: 'Bệnh viện & Y tế',
    shortDescription: 'Giám sát hành lang, hỗ trợ y tế, đảm bảo an toàn bệnh nhân.',
    fullDescription: 'Tuần tra các khu vực bệnh viện, kiểm tra an ninh ban đêm, hỗ trợ dẫn đường cho bệnh nhân và người nhà.',
    benefits: ['Không tiếp xúc, giảm lây nhiễm', 'Hoạt động yên tĩnh', 'Hỗ trợ dẫn đường'],
    gradient: 'from-rose-500 to-pink-600',
    stats: { value: '50+', label: 'Bệnh viện' },
  },
  {
    icon: GraduationCap,
    title: 'Trường học & Campus',
    shortDescription: 'Đảm bảo an toàn khuôn viên, giám sát giờ tan học.',
    fullDescription: 'Tuần tra khuôn viên trường, giám sát khu vực cổng trường, phát hiện và cảnh báo hành vi bất thường.',
    benefits: ['An toàn cho học sinh', 'Giám sát cổng trường', 'Báo cáo realtime'],
    gradient: 'from-violet-500 to-purple-600',
    stats: { value: '100+', label: 'Trường học' },
  },
  {
    icon: Factory,
    title: 'Nhà máy sản xuất',
    shortDescription: 'Giám sát dây chuyền, phát hiện sự cố, kiểm tra an toàn.',
    fullDescription: 'Tuần tra nhà máy 24/7, phát hiện sự cố dây chuyền, đảm bảo an toàn lao động và phòng chống cháy nổ.',
    benefits: ['Phát hiện sự cố sớm', 'Giảm thời gian downtime', 'An toàn lao động'],
    gradient: 'from-cyan-500 to-blue-600',
    stats: { value: '200+', label: 'Nhà máy' },
  },
];

function UseCaseCard({ useCase, index }: { useCase: typeof useCases[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = useCase.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
    >
      <div 
        className={`
          relative rounded-3xl overflow-hidden cursor-pointer
          bg-gradient-to-br from-dark-800/90 to-dark-900/90
          border border-white/10 hover:border-kpatrol-500/40
          transition-all duration-500
          ${isExpanded ? 'ring-2 ring-kpatrol-500/30' : ''}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Top Gradient Bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${useCase.gradient}`} />
        
        {/* Main Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.gradient} p-0.5`}>
                <div className="w-full h-full rounded-2xl bg-dark-900 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white group-hover:text-kpatrol-300 transition-colors">
                  {useCase.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${useCase.gradient} bg-clip-text text-transparent`}>
                    {useCase.stats.value}
                  </span>
                  <span className="text-sm text-dark-500">{useCase.stats.label}</span>
                </div>
              </div>
            </div>
            
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 text-kpatrol-400" />
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-dark-400 leading-relaxed mb-4">
            {isExpanded ? useCase.fullDescription : useCase.shortDescription}
          </p>

          {/* Expanded Content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm font-medium text-kpatrol-400 mb-3">Lợi ích nổi bật:</p>
              <ul className="space-y-2">
                {useCase.benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-dark-400"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Background Glow on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
      </div>
    </motion.div>
  );
}

export function UseCasesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="use-cases" className="section relative" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-dots opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-transparent to-dark-950" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-kpatrol-500/5 blur-[120px]" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 rounded-full bg-accent-500/5 blur-[120px]" />
      
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
            <Target className="w-4 h-4 text-kpatrol-400" />
            <span className="text-sm font-medium text-kpatrol-300">Ứng dụng đa dạng</span>
          </motion.div>
          
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl mb-6">
            Phù hợp mọi <span className="gradient-text">môi trường</span>
          </h2>
          <p className="text-dark-500 text-lg max-w-2xl mx-auto leading-relaxed">
            K-Patrol được thiết kế linh hoạt, thích ứng với nhiều loại không gian
            từ văn phòng đến nhà ở và khu công nghiệp.
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.title} useCase={useCase} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 p-8 rounded-3xl glass">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-kpatrol-400" />
              <div className="text-left">
                <p className="text-2xl font-bold font-display gradient-text">1000+</p>
                <p className="text-sm text-dark-500">Khách hàng tin dùng</p>
              </div>
            </div>
            
            <div className="w-px h-12 bg-dark-700" />
            
            <div className="text-left">
              <p className="text-dark-400 mb-2">Bạn có dự án cần giám sát?</p>
              <a href="#contact" className="inline-flex items-center gap-2 text-kpatrol-400 hover:text-kpatrol-300 font-medium transition-colors">
                Liên hệ tư vấn miễn phí
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
