'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import type { Product } from '@/lib/types';

interface ProductViewer3DProps {
  product: Product;
  selectedVariant: number;
}

// 3D Model Component - Replace with actual GLTF loader
function Model3D({ url, ...props }: { url: string; [key: string]: any }) {
  const meshRef = useRef<any>();
  
  // Animate the model rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  // TODO: Replace with actual GLTF model loading
  // const { scene } = useGLTF(url);
  
  return (
    <mesh ref={meshRef} {...props}>
      <boxGeometry args={[2, 1, 2]} />
      <meshStandardMaterial 
        color="#ff2b4a" 
        metalness={0.8} 
        roughness={0.2}
        emissive="#8b0000"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-auraRed border-t-transparent rounded-full animate-spin"></div>
      </div>
    </Html>
  );
}

export function ProductViewer3D({ product, selectedVariant }: ProductViewer3DProps) {
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const controlsRef = useRef<any>();

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const modelUrl = product.variants[selectedVariant]?.modelUrl || product.models[0] || '/models/default-cap.glb';

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px]">
      {/* 3D Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full glass-effect rounded-2xl overflow-hidden relative"
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          className="w-full h-full"
          onCreated={({ gl }) => {
            gl.setClearColor('#1b0000', 0.1);
          }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            {/* Lighting */}
            <Environment preset="studio" />
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ff2b4a" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b0000" />
            
            {/* 3D Model */}
            <Model3D url={modelUrl} />
            
            {/* Controls */}
            <OrbitControls
              ref={controlsRef}
              enabled={controlsEnabled}
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI - Math.PI / 4}
            />
          </Suspense>
        </Canvas>

        {/* Floating UI Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetCamera}
            className="p-2 glass-effect rounded-lg text-white hover:text-brand-auraRed transition-colors"
            title="Reset view"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-4 glass-effect px-4 py-2 rounded-lg"
        >
          <p className="text-white/70 text-sm">
            <span className="text-brand-auraRed font-semibold">Drag</span> to rotate • 
            <span className="text-brand-auraRed font-semibold"> Scroll</span> to zoom
          </p>
        </motion.div>

        {/* Variant indicator */}
        {product.variants.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 left-4 glass-effect px-4 py-2 rounded-lg"
          >
            <p className="text-white text-sm">
              <span className="text-white/70">Viewing:</span>{' '}
              <span className="text-brand-auraRed font-semibold">
                {product.variants[selectedVariant]?.value || 'Default'}
              </span>
            </p>
          </motion.div>
        )}

        {/* Glow effect overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-auraRed/10 to-brand-crimson/10 pointer-events-none" />
      </motion.div>

      {/* 3D Model placeholder info */}
      <div className="mt-4 text-center text-white/50 text-sm">
        <p>
          💡 <strong>Dev Note:</strong> Replace Model3D component with actual GLB/GLTF loader using <code>useGLTF</code> hook
        </p>
        <p className="mt-1">
          Current model URL: <code className="text-brand-auraRed">{modelUrl}</code>
        </p>
      </div>
    </div>
  );
}