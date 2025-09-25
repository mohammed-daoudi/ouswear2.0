'use client';

import { motion } from 'framer-motion';
import { Package, Calendar, DollarSign, Truck } from 'lucide-react';

// Mock data for demonstration
const mockOrders = [
  {
    id: '1',
    date: '2024-09-20',
    total: 89.99,
    status: 'delivered',
    items: [
      { name: 'Crimson Cap', quantity: 1, price: 89.99 }
    ]
  },
  {
    id: '2', 
    date: '2024-09-15',
    total: 124.99,
    status: 'shipped',
    items: [
      { name: 'Opium Snapback', quantity: 1, price: 124.99 }
    ]
  }
];

export function OrderHistory() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'shipped':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
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
      <h2 className="text-xl font-bold text-white mb-6">Order History</h2>

      {mockOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/70">No orders yet</p>
          <p className="text-white/50 text-sm">Your order history will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-aura-gradient rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Order #{order.id}</p>
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 text-white font-medium mb-1">
                    <DollarSign className="w-4 h-4" />
                    ${order.total}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3">
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-white/70">{item.name} x {item.quantity}</span>
                      <span className="text-white">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}