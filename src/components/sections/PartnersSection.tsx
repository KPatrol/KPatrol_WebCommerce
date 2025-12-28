'use client';

import { motion } from 'framer-motion';
import { Award, Building, Shield, Zap } from 'lucide-react';

const partners = [
  { name: 'Vingroup', logo: 'V' },
  { name: 'FPT', logo: 'F' },
  { name: 'VinAI', logo: 'VA' },
  { name: 'VNPT', logo: 'VN' },
  { name: 'Viettel', logo: 'VT' },
  { name: 'Samsung', logo: 'S' },
  { name: 'Intel', logo: 'I' },
  { name: 'NVIDIA', logo: 'N' },
  { name: 'Cisco', logo: 'C' },
  { name: 'Microsoft', logo: 'M' },
];

const certifications = [
  { 
    icon: Shield, 
    title: 'ISO 27001',
    description: 'Chứng nhận an toàn thông tin',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    icon: Award, 
    title: 'CE Marking',
    description: 'Tiêu chuẩn châu Âu',
    color: 'from-blue-500 to-indigo-500'
  },
  { 
    icon: Building, 
    title: 'Made in Vietnam',
    description: 'Sản xuất tại Việt Nam',
    color: 'from-red-500 to-orange-500'
  },
  { 
    icon: Zap, 
    title: 'RoHS Compliant',
    description: 'Thân thiện môi trường',
    color: 'from-yellow-500 to-amber-500'
  },
];

export function PartnersSection() {
  return (
    <section className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Đối tác & <span className="text-gradient">Chứng nhận</span>
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            Được tin dùng bởi các doanh nghiệp hàng đầu và đạt các chứng nhận quốc tế.
          </p>
        </motion.div>

        {/* Partner Logos - Infinite Scroll */}
        <div className="relative mb-20">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-900 to-transparent z-10" />
          
          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: [0, -50 * partners.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 20,
                  ease: 'linear',
                },
              }}
              className="flex gap-8"
            >
              {/* Double the partners for seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 w-40 h-20 rounded-xl glass border border-white/5 flex items-center justify-center hover:border-kpatrol-500/30 transition-all group"
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-kpatrol-500/20 to-accent-500/20 flex items-center justify-center text-lg font-bold text-kpatrol-400 group-hover:scale-110 transition-transform">
                      {partner.logo}
                    </div>
                    <span className="text-xs text-dark-500 group-hover:text-dark-400 transition-colors">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all text-center"
            >
              <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${cert.color} p-0.5 mb-4`}>
                <div className="w-full h-full rounded-xl bg-dark-900 flex items-center justify-center">
                  <cert.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h4 className="font-semibold text-white mb-1">{cert.title}</h4>
              <p className="text-sm text-dark-500">{cert.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-dark-500 text-sm mb-4">Thanh toán an toàn với</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {['VISA', 'Mastercard', 'MoMo', 'ZaloPay', 'VNPay'].map((payment) => (
              <div
                key={payment}
                className="px-4 py-2 rounded-lg bg-dark-800/50 border border-white/5 text-sm text-dark-400"
              >
                {payment}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
