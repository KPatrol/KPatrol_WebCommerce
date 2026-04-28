'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const { t, locale } = useTranslations();

  const quickMessages = locale === 'vi' ? [
    'Tôi muốn tư vấn về sản phẩm',
    'Giá bao nhiêu?',
    'Có demo không?',
    'Chính sách bảo hành như thế nào?',
  ] : [
    'I need product consultation',
    'What is the price?',
    'Is there a demo?',
    'What is the warranty policy?',
  ];

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white shadow-[0_0_22px_rgba(34,211,238,0.5)] hover:shadow-[0_0_32px_rgba(34,211,238,0.7)] flex items-center justify-center z-50 group transition-shadow"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : 500 
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[min(92vw,24rem)] max-h-[calc(100vh-2rem)] bg-slate-900/90 backdrop-blur-xl ring-1 ring-cyan-500/25 rounded-2xl shadow-[0_0_32px_rgba(34,211,238,0.2)] z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">K-Patrol Support</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    {locale === 'vi' ? 'Đang online' : 'Online'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  {/* Welcome Message */}
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-800/80 ring-1 ring-cyan-500/15 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                      <p className="text-sm text-white">
                        {locale === 'vi'
                          ? 'Xin chào! Tôi có thể giúp gì cho bạn?'
                          : 'Hello! How can I help you?'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {locale === 'vi' ? 'Vừa xong' : 'Just now'}
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 px-2 label-hud">
                      {locale === 'vi' ? 'Câu hỏi thường gặp:' : 'Quick questions:'}
                    </p>
                    {quickMessages.map((msg, i) => (
                      <button
                        key={i}
                        onClick={() => setMessage(msg)}
                        className="w-full text-left p-2 rounded-lg bg-slate-800/50 ring-1 ring-cyan-500/10 hover:bg-cyan-500/10 hover:ring-cyan-400/30 text-sm text-slate-300 hover:text-white transition-all"
                      >
                        {msg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-cyan-500/15">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={locale === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...'}
                      className="flex-1 px-4 py-2 rounded-lg bg-slate-800/80 ring-1 ring-cyan-500/15 text-white placeholder:text-slate-500 focus:outline-none focus:ring-cyan-400/50 text-sm transition-all"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && message.trim()) {
                          // Handle send message
                          setMessage('');
                        }
                      }}
                    />
                    <button
                      disabled={!message.trim()}
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 hover:shadow-[0_0_18px_rgba(34,211,238,0.55)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    {locale === 'vi'
                      ? 'Thời gian phản hồi trung bình: < 2 phút'
                      : 'Average response time: < 2 minutes'}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
