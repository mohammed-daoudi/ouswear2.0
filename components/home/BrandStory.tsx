'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield } from 'lucide-react';

export function BrandStory() {
  const features = [
    {
      icon: Sparkles,
      title: 'Premium Materials',
      description: 'Crafted with the finest fabrics and materials for lasting comfort and style.',
    },
    {
      icon: Zap,
      title: '3D Technology',
      description: 'Experience our revolutionary 3D preview system before making your choice.',
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'Every piece is inspected and backed by our satisfaction guarantee.',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-darkRed/20 to-brand-crimson/20" />
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ff2b4a" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Story content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-brand-auraRed/20 text-brand-auraRed text-sm font-semibold rounded-full mb-4"
              >
                Our Story
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-5xl font-heavy text-white mb-6 leading-tight"
              >
                Redefining Streetwear 
                <span className="text-brand-auraRed"> Culture</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/70 leading-relaxed"
              >
                Born from the streets, elevated by technology. Ouswear represents a new generation 
                of streetwear that doesn't just follow trends – we create them. Every cap tells a 
                story, every design pushes boundaries.
              </motion.p>
            </div>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-auraRed/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-auraRed" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Image/visual element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square glass-effect rounded-2xl p-8 relative overflow-hidden">
              {/* Placeholder for brand imagery */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-auraRed/20 to-brand-crimson/20" />
              
              {/* Animated elements */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity }
                  }}
                  className="w-32 h-32 bg-gradient-to-br from-brand-auraRed to-brand-crimson rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-heavy text-2xl">O</span>
                </motion.div>
              </div>

              {/* Floating particles */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-brand-auraRed rounded-full opacity-40"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}