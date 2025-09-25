'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag, Heart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import type { Product, ProductVariant } from '@/lib/types';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const price = selectedVariant?.price || product.price;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    toast.success(`Added ${quantity}x ${product.title} to cart!`);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <div className="space-y-8">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-3xl md:text-4xl font-heavy text-white mb-4">
          {product.title}
        </h1>
        
        {/* Rating */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-white/30'
                }`}
              />
            ))}
          </div>
          <span className="text-white/70 text-sm">(42 reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-white">${price.toFixed(2)}</span>
          {selectedVariant?.price && selectedVariant.price !== product.price && (
            <span className="text-lg text-white/50 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-4">Description</h3>
        <p className="text-white/70 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            {product.variants[0].name}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {product.variants.map((variant) => (
              <motion.button
                key={variant._id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedVariant(variant)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedVariant?._id === variant._id
                    ? 'border-brand-auraRed bg-brand-auraRed/20 text-white'
                    : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:text-white'
                }`}
              >
                <span className="font-medium">{variant.value}</span>
                {variant.price && variant.price !== product.price && (
                  <div className="text-sm text-brand-auraRed font-medium">
                    ${variant.price.toFixed(2)}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Actions */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">Quantity:</span>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="text-white font-bold">−</span>
              </motion.button>
              <span className="w-12 text-center text-white font-bold">{quantity}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="text-white font-bold">+</span>
              </motion.button>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-white/70 text-sm">Stock</div>
            <div className="text-white font-bold">{selectedVariant?.stock || product.stock} units</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 py-4 bg-aura-gradient text-white font-bold rounded-lg
                     hover:shadow-lg hover:shadow-brand-auraRed/25 transition-all duration-200
                     flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFavorite}
            className={`w-16 h-16 rounded-lg border flex items-center justify-center transition-all ${
              isFavorited
                ? 'border-red-500 bg-red-500/20 text-red-400'
                : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:text-white'
            }`}
          >
            <Heart className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
      </div>

      {/* Features */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4">Features</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-brand-auraRed flex-shrink-0" />
            <div>
              <div className="text-white font-medium">Free Shipping</div>
              <div className="text-white/70 text-sm">On orders over $100</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-brand-auraRed flex-shrink-0" />
            <div>
              <div className="text-white font-medium">Authentic Guarantee</div>
              <div className="text-white/70 text-sm">100% genuine streetwear</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-brand-auraRed flex-shrink-0" />
            <div>
              <div className="text-white font-medium">Easy Returns</div>
              <div className="text-white/70 text-sm">30-day return policy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 text-white/70 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}