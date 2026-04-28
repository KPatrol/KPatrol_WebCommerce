'use client';

import { motion } from 'framer-motion';
import { Award, Building, Shield, Zap } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

const partners = [
  { name: 'Vingroup', logo: 'V' },
  { name: 'FPT', logo: 'F' },
  { name: 'VinAI', logo: 'VA' },
  { name: 'VNPT', logo: 'VN' },
  { name: 'Viettel', logo: 'VT' },
  { name: 'Samsung', logo: 'S' },
  { name: 'Intel', logo: 'I' },
  { name: 'NVIDIA', logo: 'N' },
  { name: 'Cisco', logo: 'C' },
  { name: 'Microsoft', logo: 'M' },
];

export function PartnersSection() {
  const { t } = useTranslations();
  
  const certifications = [
    { 
      icon: Shield, 
      title: t('partners.certifications.iso27001.title'),
      description: t('partners.certifications.iso27001.description'),
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: Award, 
      title: t('partners.certifications.ce.title'),
      description: t('partners.certifications.ce.description'),
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      icon: Building, 
      title: t('partners.certifications.madeInVietnam.title'),
      description: t('partners.certifications.madeInVietnam.description'),
      color: 'from-red-500 to-orange-500'
    },
    { 
      icon: Zap, 
      title: t('partners.certifications.rohs.title'),
      description: t('partners.certifications.rohs.description'),
      color: 'from-yellow-500 to-amber-500'
    },
  ];
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-4 leading-tight heading-display">
            {t('partners.title')} <span className="gradient-text">{t('partners.titleHighlight')}</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            {t('partners.description')}
          </p>
        </motion.div>

        {/* Partner Logos - Infinite Scroll */}
        <div className="relative mb-12 md:mb-20">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: [0, -50 * partners.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 20,
                  ease: 'linear',
                },
              }}
              className="flex gap-4 md:gap-8"
            >
              {/* Double the partners for seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 w-28 h-16 md:w-40 md:h-20 rounded-xl bg-slate-900/60 backdrop-blur-md ring-1 ring-cyan-500/15 flex items-center justify-center hover:ring-cyan-400/45 hover:bg-cyan-500/5 transition-all group"
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-cyan-500/15 ring-1 ring-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.2)] flex items-center justify-center text-sm md:text-lg font-black text-cyan-300 group-hover:scale-110 transition-transform">
                      {partner.logo}
                    </div>
                    <span className="text-[10px] md:text-xs text-slate-500 group-hover:text-cyan-200 uppercase tracking-widest font-bold transition-colors">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-4 md:p-6 rounded-2xl bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 hover:ring-cyan-400/45 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)] transition-all text-center"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto rounded-xl bg-gradient-to-br ${cert.color} p-0.5 mb-3 md:mb-4 shadow-[0_0_18px_rgba(34,211,238,0.2)]`}>
                <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                  <cert.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <h4 className="font-black text-white text-sm md:text-base mb-1 tracking-tight">{cert.title}</h4>
              <p className="text-xs md:text-sm text-slate-400">{cert.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="label-hud text-slate-500 mb-3 md:mb-4">{t('partners.paymentText')}</p>
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {['VISA', 'Mastercard', 'MoMo', 'ZaloPay', 'VNPay'].map((payment) => (
              <div
                key={payment}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-slate-900/60 ring-1 ring-cyan-500/15 text-xs md:text-sm text-slate-300 font-bold uppercase tracking-widest"
              >
                {payment}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
