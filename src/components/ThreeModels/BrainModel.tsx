import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export function BrainModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron ref={meshRef} args={[1.5, 4]} >
          <MeshDistortMaterial 
            color="#14b8a6"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            wireframe
            distort={0.4}
            speed={2}
          />
        </Icosahedron>
        
        {/* Core center node */}
        <Icosahedron args={[0.8, 2]}>
          <meshBasicMaterial color="#14b8a6" wireframe={false} opacity={0.2} transparent />
        </Icosahedron>
    </Float>
  );
}
