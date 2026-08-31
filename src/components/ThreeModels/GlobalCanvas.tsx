import React, { useRef, useMemo, useState, useEffect, Component, ReactNode, ErrorInfo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BackgroundAnalysisCore, StrategicPlanningGrid } from './BackgroundElements';
import { isWebGLSupported } from '../../utils/webgl';

class ThreeErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Three.js / Canvas runtime notice:', error?.message || error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px]" />
        </div>
      );
    }
    return this.props.children;
  }
}

function DynamicEffects() {
  return (
    <ThreeErrorBoundary>
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur luminanceThreshold={0.6} intensity={1.2} />
        <Vignette opacity={0.4} />
      </EffectComposer>
    </ThreeErrorBoundary>
  );
}

function DataTerrain() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const planeRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (planeRef.current) {
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
  
  // Optimized particle count for high 60-120fps throughput
  const particleCount = 700;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 36;
        pos[i * 3 + 1] = Math.random() * 18 - 4;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 36;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (ref.current && !document.hidden) {
      const speedY = 1 + scrollProgress * 4;
      
      ref.current.position.y -= speedY * delta;
      ref.current.rotation.y = scrollProgress * Math.PI;

      let r = 0, g = 1, b = 1;
      if (scrollProgress > 0.8) { r = 1; g = 0; b = 0; }
      else if (scrollProgress > 0.5) { r = 1; g = 0.5; b = 0; }
      else if (scrollProgress > 0.2) { r = 0; g = 1; b = 0; }

      if (ref.current.material && ref.current.material.color) {
        ref.current.material.color.setRGB(r, g, b);
      }

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
  const [canRender3D, setCanRender3D] = useState(() => isWebGLSupported());

  useEffect(() => {
    // Double-check WebGL availability on mount in case environment restricts contexts
    if (!isWebGLSupported()) {
      setCanRender3D(false);
    }
  }, []);

  if (!canRender3D) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <ThreeErrorBoundary fallback={
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px]" />
        </div>
      }>
        <Canvas 
          camera={{ position: [0, 1, 8], fov: 60 }} 
          dpr={[1, 1.25]} 
          gl={{ 
            alpha: true, 
            antialias: false,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
            stencil: false,
            depth: true
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              console.warn('WebGL context lost in GlobalCanvas');
              setCanRender3D(false);
            }, false);
          }}
        >
          <fog attach="fog" args={['#000000', 5, 30]} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} color="#14b8a6" />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#3b82f6" />
          
          <DataTerrain />
          <DataStream />
          
          <BackgroundAnalysisCore />
          <StrategicPlanningGrid />

          <DynamicEffects />
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  );
}

