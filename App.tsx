import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { DetailView } from './components/DetailView';
import { VideoModal } from './components/VideoModal';
import { Background } from './components/Background';
import { AuthModal } from './components/AuthModal';
import { Pricing } from './components/Pricing';
import { ArtPiece, ViewState } from './types';
import { ART_PIECES } from './constants';
import { apiMe, apiLogout, User } from './src/api';


export default function App() {
  const [view, setView] = useState<ViewState>('gallery');
  const [pieces, setPieces] = useState<ArtPiece[]>(ART_PIECES);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // ── Auth State ──────────────────────────────────────
  const [user, setUser] = useState<User | null>(null);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'register' }>({
    open: false,
    mode: 'login',
  });

  const pricingRef = useRef<HTMLDivElement>(null);

  // Restore session on page load
  useEffect(() => {
    apiMe().then(({ ok, data }) => {
      if (ok && data.authenticated) setUser(data.user);
    });

    // Check if returned from NewebPay payment
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'completed') {
      // Refresh user to get updated credit balance
      apiMe().then(({ ok, data }) => {
        if (ok && data.authenticated) setUser(data.user);
      });
      window.history.replaceState({}, '', window.location.pathname);
      scrollToPricing();
    }

    // Check for hash on mount (e.g. returning from dashboard with /#pricing)
    if (window.location.hash === '#pricing') {
      scrollToPricing();
    }
  }, []);

  const scrollToPricing = () => {
    setTimeout(() => {
      pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const selectedPiece = pieces.find(p => p.id === selectedPieceId) || null;

  // ── Navigation handlers ──────────────────────────────
  const handleHomeClick = () => {
    setView('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGalleryClick = () => {
    if (view !== 'gallery') {
      setView('gallery');
      setTimeout(() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhilosophyClick = () => {
    if (view !== 'gallery') {
      setView('gallery');
      setTimeout(() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePricingClick = () => {
    if (view !== 'gallery') {
      setView('gallery');
      setTimeout(() => scrollToPricing(), 100);
    } else {
      scrollToPricing();
    }
  };

  // ── Auth handlers ────────────────────────────────────
  const handleLogout = async () => {
    await apiLogout();
    setUser(null);
  };

  // ── Video handlers ───────────────────────────────────
  const handlePieceSelect = (piece: ArtPiece) => {
    setSelectedPieceId(piece.id);
    setView('detail');
  };

  const handlePieceUpdate = (updatedPiece: ArtPiece) => {
    setPieces(prev => prev.map(p => p.id === updatedPiece.id ? updatedPiece : p));
  };

  return (
    <div className="min-h-screen relative text-black">
      <Background />
      <Navbar
        onHomeClick={handleHomeClick}
        onGalleryClick={handleGalleryClick}
        onPhilosophyClick={handlePhilosophyClick}
        onPricingClick={handlePricingClick}
        user={user}
        onLoginClick={() => setAuthModal({ open: true, mode: 'login' })}
        onRegisterClick={() => setAuthModal({ open: true, mode: 'register' })}
        onLogout={handleLogout}
      />

      <main className="relative z-10">
        {view === 'gallery' && (
          <div className="animate-pop-in">
            <Hero />
            <Gallery pieces={pieces} onSelect={handlePieceSelect} />
            {/* ── Pricing Section ── */}
            <div ref={pricingRef}>
              <Pricing
                isLoggedIn={!!user}
                onRequestLogin={() => setAuthModal({ open: true, mode: 'login' })}
              />
            </div>
          </div>
        )}

        {view === 'detail' && selectedPiece && (
          <DetailView
            piece={selectedPiece}
            onClose={handleHomeClick}
            onPlay={() => selectedPiece.videoUrl && setVideoModalOpen(true)}
            onUpdate={handlePieceUpdate}
          />
        )}
      </main>

      {videoModalOpen && selectedPiece && (
        <VideoModal videoUrl={selectedPiece.videoUrl} onClose={() => setVideoModalOpen(false)} />
      )}

      {/* ── Auth Modal ── */}
      {authModal.open && (
        <AuthModal
          initialMode={authModal.mode}
          onClose={() => setAuthModal(m => ({ ...m, open: false }))}
          onSuccess={u => {
            setUser(u);
            setAuthModal(m => ({ ...m, open: false }));
          }}
        />
      )}
    </div>
  );
}