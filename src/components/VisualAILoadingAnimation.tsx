import React, { useEffect, useState } from 'react';
let Lottie: any | null = null;
try {
  // Try to require react-lottie only when available.
  // Using dynamic require so builds without the package don't crash.
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  Lottie = require('react-lottie');
} catch (e) {
  Lottie = null;
}

const AILoader: React.FC = () => {
  const [animationData, setAnimationData] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // attempt to dynamically import the JSON file if it exists
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const data = require('../animations/spaceship.json');
        if (mounted) setAnimationData(data.default || data);
      } catch (err) {
        // ignore - will render fallback spinner
      }
    })();
    return () => { mounted = false };
  }, []);

  if (Lottie && animationData) {
    return (
      <div>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: { preserveAspectRatio: 'xMinYMin slice' },
          }}
          height={200}
          width={200}
        />
      </div>
    );
  }

  // Fallback simple spinner
  return (
    <div className="flex items-center justify-center p-4">
      <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    </div>
  );
};

export default AILoader;
