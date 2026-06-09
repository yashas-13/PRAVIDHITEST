import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

function DataTerrain() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const planeRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (planeRef.current) {
      // scroll forward based on scroll progress
      planeRef.current.position.z = (scrollProgress * 20) % 2;
    }
  });

  return (
    <group position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={planeRef}>
        <planeGeometry args={[100, 100, 40, 40]} />
        <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.15} />
      </mesh>
      
      {/* Second darker grid for depth */}
      <mesh position={[0, 0, -0.1]}>
         <planeGeometry args={[100, 100, 20, 20]} />
         <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function DataStream() {
  const ref = useRef<any>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  
  const particleCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 40;
        pos[i * 3 + 1] = Math.random() * 20 - 5;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Stream falls downwards and speeds up on scroll
      const speedY = 1 + scrollProgress * 5;
      
      ref.current.position.y -= speedY * delta;
      ref.current.rotation.y = scrollProgress * Math.PI;

      // Color shifts based on scroll
      let r = 0, g = 1, b = 1;
      if (scrollProgress > 0.8) { r = 1; g = 0; b = 0; }
      else if (scrollProgress > 0.5) { r = 1; g = 0.5; b = 0; }
      else if (scrollProgress > 0.2) { r = 0; g = 1; b = 0; }

      ref.current.material.color.setRGB(r, g, b);

      if (ref.current.position.y < -10) ref.current.position.y = 10;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00ffff" size={0.03} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  );
}

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 1, 8], fov: 60 }} dpr={[1, 2]} gl={{ antialias: false }}>
        <fog attach="fog" args={['#000000', 5, 20]} />
        <DataTerrain />
        <DataStream />
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur luminanceThreshold={0.5} intensity={1.5} />
          <Vignette opacity={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
