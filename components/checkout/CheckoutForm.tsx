'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import { CreditCard, MapPin, User, Mail, Lock } from 'lucide-react';
import type { Address } from '@/lib/types';

export function CheckoutForm() {
  const { data: session } = useSession();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState<Address>({
    name: session?.user?.name || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['name', 'street', 'city', 'state', 'zipCode'];
    const missing = required.filter(field => !shippingAddress[field as keyof Address]);
    
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.join(', ')}`);
      return false;
    }
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Create order
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          product: item.product,
          variant: item.variant,
          quantity: item.quantity,
          price: item.price
        })),
        total,
        shippingAddress
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Order placed successfully!');
        clearCart();
        
        // For now, just show success - in real app would integrate Stripe
        setTimeout(() => {
          window.location.href = `/orders/${data.order._id}?success=true`;
        }, 1000);
      } else {
        toast.error(data.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Information */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-auraRed/20 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-brand-auraRed" />
          </div>
          <h2 className="text-xl font-bold text-white">Shipping Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                name="name"
                required
                value={shippingAddress.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white
                         placeholder:text-white/50 focus:outline-none focus:border-brand-auraRed/50"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="email"
                value={session?.user?.email || ''}
                disabled
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white/70
                         placeholder:text-white/50 cursor-not-allowed"
                placeholder="Email address"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            name="street"
            required
            value={shippingAddress.street}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white
                     placeholder:text-white/50 focus:outline-none focus:border-brand-auraRed/50"
            placeholder="Enter your street address"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              City *
            </label>
            <input
              type="text"
              name="city"
              required
              value={shippingAddress.city}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white
                       placeholder:text-white/50 focus:outline-none focus:border-brand-auraRed/50"
              placeholder="City"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              State *
            </label>
            <select
              name="state"
              required
              value={shippingAddress.state}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white
                       focus:outline-none focus:border-brand-auraRed/50"
            >
              <option value="" className="bg-brand-black">Select State</option>
              <option value="CA" className="bg-brand-black">California</option>
              <option value="NY" className="bg-brand-black">New York</option>
              <option value="TX" className="bg-brand-black">Texas</option>
              <option value="FL" className="bg-brand-black">Florida</option>
              {/* Add more states as needed */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              ZIP Code *
            </label>
            <input
              type="text"
              name="zipCode"
              required
              value={shippingAddress.zipCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white
                       placeholder:text-white/50 focus:outline-none focus:border-brand-auraRed/50"
              placeholder="12345"
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Payment Method</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/20">
            <input
              type="radio"
              id="card"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-brand-auraRed focus:ring-brand-auraRed"
            />
            <label htmlFor="card" className="text-white font-medium">Credit Card</label>
          </div>

          {/* Placeholder for Stripe integration */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
              <Lock className="w-4 h-4" />
              <span>Secure Payment with Stripe</span>
            </div>
            <p className="text-white/70 text-sm">
              Payment processing will be integrated with Stripe for secure transactions.
              For demo purposes, clicking "Place Order" will create the order without payment.
            </p>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full py-4 bg-aura-gradient text-white font-bold text-lg rounded-lg
                 hover:shadow-lg hover:shadow-brand-auraRed/25 transition-all duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed
                 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
            Processing Order...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Place Order - ${total.toFixed(2)}
          </>
        )}
      </motion.button>
    </form>
  );
}