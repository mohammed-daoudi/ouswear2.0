'use client';

import { motion } from 'framer-motion';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCart } from '@/hooks/useCart';
import { redirect } from 'next/navigation';

export default function CheckoutPage() {
  const { itemCount } = useCart();

  // Redirect if cart is empty
  if (itemCount === 0) {
    redirect('/cart');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-heavy text-white mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <CheckoutForm />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </motion.div>
  );
}