import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — K-Patrol',
  description: 'Trang quản trị hệ thống K-Patrol Robot Security Platform.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
