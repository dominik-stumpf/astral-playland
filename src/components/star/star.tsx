import { EffectContext } from '../effect-controller/effect-controller';
import { Billboard, Circle } from '@react-three/drei';
import {
  EffectComposer,
  GodRays,
  HueSaturation,
  LensFlare,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { useControls } from 'leva';
import { BlendFunction } from 'postprocessing';
import React, { Ref, forwardRef, useEffect, useRef, useState } from 'react';
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
    // <Billboard>
    //   <Circle
    //     args={[32, 32]}
    //     ref={forwardRef}
    //     position={[256, 0, 0]}
    //     {...props}
    //   >
    //     <meshBasicMaterial color={starColor} />
    //   </Circle>
    // </Billboard>
  );
}

// export function Star() {
//   const material = useRef<Mesh>(null);

//   const [isStarLoaded, setIsStarLoaded] = useState(false);

//   useEffect(() => {
//     if (material.current) {
//       setIsStarLoaded(true);
//     }
//   }, []);

//   return (
//     <group>
//       <StarMesh ref={material} />
//     </group>
//   );
// }
