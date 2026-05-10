import { motion } from 'motion/react';
import React, { useState } from 'react';

interface AnimatedEntryProps {
  onEnter: () => void;
}

export const AnimatedEntry: React.FC<AnimatedEntryProps> = ({ onEnter }) => {
  const slogan = "Where Stories Connect, Joy Begins.";
  const words = slogan.split(" ");
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <motion.div 
      initial={{ backgroundColor: "#F5F5F5" }}
      animate={{ backgroundColor: "#FFF4E6" }}
      transition={{ duration: 2.25, delay: 1.53, ease: "easeInOut" }}
      className="min-h-screen w-full text-neutral-800 font-sans overflow-hidden relative flex flex-col items-center justify-center selection:bg-[#4aa05b]/20"
    >
      
      {/* Background Subtle Glowing Orbs for Vitality & Life */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Warm Yellow/Orange Base */}
        <motion.div
           initial={{ opacity: 0, scale: 0.85 }}
           animate={{ opacity: 0.17, scale: 1 }}
           transition={{ duration: 3.15, delay: 1.53, ease: "easeInOut" }}
           className="absolute w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-gradient-to-tr from-[#fabb58] to-[#e65a49] rounded-full blur-[100px] md:blur-[140px]"
        />
        {/* Soft Green hint */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.13 }}
           transition={{ duration: 3.15, delay: 1.98, ease: "easeInOut" }}
           className="absolute bottom-[5%] left-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#4aa05b] rounded-full blur-[100px] md:blur-[140px]"
        />
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-6">
        
        {/* Logo Animation Container */}
        <div className="mb-12 relative flex justify-center items-center">
          
          <motion.div 
            className="relative flex items-center justify-center w-72 md:w-96 cursor-pointer group"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.62, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Hover subtle glow layer behind the entire logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4aa05b]/10 via-[#e65a49]/20 to-[#e65a49]/10 rounded-[100px] blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none scale-110" />

            {/* Hover glow specifically over the 'o' area to light it up again */}
            <div 
              className="absolute z-30 rounded-full bg-[#fca26e] mix-blend-screen blur-[12px] opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
              style={{
                width: '14.5%',
                aspectRatio: '1',
                right: '24%',
                bottom: '20.5%',
              }}
            />

            {/* The Base Logo Image */}
            <motion.img 
              src="/logo.png" 
              alt="Mindjoy Logo" 
              className="w-full h-auto object-contain relative z-10"
              initial={{ filter: "grayscale(100%) opacity(25%)" }}
              animate={{ filter: "grayscale(0%) opacity(100%)" }}
              transition={{ duration: 2.25, delay: 1.53, ease: "easeInOut" }}
              onLoad={() => setLogoLoaded(true)}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                document.getElementById('logo-fallback')!.style.display = 'flex';
              }}
            />
            
            {/* The Glowing 'o' */}
            <motion.div
              className="absolute z-20 rounded-full bg-[#e65a49]"
              style={{
                width: '14.5%',
                aspectRatio: '1',
                right: '24%',
                bottom: '20.5%',
                boxShadow: '0 0 60px 20px rgba(230,90,73,0.9), 0 0 100px 30px rgba(252,162,110,0.6)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1.05, 1.05, 1.15] }}
              transition={{ 
                duration: 3.15, 
                delay: 0.72,
                times: [0, 0.25, 0.65, 1],
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="w-full h-full rounded-full bg-white/50 blur-[4px]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Expanding light halo */}
            <motion.div
              className="absolute z-0 rounded-full bg-[#fca26e]"
              style={{
                width: '14.5%',
                aspectRatio: '1',
                right: '24%',
                bottom: '20.5%',
                filter: 'blur(35px)'
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 8, opacity: [0, 0.6, 0] }}
              transition={{ duration: 2.25, delay: 1.53, ease: "easeInOut" }}
            />

            {/* Fallback */}
            <div id="logo-fallback" className="hidden flex-col items-center justify-center text-center w-full h-48 border border-dashed border-gray-300 rounded-xl relative overflow-hidden">
               <div className="text-gray-400 mb-2 text-sm">Please upload logo.png to /public</div>
               <div className="text-5xl font-bold tracking-tighter flex items-end">
                 <span className="text-[#4aa05b]">Mind</span>
               </div>
               <div className="text-5xl font-bold tracking-tighter flex items-end -mt-2">
                 <span className="text-[#4aa05b]">j</span>
                 <span className="text-transparent">o</span>
                 <span className="text-[#4aa05b]">y</span>
               </div>
            </div>

          </motion.div>
        </div>

        {/* Slogan Animation */}
        <motion.div
           initial="hidden"
           animate="visible"
           variants={{
             visible: {
               transition: {
                 staggerChildren: 0.036,
                 delayChildren: 2.2
               }
             }
           }}
           className="text-center flex flex-wrap justify-center gap-x-2.5 gap-y-2 md:gap-x-3.5 max-w-2xl px-4 pb-4"
        >
          {words.map((word, wordIndex) => {
            const isConnect = word.toLowerCase().includes("connect");
            const isJoy = word.toLowerCase().includes("joy");
            const colorClass = isConnect ? "text-[#4aa05b] font-semibold" : isJoy ? "text-[#e65a49] font-semibold" : "text-neutral-800";

            return (
              <span key={wordIndex} className="flex overflow-hidden">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        y: charIndex % 2 === 0 ? 15 : 10,
                        rotate: charIndex % 2 === 0 ? -2 : 2,
                        filter: "blur(4px)" 
                      },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        rotate: 0,
                        filter: "blur(0px)",
                        transition: { 
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1] 
                        }
                      }
                    }}
                    className={`text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-relaxed py-1 ${colorClass}`}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            );
          })}
        </motion.div>

        {/* Decorative divider fading in */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.5, ease: "easeInOut" }}
          className="mt-12 w-16 h-1 rounded-full bg-gradient-to-r from-[#4aa05b] to-[#e65a49]"
        />

        {/* Enter Button fading in */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.2, ease: "easeOut" }}
          onClick={onEnter}
          className="mt-12 px-10 py-3.5 bg-neutral-900 text-white rounded-full text-sm font-medium tracking-widest hover:bg-neutral-800 transition duration-300 shadow-xl shadow-neutral-900/20"
        >
          登入 / 註冊
        </motion.button>
        
      </main>
    </motion.div>
  );
};
