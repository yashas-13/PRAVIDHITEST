import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
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
    if (scrollProgress > 0.8) { hex1 = 0xff0000; hex2 = 0x000000; } // Brutal White section -> make lights red/black
    else if (scrollProgress > 0.6) { hex1 = 0xff0055; hex2 = 0xffaa00; } // Web services -> crazy synthwave
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

function ElegantModels() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.1;

        const targetZ = scrollProgress * -40;
        const targetY = scrollProgress * 10 - 5;
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ + 15, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
        
        // Dynamic lookat to steer the user's view
        const lookX = Math.sin(scrollProgress * Math.PI * 2) * 2;
        state.camera.lookAt(lookX, targetY - 2, targetZ - 10);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[3, 0, 0]}>
        <mesh>
          <icosahedronGeometry args={[2.5, 0]} />
          <MeshTransmissionMaterial 
            backside={true}
            thickness={2}
            roughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.1}
            color="#ffffff"
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={3} position={[-4, -1, -15]}>
        <mesh>
          <torusKnotGeometry args={[2, 0.6, 128, 32]} />
          <MeshTransmissionMaterial 
            backside={true}
            thickness={1}
            roughness={0}
            transmission={1}
            ior={1.2}
            chromaticAberration={0.3}
            color="#84cc16"
          />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1.5} floatIntensity={1} position={[5, 4, -30]}>
        <mesh>
           <octahedronGeometry args={[3.5, 0]} />
           <MeshTransmissionMaterial 
             backside={true}
             thickness={3}
             roughness={0.2}
             transmission={1}
             ior={1.8}
             chromaticAberration={0.5}
             color="#eab308"
           />
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
        <fogExp2 attach="fog" args={['#000000', 0.02]} />
        
        <Environment preset="city" />
        <DynamicLights />
        <ElegantModels />
        <DynamicEffects />
      </Canvas>
    </div>
  );
}
