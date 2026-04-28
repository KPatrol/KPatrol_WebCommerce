'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/useTranslations';

type Plan = {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

type Faq = { q: string; a: string };

export function PricingFAQSection() {
  const { t, tArray } = useTranslations();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const plans = tArray<Plan>('pricingFaq.plans');
  const faqs = tArray<Faq>('pricingFaq.faq.items');

  return (
    <section id="pricing" className="section relative">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

      <div className="container-custom relative">
        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <div className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span className="label-hud text-cyan-200">{t('pricingFaq.badge')}</span>
          </div>
          <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl mb-4">
            {t('pricingFaq.title')}{' '}
            <span className="gradient-text">{t('pricingFaq.titleHighlight')}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            {t('pricingFaq.subtitle')}
          </p>
        </motion.div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                'relative rounded-3xl p-8 flex flex-col backdrop-blur-xl transition-all',
                plan.highlighted
                  ? 'bg-slate-900/70 ring-1 ring-cyan-400/45 shadow-[0_0_28px_rgba(34,211,238,0.18)]'
                  : 'bg-slate-900/70 ring-1 ring-cyan-500/20 hover:ring-cyan-400/45'
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white text-[10px] font-black uppercase tracking-widest shadow-[0_0_18px_rgba(34,211,238,0.55)]">
                  {t('pricingFaq.popular')}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-black tracking-tight text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-400">{plan.tagline}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black font-display gradient-text">{plan.price}</span>
                  {plan.unit && <span className="label-hud text-slate-500">{plan.unit}</span>}
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md bg-cyan-500/15 ring-1 ring-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.2)] flex items-center justify-center">
                      <Check className="w-3 h-3 text-cyan-300" />
                    </span>
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={cn(
                  'w-full py-3 rounded-xl text-center text-sm font-black uppercase tracking-widest transition-all',
                  plan.highlighted
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02]'
                    : 'bg-slate-900/60 ring-1 ring-cyan-500/25 text-cyan-100 hover:ring-cyan-400/55 hover:bg-cyan-500/5'
                )}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div id="faq" className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-10"
          >
            <h2 className="heading-display text-3xl md:text-4xl mb-3">
              {t('pricingFaq.faq.title')}{' '}
              <span className="gradient-text">{t('pricingFaq.faq.titleHighlight')}</span>
            </h2>
            <p className="text-slate-400">{t('pricingFaq.faq.subtitle')}</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-slate-900/70 backdrop-blur-md ring-1 ring-cyan-500/20 hover:ring-cyan-400/45 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-left hover:bg-cyan-500/5 transition-colors"
                >
                  <span className="font-bold text-white">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 flex-shrink-0 transition-transform duration-300',
                      openFaq === i ? 'rotate-180 text-cyan-300' : 'text-slate-400'
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
