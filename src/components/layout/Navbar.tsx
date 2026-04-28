'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Sparkles, Layers, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useTranslations } from '@/hooks/useTranslations';
import { useStore } from '@/store/useStore';

export function Navbar() {
  const { t } = useTranslations();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const viewMode = useStore((s) => s.viewMode);
  const setViewMode = useStore((s) => s.setViewMode);
  const isFull = viewMode === 'full';

  // Resolve hash links to work from any page
  const resolveHref = (href: string) => {
    if (href.startsWith('#') && !isHomePage) return `/${href}`;
    return href;
  };

  const navLinks = useMemo(() => {
    const links: { href: string; label: string }[] = [
      { href: '#live-map', label: t('nav.home') },
      { href: '#features', label: t('nav.features') },
    ];
    if (isFull) {
      links.push(
        { href: '#pricing', label: t('nav.pricing') },
        { href: '#faq', label: t('nav.faq') },
      );
    }
    links.push({ href: '#contact', label: t('nav.contact') });
    return links;
  }, [isFull, t]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "py-3 bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_0_24px_rgba(34,211,238,0.08)]"
            : "py-5 bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between gap-3 lg:gap-4">
            {/* Logo - Left */}
            <div className="flex-1 min-w-0 flex justify-start">
              <Link href="/" className="flex items-center group">
                <motion.div
                  className="relative h-10 md:h-12"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src="/logo.png"
                    alt="K-Patrol Ecosystem"
                    width={200}
                    height={58}
                    className="h-12 md:h-14 w-auto object-contain"
                    priority
                  />
                </motion.div>
              </Link>
            </div>

            {/* Desktop Nav - Centered */}
            <div className="hidden md:flex items-center gap-0.5 lg:gap-1 flex-shrink-0">
              {navLinks.map((link) => {
                const isActive = isHomePage && activeSection === link.href.replace('#', '');
                return (
                  <Link
                    key={link.href}
                    href={resolveHref(link.href)}
                    className={cn(
                      "relative px-2.5 lg:px-3.5 py-2 rounded-lg text-xs lg:text-[13px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap",
                      isActive
                        ? "text-cyan-200"
                        : "text-slate-400 hover:text-cyan-100"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg bg-cyan-500/10 ring-1 ring-cyan-400/40 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA Buttons - Right */}
            <div className="flex-1 min-w-0 flex justify-end items-center gap-2 lg:gap-3">
              <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
                <LanguageSwitcher />
                {isHomePage && (
                  <button
                    onClick={() => setViewMode(isFull ? 'lite' : 'full')}
                    className={cn(
                      'group relative h-10 w-10 rounded-xl flex items-center justify-center transition-all',
                      'bg-slate-900/60 backdrop-blur-md ring-1',
                      isFull
                        ? 'ring-cyan-400/55 text-white shadow-[0_0_18px_rgba(34,211,238,0.35)]'
                        : 'ring-cyan-500/20 text-cyan-100 hover:ring-cyan-400/55 hover:bg-cyan-500/10'
                    )}
                    aria-label={isFull ? 'Switch to lite view' : 'Switch to full view'}
                    title={isFull ? 'Chế độ rút gọn' : 'Chế độ đầy đủ (Pricing, FAQ, ...)'}
                  >
                    <motion.span
                      key={viewMode}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-center"
                    >
                      {isFull ? (
                        <LayoutGrid className="w-4 h-4" />
                      ) : (
                        <Layers className="w-4 h-4" />
                      )}
                    </motion.span>
                    {isFull && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                    )}
                  </button>
                )}
                <Link
                  href={resolveHref('#contact')}
                  className="group relative px-4 lg:px-5 py-2.5 rounded-xl text-xs lg:text-sm font-black uppercase tracking-wider text-white overflow-hidden ring-1 ring-cyan-300/40 whitespace-nowrap shrink-0"
                  style={{ boxShadow: '0 0 18px rgba(34, 211, 238, 0.4), 0 0 36px rgba(34, 211, 238, 0.18)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-cyan-400 to-blue-500" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                  <span className="relative flex items-center gap-1.5 whitespace-nowrap">
                    {t('nav.getStarted')}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden relative w-11 h-11 rounded-xl bg-slate-900/80 backdrop-blur-md ring-1 ring-cyan-500/30 text-cyan-200 hover:ring-cyan-400/60 hover:text-white transition-all flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-dark-950/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(85vw,320px)] bg-slate-950/95 backdrop-blur-xl border-l border-cyan-500/20 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  {/* <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image
                      src="/logo.png"
                      alt="K-Patrol"
                      width={140}
                      height={40}
                      className="h-9 w-auto object-contain"
                    />
                  </Link> */}
                  <button
                    className="w-10 h-10 rounded-xl bg-slate-900/80 ring-1 ring-cyan-500/30 text-cyan-200 hover:ring-cyan-400/60 transition-all flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={resolveHref(link.href)}
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 ring-1 ring-cyan-500/20 hover:ring-cyan-400/50 hover:bg-cyan-500/5 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="font-bold uppercase tracking-wider text-sm text-cyan-100">{link.label}</span>
                        <ChevronRight className="w-5 h-5 text-cyan-300/70" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/demo"
                    className="flex items-center justify-center gap-2 w-full p-4 rounded-xl bg-slate-900/60 ring-1 ring-cyan-500/25 text-cyan-100 font-bold uppercase tracking-wider text-sm text-center hover:ring-cyan-400/60 hover:bg-cyan-500/5 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Sparkles className="w-5 h-5 text-cyan-300" />
                    {t('nav.viewDemo')}
                  </Link>
                  <Link
                    href={resolveHref('#contact')}
                    className="block w-full p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-center font-black uppercase tracking-widest text-sm text-white shadow-[0_0_20px_rgba(34,211,238,0.45)]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.orderNow')}
                  </Link>
                </div>

                {/* Footer Info */}
                <div className="mt-8 p-4 rounded-xl bg-slate-900/60 ring-1 ring-cyan-500/20 text-center">
                  <p className="label-hud text-slate-400">{t('nav.hotlineSupport')}</p>
                  <p className="mt-1 text-lg font-bold text-cyan-300">0822608286</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
