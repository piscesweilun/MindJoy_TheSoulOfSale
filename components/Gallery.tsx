import React from 'react';
import { ArtPiece } from '../types';
import { ArtCard } from './ArtCard';

interface GalleryProps {
  pieces: ArtPiece[];
  onSelect: (piece: ArtPiece) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ pieces, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 pb-32 relative z-10 max-w-[1800px] mx-auto">
        {pieces.map((piece) => {
            return (
                <div key={piece.id} className="cursor-pointer" onClick={() => onSelect(piece)}>
                    <ArtCard piece={piece} />
                </div>
            );
        })}
    </div>
  );
};