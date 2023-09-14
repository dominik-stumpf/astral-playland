'use client';

import { ScenePlanet } from '@/components/planet-scene';
import { Canvas } from '@react-three/fiber';
import {
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
          <color attach='background' args={[0x000000]} />
          <ScenePlanet />
          {process.env.NODE_ENV === 'development' && (
            <Perf position='top-left' />
          )}
          <EffectComposer>
            {/* <DepthOfField /> */}
            <TiltShift />
            <Vignette darkness={0.5} eskil={false} />
            <ChromaticAberration
              offset={aberrationOffsetVector}
              radialModulation={false}
              modulationOffset={0}
            />
            {/* <Noise opacity={0.02} /> */}
            {/* <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.8}
            height={256}
            opacity={2}
          /> */}
          </EffectComposer>
        </Canvas>
      </Suspense>
    </main>
  );
}
