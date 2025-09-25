'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Edit } from 'lucide-react';

export function ProfileInfo() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Profile Information</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-aura-gradient rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white font-medium">{session.user.name}</p>
            <p className="text-white/50 text-sm">Full Name</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-white font-medium">{session.user.email}</p>
            <p className="text-white/50 text-sm">Email Address</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            session.user.role === 'admin' 
              ? 'bg-purple-500/20 border border-purple-500/30' 
              : 'bg-green-500/20 border border-green-500/30'
          }`}>
            <Shield className={`w-6 h-6 ${
              session.user.role === 'admin' ? 'text-purple-400' : 'text-green-400'
            }`} />
          </div>
          <div>
            <p className="text-white font-medium capitalize">{session.user.role}</p>
            <p className="text-white/50 text-sm">Account Type</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}