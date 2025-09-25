'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { LoginPrompt } from '@/components/auth/LoginPrompt';
import { AccessDenied } from '@/components/auth/AccessDenied';

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/10 rounded w-1/3"></div>
          <div className="h-64 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <LoginPrompt />;
  }

  // Check if user has admin role
  if (session.user?.role !== 'admin') {
    return <AccessDenied />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <AdminDashboard />
    </motion.div>
  );
}