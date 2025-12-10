import React from 'react';

const ZigZagDivider: React.FC = () => {
  return (
    <div className="w-full h-8 overflow-hidden relative my-6">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-4 bg-yellow-400 border-t-4 border-b-4 border-black relative">
             {/* This visual effect is handled by the parent container usually, 
                 but here we use an SVG for a perfect zig zag line */}
        </div>
      </div>
      <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 30">
        <path 
          d="M0,15 L20,0 L40,15 L60,0 L80,15 L100,0 L120,15 L140,0 L160,15 L180,0 L200,15 L220,0 L240,15 L260,0 L280,15 L300,0 L320,15 L340,0 L360,15 L380,0 L400,15 L420,0 L440,15 L460,0 L480,15 L500,0 L520,15 L540,0 L560,15 L580,0 L600,15 L620,0 L640,15 L660,0 L680,15 L700,0 L720,15 L740,0 L760,15 L780,0 L800,15 L820,0 L840,15 L860,0 L880,15 L900,0 L920,15 L940,0 L960,15 L980,0 L1000,15 L1020,0 L1040,15 L1060,0 L1080,15 L1100,0 L1120,15 L1140,0 L1160,15 L1180,0 L1200,15 V30 H0 Z" 
          fill="#111" 
          transform="scale(1, 1)"
        />
      </svg>
    </div>
  );
};

export default ZigZagDivider;