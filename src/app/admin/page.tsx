'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, MessageSquare, Plus, Pencil, Trash2, Eye,
  CheckCircle2, X, Loader2,
  ToggleLeft, ToggleRight, Bot, RefreshCw,
  Search, ExternalLink, StickyNote,
  AlertCircle, Users, LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Product, Inquiry } from '@/lib/data-store';

// ── Helpers ───────────────────────────────────────────────────────────────

function fmt(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price);
}

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}

const STATUS_CONFIG = {
  new: { label: 'Mới', color: 'text-cyan-300 bg-cyan-500/10 ring-1 ring-cyan-400/35' },
  read: { label: 'Đã xem', color: 'text-yellow-300 bg-yellow-500/10 ring-1 ring-yellow-400/35' },
  replied: { label: 'Đã phản hồi', color: 'text-emerald-300 bg-emerald-500/10 ring-1 ring-emerald-400/35' },
};

// ── Product Form Modal ────────────────────────────────────────────────────

const EMPTY_PRODUCT = {
  name: '',
  shortDesc: '',
  description: '',
  price: '',
  priceSuffix: '/robot',
  category: 'robot' as const,
  badge: '',
  available: true,
  features: '',
};

function ProductFormModal({
  product,
  onClose,
  onSaved,
}: {
  product?: Product;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = Boolean(product);
  const [form, setForm] = useState(
    product
      ? {
          name: product.name,
          shortDesc: product.shortDesc,
          description: product.description,
          price: product.price === 0 ? '' : String(product.price),
          priceSuffix: product.priceSuffix,
          category: product.category,
          badge: product.badge ?? '',
          available: product.available,
          features: product.features.join('\n'),
        }
      : EMPTY_PRODUCT
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { setError('Tên sản phẩm không được trống'); return; }
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        price: form.price === '' ? 0 : Number(form.price.replace(/\D/g, '')),
        features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
      };
      const url = isEdit ? `/api/products/${product!.id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Lỗi lưu sản phẩm');
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95 }}
        className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl ring-1 ring-cyan-500/25 rounded-2xl shadow-[0_0_28px_rgba(34,211,238,0.18)] max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-slate-900/90 backdrop-blur-xl border-b border-cyan-500/15 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="heading-display text-lg text-white">
            {isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block label-hud text-cyan-200 mb-1.5">Tên sản phẩm *</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                placeholder="K-Patrol Basic"
              />
            </div>
            <div className="col-span-2">
              <label className="block label-hud text-cyan-200 mb-1.5">Mô tả ngắn</label>
              <input
                value={form.shortDesc}
                onChange={(e) => setForm((f) => ({ ...f, shortDesc: e.target.value }))}
                className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                placeholder="Robot tuần tra tự hành cơ bản..."
              />
            </div>
            <div className="col-span-2">
              <label className="block label-hud text-cyan-200 mb-1.5">Mô tả đầy đủ</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all resize-none"
              />
            </div>
            <div>
              <label className="block label-hud text-cyan-200 mb-1.5">Giá (VND, để trống = Liên hệ)</label>
              <input
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                placeholder="85000000"
              />
            </div>
            <div>
              <label className="block label-hud text-cyan-200 mb-1.5">Phụ chú giá</label>
              <input
                value={form.priceSuffix}
                onChange={(e) => setForm((f) => ({ ...f, priceSuffix: e.target.value }))}
                className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                placeholder="/robot"
              />
            </div>
            <div>
              <label className="block label-hud text-cyan-200 mb-1.5">Danh mục</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as any }))}
                className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
              >
                <option value="robot">Robot tuần tra</option>
                <option value="software">Phần mềm</option>
                <option value="service">Dịch vụ</option>
                <option value="hardware">Phần cứng</option>
              </select>
            </div>
            <div>
              <label className="block label-hud text-cyan-200 mb-1.5">Badge (tuỳ chọn)</label>
              <input
                value={form.badge}
                onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                placeholder="Phổ biến nhất"
              />
            </div>
            <div className="col-span-2">
              <label className="block label-hud text-cyan-200 mb-1.5">Tính năng (mỗi dòng 1 tính năng)</label>
              <textarea
                rows={6}
                value={form.features}
                onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all resize-none font-mono"
                placeholder="4 bánh Mecanum - di chuyển 8 hướng&#10;6 cảm biến ToF VL53L0X&#10;Camera HD 1080p"
              />
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <label className="text-sm text-slate-300">Hiển thị sản phẩm</label>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, available: !f.available }))}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all',
                  form.available
                    ? 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/35 shadow-[0_0_10px_rgba(52,211,153,0.25)]'
                    : 'bg-slate-800/60 text-slate-400 ring-1 ring-slate-600/40',
                )}
              >
                {form.available ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                {form.available ? 'Đang hiện' : 'Đã ẩn'}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-300 text-sm bg-red-950/40 ring-1 ring-red-500/30 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-slate-800/60 ring-1 ring-cyan-500/20 text-slate-300 hover:ring-cyan-400/40 hover:text-white transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isEdit ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ── Inquiry Detail Drawer ─────────────────────────────────────────────────

function InquiryDrawer({
  inquiry,
  onClose,
  onUpdate,
}: {
  inquiry: Inquiry;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [note, setNote] = useState(inquiry.note ?? '');
  const [saving, setSaving] = useState(false);

  async function updateStatus(status: Inquiry['status']) {
    await fetch(`/api/inquiries/${inquiry.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    onUpdate();
    onClose();
  }

  async function saveNote() {
    setSaving(true);
    await fetch(`/api/inquiries/${inquiry.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note }),
    });
    setSaving(false);
    onUpdate();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="w-full sm:max-w-lg bg-slate-900/90 backdrop-blur-xl ring-1 ring-cyan-500/25 sm:rounded-2xl shadow-[0_0_28px_rgba(34,211,238,0.18)] max-h-[85vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-slate-900/90 backdrop-blur-xl border-b border-cyan-500/15 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="heading-display text-base text-white">{inquiry.name}</h2>
            <p className="label-hud text-slate-500 mt-0.5">{relativeTime(inquiry.createdAt)}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Contact info */}
          <div className="grid grid-cols-2 gap-3 bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl p-4 text-sm">
            {[
              { label: 'Email', value: inquiry.email },
              { label: 'Điện thoại', value: inquiry.phone || '—' },
              { label: 'Công ty', value: inquiry.company || '—' },
              { label: 'Sản phẩm quan tâm', value: inquiry.productName || '—' },
              { label: 'Số lượng', value: inquiry.quantity ? `${inquiry.quantity} robot` : '—' },
              { label: 'Trạng thái', value: STATUS_CONFIG[inquiry.status].label },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="label-hud text-slate-500">{label}</p>
                <p className="text-white mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {/* Message */}
          <div>
            <p className="label-hud text-cyan-200 mb-2">Nội dung yêu cầu</p>
            <div className="bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl p-4 text-sm text-slate-200 whitespace-pre-wrap">
              {inquiry.message}
            </div>
          </div>

          {/* Note */}
          <div>
            <p className="label-hud text-cyan-200 mb-2">Ghi chú nội bộ</p>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ghi chú dành cho admin..."
              className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all resize-none"
            />
            <button
              onClick={saveNote}
              disabled={saving}
              className="mt-2 label-hud text-cyan-300 hover:text-cyan-200 flex items-center gap-1 disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <StickyNote className="w-3 h-3" />}
              Lưu ghi chú
            </button>
          </div>

          {/* Status actions */}
          <div className="flex gap-2 pt-2">
            {inquiry.status === 'new' && (
              <button
                onClick={() => updateStatus('read')}
                className="flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-yellow-500/10 ring-1 ring-yellow-400/35 text-yellow-300 hover:bg-yellow-500/20 hover:ring-yellow-400/55 transition-all flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                Đánh dấu đã xem
              </button>
            )}
            {inquiry.status !== 'replied' && (
              <button
                onClick={() => updateStatus('replied')}
                className="flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-emerald-500/10 ring-1 ring-emerald-400/35 text-emerald-300 hover:bg-emerald-500/20 hover:ring-emerald-400/55 shadow-[0_0_12px_rgba(52,211,153,0.2)] transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Đã phản hồi
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'products' | 'inquiries'>('inquiries');
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Products state
  const [editProduct, setEditProduct] = useState<Product | undefined>(undefined);
  const [showProductForm, setShowProductForm] = useState(false);

  // Inquiries state
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiryFilter, setInquiryFilter] = useState<'all' | Inquiry['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  }

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [prodRes, inqRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/inquiries'),
      ]);
      setProducts(await prodRes.json());
      setInquiries(await inqRes.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  async function toggleAvailable(p: Product) {
    await fetch(`/api/products/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available: !p.available }),
    });
    loadData();
  }

  async function deleteProduct(id: string) {
    if (!confirm('Xác nhận xóa sản phẩm này?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    loadData();
  }

  async function deleteInquiry(id: string) {
    if (!confirm('Xác nhận xóa yêu cầu này?')) return;
    await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    loadData();
  }

  const filteredInquiries = inquiries
    .filter((i) => (inquiryFilter === 'all' ? true : i.status === inquiryFilter))
    .filter((i) =>
      searchQuery
        ? i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (i.company ?? '').toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const stats = {
    products: products.length,
    activeProducts: products.filter((p) => p.available).length,
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter((i) => i.status === 'new').length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_4px_20px_rgba(34,211,238,0.08)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 rounded-xl flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.4)]">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="heading-display text-sm text-white">
                K-Patrol <span className="gradient-text">Admin</span>
              </h1>
              <p className="label-hud text-slate-500">Bảng quản trị</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-lg ring-1 ring-cyan-500/20 hover:ring-cyan-400/45 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-200 transition-all"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
            </button>
            <Link
              href="/"
              className="label-hud text-slate-400 hover:text-cyan-200 flex items-center gap-1 transition-colors px-2 py-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xem trang</span>
            </Link>
            <button
              onClick={handleLogout}
              className="label-hud text-slate-500 hover:text-red-300 flex items-center gap-1 transition-colors px-2 py-2"
              title="Đăng xuất"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 relative">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Tổng sản phẩm', value: stats.products, icon: Package, color: 'text-cyan-300' },
            { label: 'Đang hiển thị', value: stats.activeProducts, icon: Bot, color: 'text-emerald-300' },
            { label: 'Yêu cầu tư vấn', value: stats.totalInquiries, icon: Users, color: 'text-purple-300' },
            { label: 'Chờ phản hồi', value: stats.newInquiries, icon: AlertCircle, color: 'text-orange-300' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 shadow-[0_0_18px_rgba(34,211,238,0.08)] rounded-2xl p-4 flex items-center gap-3 hover:ring-cyan-400/40 transition-all"
            >
              <div className={cn('p-2.5 rounded-xl bg-slate-950/60 ring-1 ring-cyan-500/15', color)}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{value}</p>
                <p className="label-hud text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-900/60 ring-1 ring-cyan-500/20 p-1 rounded-xl w-fit">
          {([
            { key: 'inquiries', label: 'Yêu cầu tư vấn', icon: MessageSquare },
            { key: 'products', label: 'Sản phẩm', icon: Package },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200',
                tab === key
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white shadow-[0_0_16px_rgba(34,211,238,0.45)]'
                  : 'text-slate-400 hover:text-cyan-100',
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
              {key === 'inquiries' && stats.newInquiries > 0 && (
                <span className="ml-1 bg-orange-500 ring-1 ring-orange-300/50 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                  {stats.newInquiries}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── INQUIRIES TAB ── */}
        <AnimatePresence mode="wait">
          {tab === 'inquiries' && (
            <motion.div
              key="inquiries"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-300" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo tên, email..."
                    className="w-full bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition-all"
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {(['all', 'new', 'read', 'replied'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setInquiryFilter(s)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all',
                        inquiryFilter === s
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white shadow-[0_0_12px_rgba(34,211,238,0.45)]'
                          : 'bg-slate-900/60 ring-1 ring-cyan-500/20 text-slate-400 hover:text-cyan-100 hover:ring-cyan-400/40',
                      )}
                    >
                      {s === 'all' ? 'Tất cả' : STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 shadow-[0_0_18px_rgba(34,211,238,0.08)] rounded-2xl overflow-hidden">
                {filteredInquiries.length === 0 ? (
                  <div className="py-16 text-center text-slate-500">
                    <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Chưa có yêu cầu tư vấn nào</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-cyan-500/15 label-hud text-cyan-200 bg-slate-950/40">
                          <th className="text-left px-4 py-3">Khách hàng</th>
                          <th className="text-left px-4 py-3 hidden sm:table-cell">Sản phẩm</th>
                          <th className="text-left px-4 py-3 hidden md:table-cell">Thời gian</th>
                          <th className="text-center px-4 py-3">Trạng thái</th>
                          <th className="text-center px-4 py-3">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInquiries.map((inq) => (
                          <tr
                            key={inq.id}
                            className={cn(
                              'border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors cursor-pointer',
                              inq.status === 'new' && 'bg-cyan-950/20',
                            )}
                            onClick={() => setSelectedInquiry(inq)}
                          >
                            <td className="px-4 py-3">
                              <p className="font-black text-white tracking-tight">{inq.name}</p>
                              <p className="text-xs text-slate-400">{inq.email}</p>
                              {inq.company && <p className="text-xs text-slate-500">{inq.company}</p>}
                            </td>
                            <td className="px-4 py-3 text-slate-300 hidden sm:table-cell">
                              {inq.productName ?? <span className="text-slate-500">—</span>}
                              {inq.quantity && <p className="text-xs text-slate-500">SL: {inq.quantity}</p>}
                            </td>
                            <td className="px-4 py-3 text-slate-400 text-xs hidden md:table-cell">
                              {relativeTime(inq.createdAt)}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span
                                className={cn(
                                  'inline-flex items-center text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full',
                                  STATUS_CONFIG[inq.status].color,
                                )}
                              >
                                {STATUS_CONFIG[inq.status].label}
                              </span>
                            </td>
                            <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setSelectedInquiry(inq)}
                                  className="p-1.5 rounded-lg ring-1 ring-cyan-500/15 hover:ring-cyan-400/45 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-200 transition-all"
                                  title="Xem chi tiết"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteInquiry(inq.id)}
                                  className="p-1.5 rounded-lg ring-1 ring-red-500/15 hover:ring-red-400/45 hover:bg-red-500/10 text-slate-500 hover:text-red-300 transition-all"
                                  title="Xóa"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── PRODUCTS TAB ── */}
          {tab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <p className="label-hud text-cyan-200">{products.length} sản phẩm</p>
                <button
                  onClick={() => { setEditProduct(undefined); setShowProductForm(true); }}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Thêm sản phẩm
                </button>
              </div>

              <div className="bg-slate-900/70 backdrop-blur-xl ring-1 ring-cyan-500/20 shadow-[0_0_18px_rgba(34,211,238,0.08)] rounded-2xl overflow-hidden">
                {products.length === 0 ? (
                  <div className="py-16 text-center text-slate-500">
                    <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Chưa có sản phẩm nào</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-cyan-500/15 label-hud text-cyan-200 bg-slate-950/40">
                          <th className="text-left px-4 py-3">Sản phẩm</th>
                          <th className="text-right px-4 py-3 hidden sm:table-cell">Giá</th>
                          <th className="text-center px-4 py-3 hidden md:table-cell">Danh mục</th>
                          <th className="text-center px-4 py-3">Hiển thị</th>
                          <th className="text-center px-4 py-3">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p) => (
                          <tr
                            key={p.id}
                            className="border-b border-cyan-500/10 hover:bg-cyan-500/5 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-cyan-500/15 ring-1 ring-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.2)] rounded-xl flex items-center justify-center shrink-0">
                                  <Bot className="w-5 h-5 text-cyan-300" />
                                </div>
                                <div>
                                  <p className="font-black text-white tracking-tight">{p.name}</p>
                                  <p className="text-xs text-slate-400 line-clamp-1 max-w-xs">{p.shortDesc}</p>
                                </div>
                                {p.badge && (
                                  <span className="shrink-0 text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/35 px-2.5 py-0.5 rounded-full">
                                    {p.badge}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right text-white font-black hidden sm:table-cell">
                              {p.price === 0 ? (
                                <span className="gradient-text text-xs">{p.priceSuffix}</span>
                              ) : (
                                <span className="gradient-text">{fmt(p.price)} VND</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center hidden md:table-cell">
                              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-800/60 ring-1 ring-cyan-500/20 text-slate-300 px-2.5 py-1 rounded-full">
                                {p.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => toggleAvailable(p)}
                                className={cn(
                                  'inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full transition-all',
                                  p.available
                                    ? 'text-emerald-300 bg-emerald-500/10 ring-1 ring-emerald-400/35 hover:bg-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
                                    : 'text-slate-500 bg-slate-800/60 ring-1 ring-slate-600/40 hover:ring-slate-500/60',
                                )}
                              >
                                {p.available ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                                {p.available ? 'Hiện' : 'Ẩn'}
                              </button>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => { setEditProduct(p); setShowProductForm(true); }}
                                  className="p-1.5 rounded-lg ring-1 ring-cyan-500/15 hover:ring-cyan-400/45 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-200 transition-all"
                                  title="Chỉnh sửa"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteProduct(p.id)}
                                  className="p-1.5 rounded-lg ring-1 ring-red-500/15 hover:ring-red-400/45 hover:bg-red-500/10 text-slate-500 hover:text-red-300 transition-all"
                                  title="Xóa"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 bg-slate-900/60 ring-1 ring-cyan-500/20 rounded-2xl p-4">
                <Link
                  href="/products"
                  className="flex items-center gap-1.5 label-hud text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Xem trang sản phẩm công khai
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showProductForm && (
          <ProductFormModal
            product={editProduct}
            onClose={() => { setShowProductForm(false); setEditProduct(undefined); }}
            onSaved={loadData}
          />
        )}
        {selectedInquiry && (
          <InquiryDrawer
            inquiry={selectedInquiry}
            onClose={() => setSelectedInquiry(null)}
            onUpdate={loadData}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
