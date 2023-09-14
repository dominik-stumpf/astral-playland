import { CurveModifier, CurveModifierRef, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export function TextRing() {
  const curveRef = useRef<CurveModifierRef>(null!);
  const geomRef = useRef<THREE.Mesh>(null!);

  const radius = 1.5;
  const curve = useMemo(() => {
    const circle = new THREE.EllipseCurve(
      0,
      0,
      radius,
      radius,
      0,
      2 * Math.PI,
      false,
      0,
    );
    const points = circle
      .getPoints(30)
      .map((p) => new THREE.Vector3(p.x, 0, p.y));
    const curve = new THREE.CatmullRomCurve3(points, true);
    return curve;
  }, []);

  // const line = useMemo(() => {
  //   const points = new THREE.EllipseCurve(
  //     0,
  //     0,
  //     radius,
  //     radius,
  //     0,
  //     Math.PI * 2,
  //     false,
  //     0,
  //   ).getPoints(50);
  //   const geo = new THREE.BufferGeometry().setFromPoints(points);
  //   const mat = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  //   geo.rotateX(Math.PI / 2);
  //   const circle = new THREE.Line(geo, mat);

  //   return circle;
  // }, []);

  useFrame(() => {
    if (curveRef.current) {
      curveRef.current?.moveAlongCurve(0.001);
    }
  });

  useEffect(() => {
    geomRef.current.geometry.rotateX(Math.PI);
    geomRef.current.geometry.rotateY(Math.PI);
  }, []);

  return (
    <group rotation={[0, 0, 0]}>
      <CurveModifier ref={curveRef} curve={curve}>
        <Text3D
          font={'/fraunces.json'}
          size={0.185}
          height={0.04}
          // castShadow
          // receiveShadow
          ref={geomRef}
        >
          resume resume resume resume resume resume resume resume resume
          <meshNormalMaterial />
        </Text3D>
      </CurveModifier>
      {/* <primitive object={line} /> */}
    </group>
  );
}
