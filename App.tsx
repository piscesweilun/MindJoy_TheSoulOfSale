import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { DetailView } from './components/DetailView';
import { VideoModal } from './components/VideoModal';
import { Background } from './components/Background';
import { ArtPiece, ViewState } from './types';
import { ART_PIECES } from './constants';

export default function App() {
  const [view, setView] = useState<ViewState>('gallery');
  const [pieces, setPieces] = useState<ArtPiece[]>(ART_PIECES);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [credits, setCredits] = useState('Credits: 1,250 P');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const selectedPiece = pieces.find(p => p.id === selectedPieceId) || null;

  const handlePieceSelect = (piece: ArtPiece) => {
    setSelectedPieceId(piece.id);
    setView('detail');
  };

  const handleHomeClick = () => {
    setView('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVideoPlay = () => {
    if (selectedPiece?.videoId) {
      setVideoModalOpen(true);
    }
  };

  const handleVideoClose = () => {
    setVideoModalOpen(false);
  };

  const handlePieceUpdate = (updatedPiece: ArtPiece) => {
    setPieces(prevPieces => 
      prevPieces.map(p => p.id === updatedPiece.id ? updatedPiece : p)
    );
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen relative text-black">
      <Background />
      <Navbar 
        onHomeClick={handleHomeClick} 
        credits={credits}
        onUpdateCredits={setCredits}
      />

      <main className="relative z-10">
        {view === 'gallery' && (
          <div className="animate-pop-in">
            <Hero />
            <Gallery pieces={pieces} onSelect={handlePieceSelect} />
          </div>
        )}

        {view === 'detail' && selectedPiece && (
          <DetailView 
            piece={selectedPiece} 
            onClose={handleHomeClick}
            onPlay={handleVideoPlay}
            onUpdate={handlePieceUpdate}
          />
        )}
      </main>

      {videoModalOpen && selectedPiece && (
        <VideoModal 
          videoId={selectedPiece.videoId} 
          onClose={handleVideoClose} 
        />
      )}
    </div>
  );
}