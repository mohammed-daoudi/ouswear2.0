import mongoose, { Schema, Document, Model } from 'mongoose';
import type { Product as ProductType, ProductVariant } from '@/lib/types';
import { mockDb } from '@/lib/mock-db';

const VariantSchema = new Schema({
  name: { type: String, required: true }, // e.g., "Color", "Size"
  value: { type: String, required: true }, // e.g., "Red", "Large"
  price: { type: Number }, // Optional price override
  stock: { type: Number }, // Optional stock override
  modelUrl: { type: String }, // Optional 3D model URL for this variant
});

interface ProductDocument extends Omit<ProductType, '_id'>, Document {}

const ProductSchema = new Schema<ProductDocument>({
  title: { 
    type: String, 
    required: [true, 'Product title is required'],
    trim: true,
  },
  slug: { 
    type: String, 
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true,
  },
  description: { 
    type: String, 
    required: [true, 'Product description is required'],
  },
  price: { 
    type: Number, 
    required: [true, 'Product price is required'],
    min: 0,
  },
  currency: { 
    type: String, 
    default: 'USD',
  },
  images: [{ 
    type: String, 
    required: true,
  }],
  models: [{ 
    type: String, // URLs to GLB/GLTF files
  }],
  variants: [VariantSchema],
  stock: { 
    type: Number, 
    required: true,
    min: 0,
    default: 0,
  },
  tags: [{ 
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

// Indexes for better performance
ProductSchema.index({ slug: 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ createdAt: -1 });

// Generate slug from title if not provided
ProductSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Use mock database in development when MongoDB is not available
const USE_MOCK_DB = !process.env.MONGODB_URI || process.env.NODE_ENV === 'development';

let Product: any;

if (USE_MOCK_DB) {
  // Use mock database
  Product = {
    find: (query?: any) => mockDb.getModel('Product').find(query),
    findOne: (query: any) => mockDb.getModel('Product').findOne(query),
    findById: (id: string) => mockDb.getModel('Product').findById(id),
    create: (data: any) => mockDb.getModel('Product').create(data),
    countDocuments: (query?: any) => mockDb.getModel('Product').countDocuments(query),
  };
} else {
  // Use MongoDB
  Product = mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);
}

export default Product;
export type { ProductDocument };