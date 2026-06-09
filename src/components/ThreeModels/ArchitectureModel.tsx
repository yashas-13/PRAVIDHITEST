import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TorusKnot, Float } from '@react-three/drei';
import * as THREE from 'three';

export function ArchitectureModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <TorusKnot ref={meshRef} args={[1.2, 0.3, 128, 16]}>
        <meshStandardMaterial 
          color="#818cf8"
          wireframe={true}
          transparent
          opacity={0.6}
        />
      </TorusKnot>
      <TorusKnot args={[1.2, 0.3, 128, 16]} scale={0.99}>
         <meshStandardMaterial 
          color="#18181b" 
          wireframe={false}
          metalness={0.9}
          roughness={0.1}
        />
      </TorusKnot>
      
      {/* Surrounding orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#4f46e5" opacity={0.3} transparent />
      </mesh>
      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#4f46e5" opacity={0.2} transparent />
      </mesh>
    </Float>
  );
}
