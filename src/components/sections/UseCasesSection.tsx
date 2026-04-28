'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Building2, 
  Home, 
  Warehouse, 
  Cross, 
  GraduationCap,
  Factory,
  ArrowRight,
  CheckCircle,
  Users,
  Target
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

function UseCaseCard({ useCaseKey, icon, gradient, index }: { 
  useCaseKey: string;
  icon: any;
  gradient: string;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslations();
  const Icon = icon;
  
  const useCase = {
    title: t(`useCases.list.${useCaseKey}.title`),
    shortDescription: t(`useCases.list.${useCaseKey}.shortDescription`),
    fullDescription: t(`useCases.list.${useCaseKey}.fullDescription`),
    benefits: [
      t(`useCases.list.${useCaseKey}.benefit1`),
      t(`useCases.list.${useCaseKey}.benefit2`),
      t(`useCases.list.${useCaseKey}.benefit3`)
    ],
    stats: {
      value: t(`useCases.list.${useCaseKey}.stats.value`),
      label: t(`useCases.list.${useCaseKey}.stats.label`)
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
    >
      <div
        className={`
          relative rounded-3xl overflow-hidden cursor-pointer
          bg-slate-900/70 backdrop-blur-xl
          ring-1 ring-cyan-500/20 hover:ring-cyan-400/45
          transition-all duration-500
          ${isExpanded ? 'ring-cyan-400/55 shadow-[0_0_28px_rgba(34,211,238,0.18)]' : ''}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Top Gradient Bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />
        
        {/* Main Content */}
        <div className="p-5 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-6">
            <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 shrink-0 shadow-[0_0_18px_rgba(34,211,238,0.2)]`}>
                <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-black tracking-tight font-display text-white group-hover:text-cyan-200 transition-colors">
                  {useCase.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`text-xl md:text-2xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {useCase.stats.value}
                  </span>
                  <span className="label-hud text-slate-500">{useCase.stats.label}</span>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-900/60 ring-1 ring-cyan-500/25 flex items-center justify-center shrink-0"
            >
              <ArrowRight className="w-5 h-5 text-cyan-300" />
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-slate-400 leading-relaxed mb-4">
            {isExpanded ? useCase.fullDescription : useCase.shortDescription}
          </p>

          {/* Expanded Content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-cyan-500/15">
              <p className="label-hud text-cyan-300 mb-3">
                {t('useCases.benefitsLabel')}
              </p>
              <ul className="space-y-2">
                {useCase.benefits.map((benefit: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-slate-400"
                  >
                    <CheckCircle className="w-4 h-4 text-cyan-300 shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Background Glow on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
      </div>
    </motion.div>
  );
}

export function UseCasesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslations();
  
  const useCaseConfigs = [
    { key: 'office', icon: Building2, gradient: 'from-blue-500 to-indigo-600' },
    { key: 'warehouse', icon: Warehouse, gradient: 'from-emerald-500 to-teal-600' },
    { key: 'home', icon: Home, gradient: 'from-orange-500 to-amber-600' },
    { key: 'hospital', icon: Cross, gradient: 'from-rose-500 to-pink-600' },
    { key: 'school', icon: GraduationCap, gradient: 'from-violet-500 to-purple-600' },
    { key: 'factory', icon: Factory, gradient: 'from-cyan-500 to-blue-600' },
  ];
  
  return (
    <section id="use-cases" className="section relative" ref={containerRef}>
      {/* Background Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6"
          >
            <Target className="w-4 h-4 text-cyan-300" />
            <span className="label-hud text-cyan-200">{t('useCases.badge')}</span>
          </motion.div>

          <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 leading-tight">
            {t('useCases.heading')}
            <span className="gradient-text">{t('useCases.headingHighlight')}</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('useCases.subtitle')}
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {useCaseConfigs.map((config, index) => (
            <UseCaseCard 
              key={config.key} 
              useCaseKey={config.key}
              icon={config.icon}
              gradient={config.gradient}
              index={index} 
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-5 sm:p-8 rounded-3xl bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 shadow-[0_0_28px_rgba(34,211,238,0.1)]">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-cyan-300" />
              <div className="text-left">
                <p className="text-2xl font-black font-display gradient-text">1000+</p>
                <p className="label-hud text-slate-500">
                  {t('useCases.trustedCustomers')}
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-cyan-500/15" />

            <div className="text-left">
              <p className="text-slate-400 mb-2">
                {t('useCases.haveProject')}
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-black uppercase tracking-widest text-sm transition-colors">
                {t('useCases.consultCTA')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
