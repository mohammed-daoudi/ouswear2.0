'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import type { Product } from '@/lib/types';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // Fetch featured/popular products
      const response = await fetch('/api/products?featured=true&limit=6');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heavy text-white mb-4">
            Featured Collection
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover our most popular caps, each designed with precision and crafted for style
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingSkeleton key={i} className="h-96" />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">No featured products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}