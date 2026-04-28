'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Cpu, Shield, Wifi, CheckCircle2, X, Send, Loader2,
  ChevronRight, Star, Tag, Phone, Mail, Building2, Package,
  MessageSquare, ArrowLeft, Info, Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/data-store';

// ── Formatters ─────────────────────────────────────────────────────────────

function formatPrice(price: number, suffix: string) {
  if (price === 0) return suffix;
  return (
    new Intl.NumberFormat('vi-VN').format(price) + ' VND' + ' ' + suffix
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Tất cả',
  robot: 'Robot tuần tra',
  software: 'Phần mềm',
  service: 'Dịch vụ',
  hardware: 'Phần cứng',
};

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  all: Bot,
  robot: Bot,
  software: Cpu,
  service: Shield,
  hardware: Wifi,
};

// ── Product Card ──────────────────────────────────────────────────────────

function ProductCard({
  product,
  onInquire,
}: {
  product: Product;
  onInquire: (product: Product) => void;
}) {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const visibleFeatures = showAllFeatures ? product.features : product.features.slice(0, 5);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'relative flex flex-col rounded-2xl ring-1 transition-all duration-300 overflow-hidden',
        'bg-slate-900/70 backdrop-blur-xl ring-cyan-500/20 hover:ring-cyan-400/45',
        'hover:shadow-[0_0_28px_rgba(34,211,238,0.18)]',
      )}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-[0_0_18px_rgba(34,211,238,0.55)]">
            {product.badge}
          </span>
        </div>
      )}

      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-slate-900/70 backdrop-blur-md ring-1 ring-cyan-500/25 text-cyan-200 label-hud px-2.5 py-1 rounded-full">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </span>
      </div>

      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20" />
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Inline SVG Robot illustration */}
        <svg viewBox="0 0 120 120" className="w-32 h-32 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Body */}
          <rect x="30" y="40" width="60" height="50" rx="8" fill="rgba(37,99,235,0.15)" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5"/>
          {/* Screen */}
          <rect x="38" y="48" width="44" height="28" rx="4" fill="rgba(15,23,42,0.8)" stroke="rgba(34,211,238,0.4)" strokeWidth="1"/>
          {/* Screen glow dots */}
          <circle cx="50" cy="60" r="3" fill="rgba(52,211,153,0.8)"/>
          <circle cx="60" cy="60" r="3" fill="rgba(52,211,153,0.4)"/>
          <circle cx="70" cy="60" r="3" fill="rgba(239,68,68,0.6)"/>
          {/* Antenna */}
          <line x1="60" y1="40" x2="60" y2="28" stroke="rgba(96,165,250,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="60" cy="25" r="4" fill="rgba(59,130,246,0.8)" />
          {/* Head */}
          <rect x="38" y="22" width="44" height="20" rx="6" fill="rgba(30,58,138,0.6)" stroke="rgba(96,165,250,0.4)" strokeWidth="1.5"/>
          {/* Eyes */}
          <circle cx="50" cy="32" r="5" fill="rgba(34,211,238,0.2)" stroke="rgba(34,211,238,0.7)" strokeWidth="1"/>
          <circle cx="50" cy="32" r="2.5" fill="rgba(34,211,238,0.9)"/>
          <circle cx="70" cy="32" r="5" fill="rgba(34,211,238,0.2)" stroke="rgba(34,211,238,0.7)" strokeWidth="1"/>
          <circle cx="70" cy="32" r="2.5" fill="rgba(34,211,238,0.9)"/>
          {/* Wheels */}
          <ellipse cx="38" cy="90" rx="9" ry="8" fill="rgba(15,23,42,0.9)" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5"/>
          <ellipse cx="82" cy="90" rx="9" ry="8" fill="rgba(15,23,42,0.9)" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5"/>
          <ellipse cx="38" cy="90" rx="4" ry="3.5" fill="rgba(59,130,246,0.4)"/>
          <ellipse cx="82" cy="90" rx="4" ry="3.5" fill="rgba(59,130,246,0.4)"/>
          {/* Sensors bottom */}
          <rect x="44" y="88" width="32" height="4" rx="2" fill="rgba(96,165,250,0.3)" stroke="rgba(96,165,250,0.3)" strokeWidth="0.5"/>
          {/* Side arms */}
          <rect x="16" y="52" width="14" height="8" rx="4" fill="rgba(37,99,235,0.3)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <rect x="90" y="52" width="14" height="8" rx="4" fill="rgba(37,99,235,0.3)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          {/* WiFi indicator */}
          <path d="M55 73 Q60 70 65 73" stroke="rgba(52,211,153,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M52 70 Q60 65 68 70" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="text-xl font-black text-white tracking-tight mb-1">{product.name}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{product.shortDesc}</p>
        </div>

        {/* Price */}
        <div className="py-3 border-y border-cyan-500/15">
          {product.price === 0 ? (
            <p className="text-lg font-black gradient-text">{product.priceSuffix}</p>
          ) : (
            <div>
              <p className="text-2xl font-black gradient-text">
                {new Intl.NumberFormat('vi-VN').format(product.price)}{' '}
                <span className="text-cyan-300 text-lg">VND</span>
              </p>
              <p className="label-hud text-slate-500 mt-0.5">{product.priceSuffix}</p>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2 flex-1">
          {visibleFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
          {product.features.length > 5 && (
            <button
              onClick={() => setShowAllFeatures((v) => !v)}
              className="text-cyan-300 label-hud hover:text-cyan-200 transition-colors flex items-center gap-1 pt-1"
            >
              {showAllFeatures
                ? 'Ẩn bớt'
                : `+ ${product.features.length - 5} tính năng khác`}
            </button>
          )}
        </ul>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onInquire(product)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300',
              'bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white',
              'shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02]',
            )}
          >
            <MessageSquare className="w-4 h-4" />
            Liên hệ tư vấn
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Inquiry Modal ─────────────────────────────────────────────────────────

function InquiryModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '1',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product && !form.message) {
      setForm((f) => ({
        ...f,
        message: `Tôi quan tâm đến sản phẩm ${product.name}. Vui lòng tư vấn thêm về giá và điều kiện triển khai.`,
      }));
    }
  }, [product]);

  if (!product) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity) || 1,
          productId: product!.id,
          productName: product!.name,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Lỗi gửi yêu cầu');
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message ?? 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-slate-900/90 backdrop-blur-xl ring-1 ring-cyan-500/25 rounded-2xl shadow-[0_0_28px_rgba(34,211,238,0.18)] overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-slate-900/90 backdrop-blur-xl border-b border-cyan-500/15 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">Yêu cầu tư vấn</h2>
              <p className="text-sm text-cyan-300 font-bold">{product.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-cyan-500/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 py-8 text-center"
              >
                <div className="w-16 h-16 bg-emerald-500/10 ring-1 ring-emerald-400/40 shadow-[0_0_18px_rgba(52,211,153,0.25)] rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-black tracking-tight text-white">Gửi thành công!</h3>
                <p className="text-slate-400 text-sm">
                  Chúng tôi đã nhận được yêu cầu tư vấn của bạn và sẽ liên hệ lại
                  trong vòng <strong className="text-white">24 giờ làm việc</strong>.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02]"
                >
                  Đóng
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs text-slate-400 mb-1.5">
                      Họ và tên <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Nguyễn Văn A"
                        className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs text-slate-400 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="email@company.com"
                      className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs text-slate-400 mb-1.5">Số điện thoại</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="0901 234 567"
                      className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs text-slate-400 mb-1.5">Công ty</label>
                    <input
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      placeholder="Tên công ty"
                      className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs text-slate-400 mb-1.5">Số lượng robot</label>
                    <input
                      type="number"
                      min="1"
                      value={form.quantity}
                      onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                      className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-slate-400 mb-1.5">
                      Nội dung yêu cầu <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-300 text-sm bg-red-950/40 ring-1 ring-red-500/30 rounded-xl px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black uppercase tracking-widest text-sm bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white disabled:opacity-60 transition-all shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02]"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {submitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
                </button>
                <p className="text-xs text-slate-500 text-center">
                  Chúng tôi cam kết phản hồi trong <strong className="text-slate-400">24 giờ làm việc</strong>
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Specs Table ───────────────────────────────────────────────────────────

function SpecsDrawer({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  if (!product) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="w-full sm:max-w-lg bg-slate-900/90 backdrop-blur-xl ring-1 ring-cyan-500/25 sm:rounded-2xl shadow-[0_0_28px_rgba(34,211,238,0.18)] max-h-[80vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-slate-900/90 backdrop-blur-xl border-b border-cyan-500/15 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight text-white">
              <span className="text-cyan-300">{product.name}</span> — Thông số kỹ thuật
            </h2>
            <button onClick={onClose} className="p-1.5 rounded-lg text-cyan-100 hover:text-white hover:bg-cyan-500/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            <div className="bg-slate-900/60 rounded-xl overflow-hidden ring-1 ring-cyan-500/15">
              {Object.entries(product.specs).map(([key, val], i) => (
                <div
                  key={key}
                  className={cn(
                    'flex items-start gap-4 px-4 py-3 text-sm',
                    i % 2 === 0 ? 'bg-transparent' : 'bg-cyan-500/5',
                  )}
                >
                  <span className="label-hud text-slate-500 shrink-0 w-40">{key}</span>
                  <span className="text-white font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [specsProduct, setSpecsProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered =
    activeCategory === 'all'
      ? products.filter((p) => p.available)
      : products.filter((p) => p.available && p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="cockpit-panel inline-flex items-center gap-2 px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-cyan-300" />
            <span className="label-hud text-cyan-200">Sản phẩm K-Patrol 2026</span>
          </div>
          <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
            Dòng sản phẩm{' '}
            <span className="gradient-text">Robot Tuần tra</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            Giải pháp robot tuần tra tự hành thông minh cho doanh nghiệp. Mỗi sản phẩm được{' '}
            <strong className="text-slate-200">tùy biến theo yêu cầu</strong> của từng khách hàng.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            {[
              { icon: Phone, text: '0822608286' },
              { icon: Mail, text: 'contact@kpatrol.khoavd.online' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-cyan-300" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/15">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] ?? Bot;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white shadow-[0_0_18px_rgba(34,211,238,0.45)]'
                    : 'bg-slate-900/60 ring-1 ring-cyan-500/20 text-slate-400 hover:text-cyan-100 hover:ring-cyan-400/45 hover:bg-cyan-500/5',
                )}
              >
                <Icon className="w-4 h-4" />
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-900/60 ring-1 ring-cyan-500/15 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-40 text-cyan-300" />
            <p className="label-hud">Không có sản phẩm nào trong danh mục này.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onInquire={setInquiryProduct}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Specs links row under each card */}
      {filtered.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            Object.keys(p.specs).length > 0 ? (
              <button
                key={p.id}
                onClick={() => setSpecsProduct(p)}
                className="flex items-center gap-1.5 label-hud text-slate-500 hover:text-cyan-200 transition-colors justify-center -mt-4"
              >
                <Info className="w-3.5 h-3.5" />
                Xem thông số kỹ thuật
              </button>
            ) : <div key={p.id} />
          ))}
        </div>
      )}

      {/* Note section */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 shadow-[0_0_28px_rgba(34,211,238,0.1)] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="shrink-0 w-12 h-12 bg-cyan-500/15 ring-1 ring-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)] rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-cyan-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-black tracking-tight mb-1">Sản phẩm tùy biến theo yêu cầu</h3>
            <p className="text-slate-400 text-sm">
              Mỗi robot K-Patrol được cấu hình và tùy biến riêng cho từng môi trường triển khai.
              Giá niêm yết là mức tham khảo — liên hệ để nhận báo giá chính xác theo nhu cầu thực tế.
            </p>
          </div>
          <button
            onClick={() => setInquiryProduct(products[0] ?? null)}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4" />
            Liên hệ ngay
          </button>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      {inquiryProduct && (
        <InquiryModal product={inquiryProduct} onClose={() => setInquiryProduct(null)} />
      )}
      {specsProduct && (
        <SpecsDrawer product={specsProduct} onClose={() => setSpecsProduct(null)} />
      )}
    </div>
  );
}
