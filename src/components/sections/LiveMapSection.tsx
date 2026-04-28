'use client';

import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  BatteryFull,
  Flame,
  Navigation,
  Pause,
  Play,
  RotateCcw,
  Shield,
  Sparkles,
  User,
  Wifi,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/useTranslations';
import { useStore } from '@/store/useStore';
import PhenikaaShowcaseMapClient, {
  type DemoEvent,
} from '@/components/map/PhenikaaShowcaseMapClient';

// Demo events anchored inside the real Phenikaa polygon
const EVENTS: DemoEvent[] = [
  {
    id: 'e1',
    lat: 20.9608,
    lng: 105.7466,
    type: 'person',
    label: 'Phát hiện người',
    time: '14:23',
  },
  {
    id: 'e2',
    lat: 20.9620,
    lng: 105.7488,
    type: 'fire',
    label: 'Cảnh báo cháy',
    time: '14:31',
  },
  {
    id: 'e3',
    lat: 20.9603,
    lng: 105.7480,
    type: 'motion',
    label: 'Chuyển động bất thường',
    time: '14:45',
  },
];

export function LiveMapSection() {
  const { t, tArray } = useTranslations();
  const lastSpeed = useStore((s) => s.lastSpeed);
  const setLastSpeed = useStore((s) => s.setLastSpeed);
  const [isPlaying, setIsPlaying] = useState(true);
  const speed = lastSpeed;
  const setSpeed = setLastSpeed;
  const [heading, setHeading] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);
  const lastPos = useRef<{ lat: number; lng: number } | null>(null);

  const eventLabels = tArray<{ label: string; time: string }>('liveMap.events');
  const statLabels = tArray<{ v: string; l: string }>('liveMap.stats');

  const handlePosition = (lat: number, lng: number, headingDeg: number) => {
    setHeading(headingDeg);
    lastPos.current = { lat, lng };
  };

  const telemetry = useMemo(
    () => [
      {
        icon: BatteryFull,
        label: t('liveMap.telemetry.battery'),
        value: '87%',
        color: 'text-emerald-400',
      },
      {
        icon: Navigation,
        label: t('liveMap.telemetry.heading'),
        value: `${Math.round(heading)}°`,
        color: 'text-cyan-300',
      },
      {
        icon: Activity,
        label: t('liveMap.telemetry.speed'),
        value: `${(0.42 * speed).toFixed(2)} m/s`,
        color: 'text-cyan-300',
      },
      {
        icon: Wifi,
        label: t('liveMap.telemetry.signal'),
        value: '-52 dBm',
        color: 'text-emerald-400',
      },
    ],
    [heading, speed, t]
  );

  // Localised events for both map tooltip and side panel
  const localizedEvents: DemoEvent[] = useMemo(
    () =>
      EVENTS.map((e, i) => ({
        ...e,
        label: eventLabels[i]?.label ?? e.label,
        time: eventLabels[i]?.time ?? e.time,
      })),
    [eventLabels]
  );

  return (
    <section id="live-map" className="section relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="label-hud text-cyan-200">{t('liveMap.badge')}</span>
          </div>
          <h2 className="heading-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-4 leading-tight">
            {t('liveMap.title')}{' '}
            <span className="gradient-text">{t('liveMap.titleHighlight')}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            {t('liveMap.description')}
          </p>
        </motion.div>

        {/* Map + Side panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Map card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 shadow-[0_0_28px_rgba(34,211,238,0.1)] overflow-hidden"
          >
            {/* Controls bar */}
            <div className="absolute top-4 left-4 right-4 z-[500] flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  className="w-10 h-10 rounded-xl bg-slate-900/70 backdrop-blur-md ring-1 ring-cyan-500/25 text-cyan-100 flex items-center justify-center hover:ring-cyan-400/55 hover:bg-cyan-500/10 transition-all"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setResetSignal((s) => s + 1)}
                  className="w-10 h-10 rounded-xl bg-slate-900/70 backdrop-blur-md ring-1 ring-cyan-500/25 text-cyan-100 flex items-center justify-center hover:ring-cyan-400/55 hover:bg-cyan-500/10 transition-all"
                  aria-label="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-900/70 backdrop-blur-md ring-1 ring-cyan-500/25">
                  {[0.5, 1, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={cn(
                        'px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-widest transition-all',
                        speed === s
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white shadow-[0_0_12px_rgba(34,211,238,0.45)]'
                          : 'text-slate-400 hover:text-cyan-100'
                      )}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/70 backdrop-blur-md ring-1 ring-emerald-400/35 pointer-events-auto">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="label-hud text-emerald-300">
                  {t('liveMap.patrolMode')}
                </span>
              </div>
            </div>

            {/* Real Phenikaa OSM map */}
            <div className="w-full aspect-[5/3] bg-gradient-to-br from-slate-900 to-slate-950">
              <PhenikaaShowcaseMapClient
                events={localizedEvents}
                isPlaying={isPlaying}
                speed={speed}
                resetSignal={resetSignal}
                onPositionChange={handlePosition}
              />
            </div>

            {/* Bottom floating HUD (mobile friendly) */}
            <div className="absolute bottom-4 left-4 right-4 z-[500] grid grid-cols-2 sm:grid-cols-4 gap-2 pointer-events-none">
              {telemetry.map((tm) => (
                <div
                  key={tm.label}
                  className="bg-slate-900/70 backdrop-blur-md ring-1 ring-cyan-500/20 rounded-xl px-3 py-2 flex items-center gap-2"
                >
                  <tm.icon className={cn('w-4 h-4 flex-shrink-0', tm.color)} />
                  <div className="min-w-0">
                    <div className="label-hud text-slate-500">
                      {tm.label}
                    </div>
                    <div className="text-sm font-black text-white truncate">
                      {tm.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Side panel: events timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 shadow-[0_0_28px_rgba(34,211,238,0.1)] p-6 overflow-hidden"
          >
            {/* Decorative gradient orbs */}
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            {/* Header with live indicator + stats summary */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 ring-1 ring-cyan-400/30 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                  </div>
                  <h3 className="label-hud text-cyan-200">
                    {t('liveMap.eventsToday')}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  <span className="label-hud text-emerald-300">{t('liveMap.live')}</span>
                </div>
              </div>

              {/* Mini-stat tiles */}
              <div className="grid grid-cols-3 gap-1.5 mb-5">
                {(() => {
                  const counts = {
                    person: localizedEvents.filter((e) => e.type === 'person').length,
                    fire: localizedEvents.filter((e) => e.type === 'fire').length,
                    motion: localizedEvents.filter((e) => e.type === 'motion').length,
                  };
                  const tiles = [
                    { key: 'person', count: counts.person, Icon: User, c: 'from-purple-500/15 to-purple-600/5 ring-purple-400/30 text-purple-300' },
                    { key: 'fire', count: counts.fire, Icon: Flame, c: 'from-orange-500/15 to-orange-600/5 ring-orange-400/30 text-orange-300' },
                    { key: 'motion', count: counts.motion, Icon: AlertTriangle, c: 'from-yellow-500/15 to-yellow-600/5 ring-yellow-400/30 text-yellow-300' },
                  ];
                  return tiles.map((t) => (
                    <div
                      key={t.key}
                      className={cn(
                        'rounded-xl bg-gradient-to-br ring-1 px-2 py-2 flex flex-col items-center gap-0.5',
                        t.c
                      )}
                    >
                      <t.Icon className="w-3.5 h-3.5" />
                      <span className="text-base font-black leading-none">{t.count}</span>
                    </div>
                  ));
                })()}
              </div>
            </div>

            <div className="relative space-y-3">
              {localizedEvents.map((e, i) => {
                const Icon =
                  e.type === 'fire' ? Flame : e.type === 'person' ? User : AlertTriangle;
                const palette =
                  e.type === 'fire'
                    ? {
                        ring: 'ring-orange-400/35',
                        glow: 'shadow-[0_0_20px_rgba(249,115,22,0.18)]',
                        bg: 'bg-gradient-to-br from-orange-500/10 to-transparent',
                        icon: 'text-orange-300',
                        bar: 'from-orange-400 to-red-500',
                        barShadow: 'shadow-[0_0_8px_rgba(249,115,22,0.6)]',
                        dot: 'bg-orange-400',
                      }
                    : e.type === 'person'
                    ? {
                        ring: 'ring-purple-400/35',
                        glow: 'shadow-[0_0_20px_rgba(168,85,247,0.18)]',
                        bg: 'bg-gradient-to-br from-purple-500/10 to-transparent',
                        icon: 'text-purple-300',
                        bar: 'from-purple-400 to-fuchsia-500',
                        barShadow: 'shadow-[0_0_8px_rgba(168,85,247,0.6)]',
                        dot: 'bg-purple-400',
                      }
                    : {
                        ring: 'ring-yellow-400/35',
                        glow: 'shadow-[0_0_20px_rgba(234,179,8,0.18)]',
                        bg: 'bg-gradient-to-br from-yellow-500/10 to-transparent',
                        icon: 'text-yellow-300',
                        bar: 'from-yellow-400 to-amber-500',
                        barShadow: 'shadow-[0_0_8px_rgba(234,179,8,0.6)]',
                        dot: 'bg-yellow-400',
                      };
                return (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className={cn(
                      'group relative rounded-2xl ring-1 p-3.5 flex gap-3 transition-all hover:ring-cyan-300/50',
                      palette.ring,
                      palette.glow,
                      palette.bg
                    )}
                  >
                    {/* Live dot */}
                    <span className={cn(
                      'absolute top-3 right-3 w-1.5 h-1.5 rounded-full animate-pulse',
                      palette.dot
                    )} />

                    <div className="w-11 h-11 rounded-xl bg-slate-950/70 ring-1 ring-cyan-500/15 flex items-center justify-center flex-shrink-0 relative">
                      <Icon className={cn('w-5 h-5', palette.icon)} />
                      <div className="absolute inset-0 rounded-xl ring-1 ring-cyan-300/0 group-hover:ring-cyan-300/40 transition-all" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 pr-3">
                        <span className="text-sm font-black text-white tracking-tight truncate">{e.label}</span>
                        <span className="label-hud text-slate-400 flex-shrink-0">{e.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {t('liveMap.autoCapture')}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1 w-full rounded-full bg-slate-800/80 overflow-hidden">
                          <motion.div
                            className={cn(
                              'h-full bg-gradient-to-r',
                              palette.bar,
                              palette.barShadow
                            )}
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                          />
                        </div>
                        <span className="label-hud text-slate-500 flex-shrink-0">HD</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="relative mt-6 pt-6 border-t border-cyan-500/15">
              <div className="grid grid-cols-3 gap-2 text-center">
                {statLabels.map((s) => (
                  <div key={s.l} className="rounded-xl bg-slate-950/40 ring-1 ring-cyan-500/10 px-2 py-2.5">
                    <div className="text-lg font-black gradient-text leading-none">{s.v}</div>
                    <div className="label-hud text-slate-500 mt-1">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
