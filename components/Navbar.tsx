import React, { useState } from 'react';
import { LogOut, Coins } from 'lucide-react';
import { User } from '../src/api';

interface NavbarProps {
  onHomeClick: () => void;
  onGalleryClick: () => void;
  onPhilosophyClick: () => void;
  onPricingClick: () => void;
  user: User | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onHomeClick,
  onGalleryClick,
  onPhilosophyClick,
  onPricingClick,
  user,
  onLoginClick,
  onRegisterClick,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center bg-[var(--bg-cream)]/80 backdrop-blur-sm border-b border-[var(--border-light)] transition-all duration-300">
      {/* Logo */}
      <div
        className="text-3xl font-google font-medium tracking-tight cursor-pointer select-none text-[var(--text-charcoal)]"
        onClick={onHomeClick}
      >
        MindJoy
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-stone)]">
        <button onClick={onGalleryClick} className="hover:text-[var(--text-gold)] transition duration-300">Gallery</button>
        <button onClick={onPhilosophyClick} className="hover:text-[var(--text-gold)] transition duration-300">Philosophy</button>
        <button onClick={onPricingClick} className="hover:text-[var(--text-gold)] transition duration-300">點數方案</button>

        {user ? (
          // ── Logged In ──
          <div className="flex items-center gap-4">
            {/* Credit Balance */}
            <button
              id="nav-credits"
              onClick={onPricingClick}
              className="flex items-center gap-1.5 px-4 py-2 border border-[var(--border-light)] hover:border-[var(--accent-gold)] transition duration-300"
              title="購買更多點數"
            >
              <Coins size={14} className="text-[var(--accent-gold)]" />
              <span className="text-[var(--text-charcoal)]">{user.credit_balance} 點</span>
            </button>
            {/* User name */}
            <span className="text-[var(--text-stone)] text-xs">{user.name}</span>
            {/* Dashboard Link */}
            <a
              href="/subscriber/dashboard"
              className="px-3 py-1.5 border border-[var(--text-charcoal)] text-[var(--text-charcoal)] hover:bg-[var(--text-charcoal)] hover:text-white transition duration-300"
            >
              進入後台
            </a>
            {/* Logout */}
            <button
              id="nav-logout"
              onClick={onLogout}
              title="登出"
              className="text-[var(--text-stone)] hover:text-[var(--text-charcoal)] transition duration-300 ml-2"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          // ── Guest ──
          <div className="flex items-center gap-3">
            <button
              id="nav-login"
              onClick={onLoginClick}
              className="btn-outline-elegant"
            >
              登入
            </button>
            <button
              id="nav-register"
              onClick={onRegisterClick}
              className="btn-elegant"
            >
              免費註冊
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-[var(--text-charcoal)]"
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <div className="space-y-1.5">
          <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--bg-cream)] border-b border-[var(--border-light)] flex flex-col px-6 py-4 gap-4 text-xs tracking-[0.2em] uppercase text-[var(--text-stone)] md:hidden">
          <button onClick={() => { onGalleryClick(); setMenuOpen(false); }}>Gallery</button>
          <button onClick={() => { onPhilosophyClick(); setMenuOpen(false); }}>Philosophy</button>
          <button onClick={() => { onPricingClick(); setMenuOpen(false); }}>點數方案</button>
          {user ? (
            <>
              <a href="/subscriber/dashboard" className="text-left text-[var(--text-charcoal)]">進入後台</a>
              <span className="text-[var(--text-charcoal)]">{user.name} · {user.credit_balance} 點</span>
              <button onClick={() => { onLogout(); setMenuOpen(false); }} className="text-left">登出</button>
            </>
          ) : (
            <>
              <button onClick={() => { onLoginClick(); setMenuOpen(false); }}>登入</button>
              <button onClick={() => { onRegisterClick(); setMenuOpen(false); }}>免費註冊</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};