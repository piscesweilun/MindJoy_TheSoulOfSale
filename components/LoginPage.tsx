import React, { useState } from 'react';
import { KeyRound, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-cream)] p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent-gold)] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--accent-terracotta)] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-[var(--surface-white)] p-8 md:p-12 shadow-[var(--shadow-soft)] animate-fade-in border border-[var(--border-light)]">
        <div className="text-center mb-10">
          <h1 className="font-serif-display text-4xl mb-3 text-[var(--text-charcoal)]">MindJoy</h1>
          <p className="font-google text-[var(--text-stone)] tracking-widest text-sm uppercase">Member Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-[var(--text-stone)] font-bold mb-1">Username</label>
            <div className="relative">
              <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-gold)]" />
              <div className="pl-6 w-full">
                 <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-2 bg-transparent border-b border-[var(--border-light)] focus:border-[var(--accent-gold)] outline-none transition-colors font-google"
                  placeholder="Enter your username"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-[var(--text-stone)] font-bold mb-1">Password</label>
            <div className="relative">
              <KeyRound className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-gold)]" />
              <div className="pl-6 w-full">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 bg-transparent border-b border-[var(--border-light)] focus:border-[var(--accent-gold)] outline-none transition-colors font-google"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-[var(--accent-terracotta)] text-sm text-center font-google animate-pulse">
              {error}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full btn-elegant hover:scale-[1.02] active:scale-[0.98]"
            >
              Enter Gallery
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
            <p className="text-[10px] text-[var(--text-stone)] uppercase tracking-widest">
                Restricted Access Area
            </p>
        </div>
      </div>
    </div>
  );
}
