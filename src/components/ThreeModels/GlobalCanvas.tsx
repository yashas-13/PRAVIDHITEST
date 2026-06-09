import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';

function DynamicEffects() {
  return (
    <EffectComposer multisampling={4}>
      <DepthOfField focusDistance={0.015} focalLength={0.4} bokehScale={4} />
      <Bloom 
        mipmapBlur 
        luminanceThreshold={0.5} 
        luminanceSmoothing={0.9} 
        intensity={1.0} 
      />
      <Vignette eskil={false} offset={0.1} darkness={1.0} />
    </EffectComposer>
  );
}

function DynamicLights() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const light1Ref = useRef<THREE.DirectionalLight>(null);
  const light2Ref = useRef<THREE.DirectionalLight>(null);
  const targetColor1 = useMemo(() => new THREE.Color(), []);
  const targetColor2 = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    let hex1 = 0x14b8a6, hex2 = 0x4f46e5;
    if (scrollProgress > 0.8) { hex1 = 0xffffff; hex2 = 0xff0000; } // Brutal
    else if (scrollProgress > 0.6) { hex1 = 0x00ffff; hex2 = 0xff00ff; } // Synth
    else if (scrollProgress > 0.4) { hex1 = 0xeab308; hex2 = 0xd97706; } // Services
    else if (scrollProgress > 0.2) { hex1 = 0x84cc16; hex2 = 0x14b8a6; } // Philosophy Lime

    targetColor1.setHex(hex1);
    targetColor2.setHex(hex2);

    if (light1Ref.current) light1Ref.current.color.lerp(targetColor1, 0.1);
    if (light2Ref.current) light2Ref.current.color.lerp(targetColor2, 0.1);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight ref={light1Ref} position={[10, 10, 10]} intensity={1.5} />
      <directionalLight ref={light2Ref} position={[-10, -10, 10]} intensity={1.5} />
    </>
  );
}

function ReactiveParticles() {
  const ref = useRef<any>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  
  const particleCount = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 40;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Different movement profiles based on scroll section
      let speedX = 0, speedY = 0, speedZ = 0;
      
      if (scrollProgress > 0.8) {
         // Tech niches - chaotic, fast rising
         speedY = 2; speedX = Math.sin(state.clock.elapsedTime) * 0.5;
         ref.current.material.color.setHex(0xff0000);
      } else if (scrollProgress > 0.6) {
         // AI - deep orbit
         speedZ = 1; speedX = -0.5;
         ref.current.rotation.y += delta * 0.5;
         ref.current.material.color.setHex(0x00ffff);
      } else if (scrollProgress > 0.4) {
         // Services - spiral
         ref.current.rotation.z += delta * 0.2;
         speedZ = -0.5;
         ref.current.material.color.setHex(0xeab308);
      } else if (scrollProgress > 0.2) {
         // Philosophy - slow horizontal drift
         speedX = 0.5;
         ref.current.material.color.setHex(0x84cc16);
      } else {
         // Hero - subtle float
         ref.current.rotation.x += delta * 0.02;
         ref.current.rotation.y += delta * 0.02;
         ref.current.material.color.setHex(0x14b8a6);
      }

      ref.current.position.y += speedY * delta;
      ref.current.position.x += speedX * delta;
      ref.current.position.z += speedZ * delta;

      // Wrap around bounds
      if (ref.current.position.y > 20) ref.current.position.y = -20;
      if (ref.current.position.x > 20) ref.current.position.x = -20;
      if (ref.current.position.x < -20) ref.current.position.x = 20;
      if (ref.current.position.z > 20) ref.current.position.z = -20;
      if (ref.current.position.z < -20) ref.current.position.z = 20;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#14b8a6" size={0.05} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  );
}

function SectionGeometries() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);
  const mesh3 = useRef<THREE.Mesh>(null);
  const mesh4 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Determine active section index [0..4]
    const activeIdx = Math.min(Math.floor(scrollProgress * 5), 4);

    // Lerp scales depending on active section to distinctly swap focal geometry
    const lerpScale = (meshRef: any, target: number) => {
      if (meshRef.current) {
        meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.05);
        meshRef.current.rotation.x += delta * 0.1;
        meshRef.current.rotation.y += delta * 0.2;
      }
    };

    lerpScale(mesh1, activeIdx === 0 ? 1 : 0.001); // Hero
    lerpScale(mesh2, activeIdx === 1 ? 1 : 0.001); // Philosophy
    lerpScale(mesh3, activeIdx === 2 || activeIdx === 3 ? 1 : 0.001); // Services / AI
    lerpScale(mesh4, activeIdx === 4 ? 1 : 0.001); // Brutality
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Hero Icosahedron */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1} position={[3, 0, -5]}>
        <mesh ref={mesh1}>
          <icosahedronGeometry args={[2.5, 0]} />
          <MeshTransmissionMaterial backside thickness={2} roughness={0.1} transmission={1} ior={1.5} color="#ffffff" />
        </mesh>
      </Float>

      {/* Philosophy Torus Knot */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1} position={[-3, 0, -5]}>
        <mesh ref={mesh2}>
          <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
          <MeshTransmissionMaterial backside thickness={1} roughness={0} transmission={1} ior={1.2} color="#84cc16" />
        </mesh>
      </Float>

      {/* Services / AI Octahedron */}
      <Float speed={1} rotationIntensity={1} floatIntensity={2} position={[2, 0, -5]}>
        <mesh ref={mesh3}>
           <octahedronGeometry args={[3, 0]} />
           <MeshTransmissionMaterial backside thickness={3} roughness={0.2} transmission={1} ior={1.8} color="#00ffff" />
        </mesh>
      </Float>
      
      {/* Brutal Tech Box */}
      <Float speed={4} rotationIntensity={2} floatIntensity={0.5} position={[0, 0, -5]}>
        <mesh ref={mesh4}>
           <boxGeometry args={[3, 3, 3]} />
           <MeshTransmissionMaterial backside thickness={2} roughness={0.5} transmission={0.9} ior={2.2} color="#ff0000" wireframe />
        </mesh>
      </Float>
    </group>
  );
}

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ background: '#050505' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <color attach="background" args={['#000000']} />
        <fogExp2 attach="fog" args={['#000000', 0.03]} />
        
        <Environment preset="city" />
        <DynamicLights />
        <SectionGeometries />
        <ReactiveParticles />
        <DynamicEffects />
      </Canvas>
    </div>
  );
}
