'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Shield, Cpu, Zap, Bot, Sparkles } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

function BackgroundOrbs() {
  return (
    <motion.div
      className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(34, 211, 238, 0.28) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function RobotVisualization() {
  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #22d3ee, #3b82f6, #22d3ee)',
          filter: 'blur(50px)',
          opacity: 0.28,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />

      <div className="absolute inset-8 rounded-3xl glass-strong overflow-hidden glow-box">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <motion.div
            className="relative"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center ring-1 ring-cyan-300/50"
              style={{ boxShadow: '0 0 28px rgba(34, 211, 238, 0.7), 0 0 56px rgba(34, 211, 238, 0.35)' }}
            >
              <Bot className="w-16 h-16 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-cyan-400"
              animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
          </motion.div>

          <p className="mt-6 text-lg font-display font-bold text-cyan-100 tracking-wider">K-Patrol</p>
          <p className="label-hud mt-1">Robot tuần tra thông minh</p>
        </div>
      </div>
    </div>
  );
}

function StatItem({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <div className="relative flex flex-col items-center text-center px-3 py-4 rounded-2xl bg-slate-900/55 backdrop-blur-md ring-1 ring-cyan-500/15 hover:ring-cyan-400/40 transition-all group overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="w-9 h-9 rounded-xl bg-slate-950/70 ring-1 ring-cyan-500/25 shadow-[0_0_14px_rgba(34,211,238,0.18)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
        <Icon className="w-4 h-4 text-cyan-300" />
      </div>
      <span className="text-2xl md:text-3xl font-bold font-display gradient-text leading-none mb-1.5">
        {value}
      </span>
      <span className="label-hud text-slate-400 text-[10px] leading-tight">{label}</span>
    </div>
  );
}

export function HeroSection() {
  const { t } = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-top" />
      <BackgroundOrbs />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full cockpit-panel mb-8"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span className="label-hud text-cyan-200">{t('hero.badge')}</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-[1.15]"
            >
              <span className="text-white">{t('hero.title')}</span>
              <br />
              <span className="gradient-text text-glow">{t('hero.subtitle')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-slate-400 mb-8 md:mb-10 max-w-xl leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10 max-w-xl"
            >
              <StatItem value={t('hero.stats.uptime.value')} label={t('hero.stats.uptime.label')} icon={Shield} />
              <StatItem value={t('hero.stats.latency.value')} label={t('hero.stats.latency.label')} icon={Zap} />
              <StatItem value={t('hero.stats.accuracy.value')} label={t('hero.stats.accuracy.label')} icon={Cpu} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-3 md:gap-4 max-w-xl"
            >
              <Link
                href="#contact"
                className="group relative h-12 md:h-14 rounded-xl flex items-center justify-center gap-2 px-4 bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white font-black uppercase tracking-widest text-xs md:text-sm shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02] transition-all overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <span className="relative">{t('hero.cta.primary')}</span>
                <ArrowRight className="relative w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#live-map"
                className="group h-12 md:h-14 rounded-xl flex items-center justify-center gap-2 px-4 bg-slate-900/60 backdrop-blur-md ring-1 ring-cyan-500/25 text-cyan-100 font-black uppercase tracking-widest text-xs md:text-sm hover:ring-cyan-400/55 hover:bg-cyan-500/5 hover:text-white transition-all"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 text-cyan-300 group-hover:scale-110 transition-transform" />
                <span>{t('hero.cta.secondary')}</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <RobotVisualization />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-hud text-slate-500">{t('hero.scrollHint')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-10 h-14 rounded-full ring-1 ring-cyan-500/40 flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
