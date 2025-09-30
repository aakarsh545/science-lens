import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/spaceship.json';

const AILoader = () => {

  return (
    <div>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMinYMin slice',
          },
        }}
        height={200}
        width={200}
      />
    </div>
  );
};

export default AILoader;
