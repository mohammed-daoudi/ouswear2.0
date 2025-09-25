'use client';

import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag, CreditCard, Truck } from 'lucide-react';
import Link from 'next/link';

export function CartSummary() {
  const { items, total: totalPrice, itemCount, clearCart } = useCart();

  const subtotal = totalPrice;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-white/70">
            <span>Items ({itemCount})</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-white/70">
            <span>Shipping</span>
            <span className={shipping === 0 ? 'text-green-400' : ''}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          
          <div className="flex justify-between text-white/70">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-white/10 pt-3">
            <div className="flex justify-between text-white font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {subtotal < 100 && (
          <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <Truck className="w-4 h-4" />
              <span>
                Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {items.length > 0 && (
        <div className="space-y-3">
          <Link href="/checkout">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-aura-gradient text-white font-bold rounded-lg
                       hover:shadow-lg hover:shadow-brand-auraRed/25 transition-all duration-200
                       flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Checkout
            </motion.button>
          </Link>

          <div className="flex gap-3">
            <Link href="/products" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 border border-white/20 text-white font-medium rounded-lg
                         hover:bg-white/10 transition-all duration-200
                         flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearCart}
              className="px-6 py-3 border border-red-500/30 text-red-400 font-medium rounded-lg
                       hover:bg-red-500/10 transition-all duration-200"
            >
              Clear Cart
            </motion.button>
          </div>
        </div>
      )}

      {/* Trust Badges */}
      <div className="glass-card p-4">
        <div className="text-center space-y-2">
          <p className="text-white/70 text-sm">Secure Checkout</p>
          <div className="flex items-center justify-center gap-4 text-white/50 text-xs">
            <span>🔒 SSL Encrypted</span>
            <span>💳 Secure Payment</span>
            <span>🚚 Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}