'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Instagram, Twitter, BookText as TikTok, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'New Arrivals', href: '/shop?sort=newest' },
      { name: 'Best Sellers', href: '/shop?sort=popularity' },
      { name: 'Sale', href: '/shop?category=sale' },
    ],
    support: [
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/ouswear' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/ouswear' },
    { name: 'TikTok', icon: TikTok, href: 'https://tiktok.com/@ouswear' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/ouswear' },
  ];

  return (
    <footer className="bg-brand-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* Brand section */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-aura-gradient rounded-lg"
              />
              <span className="text-2xl font-heavy text-white">Ouswear</span>
            </Link>
            <p className="text-white/70 text-sm mb-4 max-w-xs">
              Premium streetwear caps and accessories with cutting-edge 3D preview technology. 
              Top off your look. Own your vibe.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/70 hover:text-brand-auraRed transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links sections */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {links.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {links.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">Stay in the loop</h3>
            <p className="text-white/70 text-sm mb-4">
              Get the latest drops, exclusive releases, and style inspiration.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-brand-auraRed"
              />
              <button
                type="submit"
                className="btn-primary px-6 py-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            © {currentYear} Ouswear. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-white/70 text-sm">Powered by cutting-edge 3D technology</span>
          </div>
        </div>
      </div>
    </footer>
  );
}