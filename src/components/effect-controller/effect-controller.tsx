import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  GodRays,
  HueSaturation,
  Noise,
  TiltShift,
  Vignette,
} from '@react-three/postprocessing';
import { useControls } from 'leva';
import { BlendFunction } from 'postprocessing';
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import * as THREE from 'three';

interface EffectContextProps {
  starMeshRef: RefObject<THREE.Mesh>;
}

type EffectContextType = {
  effectContext: EffectContextProps;
  setEffectContext: Dispatch<SetStateAction<EffectContextProps>>;
};

export const effectContextDefaultValue = {} as EffectContextType;

export const EffectContext = createContext<EffectContextType>(
  effectContextDefaultValue,
);

export function EffectControllerWrapper({ children }: { children: ReactNode }) {
  const [context, setContext] = useState({} as EffectContextProps);
  const providerValue: EffectContextType = {
    effectContext: context,
    setEffectContext: setContext,
  };
  return (
    <EffectContext.Provider value={providerValue}>
      {children}
    </EffectContext.Provider>
  );
}

export function EffectController() {
  const { aberrationOffset } = useControls('ChromaticAberration', {
    aberrationOffset: {
      x: 0,
      y: 0,
    },
  });

  const { hue, saturation } = useControls('HueSaturation', {
    hue: {
      value: 3.11,
      min: 0,
      max: Math.PI * 2,
    },
    saturation: {
      value: 2.05,
      min: 0,
      max: Math.PI * 2,
    },
  });

  const { noise } = useControls('Noise', {
    noise: {
      value: 0.15,
      min: 0,
      max: 1,
    },
  });

  const { exposure, decay, blur } = useControls('GodRays', {
    exposure: {
      value: 0.55,
      min: 0,
      max: 1,
    },
    decay: {
      value: 0.9,
      min: 0,
      max: 1,
      step: 0.1,
    },
    blur: {
      value: true,
    },
  });

  const { effectContext } = useContext(EffectContext);
  const { enabled } = useControls('PostProcessing', { enabled: true });

  return (
    enabled &&
    effectContext.starMeshRef?.current && (
      <EffectComposer multisampling={0}>
        <Vignette darkness={0.5} eskil={false} />
        {/* <ChromaticAberration
          offset={new THREE.Vector2(aberrationOffset.x, aberrationOffset.y)}
          radialModulation={false}
          modulationOffset={0}
        /> */}
        <GodRays
          sun={effectContext.starMeshRef.current}
          exposure={exposure}
          decay={decay}
          blur={blur}
        />
        <Noise opacity={noise} premultiply blendFunction={BlendFunction.ADD} />
        <HueSaturation hue={hue} saturation={saturation} />
        <Bloom />
        {/* <TiltShift /> */}
      </EffectComposer>
    )
  );
}
