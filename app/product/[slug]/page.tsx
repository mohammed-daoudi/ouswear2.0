'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { ProductViewer3D } from '@/components/product/ProductViewer3D';
import { ProductInfo } from '@/components/product/ProductInfo';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import type { Product } from '@/lib/types';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    if (params.slug) {
      fetchProduct(params.slug as string);
    }
  }, [params.slug]);

  const fetchProduct = async (slug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <LoadingSkeleton className="h-96 lg:h-[600px]" />
          <div className="space-y-4">
            <LoadingSkeleton className="h-8 w-3/4" />
            <LoadingSkeleton className="h-6 w-1/2" />
            <LoadingSkeleton className="h-24 w-full" />
            <LoadingSkeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-heavy text-white mb-4">Product Not Found</h1>
          <p className="text-white/70">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* 3D Product Viewer */}
        <div className="relative">
          <ProductViewer3D 
            product={product} 
            selectedVariant={selectedVariant}
          />
        </div>

        {/* Product Information */}
        <div>
          <ProductInfo 
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
          />
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product._id} category={product.tags[0]} />
    </motion.div>
  );
}