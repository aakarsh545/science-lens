import React from 'react';
import Lottie from 'react-lottie';

const AILoader = () => {
  const animationData = require('../animations/spaceship.json');

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
