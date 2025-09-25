'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  LogIn, 
  LogOut,
  Settings 
} from 'lucide-react';

export function Navbar() {
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-aura-gradient rounded-lg"
            />
            <span className="text-2xl font-heavy text-white">Ouswear</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-white/70 hover:text-white">
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-brand-auraRed text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {/* User menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-white/70 hover:text-white p-2">
                <User className="w-6 h-6" />
                {session && (
                  <span className="hidden md:inline text-sm">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                )}
              </button>
              
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 glass-effect rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {session ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    {session.user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Admin</span>
                      </Link>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 py-4"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-white/70 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}