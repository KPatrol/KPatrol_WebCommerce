'use client';

import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Clock, Loader2 } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { notification } from '@/lib/notification';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import axios from 'axios';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export function ContactSection() {
  const { t } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: t('contact.info.addressValue'),
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: t('contact.info.emailValue'),
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: t('contact.info.phoneValue'),
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: t('contact.info.hoursValue'),
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Lỗi gửi yêu cầu');
      }

      notification.success({
        title: t('notification.success'),
        description: t('contact.form.success'),
      });

      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error: any) {
      notification.error({
        title: t('notification.error'),
        description: error.message ?? t('contact.form.error'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 -left-32 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <span className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="label-hud text-cyan-200">{t('contact.badge')}</span>
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 heading-display leading-tight">
              <span className="gradient-text">{t('contact.title')}</span>
            </h2>

            <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-4 md:space-y-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={cn(
                      'flex items-start gap-4 p-4 md:p-6 rounded-2xl',
                      'bg-slate-900/60 ring-1 ring-cyan-500/20',
                      'backdrop-blur-xl',
                      'hover:ring-cyan-400/45 hover:bg-cyan-500/5 transition-all duration-300',
                      'group'
                    )}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/10 ring-1 ring-cyan-400/40 shadow-[0_0_18px_rgba(34,211,238,0.2)] flex items-center justify-center group-hover:bg-cyan-500/25 transition-colors">
                      <Icon className="h-6 w-6 text-cyan-300 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="label-hud text-slate-500 mb-1">
                        {info.label}
                      </h3>
                      <p className="text-white font-bold">{info.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form
                onSubmit={handleSubmit}
                className={cn(
                  'p-5 md:p-8 rounded-2xl',
                  'bg-slate-900/70 ring-1 ring-cyan-500/20 shadow-[0_0_28px_rgba(34,211,238,0.1)]',
                  'backdrop-blur-xl'
                )}
              >
                <div className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block label-hud text-slate-400 mb-2"
                    >
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={cn(
                        'w-full px-4 py-3 rounded-xl',
                        'bg-slate-900/60 ring-1 ring-cyan-500/20',
                        'text-white placeholder-slate-500',
                        'focus:outline-none focus:ring-2 focus:ring-cyan-400/60',
                        'transition-all duration-200'
                      )}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block label-hud text-slate-400 mb-2"
                      >
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={cn(
                          'w-full px-4 py-3 rounded-xl',
                          'bg-slate-900/60 ring-1 ring-cyan-500/20',
                          'text-white placeholder-slate-500',
                          'focus:outline-none focus:ring-2 focus:ring-cyan-400/60',
                          'transition-all duration-200'
                        )}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block label-hud text-slate-400 mb-2"
                      >
                        {t('contact.form.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl',
                          'bg-slate-900/60 ring-1 ring-cyan-500/20',
                          'text-white placeholder-slate-500',
                          'focus:outline-none focus:ring-2 focus:ring-cyan-400/60',
                          'transition-all duration-200'
                        )}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block label-hud text-slate-400 mb-2"
                    >
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl',
                        'bg-slate-900/60 ring-1 ring-cyan-500/20',
                        'text-white placeholder-slate-500',
                        'focus:outline-none focus:ring-2 focus:ring-cyan-400/60',
                        'transition-all duration-200'
                      )}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block label-hud text-slate-400 mb-2"
                    >
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl resize-none',
                        'bg-slate-900/60 ring-1 ring-cyan-500/20',
                        'text-white placeholder-slate-500',
                        'focus:outline-none focus:ring-2 focus:ring-cyan-400/60',
                        'transition-all duration-200'
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full flex items-center justify-center gap-2',
                      'px-6 py-3 rounded-xl',
                      'bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40',
                      'text-white font-black uppercase tracking-widest text-sm',
                      'shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)]',
                      'focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950',
                      'transition-all duration-300',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      !isSubmitting && 'hover:scale-[1.02]'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {t('contact.form.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
