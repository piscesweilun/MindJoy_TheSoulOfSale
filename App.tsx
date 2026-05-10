import React, { useState, useEffect } from 'react';
import { AuthModal } from './components/AuthModal';
import { AnimatedEntry } from './components/AnimatedEntry';
import { apiMe } from './src/api';

export default function App() {
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'register' }>({
    open: false,
    mode: 'login',
  });
  const [loading, setLoading] = useState(true);

  // Check session on page load
  useEffect(() => {
    apiMe().then(({ ok, data }) => {
      if (ok && data.authenticated) {
        // Automatically redirect to dashboard if logged in
        window.location.href = '/subscriber/dashboard';
      } else {
        setLoading(false);
      }
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    // Show a blank background matching the start of the animation to prevent flash
    return <div className="min-h-screen bg-[#F5F5F5]" />;
  }

  return (
    <div className="min-h-screen relative text-black">
      <AnimatedEntry onEnter={() => setAuthModal({ open: true, mode: 'login' })} />

      {/* ── Auth Modal ── */}
      {authModal.open && (
        <AuthModal
          initialMode={authModal.mode}
          onClose={() => setAuthModal(m => ({ ...m, open: false }))}
          onSuccess={() => {
            // Upon successful login/registration, redirect to backend
            window.location.href = '/subscriber/dashboard';
          }}
        />
      )}
    </div>
  );
}