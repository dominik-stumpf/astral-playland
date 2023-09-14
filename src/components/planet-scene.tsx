import {
  CurveModifier,
  CurveModifierRef,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
  Stars,
  Text3D,
  useTexture,
} from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

function Planet() {
  const [roughness, normal, displacement, ao, diffuse] = useTexture([
    '/textures/plastered-stone-wall/plastered_stone_wall_rough_4k.jpg',
    '/textures/plastered-stone-wall/plastered_stone_wall_nor_gl_4k.jpg',
    '/textures/plastered-stone-wall/plastered_stone_wall_disp_4k.jpg',
    '/textures/plastered-stone-wall/plastered_stone_wall_ao_4k.jpg',
    '/textures/plastered-stone-wall/plastered_stone_wall_diff_4k.jpg',
  ]);

  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    meshRef.current.rotateY(0.0005);
  });

  return (
    <mesh castShadow receiveShadow ref={meshRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial
        roughnessMap={roughness}
        normalMap={normal}
        displacementMap={displacement}
        displacementScale={0.2}
        aoMap={ao}
        aoMapIntensity={1.4}
        map={diffuse}
      />
    </mesh>
  );
}

export function Background() {
  const texture = useTexture('/images/milky-way.jpg');
  return (
    <Environment background near={1} far={1000} resolution={2048}>
      <mesh>
        <sphereGeometry args={[100, 64, 64]} />
        <meshBasicMaterial
          map={texture}
          side={THREE.BackSide}
          color={0x555555}
        />
      </mesh>
    </Environment>
  );
}

export function ScenePlanet() {
  return (
    <scene>
      <Planet />
      <PerspectiveCamera fov={70} makeDefault position={[0, 0, 5]} />
      <OrbitControls />
      <Background />
      <ambientLight intensity={0.2} />
      <directionalLight castShadow intensity={6} position={[0, 0, 500]} />
      <Stars fade />
      <Sparkles
        scale={32}
        count={1024}
        speed={0.2}
        color={0x555555}
        opacity={0.5}
        size={3}
      />
    </scene>
  );
}
