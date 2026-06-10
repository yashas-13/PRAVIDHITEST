import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function BackgroundAnalysisCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = state.clock.elapsedTime * -0.02;
      outerRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group position={[-6, 4, -12]}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
        {/* Inner distorted analysis core */}
        <Sphere ref={meshRef} args={[3, 64, 64]}>
          <MeshDistortMaterial
            color="#0d9488" // Teal-600
            envMapIntensity={0.5}
            clearcoat={1}
            clearcoatRoughness={0.2}
            metalness={0.8}
            roughness={0.5}
            wireframe
            distort={0.3}
            speed={1.5}
            transparent
            opacity={0.3}
          />
        </Sphere>
        
        {/* Outer orbital measuring rings */}
        <group ref={outerRef}>
          <Torus args={[4.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color="#14b8a6" transparent opacity={0.15} />
          </Torus>
          <Torus args={[5, 0.02, 16, 100]} rotation={[0, Math.PI / 3, 0]}>
            <meshBasicMaterial color="#14b8a6" transparent opacity={0.1} />
          </Torus>
          <Torus args={[5.5, 0.01, 16, 100]} rotation={[0, 0, Math.PI / 4]}>
            <meshBasicMaterial color="#0ea5e9" transparent opacity={0.08} /> {/* Sky-500 */}
          </Torus>
        </group>
      </Float>
    </group>
  );
}

export function StrategicPlanningGrid() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.02;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group position={[8, -2, -15]} ref={groupRef}>
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={1}>
        {/* Large geometric framework */}
        <mesh>
          <octahedronGeometry args={[5, 1]} />
          <meshBasicMaterial 
            color="#3b82f6" 
            wireframe 
            transparent 
            opacity={0.08} 
          />
        </mesh>
        <mesh scale={1.2}>
          <icosahedronGeometry args={[5, 1]} />
          <meshBasicMaterial 
            color="#6366f1" 
            wireframe 
            transparent 
            opacity={0.05} 
          />
        </mesh>
        
        {/* Core logic node */}
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial 
            color="#2563eb" 
            transparent 
            opacity={0.2} 
            roughness={0.2} 
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}
