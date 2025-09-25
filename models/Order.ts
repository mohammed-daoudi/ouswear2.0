import mongoose, { Schema, Document, Model } from 'mongoose';
import type { Order as OrderType, OrderItem, Address } from '@/lib/types';

const AddressSchema = new Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true, default: 'US' },
});

const OrderItemSchema = new Schema({
  productId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true,
  },
  variant: {
    name: String,
    value: String,
  },
  quantity: { 
    type: Number, 
    required: true,
    min: 1,
  },
  price: { 
    type: Number, 
    required: true,
    min: 0,
  },
});

interface OrderDocument extends Omit<OrderType, '_id'>, Document {}

const OrderSchema = new Schema<OrderDocument>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
  items: [OrderItemSchema],
  total: { 
    type: Number, 
    required: true,
    min: 0,
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'canceled'],
    default: 'pending',
  },
  shippingAddress: { 
    type: AddressSchema, 
    required: true,
  },
  tracking: String,
  stripePaymentIntentId: String, // Stripe payment reference
}, {
  timestamps: true,
});

// Indexes for better performance
OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

const Order: Model<OrderDocument> = mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);

export default Order;
export type { OrderDocument };