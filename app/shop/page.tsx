'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductFilters } from '@/components/shop/ProductFilters';
import { ProductSort } from '@/components/shop/ProductSort';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import type { Product } from '@/lib/types';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    category: '',
    sortBy: 'popularity'
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        minPrice: filters.priceRange[0].toString(),
        maxPrice: filters.priceRange[1].toString(),
        category: filters.category,
        sortBy: filters.sortBy,
      });
      
      const response = await fetch(`/api/products?${queryParams}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-heavy text-white mb-4">Shop Collection</h1>
        <p className="text-lg text-white/70">Discover our premium streetwear caps and accessories</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="glass-effect p-6 rounded-lg">
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-white/70">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
            <ProductSort 
              sortBy={filters.sortBy} 
              onSortChange={(sortBy) => setFilters(prev => ({ ...prev, sortBy }))} 
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <LoadingSkeleton key={i} className="h-80" />
              ))}
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}