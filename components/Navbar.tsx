import React, { useState } from 'react';

interface NavbarProps {
  onHomeClick: () => void;
  credits: string;
  onUpdateCredits: (newCredits: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHomeClick, credits, onUpdateCredits }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(credits);

  const startEditing = () => {
    setEditValue(credits);
    setIsEditing(true);
  };

  const saveEdit = () => {
    onUpdateCredits(editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  };

  return (
    <nav className="fixed w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center bg-[var(--bg-cream)]/80 backdrop-blur-sm border-b border-[var(--border-light)] transition-all duration-300">
        <div 
            className="text-3xl font-google font-medium tracking-tight cursor-pointer select-none text-[var(--text-charcoal)]" 
            onClick={onHomeClick}
        >
            MindJoy
        </div>
        <div className="hidden md:flex items-center space-x-10 text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-stone)]">
            <button 
                onClick={onHomeClick} 
                className="hover:text-[var(--text-gold)] transition duration-300"
            >
                Gallery
            </button>
            <button className="hover:text-[var(--text-gold)] transition duration-300">
                Philosophy
            </button>
            <div 
                className="px-5 py-2 border border-[var(--text-charcoal)] text-[var(--text-charcoal)] hover:bg-[var(--text-charcoal)] hover:text-white transition duration-300 cursor-pointer min-w-[150px] text-center"
                onClick={startEditing}
            >
                {isEditing ? (
                    <input 
                        type="text" 
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="bg-transparent border-none text-center w-full text-inherit p-0 focus:ring-0"
                        style={{ outline: 'none', color: 'inherit' }}
                    />
                ) : (
                    <span>{credits}</span>
                )}
            </div>
        </div>
    </nav>
  );
};