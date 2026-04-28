'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Cpu, 
  Battery, 
  Camera, 
  Wifi, 
  Gauge, 
  Box, 
  CircuitBoard, 
  HardDrive,
  Cog,
  Radio,
  Monitor,
  Smartphone,
  LucideIcon
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

interface Spec {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
}

interface SpecCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  specs: Spec[];
}

function SpecCard({ spec, index }: { spec: Spec; index: number }) {
  const IconComponent = spec.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className="group relative p-4 md:p-6 rounded-2xl bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 hover:ring-cyan-400/45 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)] transition-all duration-300"
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/15 ring-1 ring-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)] flex items-center justify-center shrink-0">
          <IconComponent className="w-6 h-6 text-cyan-300" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="label-hud text-slate-500 mb-1">{spec.label}</p>
          <p className="text-xl font-black font-display text-white mb-1">{spec.value}</p>
          <p className="text-sm text-slate-400">{spec.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryTab({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: SpecCategory; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const Icon = category.icon;
  
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2.5 md:py-4 rounded-xl transition-all duration-300
        ${isActive
          ? 'bg-gradient-to-br from-cyan-500/15 to-blue-600/10 ring-1 ring-cyan-400/45 text-white shadow-[0_0_18px_rgba(34,211,238,0.18)]'
          : 'bg-slate-900/60 ring-1 ring-cyan-500/15 text-slate-400 hover:text-cyan-100 hover:ring-cyan-400/35'
        }
      `}
    >
      <Icon className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-cyan-300' : ''}`} />
      <span className="font-black uppercase tracking-widest text-xs md:text-sm">{category.label}</span>

      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-xl ring-1 ring-cyan-400/55"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}

export function SpecsSection() {
  const { t } = useTranslations();
  const [activeCategory, setActiveCategory] = useState('hardware');

  const specCategories: SpecCategory[] = [
    {
      id: 'hardware',
      label: t('specs.categories.hardware'),
      icon: Cpu,
      specs: [
        { 
          icon: Box, 
          label: t('specs.hardware.dimensions.label'),
          value: t('specs.hardware.dimensions.value'),
          description: t('specs.hardware.dimensions.description')
        },
        { 
          icon: Gauge, 
          label: t('specs.hardware.weight.label'),
          value: t('specs.hardware.weight.value'),
          description: t('specs.hardware.weight.description')
        },
        { 
          icon: CircuitBoard, 
          label: t('specs.hardware.mainMcu.label'),
          value: t('specs.hardware.mainMcu.value'),
          description: t('specs.hardware.mainMcu.description')
        },
        { 
          icon: Cpu, 
          label: t('specs.hardware.motorController.label'),
          value: t('specs.hardware.motorController.value'),
          description: t('specs.hardware.motorController.description')
        },
        { 
          icon: HardDrive, 
          label: t('specs.hardware.aiAccelerator.label'),
          value: t('specs.hardware.aiAccelerator.value'),
          description: t('specs.hardware.aiAccelerator.description')
        },
        { 
          icon: Cog, 
          label: t('specs.hardware.motors.label'),
          value: t('specs.hardware.motors.value'),
          description: t('specs.hardware.motors.description')
        },
      ],
    },
    {
      id: 'performance',
      label: t('specs.categories.performance'),
      icon: Gauge,
      specs: [
        { 
          icon: Gauge, 
          label: t('specs.performance.maxSpeed.label'),
          value: t('specs.performance.maxSpeed.value'),
          description: t('specs.performance.maxSpeed.description')
        },
        { 
          icon: Battery, 
          label: t('specs.performance.battery.label'),
          value: t('specs.performance.battery.value'),
          description: t('specs.performance.battery.description')
        },
        { 
          icon: Battery, 
          label: t('specs.performance.runtime.label'),
          value: t('specs.performance.runtime.value'),
          description: t('specs.performance.runtime.description')
        },
        { 
          icon: Radio, 
          label: t('specs.performance.latency.label'),
          value: t('specs.performance.latency.value'),
          description: t('specs.performance.latency.description')
        },
        { 
          icon: Cpu, 
          label: t('specs.performance.aiProcessing.label'),
          value: t('specs.performance.aiProcessing.value'),
          description: t('specs.performance.aiProcessing.description')
        },
        { 
          icon: Gauge, 
          label: t('specs.performance.accuracy.label'),
          value: t('specs.performance.accuracy.value'),
          description: t('specs.performance.accuracy.description')
        },
      ],
    },
    {
      id: 'connectivity',
      label: t('specs.categories.connectivity'),
      icon: Wifi,
      specs: [
        { 
          icon: Wifi, 
          label: t('specs.connectivity.wifi.label'),
          value: t('specs.connectivity.wifi.value'),
          description: t('specs.connectivity.wifi.description')
        },
        { 
          icon: Radio, 
          label: t('specs.connectivity.cellular.label'),
          value: t('specs.connectivity.cellular.value'),
          description: t('specs.connectivity.cellular.description')
        },
        { 
          icon: Monitor, 
          label: t('specs.connectivity.videoStream.label'),
          value: t('specs.connectivity.videoStream.value'),
          description: t('specs.connectivity.videoStream.description')
        },
        { 
          icon: HardDrive, 
          label: t('specs.connectivity.cloud.label'),
          value: t('specs.connectivity.cloud.value'),
          description: t('specs.connectivity.cloud.description')
        },
        { 
          icon: Smartphone, 
          label: t('specs.connectivity.app.label'),
          value: t('specs.connectivity.app.value'),
          description: t('specs.connectivity.app.description')
        },
        { 
          icon: Cpu, 
          label: t('specs.connectivity.api.label'),
          value: t('specs.connectivity.api.value'),
          description: t('specs.connectivity.api.description')
        },
      ],
    },
    {
      id: 'camera',
      label: t('specs.categories.camera'),
      icon: Camera,
      specs: [
        { 
          icon: Camera, 
          label: t('specs.camera.mainCamera.label'),
          value: t('specs.camera.mainCamera.value'),
          description: t('specs.camera.mainCamera.description')
        },
        { 
          icon: Camera, 
          label: t('specs.camera.nightVision.label'),
          value: t('specs.camera.nightVision.value'),
          description: t('specs.camera.nightVision.description')
        },
        { 
          icon: Radio, 
          label: t('specs.camera.lidar.label'),
          value: t('specs.camera.lidar.value'),
          description: t('specs.camera.lidar.description')
        },
        { 
          icon: Gauge, 
          label: t('specs.camera.imu.label'),
          value: t('specs.camera.imu.value'),
          description: t('specs.camera.imu.description')
        },
        { 
          icon: Radio, 
          label: t('specs.camera.ultrasonic.label'),
          value: t('specs.camera.ultrasonic.value'),
          description: t('specs.camera.ultrasonic.description')
        },
        { 
          icon: CircuitBoard, 
          label: t('specs.camera.encoder.label'),
          value: t('specs.camera.encoder.value'),
          description: t('specs.camera.encoder.description')
        },
      ],
    },
  ];

  const currentCategory = specCategories.find(c => c.id === activeCategory)!;

  return (
    <section id="specs" className="section relative">
      {/* Background Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: Header & Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <div className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6">
              <Cog className="w-4 h-4 text-cyan-300 animate-spin-slow" />
              <span className="label-hud text-cyan-200">{t('specs.badge')}</span>
            </div>

            <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 leading-tight">
              {t('specs.title')} <span className="gradient-text">{t('specs.titleHighlight')}</span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
              {t('specs.description')}
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3">
              {specCategories.map((category) => (
                <CategoryTab
                  key={category.id}
                  category={category}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </div>

            {/* Visual Diagram Placeholder */}
            <motion.div
              className="mt-10 aspect-video rounded-2xl bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 shadow-[0_0_28px_rgba(34,211,238,0.1)] overflow-hidden hidden lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-blue-600/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-cyan-500/15 ring-1 ring-cyan-400/40 shadow-[0_0_18px_rgba(34,211,238,0.25)] flex items-center justify-center">
                    <Box className="w-10 h-10 text-cyan-300" />
                  </div>
                  <p className="text-white font-black font-display tracking-tight">{t('specs.diagramTitle')}</p>
                  <p className="label-hud text-slate-500 mt-1">{t('specs.diagramSubtitle')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Specs Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4"
              >
                {currentCategory.specs.map((spec, index) => (
                  <SpecCard key={spec.label} spec={spec} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md ring-1 ring-cyan-500/15 border border-dashed border-cyan-500/25"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/15 ring-1 ring-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.2)] flex items-center justify-center shrink-0">
                  <CircuitBoard className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <p className="font-black text-white mb-1 tracking-tight">{t('specs.software.title')}</p>
                  <p className="text-sm text-slate-400">
                    {t('specs.software.description')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
