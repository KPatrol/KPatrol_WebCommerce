'use client';

import { toast as sonnerToast } from 'sonner';

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
}

class NotificationService {
  success(options: ToastOptions | string) {
    const opts = typeof options === 'string' ? { description: options } : options;
    
    sonnerToast.success(opts.title || 'Success', {
      description: opts.description,
      duration: opts.duration || 4000,
      className: 'notification-success',
    });
  }

  error(options: ToastOptions | string) {
    const opts = typeof options === 'string' ? { description: options } : options;
    
    sonnerToast.error(opts.title || 'Error', {
      description: opts.description,
      duration: opts.duration || 5000,
      className: 'notification-error',
    });
  }

  warning(options: ToastOptions | string) {
    const opts = typeof options === 'string' ? { description: options } : options;
    
    sonnerToast.warning(opts.title || 'Warning', {
      description: opts.description,
      duration: opts.duration || 4000,
      className: 'notification-warning',
    });
  }

  info(options: ToastOptions | string) {
    const opts = typeof options === 'string' ? { description: options } : options;
    
    sonnerToast.info(opts.title || 'Info', {
      description: opts.description,
      duration: opts.duration || 4000,
      className: 'notification-info',
    });
  }

  loading(options: ToastOptions | string) {
    const opts = typeof options === 'string' ? { description: options } : options;
    
    return sonnerToast.loading(opts.title || 'Loading', {
      description: opts.description,
      className: 'notification-loading',
    });
  }

  promise<T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) {
    return sonnerToast.promise(promise, {
      loading,
      success,
      error,
      classNames: {
        loading: 'notification-loading',
        success: 'notification-success',
        error: 'notification-error',
      },
    });
  }

  dismiss(id?: string | number) {
    sonnerToast.dismiss(id);
  }
}

export const notification = new NotificationService();
