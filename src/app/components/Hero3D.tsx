'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ——— Left: Cash (3D bundles / bills) ——— */
function DollarBill({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.8;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={position} castShadow>
        <boxGeometry args={[0.5, 0.22, 0.02]} />
        <meshStandardMaterial
          color="#2d7d46"
          metalness={0.1}
          roughness={0.6}
          emissive="#1b4d2e"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function CashStack({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={position}>
        <mesh castShadow>
          <boxGeometry args={[0.35, 0.25, 0.2]} />
          <meshStandardMaterial
            color="#2d7d46"
            metalness={0.05}
            roughness={0.7}
            emissive="#1b4d2e"
            emissiveIntensity={0.1}
          />
        </mesh>
        <mesh position={[0, 0.13, 0]} castShadow>
          <boxGeometry args={[0.32, 0.02, 0.18]} />
          <meshStandardMaterial color="#3d8f52" roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

function CashSide() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      const px = state.pointer.x;
      const scale = 1 + Math.max(0, -px) * 0.08;
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);
    }
  });
  return (
    <group ref={groupRef} position={[-1.8, 0, 0]}>
      <pointLight position={[0, 0.5, 0.5]} color="#b8d4a8" intensity={3} distance={5} />
      <DollarBill position={[-0.3, 0.4, 0.3]} />
      <DollarBill position={[0.2, -0.2, 0.2]} />
      <DollarBill position={[-0.1, 0.7, -0.2]} />
      <CashStack position={[0.35, -0.35, 0.25]} />
      <CashStack position={[-0.4, 0.1, -0.15]} />
    </group>
  );
}

/* ——— Right: Houses (3D modern buildings) ——— */
function ModernBuilding({
  position,
  size,
  height,
}: {
  position: [number, number, number];
  size: number;
  height: number;
}) {
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group position={position}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[size, height, size]} />
          <meshStandardMaterial color="#4a5568" metalness={0.2} roughness={0.6} />
        </mesh>
        <mesh position={[0, height / 2 + 0.08, 0]} castShadow>
          <boxGeometry args={[size + 0.05, 0.08, size + 0.05]} />
          <meshStandardMaterial color="#2d3748" roughness={0.7} />
        </mesh>
        {/* Windows */}
        {[0.25, -0.25].map((z) =>
          [0.2, -0.2].map((x) => (
            <mesh key={`${x}-${z}`} position={[x, 0.15, z]} castShadow>
              <boxGeometry args={[0.12, 0.15, 0.02]} />
              <meshStandardMaterial color="#90cdf4" emissive="#63b3ed" emissiveIntensity={0.3} />
            </mesh>
          ))
        )}
      </group>
    </Float>
  );
}

function HouseShape() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
      <group position={[0.5, -0.2, 0]} scale={0.9}>
        <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
          <boxGeometry args={[0.9, 0.6, 0.7]} />
          <meshStandardMaterial color="#5a6a7a" metalness={0.15} roughness={0.65} />
        </mesh>
        <mesh castShadow position={[0, 0.85, 0]}>
          <coneGeometry args={[0.72, 0.4, 4]} />
          <meshStandardMaterial color="#2d3748" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.2, 0.36]} castShadow>
          <boxGeometry args={[0.25, 0.4, 0.04]} />
          <meshStandardMaterial color="#1a202c" />
        </mesh>
      </group>
    </Float>
  );
}

function HousesSide() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      const px = state.pointer.x;
      const scale = 1 + Math.max(0, px) * 0.08;
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);
    }
  });
  return (
    <group ref={groupRef} position={[1.8, 0, 0]}>
      <pointLight position={[0, 0.5, 0.5]} color="#e2e8f0" intensity={2.5} distance={5} />
      <HouseShape />
      <ModernBuilding position={[-0.6, 0.1, 0.2]} size={0.5} height={0.7} />
      <ModernBuilding position={[0.9, -0.1, -0.15]} size={0.4} height={0.55} />
    </group>
  );
}

/* ——— Center: Flow (cash → houses) ——— */
const PARTICLE_COUNT = 40;
function FlowParticles() {
  const ref = useRef<THREE.Points>(null);
  const initialX = useRef<Float32Array | null>(null);
  const speedRef = useRef(0.02);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const spd: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.2 - 1.2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      spd.push(0.015 + Math.random() * 0.02);
    }
    return [pos, spd];
  }, []);

  if (!initialX.current) {
    initialX.current = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) initialX.current[i] = positions[i * 3];
  }

  useFrame((state) => {
    if (!ref.current || !initialX.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const pointerX = state.pointer.x;
    speedRef.current = 0.02 + Math.abs(pointerX) * 0.03;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] += speedRef.current * speeds[i];
      if (pos[i * 3] > 1.8) pos[i * 3] = initialX.current![i] - 1.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#4ade80"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero3DScene() {
  return (
    <>
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 6, 4]} intensity={1.4} castShadow />
      <pointLight position={[0, 2, 3]} intensity={0.8} color="#ffffff" />
      <Environment preset="city" />
      <CashSide />
      <HousesSide />
      <FlowParticles />
    </>
  );
}
