import React from 'react';
import { Canvas } from '@react-three/fiber';

const ScienceVisuals = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[1, 60, 60]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
};

export default ScienceVisuals;
