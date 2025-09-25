'use client';

import { motion } from 'framer-motion';
import { CartItems } from '@/components/cart/CartItems';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

export default function CartPage() {
  const { items, total, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center">
          <h1 className="text-4xl font-heavy text-white mb-4">Your Cart is Empty</h1>
          <p className="text-white/70 mb-8">Add some items to get started</p>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-heavy text-white mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItems />
        </div>
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </motion.div>
  );
}