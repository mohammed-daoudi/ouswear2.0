'use client';

import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { Package, Truck, Shield } from 'lucide-react';
import Image from 'next/image';

export function OrderSummary() {
  const { items, total } = useCart();

  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
        
        <div className="space-y-4 mb-6">
          {items.map((item, index) => (
            <motion.div
              key={`${item.productId}-${item.variant?.value || 'default'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              {/* Product Image */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                {item.product.images && item.product.images.length > 0 ? (
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-white/50" />
                  </div>
                )}
                
                {/* Quantity Badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-auraRed rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {item.quantity}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{item.product.title}</h3>
                {item.variant && (
                  <p className="text-white/70 text-sm">
                    {item.variant.name}: {item.variant.value}
                  </p>
                )}
                <p className="text-white/50 text-sm">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>

              {/* Item Total */}
              <div className="text-right">
                <p className="text-white font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          <div className="flex justify-between text-white/70">
            <span>Subtotal ({items.length} item{items.length > 1 ? 's' : ''})</span>
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
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Free Shipping Notice */}
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

      {/* Security & Guarantees */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4">Order Protection</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
            <div>
              <div className="text-white font-medium">Secure Checkout</div>
              <div className="text-white/70 text-sm">SSL encrypted and secure</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <div className="text-white font-medium">Fast Delivery</div>
              <div className="text-white/70 text-sm">2-5 business days</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <div className="text-white font-medium">Quality Guaranteed</div>
              <div className="text-white/70 text-sm">Premium streetwear only</div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Info */}
      <div className="text-center text-white/50 text-sm">
        <p>Need help? Contact support@ouswear.com</p>
        <p className="mt-1">🔒 Your payment information is secure</p>
      </div>
    </div>
  );
}