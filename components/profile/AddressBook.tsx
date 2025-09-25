'use client';

import { motion } from 'framer-motion';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';

// Mock data for demonstration
const mockAddresses = [
  {
    id: '1',
    name: 'Home',
    street: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    country: 'US',
    isDefault: true
  }
];

export function AddressBook() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Address Book</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-2 bg-aura-gradient text-white font-medium rounded-lg text-sm
                     hover:shadow-lg hover:shadow-brand-auraRed/25 transition-all duration-200
                     flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </motion.button>
      </div>

      {mockAddresses.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-white/30 mx-auto mb-3" />
          <p className="text-white/70">No addresses saved</p>
          <p className="text-white/50 text-sm">Add an address for faster checkout</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockAddresses.map((address) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center mt-1">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-medium">{address.name}</p>
                      {address.isDefault && (
                        <span className="px-2 py-1 bg-aura-gradient text-white text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-white/70 text-sm">{address.street}</p>
                    <p className="text-white/70 text-sm">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="text-white/70 text-sm">{address.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-white/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}