'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[App Error]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>
      <div className="relative text-center space-y-6 px-6">
        <div className="text-6xl">⚠️</div>
        <h2 className="heading-display text-2xl md:text-3xl">Đã xảy ra lỗi</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Có lỗi không mong muốn xảy ra. Vui lòng thử lại.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-br from-cyan-500 to-blue-600 ring-1 ring-cyan-300/40 text-white font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_18px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] hover:scale-[1.02]"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
