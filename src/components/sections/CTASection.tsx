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
import { useTranslations } from '@/hooks/useTranslations';

export function CTASection() {
  const { t, locale } = useTranslations();
  
  const pricingFeatures = [
    t('cta.features.robot'),
    t('cta.features.ai'),
    t('cta.features.app'),
    t('cta.features.cloud'),
    t('cta.features.warranty'),
    t('cta.features.setup'),
    t('cta.features.support'),
    t('cta.features.update'),
  ];


  const contactInfo = [
    { icon: Mail, label: t('cta.contact.email.label'), value: t('cta.contact.email.value'), href: 'mailto:contact@kpatrol.khoavd.online' },
    { icon: Phone, label: t('cta.contact.phone.label'), value: t('cta.contact.phone.value'), href: 'tel:0822608286' },
    { icon: MapPin, label: t('cta.contact.address.label'), value: t('cta.contact.address.value'), href: '#' },
  ];

  const guarantees = [
    { icon: Shield, text: t('cta.guarantees.warranty') },
    { icon: Clock, text: t('cta.guarantees.delivery') },
    { icon: Headphones, text: t('cta.guarantees.support') },
  ];
  
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
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-mesh opacity-50" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <motion.div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-cyan-500/12 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px]"
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
            className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span className="label-hud text-cyan-200">{t('cta.badge')}</span>
          </motion.div>

          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl mb-6">
            {t('cta.title')} <br className="hidden md:block" />
            <span className="gradient-text">{t('cta.titleHighlight')}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('cta.description')}
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
              <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-400 animate-gradient bg-[length:400%_400%]">
                <div className="absolute inset-px rounded-3xl bg-slate-950" />
              </div>

              <div className="relative p-8 lg:p-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 ring-1 ring-cyan-400/40 text-cyan-200 text-[10px] font-black uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  {t('cta.packageBadge')}
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-black font-display gradient-text">
                      {t('cta.price')}
                    </span>
                    <span className="text-xl text-slate-400">{t('cta.currency')}</span>
                  </div>
                  <p className="text-slate-400 mt-2">{t('cta.priceDescription')}</p>
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
                      <div className="w-6 h-6 rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                        <CheckCircle className="w-4 h-4 text-emerald-300" />
                      </div>
                      <span className="text-slate-200">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <button className="w-full btn-primary text-lg py-5 group">
                  <span>{t('cta.orderButton')}</span>
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
                  className="text-center p-4 rounded-xl bg-slate-900/60 ring-1 ring-cyan-500/20 shadow-[0_0_18px_rgba(34,211,238,0.08)]"
                >
                  <item.icon className="w-6 h-6 text-cyan-300 mx-auto mb-2" />
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-300">{item.text}</p>
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
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 ring-1 ring-cyan-500/20 hover:ring-cyan-400/45 hover:bg-cyan-500/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 ring-1 ring-cyan-400/40 flex items-center justify-center group-hover:ring-cyan-300/60 transition-colors shadow-[0_0_18px_rgba(34,211,238,0.2)]">
                    <info.icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <p className="label-hud text-slate-500">{info.label}</p>
                    <p className="font-bold text-white">{info.value}</p>
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
            <div className="rounded-3xl bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 shadow-[0_0_32px_rgba(34,211,238,0.1)] p-8 lg:p-10">
              <h3 className="text-2xl font-black font-display tracking-tight mb-2">{t('cta.form.title')}</h3>
              <p className="text-slate-400 mb-8">{t('cta.form.subtitle')}</p>
              
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_28px_rgba(16,185,129,0.35)]">
                    <CheckCircle className="w-10 h-10 text-emerald-300" />
                  </div>
                  <h4 className="text-xl font-black mb-2">{t('cta.form.successTitle')}</h4>
                  <p className="text-slate-400">{t('cta.form.successMessage')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Company */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input pl-12"
                        placeholder={t('cta.form.namePlaceholder')}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="input pl-12"
                        placeholder={t('cta.form.companyPlaceholder')}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input pl-12"
                      placeholder={t('cta.form.emailPlaceholder')}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input pl-12"
                      placeholder={t('cta.form.phonePlaceholder')}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input pl-12 min-h-[120px] resize-none"
                      placeholder={t('cta.form.messagePlaceholder')}
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
                        <span>{t('cta.form.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('cta.form.submitButton')}</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-sm text-slate-500 text-center">
                    {t('cta.form.agreement')}
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
