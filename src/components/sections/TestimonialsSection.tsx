'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Quote, Star, ChevronLeft, ChevronRight,
  User, Verified
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/useTranslations';

export function TestimonialsSection() {
  const { t, locale } = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const testimonials = locale === 'vi' ? [
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
  ] : [
    {
      id: 1,
      name: 'Nguyen Van Minh',
      role: 'Security Director',
      company: 'Vingroup',
      avatar: '/avatars/avatar-1.jpg',
      rating: 5,
      content: 'K-Patrol has completely changed how we manage security. The AI intrusion detection system is extremely accurate, helping reduce 24/7 security costs by 80%. Worth the investment!',
      highlight: '80% cost reduction',
    },
    {
      id: 2,
      name: 'Tran Thi Huong',
      role: 'Villa Owner',
      company: 'Phu My Hung Urban Area',
      avatar: '/avatars/avatar-2.jpg',
      rating: 5,
      content: 'As a woman living alone, K-Patrol gives me absolute peace of mind. I can monitor every corner of my house via phone, even when on business trips.',
      highlight: 'Absolute security',
    },
    {
      id: 3,
      name: 'Le Hoang Nam',
      role: 'CEO',
      company: 'Tech Solutions Vietnam',
      avatar: '/avatars/avatar-3.jpg',
      rating: 5,
      content: 'We deployed K-Patrol for our 5-floor office. Integration with existing systems was seamless. Support team is enthusiastic and responsive.',
      highlight: 'Seamless integration',
    },
    {
      id: 4,
      name: 'Pham Duc Anh',
      role: 'Warehouse Manager',
      company: 'Logistics VN',
      avatar: '/avatars/avatar-4.jpg',
      rating: 5,
      content: 'K-Patrol patrols the warehouse 24/7, detecting fires and leaks early. Saved us from a potential fire thanks to timely warnings. Life-saving product!',
      highlight: 'Timely alerts',
    },
    {
      id: 5,
      name: 'Vo Minh Chau',
      role: 'Resort Director',
      company: 'Fusion Maia Danang',
      avatar: '/avatars/avatar-5.jpg',
      rating: 5,
      content: 'Tourists are very impressed with our security robot. Both ensures safety and creates a tech highlight for the resort. ROI visible after 6 months.',
      highlight: 'ROI in 6 months',
    },
  ];

  const stats = [
    { value: t('testimonials.stats.customers.value'), label: t('testimonials.stats.customers.label') },
    { value: t('testimonials.stats.satisfaction.value'), label: t('testimonials.stats.satisfaction.label') },
    { value: t('testimonials.stats.support.value'), label: t('testimonials.stats.support.label') },
    { value: t('testimonials.stats.rating.value'), label: t('testimonials.stats.rating.label') },
  ];

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length]);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6">
            <Quote className="w-4 h-4 text-cyan-300" />
            <span className="label-hud text-cyan-200">{t('testimonials.badge')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-display mb-4 leading-tight">
            {t('testimonials.title')} <span className="gradient-text">Về Chúng Tôi</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/60 backdrop-blur-md ring-1 ring-cyan-500/20 hover:ring-cyan-400/45 transition-all p-4 md:p-6 rounded-2xl text-center shadow-[0_0_18px_rgba(34,211,238,0.08)]"
            >
              <div className="text-2xl md:text-3xl font-black font-display gradient-text mb-2">
                {stat.value}
              </div>
              <div className="label-hud text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 shadow-[0_0_28px_rgba(34,211,238,0.1)] p-6 sm:p-8 md:p-12 rounded-3xl"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 md:w-12 md:h-12 text-cyan-300 mb-4 md:mb-6" />

              {/* Content */}
              <p className="text-base md:text-xl text-slate-300 leading-relaxed mb-6 md:mb-8">
                "{currentTestimonial.content}"
              </p>

              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 ring-1 ring-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)] mb-8">
                <Verified className="w-4 h-4 text-cyan-300" />
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-200">
                  {currentTestimonial.highlight}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 shadow-[0_0_18px_rgba(34,211,238,0.4)] flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-black text-white text-sm md:text-base truncate">{currentTestimonial.name}</div>
                  <div className="text-xs md:text-sm text-slate-500 truncate">
                    {currentTestimonial.role} • {currentTestimonial.company}
                  </div>
                </div>
                <div className="flex gap-0.5 md:gap-1 shrink-0">
                  {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md ring-1 ring-cyan-500/25 hover:ring-cyan-400/55 hover:bg-cyan-500/5 flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-cyan-200" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlay(false);
                  }}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                      : 'w-2 bg-slate-700 hover:bg-cyan-500/40'
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md ring-1 ring-cyan-500/25 hover:ring-cyan-400/55 hover:bg-cyan-500/5 flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5 text-cyan-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
