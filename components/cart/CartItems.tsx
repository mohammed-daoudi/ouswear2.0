'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, Trash2, Package } from 'lucide-react';
import Image from 'next/image';

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
        <p className="text-white/70 text-lg mb-2">Your cart is empty</p>
        <p className="text-white/50">Add some premium streetwear to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item, index) => {
          const itemKey = `${item.productId}-${item.variant?.value || 'default'}-${index}`;
          return (
            <motion.div
              key={itemKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-4">
                {/* Product Image */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white/10">
                  {item.product.images && item.product.images.length > 0 ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-white/50" />
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{item.product.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
                    {item.variant && (
                      <span className="px-2 py-1 bg-white/10 rounded">
                        {item.variant.name}: {item.variant.value}
                      </span>
                    )}
                  </div>
                  <p className="text-brand-auraRed font-bold">${item.price.toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </motion.button>

                  <span className="w-8 text-center text-white font-medium">{item.quantity}</span>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </motion.button>
                </div>

                {/* Remove Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeItem(item.productId)}
                  className="w-10 h-10 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </motion.button>
              </div>

              {/* Item Total */}
              <div className="flex justify-end mt-3 pt-3 border-t border-white/10">
                <p className="text-white/70">
                  <span className="text-white font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}