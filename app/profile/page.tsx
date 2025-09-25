'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { OrderHistory } from '@/components/profile/OrderHistory';
import { AddressBook } from '@/components/profile/AddressBook';
import { LoginPrompt } from '@/components/auth/LoginPrompt';

export default function ProfilePage() {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-heavy text-white mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileInfo />
          <div className="mt-8">
            <AddressBook />
          </div>
        </div>
        <div className="lg:col-span-2">
          <OrderHistory />
        </div>
      </div>
    </motion.div>
  );
}