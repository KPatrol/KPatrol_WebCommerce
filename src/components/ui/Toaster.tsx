'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          background: 'rgb(15 23 42)',
          border: '1px solid rgb(30 41 59)',
          color: 'rgb(226 232 240)',
        },
        className: 'notification-toast',
      }}
      theme="dark"
      richColors
      closeButton
      expand={false}
      duration={4000}
    />
  );
}
