import { StarProps } from './star-types';
import { Vector3 } from 'three';

export function Star({ position = new Vector3() }: StarProps) {
  return (
    <group>
      <directionalLight castShadow intensity={2} position={position} />;
    </group>
  );
}
