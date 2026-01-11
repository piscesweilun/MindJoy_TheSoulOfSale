import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  videoUrl?: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  if (!videoUrl) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1917]/90 backdrop-blur-md transition-all animate-fade-in p-4">
        <button 
            onClick={onClose} 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition transform hover:rotate-90 duration-300"
        >
            <X size={40} strokeWidth={1} />
        </button>
        
        <div className="w-full max-w-6xl aspect-video bg-black shadow-2xl relative">
            <video
                className="w-full h-full"
                src={videoUrl}
                controls
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                disablePictureInPicture
                autoPlay
            >
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
  );
};