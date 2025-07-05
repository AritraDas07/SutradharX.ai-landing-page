import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Increment by 2% every 100ms to reach 100% in 5 seconds
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Spline Animation */}
      <div className="w-full h-full absolute inset-0">
        <Spline
          scene="https://prod.spline.design/Rp0-sxU0d7xXHhCR/scene.splinecode"
        />
      </div>
      
      {/* Loading UI Overlay */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-80 z-10">
        {/* Brand Text */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl">
            SutradharX.ai
          </h1>
        </div>
        
        {/* Loading Bar Container */}
        <div className="relative">
          {/* Background Bar */}
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden backdrop-blur-sm">
            {/* Progress Bar */}
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Animated Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full animate-pulse opacity-75"></div>
              
              {/* Moving Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full transform -skew-x-12 animate-shimmer"></div>
            </div>
          </div>
          
          {/* Progress Text */}
          <div className="text-center mt-4">
            <span className="text-white text-sm font-medium opacity-80">
              {Math.round(progress)}%
            </span>
          </div>
          
          {/* Glow Effect Under Bar */}
          <div 
            className="absolute -bottom-1 left-0 h-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-md transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}