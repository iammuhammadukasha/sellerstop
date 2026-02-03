'use client';

import { Canvas } from '@react-three/fiber';
import Hero3DScene from './Hero3D';

export default function Hero3DCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      shadows
      gl={{ alpha: true, antialias: true }}
    >
      <Hero3DScene />
    </Canvas>
  );
}
