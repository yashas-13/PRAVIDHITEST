import React, { Component, ReactNode, ErrorInfo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Cpu } from 'lucide-react';
import { isWebGLSupported } from '../../utils/webgl';

class ModelErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('ModelContainer render notice:', error?.message || error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex flex-col items-center justify-center rounded-2xl bg-zinc-950/60 border border-zinc-800 text-zinc-500 font-mono text-xs gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 animate-pulse">
            <Cpu size={24} />
          </div>
          <span className="text-zinc-400">Zero-Trust Visual Node</span>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ModelContainer({ children }: { children: ReactNode }) {
  const [canRender3D, setCanRender3D] = useState(() => isWebGLSupported());

  useEffect(() => {
    if (!isWebGLSupported()) {
      setCanRender3D(false);
    }
  }, []);

  if (!canRender3D) {
    return (
      <div className="w-full h-[400px] md:h-[500px] flex flex-col items-center justify-center rounded-2xl bg-zinc-950/60 border border-zinc-800 text-zinc-500 font-mono text-xs gap-3">
        <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
          <Cpu size={28} />
        </div>
        <span className="text-zinc-300 font-bold tracking-wider">Pravidhi Autonomous Engine Node</span>
        <span className="text-[11px] text-zinc-500">Zero-Trust Cryptographic Core</span>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <ModelErrorBoundary fallback={
        <div className="w-full h-full flex flex-col items-center justify-center rounded-2xl bg-zinc-950/60 border border-zinc-800 text-zinc-500 font-mono text-xs gap-3">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Cpu size={28} />
          </div>
          <span className="text-zinc-300 font-bold tracking-wider">Pravidhi Autonomous Engine Node</span>
        </div>
      }>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: 'default',
            failIfMajorPerformanceCaveat: false
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              console.warn('WebGL context lost in ModelContainer');
              setCanRender3D(false);
            }, false);
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          {children}
          <Environment preset="city" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />
        </Canvas>
      </ModelErrorBoundary>
    </div>
  );
}

