'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Calendar, DollarSign, Truck, Filter, Search } from 'lucide-react';
import { OrderSummary } from './OrderSummary';
import type { Order } from '@/lib/types';

interface OrderListProps {
  userId?: string; // For customer view
  isAdmin?: boolean; // For admin view
}

export function OrderList({ userId, isAdmin = false }: OrderListProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [userId, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      let url = '/api/orders';
      if (userId) {
        url += `?userId=${userId}`;
      }
      if (statusFilter) {
        url += `${userId ? '&' : '?'}status=${statusFilter}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      order._id.toLowerCase().includes(searchLower) ||
      order.items.some(item => 
        item.product?.title.toLowerCase().includes(searchLower)
      )
    );
  });

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

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-2">
                <div className="h-5 bg-white/10 rounded w-32" />
                <div className="h-4 bg-white/10 rounded w-24" />
              </div>
              <div className="h-8 bg-white/10 rounded w-20" />
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded" />
              <div className="h-4 bg-white/10 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                        placeholder:text-white/50 focus:outline-none focus:border-brand-auraRed/50"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                        focus:outline-none focus:border-brand-auraRed/50 appearance-none min-w-[150px]"
            >
              <option value="" className="bg-brand-black">All Status</option>
              <option value="pending" className="bg-brand-black">Pending</option>
              <option value="confirmed" className="bg-brand-black">Confirmed</option>
              <option value="shipped" className="bg-brand-black">Shipped</option>
              <option value="delivered" className="bg-brand-black">Delivered</option>
              <option value="canceled" className="bg-brand-black">Canceled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/70 text-lg mb-2">No orders found</p>
          <p className="text-white/50">
            {statusFilter || searchTerm 
              ? "Try adjusting your filters or search terms"
              : "Your order history will appear here once you make a purchase"
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card p-4 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-aura-gradient rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        Order #{order._id.slice(-6)}
                      </h3>
                      <div className="flex items-center gap-4 text-white/70 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-white font-semibold">
                        <DollarSign className="w-4 h-4" />
                        ${order.total.toFixed(2)}
                      </div>
                      {order.tracking && (
                        <div className="flex items-center gap-1 text-white/70 text-sm">
                          <Truck className="w-3 h-3" />
                          <span>Tracking: {order.tracking.slice(-6)}</span>
                        </div>
                      )}
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <OrderSummary order={selectedOrder} />
              <div className="mt-4 text-center">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2 border border-white/20 text-white/70 hover:text-white 
                           hover:border-white/40 rounded-lg transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}