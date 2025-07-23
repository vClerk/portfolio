'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, ContactShadows } from '@react-three/drei';

interface SceneProps {
  children?: React.ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  controls?: boolean;
  environment?: boolean;
  shadows?: boolean;
}

export default function Scene({
  children,
  className = '',
  camera = { position: [0, 0, 5], fov: 75 },
  controls = true,
  shadows = true,
}: SceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={camera}
        shadows={shadows}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <pointLight position={[10, -10, 10]} intensity={0.3} color="#3b82f6" />
          
          {children}
          
          {shadows && <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={3} />}
          
          {controls && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={0}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}