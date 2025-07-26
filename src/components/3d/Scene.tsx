'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import ErrorBoundary from '../ErrorBoundary';
import LoadingSpinner from '../LoadingSpinner';

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
  loadingText?: string;
}

export default function Scene({
  children,
  className = '',
  camera = { position: [0, 0, 5], fov: 75 },
  controls = true,
  shadows = true,
  loadingText = 'Loading 3D Scene...',
}: SceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <ErrorBoundary fallback={<LoadingSpinner text="3D Scene Error - Click retry" />}>
        <Canvas
          camera={camera}
          shadows={shadows}
          dpr={[1, 2]}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          onCreated={({ gl }) => {
            // Performance optimizations
            gl.shadowMap.enabled = shadows;
            gl.shadowMap.autoUpdate = false;
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.5}
              castShadow={shadows}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
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
                rotateSpeed={0.5}
              />
            )}
          </Suspense>
        </Canvas>
        
        {/* Fallback loading component - positioned absolutely */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Suspense fallback={<LoadingSpinner text={loadingText} />}>
            <div />
          </Suspense>
        </div>
      </ErrorBoundary>
    </div>
  );
}