'use client';

import {
  EffectContext,
  EffectController,
  EffectControllerWrapper,
} from '@/components/effect-controller/effect-controller';
import { ScenePlanet } from '@/components/planet-scene';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import * as THREE from 'three';

export default function Page() {
  return (
    <main className='h-full w-full pointer-events-none bg-black'>
      <Suspense fallback={'loading ...'}>
        <EffectControllerWrapper>
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
            <EffectController />
          </Canvas>
        </EffectControllerWrapper>
      </Suspense>
    </main>
  );
}
