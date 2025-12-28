'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Bot, Mail, Phone, MapPin, Github, Facebook, Youtube, 
  Twitter, Linkedin, Send, ArrowUpRight, Loader2, Check,
  Heart
} from 'lucide-react';

const footerLinks = {
  products: [
    { label: 'K-Patrol Bot', href: '#', badge: 'Hot' },
    { label: 'Mobile App', href: '#' },
    { label: 'Web Dashboard', href: '#' },
    { label: 'API & SDK', href: '#' },
    { label: 'Phụ kiện', href: '#', badge: 'New' },
  ],
  support: [
    { label: 'Tài liệu kỹ thuật', href: '#' },
    { label: 'Hướng dẫn sử dụng', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Chính sách bảo hành', href: '#' },
    { label: 'Trung tâm hỗ trợ', href: '#' },
  ],
  company: [
    { label: 'Về chúng tôi', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Tuyển dụng', href: '#', badge: 'Hiring' },
    { label: 'Đối tác', href: '#' },
    { label: 'Liên hệ', href: '#contact' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:bg-[#333]' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-[#1877f2]' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-[#ff0000]' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-[#1da1f2]' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-[#0077b5]' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail('');
    
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="relative bg-dark-950 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kpatrol-500/50 to-transparent" />
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-kpatrol-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-accent-500/5 blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-white/5">
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kpatrol-500/10 border border-kpatrol-500/20 text-sm text-kpatrol-400 mb-6"
            >
              <Mail className="w-4 h-4" />
              Đăng ký nhận tin
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold font-display mb-4"
            >
              Nhận tin tức & ưu đãi{' '}
              <span className="text-gradient">mới nhất</span>
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-dark-400 mb-8 max-w-lg mx-auto"
            >
              Đăng ký để nhận thông tin về sản phẩm mới, cập nhật tính năng và các chương trình ưu đãi độc quyền.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail className="w-5 h-5 text-dark-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-dark-800 border border-white/10 text-white placeholder:text-dark-500 focus:outline-none focus:border-kpatrol-500/50 focus:ring-2 focus:ring-kpatrol-500/20 transition-all"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="h-14 px-8 rounded-xl bg-kpatrol-500 hover:bg-kpatrol-600 text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : isSubscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    Đã đăng ký!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Đăng ký
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-kpatrol-500 to-accent-500 p-0.5 overflow-hidden">
                <div className="w-full h-full rounded-xl bg-dark-900 flex items-center justify-center">
                  <Bot className="w-7 h-7 text-kpatrol-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold font-display text-white">K-Patrol</span>
                <p className="text-xs text-dark-500">Smart Security Robot</p>
              </div>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              Giải pháp robot tuần tra thông minh tích hợp AIoT cho doanh nghiệp và hộ gia đình. 
              Công nghệ tiên tiến, bảo mật tối ưu.
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-dark-800/50 border border-white/5 flex items-center justify-center text-dark-400 hover:text-white hover:border-transparent transition-all ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Sản phẩm
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-dark-400 hover:text-kpatrol-400 transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-kpatrol-500/20 text-kpatrol-400">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Hỗ trợ
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-400 hover:text-kpatrol-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Công ty
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-dark-400 hover:text-kpatrol-400 transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-green-500/20 text-green-400">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Liên hệ
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="mailto:contact@kpatrol.io"
                  className="group flex items-start gap-3 text-sm text-dark-400 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-kpatrol-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-kpatrol-400" />
                  </div>
                  <div>
                    <p className="text-dark-500 text-xs mb-0.5">Email</p>
                    <p className="group-hover:text-kpatrol-400 transition-colors">contact@kpatrol.io</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+841234567890"
                  className="group flex items-start gap-3 text-sm text-dark-400 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-kpatrol-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-kpatrol-400" />
                  </div>
                  <div>
                    <p className="text-dark-500 text-xs mb-0.5">Hotline</p>
                    <p className="group-hover:text-kpatrol-400 transition-colors">1900 1234</p>
                  </div>
                </Link>
              </li>
              <li className="flex items-start gap-3 text-sm text-dark-400">
                <div className="w-8 h-8 rounded-lg bg-kpatrol-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-kpatrol-400" />
                </div>
                <div>
                  <p className="text-dark-500 text-xs mb-0.5">Địa chỉ</p>
                  <p>TP. Hồ Chí Minh, Việt Nam</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/5">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-500 text-sm flex items-center gap-1">
              © 2025 K-Patrol. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Vietnam
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="text-sm text-dark-500 hover:text-kpatrol-400 transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link href="#" className="text-sm text-dark-500 hover:text-kpatrol-400 transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="#" className="text-sm text-dark-500 hover:text-kpatrol-400 transition-colors">
                Cookie
              </Link>
              <Link 
                href="#" 
                className="text-sm text-dark-500 hover:text-kpatrol-400 transition-colors inline-flex items-center gap-1"
              >
                Sitemap
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button (subtle) */}
      <div className="absolute bottom-24 right-8 hidden lg:block">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-dark-400 hover:text-white hover:border-kpatrol-500/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}
