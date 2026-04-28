/**
 * Simple filesystem-based JSON data store for web-commerce.
 * Data is stored in /app/data/ (mountable Docker volume).
 */
import fs from 'fs';
import path from 'path';

// Use /app/data in production (Docker), ./data in development
const DATA_DIR =
  process.env.NODE_ENV === 'production'
    ? '/app/data'
    : path.join(process.cwd(), 'data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`);
}

export function readJSON<T>(name: string, defaultValue: T): T {
  ensureDir();
  const fp = filePath(name);
  if (!fs.existsSync(fp)) {
    writeJSON(name, defaultValue);
    return defaultValue;
  }
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf-8')) as T;
  } catch {
    return defaultValue;
  }
}

export function writeJSON<T>(name: string, data: T): void {
  ensureDir();
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2), 'utf-8');
}

// ── Product Types ─────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  price: number;         // VND
  priceSuffix: string;   // e.g. "/đơn vị", "/robot"
  currency: 'VND';
  category: 'robot' | 'software' | 'service' | 'hardware';
  images: string[];      // URL or /images/...
  features: string[];
  specs: Record<string, string>;
  badge?: string;        // e.g. "Phổ biến nhất", "Mới"
  available: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// ── Inquiry Types ─────────────────────────────────────────────────────────────

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  productId?: string;
  productName?: string;
  quantity?: number;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  note?: string;         // Admin internal note
}

// ── Default seed data ─────────────────────────────────────────────────────────

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'kpatrol-basic',
    name: 'K-Patrol Basic',
    shortDesc: 'Robot tuần tra tự hành cơ bản cho văn phòng và kho hàng nhỏ',
    description:
      'K-Patrol Basic là phiên bản khởi đầu của dòng robot tuần tra K-Patrol, phù hợp cho văn phòng, kho hàng nhỏ và không gian dưới 500m². Trang bị 4 bánh Mecanum, 6 cảm biến ToF và camera HD, robot có thể tự động tuần tra, phát hiện vật cản và cảnh báo real-time qua ứng dụng mobile.',
    price: 85_000_000,
    priceSuffix: '/robot',
    currency: 'VND',
    category: 'robot',
    images: ['/images/kpatrol-basic.png'],
    features: [
      '4 bánh Mecanum - di chuyển 8 hướng',
      '6 cảm biến ToF VL53L0X',
      'Camera HD 1080p',
      'Cảnh báo real-time qua app',
      'Pin 12V - hoạt động 4-6 giờ',
      'Radius tuần tra đến 500m²',
      'Điều khiển qua mobile PWA',
      'Hỗ trợ kỹ thuật 1 năm',
    ],
    specs: {
      'Kích thước': '350 × 300 × 180 mm',
      'Trọng lượng': '4.5 kg',
      'Tốc độ tối đa': '0.8 m/s',
      'Pin': 'LiPo 12V 10Ah',
      'Thời gian hoạt động': '4-6 giờ',
      'Camera': '1080p 120° FOV',
      'Cảm biến': '6× VL53L0X ToF',
      'IMU': 'BNO08x 9-DOF',
      'Kết nối': 'WiFi 2.4GHz + MQTT',
      'Điều khiển': 'Raspberry Pi 4B',
    },
    badge: undefined,
    available: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'kpatrol-pro',
    name: 'K-Patrol Professional',
    shortDesc: 'Robot tuần tra chuyên nghiệp với AI và Night Vision cho doanh nghiệp vừa',
    description:
      'K-Patrol Professional nâng cấp đầy đủ cho môi trường doanh nghiệp vừa với AI nhận diện bất thường, camera 4K Night Vision và khả năng tuần tra tự động đa tuyến đường. Tích hợp dashboard quản lý tập trung và báo cáo chi tiết.',
    price: 145_000_000,
    priceSuffix: '/robot',
    currency: 'VND',
    category: 'robot',
    images: ['/images/kpatrol-pro.png'],
    features: [
      'Tất cả tính năng Basic',
      'Camera 4K + Night Vision IR',
      'AI phát hiện chuyển động thông minh',
      'Tuần tra đa tuyến đường lập lịch',
      'Bản đồ không gian (SLAM cơ bản)',
      'Lưu trữ video 30 ngày',
      'Dashboard quản lý web',
      'Báo cáo PDF tự động',
      'Hỗ trợ 24/7 trong 2 năm',
    ],
    specs: {
      'Kích thước': '380 × 320 × 200 mm',
      'Trọng lượng': '5.2 kg',
      'Tốc độ tối đa': '1.0 m/s',
      'Pin': 'LiPo 12V 15Ah',
      'Thời gian hoạt động': '6-8 giờ',
      'Camera': '4K Night Vision 180° FOV',
      'Cảm biến': '6× VL53L0X ToF + LiDAR 2D',
      'IMU': 'BNO08x 9-DOF',
      'Kết nối': 'WiFi 5GHz + 4G LTE (tùy chọn)',
      'Điều khiển': 'Raspberry Pi 4B 8GB',
    },
    badge: 'Phổ biến nhất',
    available: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'kpatrol-enterprise',
    name: 'K-Patrol Enterprise',
    shortDesc: 'Giải pháp đội robot tuần tra cho tổ hợp công nghiệp và bệnh viện lớn',
    description:
      'K-Patrol Enterprise là giải pháp toàn diện cho các tổ hợp công nghiệp, trung tâm thương mại và bệnh viện lớn. Hỗ trợ triển khai đội nhiều robot tuần tra phối hợp, tích hợp hệ thống an ninh hiện có và tùy biến theo yêu cầu cụ thể của từng khách hàng.',
    price: 0,
    priceSuffix: '(Liên hệ báo giá)',
    currency: 'VND',
    category: 'robot',
    images: ['/images/kpatrol-enterprise.png'],
    features: [
      'Tất cả tính năng Professional',
      'Đội robot phối hợp (Fleet Management)',
      'Tích hợp hệ thống CCTV hiện có',
      'API mở tích hợp phần mềm bên thứ 3',
      'Customization theo yêu cầu',
      'SLA đảm bảo uptime 99.5%',
      'Đào tạo vận hành on-site',
      'Bảo trì định kỳ 3 tháng/lần',
      'Hỗ trợ kỹ thuật ưu tiên 3 năm',
    ],
    specs: {
      'Số lượng robot': 'Từ 3 robot trở lên',
      'Diện tích': 'Không giới hạn',
      'Kết nối': 'WiFi Enterprise + 4G/5G',
      'Dashboard': 'Web + Mobile + On-premise',
      'API': 'RESTful + MQTT + WebSocket',
      'Bảo mật': 'End-to-end encryption',
      'SLA': '99.5% uptime',
      'Triển khai': 'On-site 2-4 tuần',
    },
    badge: 'Doanh nghiệp',
    available: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'software-platform',
    name: 'K-Patrol Platform License',
    shortDesc: 'Gói phần mềm nền tảng quản lý robot đám mây hàng năm',
    description:
      'Nền tảng phần mềm K-Patrol Cloud cho phép quản lý tập trung toàn bộ đội robot, xem lịch sử tuần tra, xuất báo cáo và nhận cảnh báo đa kênh. Phù hợp cho khách hàng đã có hardware hoặc muốn tích hợp thêm.',
    price: 12_000_000,
    priceSuffix: '/năm/robot',
    currency: 'VND',
    category: 'software',
    images: ['/images/software-platform.png'],
    features: [
      'Dashboard web quản lý tập trung',
      'Mobile PWA điều khiển real-time',
      'Lịch sử tuần tra & báo cáo PDF',
      'Cảnh báo Zalo/Email/SMS',
      'API tích hợp bên thứ 3',
      'Lưu trữ cloud 90 ngày',
      'Phân quyền người dùng',
      'Cập nhật tính năng miễn phí',
    ],
    specs: {
      'Nền tảng': 'Cloud SaaS',
      'Hỗ trợ': 'Web + iOS + Android',
      'Uptime SLA': '99.9%',
      'Lưu trữ': '90 ngày/robot',
      'API': 'RESTful + WebSocket',
      'Cập nhật': 'Tự động hàng tháng',
    },
    badge: 'Mới',
    available: true,
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
