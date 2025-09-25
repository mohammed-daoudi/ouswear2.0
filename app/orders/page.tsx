'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { OrderList } from '@/components/order/OrderList';
import { LoginPrompt } from '@/components/auth/LoginPrompt';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-auraRed border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <Package className="w-16 h-16 text-white/30 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">View Your Orders</h1>
          <p className="text-white/70 mb-8">Sign in to view your order history and track your purchases</p>
          <LoginPrompt />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-heavy text-white mb-2">
              My Orders
            </h1>
            <p className="text-white/70">
              Track your purchases and view order history
            </p>
          </div>

          <Link href="/profile">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-white/20 text-white/70 hover:text-white 
                       hover:border-white/40 rounded-lg transition-all duration-200
                       flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Profile
            </motion.button>
          </Link>
        </div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <OrderList userId={session.user.id} />
        </motion.div>
      </div>
    </div>
  );
}