import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Complete splash after 3 seconds
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      onComplete && onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-[390px] mx-auto">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
        {/* App Logo/Name */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center" style={{color: '#ff6b47'}}>
            <span className="inline-block animate-[slideInLeft_1.2s_ease-out_forwards] opacity-0">
              Pay
            </span>
            <span className="inline-block animate-[slideInRight_1.2s_ease-out_0.3s_forwards] opacity-0">
              Me
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-16 animate-[fadeInUp_1s_ease-out_0.8s_forwards] opacity-0 leading-relaxed">
          Track invoices, get paid faster
        </p>

        {/* Loading Animation */}
        <div className="flex gap-3 animate-[fadeIn_1s_ease-out_1.2s_forwards] opacity-0 mb-8">
          <div className="w-6 h-6 rounded-full flex items-center justify-center animate-[bounce_1.4s_ease-in-out_infinite]" style={{backgroundColor: '#ff6b47'}}>
            <span className="text-xs font-bold text-white">$</span>
          </div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center animate-[bounce_1.4s_ease-in-out_0.2s_infinite]" style={{backgroundColor: '#ff6b47'}}>
            <span className="text-xs font-bold text-white">€</span>
          </div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center animate-[bounce_1.4s_ease-in-out_0.4s_infinite]" style={{backgroundColor: '#ff6b47'}}>
            <span className="text-xs font-bold text-white">¥</span>
          </div>
        </div>
      </div>

      {/* Bottom Branding - Always visible */}
      <div className="text-center pb-6 sm:pb-8 animate-[fadeIn_1.5s_ease-out_1.5s_forwards] opacity-0">
        <p className="text-xs text-gray-400 mb-1">Designed by</p>
        <p className="text-sm font-medium text-gray-600">Anna Rouben</p>
      </div>
    </div>
  );
};

export default SplashScreen;