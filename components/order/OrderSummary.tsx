'use client';

import { motion } from 'framer-motion';
import { Calendar, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import type { Order } from '@/lib/types';

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-400" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-400" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Package className="w-5 h-5 text-white/50" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'shipped':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'canceled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-white/10 text-white/70 border-white/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      {/* Order Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Order #{order._id.slice(-6)}</h2>
          <div className="flex items-center gap-2 text-white/70 text-sm mt-1">
            <Calendar className="w-4 h-4" />
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="ml-2 capitalize">{order.status}</span>
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        <h3 className="font-semibold text-white">Items Ordered</h3>
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white/50" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">
                {item.product?.title || `Product ${item.productId}`}
              </p>
              {item.variant && (
                <p className="text-white/70 text-sm">
                  {item.variant.name}: {item.variant.value}
                </p>
              )}
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span>Qty: {item.quantity}</span>
                <span>•</span>
                <span>${item.price.toFixed(2)} each</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="border-t border-white/10 pt-4 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between text-white/70">
            <span>Subtotal</span>
            <span>${(order.total * 0.926).toFixed(2)}</span> {/* Approximate subtotal */}
          </div>
          <div className="flex justify-between text-white/70">
            <span>Tax</span>
            <span>${(order.total * 0.074).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Shipping</span>
            <span>{order.total > 100 ? 'FREE' : '$9.99'}</span>
          </div>
          <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="border-t border-white/10 pt-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-brand-auraRed flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-white mb-2">Shipping Address</h4>
            <div className="text-white/70 text-sm space-y-1">
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Info */}
      {order.tracking && (
        <div className="border-t border-white/10 pt-4 mt-4">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-brand-auraRed" />
            <div>
              <p className="text-white font-medium">Tracking Number</p>
              <p className="text-brand-auraRed font-mono text-sm">{order.tracking}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}