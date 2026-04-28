'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

export function ContactCTASection() {
  const { t } = useTranslations();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const subject = `K-Patrol — Liên hệ tư vấn từ ${form.name || 'khách hàng'}`;
    const body = [
      `Họ tên: ${form.name}`,
      `Số điện thoại: ${form.phone}`,
      '',
      'Nội dung:',
      form.message || '(không có)',
    ].join('\n');
    const mailto = `mailto:khoa.vu@alphaasimov.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
    setSubmitting(false);
  };

  // Order: email (left) → address (center, anchor) → hotline (right) for symmetric balance
  const cards = [
    {
      icon: Mail,
      title: t('contactCta.cards.email'),
      value: 'khoa.vu@alphaasimov.com',
      href: 'mailto:khoa.vu@alphaasimov.com',
      color: 'text-sky-300',
      ringColor: 'ring-sky-500/25',
      ringHover: 'hover:ring-sky-400/55',
      glow: 'shadow-[0_0_18px_rgba(56,189,248,0.18)]',
      iconBg: 'bg-sky-500/10',
      iconRing: 'ring-sky-400/40',
    },
    {
      icon: MapPin,
      title: t('contactCta.cards.address'),
      value: t('contactCta.cards.addressValue'),
      href: '#',
      color: 'text-emerald-300',
      ringColor: 'ring-emerald-500/30',
      ringHover: 'hover:ring-emerald-400/60',
      glow: 'shadow-[0_0_24px_rgba(16,185,129,0.22)]',
      iconBg: 'bg-emerald-500/10',
      iconRing: 'ring-emerald-400/45',
      featured: true,
    },
    {
      icon: Phone,
      title: t('contactCta.cards.hotline'),
      value: '0822 608 286',
      href: 'tel:0822608286',
      color: 'text-cyan-300',
      ringColor: 'ring-cyan-500/25',
      ringHover: 'hover:ring-cyan-400/55',
      glow: 'shadow-[0_0_18px_rgba(34,211,238,0.18)]',
      iconBg: 'bg-cyan-500/10',
      iconRing: 'ring-cyan-400/40',
    },
  ];

  return (
    <section id="contact" className="section relative">
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dense opacity-30 pointer-events-none" />

      <div className="container-custom relative">
        {/* Main CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="relative rounded-3xl overflow-hidden mb-12 md:mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/60 ring-1 ring-cyan-500/20 rounded-3xl" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16 items-center">
            <div>
              <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl mb-4">
                {t('contactCta.title')} <br />
                <span className="gradient-text">{t('contactCta.titleHighlight')}</span>
              </h2>
              <p className="text-slate-400 text-base md:text-lg mb-6 max-w-md">
                {t('contactCta.description')}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:0822608286"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white font-black uppercase tracking-widest text-sm shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  {t('contactCta.callNow')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#live-map"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/60 backdrop-blur-md ring-1 ring-cyan-500/25 text-cyan-100 font-black uppercase tracking-widest text-sm hover:ring-cyan-400/55 hover:bg-cyan-500/5 transition-all"
                >
                  {t('contactCta.viewDemo')}
                </a>
              </div>
            </div>

            {/* Mini-form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 shadow-[0_0_28px_rgba(34,211,238,0.1)] p-6 md:p-7 space-y-4"
            >
              <div>
                <label className="label-hud text-slate-500 mb-1.5 block">
                  {t('contactCta.form.nameLabel')}
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input py-3"
                  placeholder={t('contactCta.form.namePlaceholder')}
                />
              </div>
              <div>
                <label className="label-hud text-slate-500 mb-1.5 block">
                  {t('contactCta.form.phoneLabel')}
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input py-3"
                  placeholder={t('contactCta.form.phonePlaceholder')}
                />
              </div>
              <div>
                <label className="label-hud text-slate-500 mb-1.5 block">
                  {t('contactCta.form.messageLabel')}
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input py-3 resize-none"
                  placeholder={t('contactCta.form.messagePlaceholder')}
                />
              </div>
              <button
                type="submit"
                disabled={submitting || sent}
                className="w-full py-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] disabled:opacity-60 transition-all"
              >
                {sent ? (
                  t('contactCta.form.sent')
                ) : submitting ? (
                  t('contactCta.form.submitting')
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t('contactCta.form.submit')}
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Contact cards — symmetric trio: email · address (centered, featured) · hotline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-stretch">
          {cards.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative rounded-2xl bg-slate-900/60 backdrop-blur-md ring-1 ${c.ringColor} ${c.ringHover} hover:bg-slate-900/75 transition-all p-6 md:p-7 flex flex-col items-center text-center gap-3 group overflow-hidden ${c.featured ? `md:scale-[1.04] md:-my-2 ${c.glow}` : ''}`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              {c.featured && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
              )}
              <div className={`relative w-14 h-14 rounded-2xl ${c.iconBg} ring-1 ${c.iconRing} flex items-center justify-center group-hover:scale-110 transition-transform ${c.glow}`}>
                <c.icon className={`w-6 h-6 ${c.color}`} />
              </div>
              <div className="relative min-w-0 w-full">
                <div className="label-hud text-slate-500 mb-1.5">{c.title}</div>
                <div className={`font-bold text-white break-words ${c.featured ? 'text-base md:text-[15px] leading-snug' : 'text-sm leading-snug'}`}>
                  {c.value}
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 group-hover:via-cyan-400/50 to-transparent transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
