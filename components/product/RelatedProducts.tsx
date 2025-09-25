'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/lib/types';

interface RelatedProductsProps {
  currentProduct: Product;
  limit?: number;
}

export function RelatedProducts({ currentProduct, limit = 4 }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedProducts();
  }, [currentProduct._id]);

  const fetchRelatedProducts = async () => {
    try {
      setLoading(true);
      
      // Create query parameters for related products
      const tags = currentProduct.tags.join(',');
      const response = await fetch(`/api/products?tags=${tags}&exclude=${currentProduct._id}&limit=${limit}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRelatedProducts(data.products || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch related products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-white/10 rounded-lg mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded" />
                  <div className="h-4 bg-white/10 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!relatedProducts.length) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Related Products
          </h2>
          <div className="glass-card p-8 text-center">
            <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 mb-4">No related products found</p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-aura-gradient text-white font-semibold rounded-lg
                         hover:shadow-lg hover:shadow-brand-auraRed/25 transition-all duration-200
                         flex items-center gap-2 mx-auto"
              >
                Browse All Products
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Related Products
          </h2>
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-white/20 text-white/70 hover:text-white 
                       hover:border-white/40 rounded-lg transition-all duration-200
                       flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-white/70 mb-6">
              Explore our full collection of premium streetwear
            </p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-aura-gradient text-white font-bold rounded-lg
                         hover:shadow-lg hover:shadow-brand-auraRed/25 transition-all duration-200
                         flex items-center gap-2 mx-auto"
              >
                <Package className="w-5 h-5" />
                Browse All Products
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}