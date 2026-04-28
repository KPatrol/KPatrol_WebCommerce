'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Bot, Mail, Phone, MapPin, Github, Facebook, Youtube,
  Twitter, Linkedin, Send, ArrowUpRight, Loader2, Check
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:bg-[#333]' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-[#1877f2]' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-[#ff0000]' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-[#1da1f2]' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-[#0077b5]' },
];

export function Footer() {
  const { t, locale } = useTranslations();
  
  const footerLinks = {
    products: locale === 'vi' ? [
      { label: 'K-Patrol Bot', href: '#', badge: 'Hot' },
      { label: 'Mobile App', href: '#' },
      { label: 'Web Dashboard', href: '#' },
      { label: 'API & SDK', href: '#' },
      { label: 'Phụ kiện', href: '#', badge: 'New' },
    ] : [
      { label: 'K-Patrol Bot', href: '#', badge: 'Hot' },
      { label: 'Mobile App', href: '#' },
      { label: 'Web Dashboard', href: '#' },
      { label: 'API & SDK', href: '#' },
      { label: 'Accessories', href: '#', badge: 'New' },
    ],
    support: locale === 'vi' ? [
      { label: 'Tài liệu kỹ thuật', href: '#' },
      { label: 'Hướng dẫn sử dụng', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Chính sách bảo hành', href: '#' },
      { label: 'Trung tâm hỗ trợ', href: '#' },
    ] : [
      { label: 'Technical Documentation', href: '#' },
      { label: 'User Guide', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Warranty Policy', href: '#' },
      { label: 'Support Center', href: '#' },
    ],
    company: locale === 'vi' ? [
      { label: 'Về chúng tôi', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Tuyển dụng', href: '#', badge: 'Hiring' },
      { label: 'Đối tác', href: '#' },
      { label: 'Liên hệ', href: '#contact' },
    ] : [
      { label: 'About Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#', badge: 'Hiring' },
      { label: 'Partners', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  };
  
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
    <footer className="relative bg-slate-950 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.5)]" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-cyan-500/15">
        <div className="container-custom py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6"
            >
              <Mail className="w-4 h-4 text-cyan-300" />
              <span className="label-hud text-cyan-200">Newsletter</span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl heading-display mb-4 leading-tight"
            >
              <span className="gradient-text">{t('footer.newsletter.title')}</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-sm md:text-base mb-6 md:mb-8 max-w-lg mx-auto"
            >
              {t('footer.newsletter.description')}
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
                  <Mail className="w-5 h-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  className="w-full h-12 md:h-14 pl-12 pr-4 rounded-xl bg-slate-900/60 ring-1 ring-cyan-500/20 text-white text-sm md:text-base placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="h-12 md:h-14 px-6 md:px-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white text-sm md:text-base font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('footer.newsletter.subscribing')}
                  </>
                ) : isSubscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t('footer.newsletter.success')}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t('footer.newsletter.button')}
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 overflow-hidden shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                  <Bot className="w-7 h-7 text-cyan-300" />
                </div>
              </div>
              <div>
                <span className="text-xl font-black font-display text-white tracking-tight">K-Patrol</span>
                <p className="label-hud text-slate-500">{t('footer.brand.tagline')}</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t('footer.brand.description')}
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-slate-900/60 ring-1 ring-cyan-500/15 flex items-center justify-center text-slate-400 hover:text-white hover:ring-transparent transition-all ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="label-hud text-cyan-200 mb-4">
              {t('footer.product')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-200 transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded bg-cyan-500/15 ring-1 ring-cyan-400/40 text-cyan-300">
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
            <h4 className="label-hud text-cyan-200 mb-4">
              {t('footer.support')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="label-hud text-cyan-200 mb-4">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-200 transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded bg-emerald-500/15 ring-1 ring-emerald-400/40 text-emerald-300">
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
            <h4 className="label-hud text-cyan-200 mb-4">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="mailto:contact@kpatrol.khoavd.online"
                  className="group flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 ring-1 ring-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.2)] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <p className="label-hud text-slate-500 mb-0.5">{t('footer.contactInfo.email')}</p>
                    <p className="group-hover:text-cyan-200 transition-colors">{t('footer.contactInfo.emailValue')}</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="tel:0822608286"
                  className="group flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 ring-1 ring-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.2)] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <p className="label-hud text-slate-500 mb-0.5">{t('footer.contactInfo.hotline')}</p>
                    <p className="group-hover:text-cyan-200 transition-colors">{t('footer.contactInfo.hotlineValue')}</p>
                  </div>
                </Link>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 ring-1 ring-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.2)] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <p className="label-hud text-slate-500 mb-0.5">{t('footer.contactInfo.address')}</p>
                  <p>{t('footer.contactInfo.addressValue')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-cyan-500/15">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-slate-500 text-sm">
              <p>{t('footer.copyright')}</p>
              <span className="hidden sm:inline text-slate-700">•</span>
              <p>
                {locale === 'vi' ? 'Phát triển bởi' : 'Crafted by'}{' '}
                <span className="font-black text-cyan-300 uppercase tracking-widest text-xs">Vu Dang Khoa</span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="text-sm text-slate-500 hover:text-cyan-200 transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href="#" className="text-sm text-slate-500 hover:text-cyan-200 transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="#" className="text-sm text-slate-500 hover:text-cyan-200 transition-colors">
                {t('footer.cookies')}
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-500 hover:text-cyan-200 transition-colors inline-flex items-center gap-1"
              >
                {t('footer.sitemap')}
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
          className="w-12 h-12 rounded-full bg-slate-900/70 backdrop-blur-md ring-1 ring-cyan-500/25 flex items-center justify-center text-cyan-100 hover:text-white hover:ring-cyan-400/55 hover:bg-cyan-500/10 shadow-[0_0_18px_rgba(34,211,238,0.2)] transition-all"
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
