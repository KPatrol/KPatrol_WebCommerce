'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote, Star, ChevronLeft, ChevronRight, Building2, 
  User, Verified
} from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Văn Minh',
    role: 'Giám đốc An ninh',
    company: 'Vingroup',
    avatar: '/avatars/avatar-1.jpg',
    rating: 5,
    content: 'K-Patrol đã thay đổi hoàn toàn cách chúng tôi quản lý an ninh. Hệ thống AI phát hiện xâm nhập cực kỳ chính xác, giúp giảm 80% chi phí bảo vệ 24/7. Đầu tư xứng đáng!',
    highlight: 'Giảm 80% chi phí bảo vệ',
  },
  {
    id: 2,
    name: 'Trần Thị Hương',
    role: 'Chủ biệt thự',
    company: 'Khu đô thị Phú Mỹ Hưng',
    avatar: '/avatars/avatar-2.jpg',
    rating: 5,
    content: 'Là một phụ nữ sống một mình, K-Patrol cho tôi cảm giác an toàn tuyệt đối. Tôi có thể theo dõi mọi ngóc ngách trong nhà qua điện thoại, kể cả khi đi công tác xa.',
    highlight: 'An toàn tuyệt đối',
  },
  {
    id: 3,
    name: 'Lê Hoàng Nam',
    role: 'CEO',
    company: 'Tech Solutions Vietnam',
    avatar: '/avatars/avatar-3.jpg',
    rating: 5,
    content: 'Chúng tôi triển khai K-Patrol cho văn phòng 5 tầng. Tích hợp với hệ thống có sẵn rất mượt mà. Đội ngũ support nhiệt tình, phản hồi nhanh chóng.',
    highlight: 'Tích hợp mượt mà',
  },
  {
    id: 4,
    name: 'Phạm Đức Anh',
    role: 'Quản lý kho',
    company: 'Logistics VN',
    avatar: '/avatars/avatar-4.jpg',
    rating: 5,
    content: 'K-Patrol tuần tra kho hàng 24/7, phát hiện cháy và rò rỉ sớm. Đã cứu chúng tôi khỏi một vụ cháy tiềm năng nhờ cảnh báo kịp thời. Sản phẩm cứu mạng!',
    highlight: 'Cảnh báo kịp thời',
  },
  {
    id: 5,
    name: 'Võ Minh Châu',
    role: 'Giám đốc Resort',
    company: 'Fusion Maia Danang',
    avatar: '/avatars/avatar-5.jpg',
    rating: 5,
    content: 'Khách du lịch rất ấn tượng với robot an ninh của chúng tôi. Vừa đảm bảo an toàn, vừa tạo điểm nhấn công nghệ cho resort. ROI sau 6 tháng đã thấy rõ.',
    highlight: 'ROI trong 6 tháng',
  },
];

const stats = [
  { value: '500+', label: 'Khách hàng tin dùng' },
  { value: '98%', label: 'Tỷ lệ hài lòng' },
  { value: '24/7', label: 'Hỗ trợ kỹ thuật' },
  { value: '4.9/5', label: 'Đánh giá trung bình' },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-kpatrol-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kpatrol-500/10 border border-kpatrol-500/20 text-sm text-kpatrol-400 mb-6">
            <Star className="w-4 h-4 fill-kpatrol-400" />
            Khách hàng nói gì
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Được tin tưởng bởi{' '}
            <span className="text-gradient">hàng trăm</span>{' '}
            doanh nghiệp
          </h2>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Hãy lắng nghe những gì khách hàng của chúng tôi chia sẻ về trải nghiệm sử dụng K-Patrol.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-6 rounded-2xl glass border border-white/5"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-dark-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="relative min-h-[400px] md:min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div className="h-full p-8 md:p-12 rounded-3xl glass-card border border-white/10 relative overflow-hidden">
                  {/* Quote icon */}
                  <Quote className="absolute top-8 right-8 w-20 h-20 text-kpatrol-500/10" />
                  
                  <div className="relative z-10">
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                      "{currentTestimonial.content}"
                    </blockquote>

                    {/* Highlight badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-sm text-green-400 mb-6">
                      <Verified className="w-4 h-4" />
                      {currentTestimonial.highlight}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-kpatrol-500 to-accent-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center">
                          <User className="w-6 h-6 text-kpatrol-400" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-white flex items-center gap-2">
                          {currentTestimonial.name}
                          <Verified className="w-4 h-4 text-kpatrol-400" />
                        </div>
                        <div className="text-sm text-dark-400 flex items-center gap-2">
                          {currentTestimonial.role}
                          <span className="w-1 h-1 rounded-full bg-dark-600" />
                          <Building2 className="w-3 h-3" />
                          {currentTestimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-dark-400 hover:text-white hover:border-kpatrol-500/50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "w-8 bg-kpatrol-500"
                      : "w-2 bg-dark-700 hover:bg-dark-600"
                  )}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-dark-400 hover:text-white hover:border-kpatrol-500/50 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
