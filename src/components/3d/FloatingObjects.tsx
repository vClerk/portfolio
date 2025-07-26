'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import { Mesh } from 'three';

interface FloatingObjectProps {
  position?: [number, number, number];
  type?: 'sphere' | 'box' | 'torus';
  color?: string;
  scale?: number;
  speed?: number;
}

export function FloatingObject({
  position = [0, 0, 0],
  type = 'sphere',
  color = '#3b82f6',
  scale = 1,
  speed = 1,
}: FloatingObjectProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  const renderObject = () => {
    switch (type) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.3, 16, 100]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <Float speed={speed * 2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
        {renderObject()}
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

export function ParticleField() {
  const particlesRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const particles = Array.from({ length: 100 }, (_, i) => (
    <Sphere
      key={i}
      args={[0.02, 8, 8]}
      position={[
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ]}
    >
      <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
    </Sphere>
  ));

  return (
    <group ref={particlesRef}>
      {particles}
    </group>
  );
}