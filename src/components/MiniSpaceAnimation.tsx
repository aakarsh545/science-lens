import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

const MiniSpaceAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate loading animation data
    setIsAnimating(true);
  }, []);

  return (
    <div>
      {isAnimating && (
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <mesh>
            <sphereGeometry args={[1, 60, 60]} />
            <meshBasicMaterial color="hotpink" />
          </mesh>
        </Canvas>
      )}
    </div>
  );
};

export default MiniSpaceAnimation;
