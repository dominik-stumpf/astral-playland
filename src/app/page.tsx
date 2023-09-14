'use client';

import { ScenePlanet } from '@/components/planet-scene';
import { GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  ChromaticAberration,
  EffectComposer,
  TiltShift,
  Vignette,
} from '@react-three/postprocessing';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';

// const aberrationOffset = 0.0003;

export default function Page() {
  return (
    <main className='h-full w-full pointer-events-none'>
      <Suspense fallback={'loading ...'}>
        <Canvas
          className='h-full w-full'
          shadows
          gl={{
            powerPreference: 'high-performance',
            alpha: false,
            antialias: false,
            stencil: false,
            depth: false,
          }}
        >
          <color attach='background' args={[0x0f0f0f]} />
          <ScenePlanet />
          <GizmoHelper>
            <GizmoViewport />
          </GizmoHelper>
          {process.env.NODE_ENV === 'development' && (
            <Perf position='top-left' />
          )}
          <EffectComposer>
            <TiltShift />
            <Vignette darkness={0.8} eskil={false} />
            <ChromaticAberration
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </main>
  );
}
