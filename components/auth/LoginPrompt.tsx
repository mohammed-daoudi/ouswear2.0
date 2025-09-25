'use client';

import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { LogIn, User } from 'lucide-react';

export function LoginPrompt() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <div className="glass-card p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-aura-gradient rounded-full flex items-center justify-center mx-auto mb-6">
          <User className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-2xl font-heavy text-white mb-4">
          Authentication Required
        </h2>
        
        <p className="text-white/70 mb-6">
          Please sign in to access this page and enjoy the full Ouswear experience.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signIn()}
          className="w-full px-6 py-3 bg-aura-gradient text-white font-semibold rounded-lg
                     hover:shadow-lg hover:shadow-brand-auraRed/25 transition-all duration-200
                     flex items-center justify-center gap-2"
        >
          <LogIn className="w-5 h-5" />
          Sign In
        </motion.button>
        
        <p className="text-white/50 text-sm mt-4">
          Don't have an account?{' '}
          <button
            onClick={() => signIn()}
            className="text-brand-auraRed hover:underline"
          >
            Create one now
          </button>
        </p>
      </div>
    </motion.div>
  );
}