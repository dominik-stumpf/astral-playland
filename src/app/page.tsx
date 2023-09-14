'use client';

import { ScenePlanet } from '@/components/planet-scene';
import { Canvas } from '@react-three/fiber';
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  TiltShift,
  Vignette,
} from '@react-three/postprocessing';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import * as THREE from 'three';

const aberrationOffset = 0.0003;
const aberrationOffsetVector = new THREE.Vector2(
  aberrationOffset,
  aberrationOffset,
);

export default function Page() {
  return (
    <main className='h-full w-full pointer-events-none bg-black'>
      <Suspense fallback={'loading ...'}>
        <Canvas
          className='h-full w-full cursor-grab active:cursor-grabbing'
          shadows
          gl={{
            powerPreference: 'high-performance',
            alpha: false,
            antialias: false,
            stencil: false,
            depth: false,
          }}
        >
          <color attach='background' args={[0x00000]} />
          <ScenePlanet />
          {process.env.NODE_ENV === 'development' && (
            <Perf position='top-left' />
          )}
          <EffectComposer>
            <TiltShift />
            <Vignette darkness={0.5} eskil={false} />
            <ChromaticAberration offset={aberrationOffsetVector} />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </main>
  );
}
