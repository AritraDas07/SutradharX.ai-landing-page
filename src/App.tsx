import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import MainScene from './components/MainScene';
import MouseTracker from './components/MouseTracker';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after exactly 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <MouseTracker />
      {isLoading && <LoadingScreen />}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <MainScene />
      </div>
    </>
  );
}

export default App;