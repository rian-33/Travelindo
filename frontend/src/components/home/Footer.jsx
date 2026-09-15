import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { scrollReveal } from '@/lib/motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const footerLinks = {
  jelajahi: [
    { label: 'Destinasi', href: '/destinations' },
    { label: 'Kuliner', href: '/culinary' },
    { label: 'Penginapan', href: '/hotels' },
    { label: 'Promo', href: '/promo' },
  ],
  bantuan: [
    { label: 'Pusat Bantuan', href: '/help' },
    { label: 'Kebijakan Privasi', href: '/privacy' },
    { label: 'Syarat & Ketentuan', href: '/terms' },
    { label: 'Kebijakan Cookie', href: '/cookies' },
  ],
  perusahaan: [
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Karir', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Mitra', href: '/partners' },
  ],
  legal: [
    { label: 'Privasi', href: '/privacy' },
    { label: 'Syarat', href: '/terms' },
    { label: 'Cookie', href: '/cookies' },
    { label: 'Aksesibilitas', href: '/accessibility' },
  ],
};

const SocialIcons = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.724-3.317.922-6.177-7.02-7.23 8.15-3.31-.92 8.5-9.724-7.247-8.26H3.076l7.263 8.3 2.295-2.598-5.528-6.32 7.735-.984 2.795 3.16L5.79 2.25h3.239l-1.887 2.177 5.223 5.98-1.223 6.206 2.133.977L20.93 2.25h-2.686z" />
    </svg>
  ),
  Youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.506 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

const socialLinks = [
  { icon: SocialIcons.Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: SocialIcons.Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: SocialIcons.Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: SocialIcons.Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-surface-muted border-t border-border relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%27')] bg-cover" />

      {/* Top decorative line */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center">
                <svg className="w-7 h-7 text-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold font-serif text-text-primary">
                  Trave<span className="text-brand-primary">Lindo</span>
                </span>
                <p className="text-xs text-text-muted font-medium uppercase">Your Travel Partner</p>
              </div>
            </Link>

            <p className="text-text-secondary text-sm mb-6 leading-relaxed max-w-xs">
              Platform perencanaan perjalanan terpercaya untuk mengeksplorasi keindahan tersembunyi Indonesia.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface-elevated border border-border flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary-light transition-all duration-300 group"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Columns */}
          {Object.entries(footerLinks).map(([key, links], index) => (
            <motion.nav
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              className="lg:col-span-1"
            >
              <h3 className="font-semibold text-text-primary mb-4 tracking-wide uppercase text-sm">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h3>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-text-secondary text-sm hover:text-brand-primary transition-colors flex items-center gap-2 group"
                    >
                      {link.label}
                      <motion.span
                        className="w-4 h-4 opacity-0 group-hover:opacity-100"
                        initial={{ x: -4 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <h3 className="font-semibold text-text-primary mb-4 tracking-wide uppercase text-sm">
              Newsletter
            </h3>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              Dapatkan inspirasi perjalanan, penawaran eksklusif, dan tips travel terbaru langsung di inbox Anda.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" aria-hidden="true" />
                <Input
                  type="email"
                  placeholder="email@anda.com"
                  className="pl-12"
                  label=""
                />
              </div>
              <Button type="submit" className="w-full" rightIcon={<Send className="w-4 h-4" />}>
                Berlangganan
              </Button>
              <p className="text-caption text-text-muted text-center">
                Tidak ada spam. Batalkan kapan saja.
              </p>
            </form>

            {/* Contact Info */}
            <div className="mt-10 pt-6 border-t border-border space-y-3">
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <MapPin className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <span>Jl. Sudirman No. 123, Jakarta Selatan</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <Phone className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <Mail className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <span>hello@travelindo.id</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} TraveLindo. Semua hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <Link to="/privacy" className="hover:text-brand-primary transition-colors">Kebijakan Privasi</Link>
            <Link to="/terms" className="hover:text-brand-primary transition-colors">Syarat & Ketentuan</Link>
            <Link to="/cookies" className="hover:text-brand-primary transition-colors">Cookie</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}