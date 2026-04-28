'use client';

import { motion } from 'framer-motion';
import { Check, Cpu, Zap } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { cn } from '@/lib/utils';
import { notification } from '@/lib/notification';
import { useState } from 'react';

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

export function PricingSection() {
  const { t, locale } = useTranslations();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'starter',
      name: t('pricing.plans.starter.name'),
      description: t('pricing.plans.starter.description'),
      price: billingPeriod === 'monthly' ? t('pricing.plans.starter.price') : '144.000.000',
      period: billingPeriod === 'monthly' ? t('pricing.plans.starter.period') : '/năm',
      features: locale === 'vi' ? [
        '1 Robot tuần tra',
        'Tuần tra tự động cơ bản',
        'Camera HD',
        'Cảnh báo real-time',
        'Lưu trữ 7 ngày',
        'Hỗ trợ email'
      ] : [
        '1 Patrol robot',
        'Basic auto patrol',
        'HD Camera',
        'Real-time alerts',
        '7-day storage',
        'Email support'
      ],
      hardware: locale === 'vi'
        ? ['4 bánh Mecanum', '6 cảm biến ToF', 'Camera HD 1080p']
        : ['4 Mecanum wheels', '6 ToF sensors', 'HD 1080p camera'],
      popular: false,
    },
    {
      id: 'professional',
      name: t('pricing.plans.professional.name'),
      description: t('pricing.plans.professional.description'),
      price: billingPeriod === 'monthly' ? t('pricing.plans.professional.price') : '336.000.000',
      period: billingPeriod === 'monthly' ? t('pricing.plans.professional.period') : '/năm',
      features: locale === 'vi' ? [
        '3 Robot tuần tra',
        'AI nhận diện nâng cao',
        'Camera 4K + Night Vision',
        'Cảnh báo đa kênh',
        'Lưu trữ 30 ngày',
        'Hỗ trợ 24/7',
        'Báo cáo chi tiết',
        'API tích hợp'
      ] : [
        '3 Patrol robots',
        'Advanced AI recognition',
        '4K Camera + Night Vision',
        'Multi-channel alerts',
        '30-day storage',
        '24/7 Support',
        'Detailed reports',
        'API integration'
      ],
      hardware: locale === 'vi'
        ? ['4K Night Vision', 'AI nhận diện on-device', 'Báo cáo PDF tự động']
        : ['4K Night Vision', 'On-device AI recognition', 'Auto PDF reports'],
      popular: true,
    },
    {
      id: 'enterprise',
      name: t('pricing.plans.enterprise.name'),
      description: t('pricing.plans.enterprise.description'),
      price: t('pricing.plans.enterprise.price'),
      period: '',
      features: locale === 'vi' ? [
        'Không giới hạn robot',
        'AI tùy chỉnh',
        'Phần cứng cao cấp',
        'Tích hợp hệ thống riêng',
        'Lưu trữ không giới hạn',
        'Quản lý tài khoản chuyên dụng',
        'SLA 99.99%',
        'Đào tạo & triển khai'
      ] : [
        'Unlimited robots',
        'Custom AI',
        'Premium hardware',
        'Custom system integration',
        'Unlimited storage',
        'Dedicated account manager',
        '99.99% SLA',
        'Training & deployment'
      ],
      hardware: locale === 'vi'
        ? ['Fleet Management', 'Tích hợp CCTV sẵn có', 'SLA 99.5% uptime']
        : ['Fleet Management', 'Existing CCTV integration', '99.5% uptime SLA'],
      popular: false,
    },
  ];

  const handleGetStarted = (planName: string) => {
    notification.success({
      title: t('notification.success'),
      description: `Selected ${planName} plan`,
    });
  };

  return (
    <section id="pricing" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/12 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="label-hud text-cyan-200">{t('pricing.badge')}</span>
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 heading-display leading-tight"
          >
            <span className="gradient-text">{t('pricing.title')}</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-8"
          >
            {t('pricing.subtitle')}
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1 p-1 bg-slate-900/70 backdrop-blur-md ring-1 ring-cyan-500/20 rounded-full"
          >
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={cn(
                'px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300',
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_18px_rgba(34,211,238,0.4)] ring-1 ring-cyan-300/40'
                  : 'text-slate-400 hover:text-cyan-100'
              )}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={cn(
                'px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2',
                billingPeriod === 'yearly'
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_18px_rgba(34,211,238,0.4)] ring-1 ring-cyan-300/40'
                  : 'text-slate-400 hover:text-cyan-100'
              )}
            >
              {t('pricing.yearly')}
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 ring-1 ring-emerald-400/40 text-emerald-200 px-2 py-0.5 rounded-full">
                {t('pricing.yearlyDiscount')}
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6 max-w-7xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={cn(
                'relative group',
                plan.popular && 'md:-mt-4 md:mb-4'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 rounded-full shadow-[0_0_18px_rgba(34,211,238,0.55)]">
                    <Zap className="h-3.5 w-3.5 text-white fill-white" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">
                      Popular
                    </span>
                  </div>
                </div>
              )}

              <div
                className={cn(
                  'relative h-full p-6 md:p-8 rounded-2xl',
                  'bg-slate-900/70 backdrop-blur-xl',
                  'ring-1 ring-cyan-500/20',
                  'transition-all duration-500',
                  'group-hover:ring-cyan-400/45',
                  'group-hover:shadow-[0_0_32px_rgba(34,211,238,0.2)]',
                  plan.popular && 'ring-cyan-400/45 shadow-[0_0_28px_rgba(34,211,238,0.18)]'
                )}
              >
                {/* Card Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-black tracking-tight text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-4xl md:text-5xl font-black font-display gradient-text break-all">
                      {plan.price.split('.')[0]}
                    </span>
                    {plan.price.includes('.') && (
                      <span className="text-2xl font-black text-slate-400">
                        .{plan.price.split('.').slice(1).join('.')}
                      </span>
                    )}
                  </div>
                  {plan.period && (
                    <span className="label-hud text-slate-500">{plan.period}</span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md bg-cyan-500/15 ring-1 ring-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.2)] flex items-center justify-center">
                        <Check className="h-3 w-3 text-cyan-300" />
                      </span>
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hardware highlights — absorbed from Products preview */}
                {plan.hardware && plan.hardware.length > 0 && (
                  <div className="mb-8 rounded-xl bg-slate-950/40 ring-1 ring-cyan-500/15 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-7 h-7 rounded-lg bg-cyan-500/15 ring-1 ring-cyan-400/40 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.18)]">
                        <Cpu className="h-3.5 w-3.5 text-cyan-300" />
                      </span>
                      <span className="label-hud text-cyan-200">
                        {locale === 'vi' ? 'Phần cứng đi kèm' : 'Hardware included'}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {plan.hardware.map((h, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => handleGetStarted(plan.name)}
                  className={cn(
                    'w-full py-3 px-6 rounded-xl text-sm font-black uppercase tracking-widest',
                    'transition-all duration-300',
                    'focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950',
                    plan.popular
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02]'
                      : 'bg-slate-900/60 text-cyan-100 ring-1 ring-cyan-500/25 hover:ring-cyan-400/55 hover:bg-cyan-500/5'
                  )}
                >
                  {plan.id === 'enterprise' ? t('pricing.ctaEnterprise') : t('pricing.cta')}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
