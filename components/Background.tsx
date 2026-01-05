import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[var(--bg-cream)]">
        {/* Subtle Gradient Spot */}
        <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[#F0EBE0] rounded-full mix-blend-multiply filter blur-[80px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#EAE4D6] rounded-full mix-blend-multiply filter blur-[80px] opacity-60"></div>
        
        {/* Very subtle noise texture can be added via CSS if needed, but clean is good */}
    </div>
  );
};