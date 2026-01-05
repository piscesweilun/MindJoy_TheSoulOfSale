import React from 'react';

export const Hero: React.FC = () => {
  return (
    <header className="pt-40 md:pt-52 pb-24 px-6 md:px-12 relative overflow-hidden z-10 max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-google font-medium leading-[1.1] text-[var(--text-charcoal)] mb-12">
            The <span className="italic text-[var(--accent-gold)]">Soul</span> <br />
            of Sale.
        </h1>
        
        <div className="flex flex-col md:flex-row items-start pl-0 md:pl-2 py-4 max-w-3xl">
            <div className="w-12 h-[1px] bg-[var(--text-gold)] mt-6 mr-8 hidden md:block"></div>
            {/* Increased font size from text-lg/xl to text-xl/2xl (approx 20-25% larger) */}
            <p className="text-xl md:text-2xl text-[var(--text-stone)] font-light leading-relaxed tracking-wide">
                讓每一份保單，都有值得訴說的故事。<br />
                我們為頂尖保險顧問打造具溫度的影片內容——<br />
                不只是行銷，而是一場精心設計的情感對話。<br />
                讓您的專業被看見，讓信任自然發生。
                <br /><br />
                <span className="text-[var(--text-gold)] font-google italic text-2xl">
                    Where stories connect, joy begins.
                </span>
            </p>
        </div>
    </header>
  );
};