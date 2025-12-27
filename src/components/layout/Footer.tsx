import Link from 'next/link';
import { Bot, Mail, Phone, MapPin, Github, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-400" />
              </div>
              <span className="text-xl font-bold font-display">K-Patrol</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Giải pháp robot tuần tra thông minh tích hợp AIoT cho doanh nghiệp và hộ gia đình.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Youtube className="w-5 h-5" />} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-primary-400 transition-colors">K-Patrol Bot</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Mobile App</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Web Dashboard</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">API & SDK</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Tài liệu</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Hướng dẫn sử dụng</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Bảo hành</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-500" />
                <span>contact@kpatrol.io</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-500" />
                <span>+84 123 456 789</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-500 mt-1" />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 K-Patrol. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-primary-400 transition-colors">Điều khoản</Link>
            <Link href="#" className="hover:text-primary-400 transition-colors">Bảo mật</Link>
            <Link href="#" className="hover:text-primary-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary-500/20 hover:text-primary-400 transition-all"
    >
      {icon}
    </Link>
  );
}
