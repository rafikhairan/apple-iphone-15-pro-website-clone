import * as THREE from "three";
import React, { MutableRefObject, RefObject, Suspense } from "react";
import { Model } from "../constants";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { OrbitControls as OrbitElement } from "three-stdlib";
import Lights from "./Lights.tsx";
import IPhone from "./IPhone.tsx";
import Loader from "./Loader.tsx";
import { Vector3 } from "three";

interface Props {
  index: number;
  groupRef: MutableRefObject<THREE.Group>;
  gsapType: string;
  controlRef: RefObject<OrbitElement>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: Model;
  size: string;
}

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}: Props) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index == 2 ? "right-[-100%]" : ""}`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current!.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index == 1 ? "small" : "large"}`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={
              index == 1 ? new Vector3(15, 15, 15) : new Vector3(17, 17, 17)
            }
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
