'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Camera,
  Flame,
  Gauge,
  MapPin,
  Radio,
  ShieldCheck,
  User,
  Zap,
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

type SpecItem = { k: string; v: string };

export function FeaturesBentoSection() {
  const { t, tArray } = useTranslations();
  const specs = tArray<SpecItem>('featuresBento.specs.items');
  const personTags = tArray<string>('featuresBento.person.tags');

  return (
    <section id="features" className="section relative">
      <div className="absolute inset-0 bg-grid-dense opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] blob" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6">
            <Brain className="w-4 h-4 text-cyan-300" />
            <span className="label-hud text-cyan-200">{t('featuresBento.badge')}</span>
          </div>
          <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl mb-4">
            {t('featuresBento.title')}{' '}
            <span className="gradient-text">{t('featuresBento.titleHighlight')}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            {t('featuresBento.description')}
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
          {/* 1. AI Person Detection - hero tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4 md:row-span-2 bento-card p-8 min-h-[320px] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent pointer-events-none" />
            {/* Detection overlay visual — anchored top-right with cropped viewBox so silhouette sits closer to top + right edge */}
            <div className="absolute -right-2 top-4 w-[48%] h-[78%] pointer-events-none opacity-85">
              <svg
                viewBox="110 30 200 240"
                preserveAspectRatio="xMaxYMid meet"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="scan" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="bboxGlow" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.12" />
                  </linearGradient>
                  <linearGradient id="personSilhouette" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.35" />
                  </linearGradient>
                  <radialGradient id="personHalo" cx="0.5" cy="0.4" r="0.55">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="bboxClip">
                    <rect x="130" y="50" width="140" height="200" rx="4" />
                  </clipPath>
                </defs>

                {/* faint glow fill behind bbox */}
                <rect
                  x="130"
                  y="50"
                  width="140"
                  height="200"
                  rx="6"
                  fill="url(#bboxGlow)"
                />

                {/* person silhouette — head + shoulders, clipped to bbox */}
                <g clipPath="url(#bboxClip)" opacity="0.95">
                  {/* halo behind person */}
                  <circle cx="200" cy="135" r="80" fill="url(#personHalo)" />

                  {/* shoulders / torso */}
                  <path
                    d="M148 250 C 148 215, 165 195, 185 188 L 215 188 C 235 195, 252 215, 252 250 Z"
                    fill="url(#personSilhouette)"
                    stroke="#c084fc"
                    strokeOpacity="0.65"
                    strokeWidth="1.2"
                  />
                  {/* neck */}
                  <path
                    d="M188 188 L 188 175 Q 200 178 212 175 L 212 188 Z"
                    fill="url(#personSilhouette)"
                  />
                  {/* head */}
                  <circle
                    cx="200"
                    cy="138"
                    r="32"
                    fill="url(#personSilhouette)"
                    stroke="#c084fc"
                    strokeOpacity="0.7"
                    strokeWidth="1.2"
                  />
                  {/* facial landmark dots — eyes + nose + mouth hint */}
                  <g fill="#f3e8ff" opacity="0.85">
                    <circle cx="190" cy="134" r="1.6" />
                    <circle cx="210" cy="134" r="1.6" />
                    <circle cx="200" cy="143" r="1.2" />
                  </g>
                  <path
                    d="M193 152 Q 200 156 207 152"
                    fill="none"
                    stroke="#f3e8ff"
                    strokeOpacity="0.7"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                  {/* facial keypoint cross-marks (AI landmarks) */}
                  <g stroke="#a855f7" strokeWidth="0.8" opacity="0.55">
                    <line x1="186" y1="130" x2="186" y2="138" />
                    <line x1="182" y1="134" x2="190" y2="134" />
                    <line x1="214" y1="130" x2="214" y2="138" />
                    <line x1="210" y1="134" x2="218" y2="134" />
                  </g>
                </g>

                {/* bbox corners (L-shapes) — symmetric around viewBox center (200,150) */}
                <g stroke="#a855f7" strokeWidth="2.5" fill="none" strokeLinecap="round">
                  <path d="M130 68 L130 50 L148 50" />
                  <path d="M252 50 L270 50 L270 68" />
                  <path d="M130 232 L130 250 L148 250" />
                  <path d="M252 250 L270 250 L270 232" />
                </g>

                {/* faint dashed outline */}
                <rect
                  x="130"
                  y="50"
                  width="140"
                  height="200"
                  rx="4"
                  fill="none"
                  stroke="#a855f7"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />

                {/* scan line bounded to bbox */}
                <motion.rect
                  x="130"
                  y="50"
                  width="140"
                  height="14"
                  fill="url(#scan)"
                  animate={{ y: [50, 236, 50] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* label: rounded pill anchored to bbox top-left, outside corner */}
                <g>
                  <rect x="130" y="28" width="78" height="20" rx="5" fill="#a855f7" />
                  <circle cx="140" cy="38" r="2.8" fill="#fff" />
                  <text
                    x="148"
                    y="42"
                    fill="#fff"
                    style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}
                  >
                    person
                  </text>
                </g>

                {/* confidence pill at bbox top-right for visual balance */}
                <g>
                  <rect
                    x="222"
                    y="28"
                    width="48"
                    height="20"
                    rx="5"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                  />
                  <text
                    x="230"
                    y="42"
                    fill="#e9d5ff"
                    style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5 }}
                  >
                    98%
                  </text>
                </g>
              </svg>
            </div>

            <div className="relative z-10 max-w-[60%]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 ring-1 ring-purple-400/40 mb-5">
                <User className="w-3.5 h-3.5 text-purple-300" />
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-200">
                  {t('featuresBento.person.tag')}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                {t('featuresBento.person.titleLine1')} <br />
                <span className="gradient-text">{t('featuresBento.person.titleLine2')}</span>
              </h3>
              <p className="text-slate-400 text-sm md:text-base mb-5 max-w-md">
                {t('featuresBento.person.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                {personTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-slate-900/60 ring-1 ring-cyan-500/15 text-[10px] font-bold uppercase tracking-wider text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 2. Fire alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="md:col-span-2 bento-card p-6 min-h-[200px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full" />

            {/* Fire detection mini-bbox visual, balanced top-right */}
            <div className="absolute top-4 right-4 w-16 h-16 pointer-events-none opacity-90">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <defs>
                  <radialGradient id="fireGlow" cx="0.5" cy="0.55" r="0.5">
                    <stop offset="0%" stopColor="#fb923c" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="32" cy="34" r="22" fill="url(#fireGlow)" />
                {/* corner brackets centered around 32,32 */}
                <g stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round">
                  <path d="M14 22 L14 14 L22 14" />
                  <path d="M42 14 L50 14 L50 22" />
                  <path d="M14 42 L14 50 L22 50" />
                  <path d="M42 50 L50 50 L50 42" />
                </g>
                <motion.circle
                  cx="32"
                  cy="32"
                  r="3"
                  fill="#f97316"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 ring-1 ring-orange-400/40 flex items-center justify-center mb-4 shadow-[0_0_18px_rgba(249,115,22,0.25)]">
                <Flame className="w-6 h-6 text-orange-300" />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2">{t('featuresBento.fire.title')}</h3>
              <p className="text-sm text-slate-400">{t('featuresBento.fire.description')}</p>
            </div>
          </motion.div>

          {/* 3. Real-time tracking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 bento-card p-6 min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 ring-1 ring-cyan-400/40 flex items-center justify-center mb-4 shadow-[0_0_18px_rgba(34,211,238,0.25)]">
              <MapPin className="w-6 h-6 text-cyan-300" />
            </div>
            <h3 className="text-xl font-black tracking-tight mb-2">{t('featuresBento.mapLive.title')}</h3>
            <p className="text-sm text-slate-400">{t('featuresBento.mapLive.description')}</p>
          </motion.div>

          {/* 4. Hardware specs - tall */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-2 md:row-span-2 bento-card p-6 min-h-[280px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black tracking-tight">{t('featuresBento.specs.title')}</h3>
              <Gauge className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="space-y-3">
              {specs.map((s, i) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="flex items-center justify-between py-2 border-b border-cyan-500/10 last:border-0"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.k}</span>
                  <span className="text-sm font-bold text-cyan-100">{s.v}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 5. HD Camera */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 bento-card p-6 min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 ring-1 ring-sky-400/40 flex items-center justify-center mb-4 shadow-[0_0_18px_rgba(56,189,248,0.25)]">
              <Camera className="w-6 h-6 text-sky-300" />
            </div>
            <h3 className="text-xl font-black tracking-tight mb-2">{t('featuresBento.cameraHd.title')}</h3>
            <p className="text-sm text-slate-400">{t('featuresBento.cameraHd.description')}</p>
          </motion.div>

          {/* 6. MQTT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="md:col-span-2 bento-card p-6 min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-400/40 flex items-center justify-center mb-4 shadow-[0_0_18px_rgba(16,185,129,0.25)]">
              <Radio className="w-6 h-6 text-emerald-300" />
            </div>
            <h3 className="text-xl font-black tracking-tight mb-2">{t('featuresBento.mqtt.title')}</h3>
            <p className="text-sm text-slate-400">{t('featuresBento.mqtt.description')}</p>
          </motion.div>

          {/* 7. Secure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 bento-card p-6 min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 ring-1 ring-blue-400/40 flex items-center justify-center mb-4 shadow-[0_0_18px_rgba(59,130,246,0.25)]">
              <ShieldCheck className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="text-xl font-black tracking-tight mb-2">{t('featuresBento.secure.title')}</h3>
            <p className="text-sm text-slate-400">{t('featuresBento.secure.description')}</p>
          </motion.div>

          {/* 8. Auto charge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="md:col-span-2 bento-card p-6 min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 ring-1 ring-yellow-400/40 flex items-center justify-center mb-4 shadow-[0_0_18px_rgba(234,179,8,0.25)]">
              <Zap className="w-6 h-6 text-yellow-300" />
            </div>
            <h3 className="text-xl font-black tracking-tight mb-2">{t('featuresBento.autoCharge.title')}</h3>
            <p className="text-sm text-slate-400">{t('featuresBento.autoCharge.description')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
