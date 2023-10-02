import { EffectContext } from '../effect-controller/effect-controller';
import { useControls } from 'leva';
import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import * as THREE from 'three';

export function Star() {
  const { value: starColor } = useControls('star color', { value: '#ffe6bf' });
  const position = new THREE.Vector3(1024, 0, 0);
  const { setEffectContext } = useContext(EffectContext);

  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef) {
      setEffectContext((prev) => ({ ...prev, starMeshRef: meshRef }));
    }
  }, [setEffectContext]);

  return (
    <group>
      <directionalLight
        castShadow
        intensity={16}
        position={position}
        color={starColor}
      />
      <mesh position={position} ref={meshRef}>
        <sphereGeometry args={[32, 16, 16]} />
        <meshBasicMaterial color={starColor} />
      </mesh>
    </group>
  );
}
