'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Plus,
  Edit,
  Trash2,
  Search,
  Filter
} from 'lucide-react';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  tags: string[];
  slug: string;
  createdAt: string;
}

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const stats = [
    {
      title: 'Total Products',
      value: products.length.toString(),
      icon: Package,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Revenue',
      value: '$' + (products.reduce((sum, p) => sum + p.price, 0)).toFixed(2),
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Low Stock Items',
      value: products.filter(p => p.stock < 10).length.toString(),
      icon: ShoppingBag,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Active Users',
      value: '1', // Mock data
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const categories = ['streetwear', 'premium', 'limited', 'beanies', 'caps', 'snapback'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heavy text-white">Admin Dashboard</h1>
          <p className="text-white/70 mt-2">Manage your Ouswear store</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-aura-gradient text-white font-semibold rounded-lg
                     hover:shadow-lg hover:shadow-brand-auraRed/25 transition-all duration-200
                     flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Products Management */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Products</h2>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                          placeholder:text-white/50 focus:outline-none focus:border-brand-auraRed/50"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 bg-white/10 border border-white/20 rounded-lg text-white
                          focus:outline-none focus:border-brand-auraRed/50 appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category} className="bg-brand-black">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white/5 h-16 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Product</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Price</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Stock</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Category</th>
                  <th className="text-center py-3 px-4 text-white/70 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {product.images[0] ? (
                          <div className="w-12 h-12 bg-gradient-to-br from-brand-darkRed to-brand-crimson rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-white/50" />
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium">{product.title}</p>
                          <p className="text-white/50 text-sm">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white font-medium">${product.price}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock < 10 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : product.stock < 50
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {product.tags.length > 2 && (
                          <span className="px-2 py-1 bg-white/10 text-white/50 text-xs rounded">
                            +{product.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
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
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/70">No products found</p>
                <p className="text-white/50 text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}