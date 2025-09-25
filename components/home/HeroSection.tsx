'use client';

import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

// Placeholder 3D model component - Replace with actual GLB loader
function Hero3DModel() {
  return (
    <mesh rotation={[0.2, 0, 0]}>
      <boxGeometry args={[2, 1, 2]} />
      <meshStandardMaterial color="#ff2b4a" metalness={0.7} roughness={0.2} />
    </mesh>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-darkRed to-brand-crimson" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-auraRed rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 glass-effect rounded-full"
            >
              <div className="w-2 h-2 bg-brand-auraRed rounded-full animate-pulse" />
              <span className="text-white/70 text-sm">New Collection Available</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-7xl font-heavy text-white leading-tight"
              >
                Top off your look.
                <motion.span
                  className="block bg-gradient-to-r from-brand-auraRed to-brand-crimson bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Own your vibe.
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/70 max-w-md leading-relaxed"
              >
                Experience the future of streetwear with our premium caps featuring 
                interactive 3D previews. Crafted for those who dare to be different.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/shop" className="group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <button className="group btn-secondary flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Story</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-8 pt-8 border-t border-white/10"
            >
              <div>
                <div className="text-2xl font-heavy text-white">50K+</div>
                <div className="text-white/70 text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-heavy text-white">200+</div>
                <div className="text-white/70 text-sm">Unique Designs</div>
              </div>
              <div>
                <div className="text-2xl font-heavy text-white">4.9★</div>
                <div className="text-white/70 text-sm">Average Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Model showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-auraRed/20 to-transparent rounded-2xl" />
            
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              className="rounded-2xl"
            >
              <Suspense fallback={null}>
                <Environment preset="studio" />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Hero3DModel />
                <OrbitControls 
                  enablePan={false} 
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={2}
                />
              </Suspense>
            </Canvas>

            {/* Floating UI elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 right-4 glass-effect px-4 py-2 rounded-lg"
            >
              <div className="text-white text-sm font-semibold">Interactive 3D</div>
              <div className="text-white/70 text-xs">Drag to rotate</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-4 left-4 glass-effect px-4 py-2 rounded-lg"
            >
              <div className="text-brand-auraRed text-sm font-semibold">$49.99</div>
              <div className="text-white/70 text-xs">Premium Quality</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}