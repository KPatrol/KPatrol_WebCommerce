'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export function FAQSection() {
  const { t } = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t('faq.items.q1.question'),
      answer: t('faq.items.q1.answer'),
    },
    {
      question: t('faq.items.q2.question'),
      answer: t('faq.items.q2.answer'),
    },
    {
      question: t('faq.items.q3.question'),
      answer: t('faq.items.q3.answer'),
    },
    {
      question: t('faq.items.q4.question'),
      answer: t('faq.items.q4.answer'),
    },
    {
      question: t('faq.items.q5.question'),
      answer: t('faq.items.q5.answer'),
    },
    {
      question: t('faq.items.q6.question'),
      answer: t('faq.items.q6.answer'),
    },
  ];

  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="label-hud text-cyan-200">{t('faq.badge')}</span>
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 heading-display leading-tight">
              <span className="gradient-text">{t('faq.title')}</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  'group rounded-2xl overflow-hidden',
                  'bg-slate-900/70 backdrop-blur-xl',
                  'ring-1 ring-cyan-500/20',
                  'transition-all duration-500',
                  openIndex === index
                    ? 'ring-cyan-400/45 shadow-[0_0_28px_rgba(34,211,238,0.18)]'
                    : 'hover:ring-cyan-400/35'
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-cyan-500/5 transition-colors"
                >
                  <span className="text-lg font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      'flex-shrink-0 w-8 h-8 rounded-full',
                      'flex items-center justify-center',
                      'transition-all duration-300',
                      openIndex === index
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 shadow-[0_0_12px_rgba(34,211,238,0.5)] rotate-180'
                        : 'bg-slate-900/60 ring-1 ring-cyan-500/25 group-hover:ring-cyan-400/55'
                    )}
                  >
                    {openIndex === index ? (
                      <Minus className="h-4 w-4 text-white" />
                    ) : (
                      <Plus className="h-4 w-4 text-cyan-200" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-cyan-500/15">
                          <p className="text-slate-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <p className="text-slate-400 mb-4">
              {t('locale') === 'vi' ? 'Còn câu hỏi khác?' : 'Still have questions?'}
            </p>
            <a
              href="#contact"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-xl',
                'bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40',
                'text-white font-black uppercase tracking-widest text-sm',
                'shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)]',
                'hover:scale-[1.02] transition-all duration-300'
              )}
            >
              {t('locale') === 'vi' ? 'Liên hệ với chúng tôi' : 'Contact Us'}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
