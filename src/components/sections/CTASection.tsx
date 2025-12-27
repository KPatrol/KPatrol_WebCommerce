'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Implement form submission
  };

  return (
    <section id="contact" className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: CTA Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-500 text-sm font-medium uppercase tracking-wider">
              Liên hệ ngay
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-4 mb-6">
              Sẵn sàng nâng cấp <br />
              <span className="gradient-text">an ninh của bạn?</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Để lại thông tin, đội ngũ K-Patrol sẽ liên hệ tư vấn và 
              báo giá trong vòng 24 giờ.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary-500" />
                <span>contact@kpatrol.io</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary-500" />
                <span>+84 123 456 789</span>
              </div>
            </div>

            {/* Pricing hint */}
            <div className="mt-8 glass rounded-xl p-6">
              <p className="text-sm text-gray-500 mb-2">Giá tham khảo</p>
              <p className="text-3xl font-bold font-display">
                <span className="gradient-text">15.000.000đ</span>
                <span className="text-sm text-gray-500 font-normal"> / bộ</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Bao gồm: Robot + App + 1 năm bảo hành
              </p>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Đăng ký tư vấn</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="0123 456 789"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nhu cầu sử dụng</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
                    rows={3}
                    placeholder="Mô tả nhu cầu của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Gửi yêu cầu
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
