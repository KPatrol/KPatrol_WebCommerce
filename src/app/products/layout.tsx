import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sản phẩm Robot Tuần tra — K-Patrol',
  description:
    'Khám phá dòng robot bảo vệ tự hành K-Patrol với AI nhận diện đe dọa, định hướng LiDAR và giám sát 24/7. Lựa chọn gói phù hợp cho doanh nghiệp của bạn.',
  keywords: [
    'robot tuần tra',
    'robot bảo vệ',
    'K-Patrol',
    'an ninh tự động',
    'robot AI',
    'bảo vệ kho bãi',
  ],
  openGraph: {
    title: 'Sản phẩm K-Patrol | Robot Bảo vệ Thông minh',
    description:
      'Giải pháp an ninh tự động hóa với robot tuần tra K-Patrol. LiDAR, AI nhận diện mối đe dọa, điều khiển từ xa.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
