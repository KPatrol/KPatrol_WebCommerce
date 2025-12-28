'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  User,
  Building,
  MessageSquare,
  Sparkles,
  Shield,
  Clock,
  Headphones
} from 'lucide-react';

const pricingFeatures = [
  'Robot K-Patrol hoàn chỉnh',
  'App điều khiển iOS & Android',
  'Bảo hành 12 tháng',
  'Hỗ trợ kỹ thuật 24/7',
  'Cập nhật firmware miễn phí',
  'Training sử dụng tận nơi',
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'contact@kpatrol.io', href: 'mailto:contact@kpatrol.io' },
  { icon: Phone, label: 'Hotline', value: '1900 1234', href: 'tel:19001234' },
  { icon: MapPin, label: 'Địa chỉ', value: 'TP. Hồ Chí Minh, Việt Nam', href: '#' },
];

const guarantees = [
  { icon: Shield, text: 'Bảo hành 12 tháng' },
  { icon: Clock, text: 'Giao hàng 7-14 ngày' },
  { icon: Headphones, text: 'Hỗ trợ 24/7' },
];

export function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 bg-mesh opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kpatrol-500/30 to-transparent" />
      <motion.div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-kpatrol-500/10 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent-500/10 blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="w-4 h-4 text-kpatrol-400" />
            <span className="text-sm font-medium text-kpatrol-300">Ưu đãi đặc biệt</span>
          </motion.div>
          
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl mb-6">
            Sẵn sàng nâng cấp <br className="hidden md:block" />
            <span className="gradient-text">an ninh của bạn?</span>
          </h2>
          <p className="text-dark-500 text-lg max-w-2xl mx-auto">
            Liên hệ ngay để được tư vấn và nhận báo giá chi tiết. 
            Đội ngũ K-Patrol sẵn sàng hỗ trợ bạn 24/7.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Main Pricing Card */}
            <div className="relative rounded-3xl overflow-hidden">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-kpatrol-500 via-accent-500 to-kpatrol-500 animate-gradient bg-[length:400%_400%]">
                <div className="absolute inset-px rounded-3xl bg-dark-900" />
              </div>
              
              <div className="relative p-8 lg:p-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kpatrol-500/20 text-kpatrol-400 text-sm font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-kpatrol-500 animate-pulse" />
                  Gói tiêu chuẩn
                </div>
                
                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-bold font-display gradient-text">
                      15.000.000
                    </span>
                    <span className="text-xl text-dark-500">đ</span>
                  </div>
                  <p className="text-dark-500 mt-2">Trọn bộ giải pháp K-Patrol</p>
                </div>
                
                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {pricingFeatures.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="text-light-200">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <button className="w-full btn-primary text-lg py-5 group">
                  <span>Đặt hàng ngay</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {guarantees.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 rounded-xl glass"
                >
                  <item.icon className="w-6 h-6 text-kpatrol-400 mx-auto mb-2" />
                  <p className="text-sm text-dark-400">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-8 space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass hover:border-kpatrol-500/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-kpatrol-500/20 flex items-center justify-center group-hover:bg-kpatrol-500/30 transition-colors">
                    <info.icon className="w-5 h-5 text-kpatrol-400" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-500">{info.label}</p>
                    <p className="font-medium text-white">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl glass-strong p-8 lg:p-10">
              <h3 className="text-2xl font-bold font-display mb-2">Đăng ký tư vấn</h3>
              <p className="text-dark-500 mb-8">Chúng tôi sẽ liên hệ trong vòng 24 giờ</p>
              
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Gửi thành công!</h4>
                  <p className="text-dark-500">Cảm ơn bạn đã quan tâm đến K-Patrol.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Company */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-600" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input pl-12"
                        placeholder="Họ và tên *"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-600" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="input pl-12"
                        placeholder="Công ty"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-600" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input pl-12"
                      placeholder="Email *"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-600" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input pl-12"
                      placeholder="Số điện thoại *"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-dark-600" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input pl-12 min-h-[120px] resize-none"
                      placeholder="Mô tả nhu cầu của bạn..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary text-lg py-5 group disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <span>Gửi yêu cầu tư vấn</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-sm text-dark-600 text-center">
                    Bằng việc gửi form, bạn đồng ý với{' '}
                    <a href="#" className="text-kpatrol-400 hover:underline">Điều khoản</a>
                    {' '}và{' '}
                    <a href="#" className="text-kpatrol-400 hover:underline">Chính sách bảo mật</a>.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
