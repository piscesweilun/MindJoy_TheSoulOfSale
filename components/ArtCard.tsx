import React from 'react';
import { ArtPiece } from '../types';

interface ArtCardProps {
  piece: ArtPiece;
}

export const ArtCard: React.FC<ArtCardProps> = ({ piece }) => {
  return (
    <div className="h-full group relative flex flex-col bg-white shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out">
        
        {/* Image Frame */}
        <div className="overflow-hidden w-full aspect-[4/5] relative">
            <img 
                src={piece.image} 
                alt={piece.title} 
                className="w-full h-full object-cover transition duration-700 ease-in-out group-hover:scale-105" 
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500"></div>
            
             {/* Price Badge - Minimalist */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold tracking-widest text-[var(--text-charcoal)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {piece.price}
            </div>
        </div>
        
        {/* Content */}
        <div className="p-8 flex-grow flex flex-col justify-between">
            <div>
                <h3 className="text-2xl font-serif-display font-medium mb-1 text-[var(--text-charcoal)] group-hover:text-[var(--accent-gold)] transition-colors duration-300">
                    {piece.title}
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-[var(--text-stone)] uppercase font-google font-medium">
                    {piece.englishTitle}
                </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-[var(--border-light)] opacity-60 group-hover:opacity-100 transition-opacity">
                 <p className="text-sm text-[var(--text-stone)] font-light line-clamp-2">
                    {piece.description}
                </p>
            </div>
        </div>
    </div>
  );
};