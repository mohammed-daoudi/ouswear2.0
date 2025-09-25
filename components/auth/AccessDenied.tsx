'use client';

import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function AccessDenied() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <div className="glass-card p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-red-400" />
        </div>
        
        <h2 className="text-2xl font-heavy text-white mb-4">
          Access Denied
        </h2>
        
        <p className="text-white/70 mb-6">
          You don't have permission to access this page. Admin privileges are required.
        </p>
        
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg
                       border border-white/20 transition-all duration-200
                       flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}