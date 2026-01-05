import React, { useEffect, useRef, useState } from 'react';
import { ArtPiece } from '../types';
import { X, Camera, Pencil, Play } from 'lucide-react';
import placeholderImg from '../src/assets/images/placeholder.png';

interface DetailViewProps {
  piece: ArtPiece;
  onClose: () => void;
  onPlay: () => void;
  onUpdate: (piece: ArtPiece) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ piece, onClose, onPlay, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const keyCutInputRef = useRef<HTMLInputElement>(null);
  
  // State for text editing
  const [editingSection, setEditingSection] = useState<'philosophy' | 'script' | 'title' | 'englishTitle' | 'description' | 'usageScenario' | 'price' | null>(null);
  const [editValue, setEditValue] = useState('');
  const [activeKeyCutIndex, setActiveKeyCutIndex] = useState<number | null>(null);

  const defaultPhilosophy = '我們避開了保單數字，轉向「時間的價值」。每一場對話的鋪陳，都是為了讓客戶看見自己努力一輩子的真實倒影，從而主動做出傳承的決定。';
  const defaultScript = '「這不只是一份財產，這是您對這個世界最溫柔的叮嚀...」';
  const defaultUsage = '建議在與高資產客戶建立初步信任後，於討論資產分配或家族信託議題時播放。';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [piece.id]); 

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') onUpdate({ ...piece, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const triggerKeyCutUpload = (index: number) => {
    setActiveKeyCutIndex(index);
    keyCutInputRef.current?.click();
  };

  const handleKeyCutUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeKeyCutIndex !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            const newKeyCuts = [...(piece.keyCuts || [])];
            while(newKeyCuts.length <= activeKeyCutIndex) newKeyCuts.push(''); 
            newKeyCuts[activeKeyCutIndex] = reader.result;
            onUpdate({ ...piece, keyCuts: newKeyCuts });
        }
      };
      reader.readAsDataURL(file);
    }
    if (keyCutInputRef.current) keyCutInputRef.current.value = '';
  };

  const startEditing = (section: any) => {
    setEditingSection(section);
    let val = '';
    switch (section) {
        case 'title': val = piece.title; break;
        case 'englishTitle': val = piece.englishTitle; break;
        case 'description': val = piece.description; break;
        case 'philosophy': val = piece.narrativePhilosophy || defaultPhilosophy; break;
        case 'usageScenario': val = piece.usageScenario || defaultUsage; break;
        case 'script': val = piece.scriptPreview || defaultScript; break;
        case 'price': val = piece.price; break;
    }
    setEditValue(val);
  };

  const saveEdit = () => {
    const updatedPiece = { ...piece };
    switch (editingSection) {
        case 'title': updatedPiece.title = editValue; break;
        case 'englishTitle': updatedPiece.englishTitle = editValue; break;
        case 'description': updatedPiece.description = editValue; break;
        case 'philosophy': updatedPiece.narrativePhilosophy = editValue; break;
        case 'usageScenario': updatedPiece.usageScenario = editValue; break;
        case 'script': updatedPiece.scriptPreview = editValue; break;
        case 'price': updatedPiece.price = editValue; break;
    }
    onUpdate(updatedPiece);
    setEditingSection(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && ['title', 'englishTitle', 'description', 'price'].includes(editingSection || '')) {
        saveEdit(); 
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-cream)] animate-fade-in relative z-40 text-[var(--text-charcoal)]">
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left/Top Image Section - Reverted to non-clickable */}
            <div className="lg:w-1/2 h-[50vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden relative group">
                <img 
                    src={piece.image} 
                    alt={piece.title} 
                    className="w-full h-full object-cover transition duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 transition duration-500"></div>
                
                <div className="absolute bottom-10 left-10">
                     <button 
                        onClick={triggerUpload}
                        className="btn-outline-elegant bg-white/80 backdrop-blur flex items-center border-none hover:bg-white"
                    >
                        <Camera size={16} className="mr-2" />
                        Change Visual
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                </div>
            </div>
            
            {/* Right/Bottom Content Section */}
            <div className="lg:w-1/2 p-8 md:p-20 lg:p-24 flex flex-col justify-start bg-[var(--bg-cream)] relative">
                
                <button 
                    onClick={onClose} 
                    className="absolute top-8 right-8 p-2 text-[var(--text-stone)] hover:text-[var(--text-charcoal)] transition rounded-full hover:bg-[var(--border-light)]"
                >
                    <X size={24} strokeWidth={1.5} />
                </button>
                
                {/* Header Info */}
                <div className="mt-8 mb-12">
                    <div className="group w-fit cursor-pointer mb-4" onClick={() => startEditing('englishTitle')}>
                        {editingSection === 'englishTitle' ? (
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={saveEdit}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="text-xs font-google font-bold tracking-[0.2em] uppercase w-full bg-transparent border-b border-[var(--text-gold)]"
                            />
                        ) : (
                            <span className="text-xs font-google font-bold tracking-[0.2em] text-[var(--text-gold)] uppercase flex items-center gap-2">
                                {piece.englishTitle} — No.{piece.id}
                                <Pencil size={12} className="opacity-0 group-hover:opacity-100 text-[var(--text-stone)]" />
                            </span>
                        )}
                    </div>
                    
                    <div className="group w-fit cursor-pointer relative" onClick={() => startEditing('title')}>
                        {editingSection === 'title' ? (
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={saveEdit}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="text-5xl md:text-6xl font-serif-display text-[var(--text-charcoal)] leading-none w-full bg-transparent border-b border-[var(--text-gold)]"
                            />
                        ) : (
                            <h2 className="text-5xl md:text-6xl font-serif-display text-[var(--text-charcoal)] leading-tight">
                                {piece.title}
                                <Pencil size={18} className="absolute -right-6 top-2 opacity-0 group-hover:opacity-100 text-[var(--text-stone)]" />
                            </h2>
                        )}
                    </div>
                </div>

                {/* Primary Action Zone */}
                <div className="flex items-center gap-6 mb-16 pb-8 border-b border-[var(--border-light)]">
                     <button 
                        onClick={onPlay} 
                        disabled={!piece.videoId}
                        className="btn-elegant flex items-center justify-center gap-3 px-8"
                    >
                        {piece.videoId ? <><Play fill="currentColor" size={14}/> Play Script</> : 'Unavailable'}
                    </button>
                    <div className="flex flex-col cursor-pointer group" onClick={() => startEditing('price')}>
                        <span className="text-[10px] text-[var(--text-stone)] uppercase tracking-widest mb-1 flex items-center gap-1">
                            Price <Pencil size={8} className="opacity-0 group-hover:opacity-100" />
                        </span>
                        {editingSection === 'price' ? (
                             <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={saveEdit}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="text-xl font-serif-display text-[var(--text-charcoal)] w-24 bg-transparent border-b border-[var(--text-gold)]"
                            />
                        ) : (
                            <span className="text-xl font-serif-display text-[var(--text-charcoal)] hover:text-[var(--accent-gold)] transition">{piece.price}</span>
                        )}
                    </div>
                </div>
                
                {/* Description */}
                <div className="mb-16 group cursor-pointer" onClick={() => startEditing('description')}>
                     {editingSection === 'description' ? (
                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={saveEdit}
                            autoFocus
                            className="text-xl font-light w-full p-2 bg-white/50"
                            rows={3}
                        />
                    ) : (
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--text-stone)] border-l-2 border-[var(--text-gold)] pl-6">
                            {piece.description}
                        </p>
                    )}
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* Narrative Philosophy */}
                    <div className="group">
                         <div className="flex items-center gap-2 mb-3 cursor-pointer" onClick={() => startEditing('philosophy')}>
                            <h4 className="text-xs font-bold uppercase text-[var(--text-charcoal)] tracking-widest">Philosophy</h4>
                            <Pencil size={12} className="opacity-0 group-hover:opacity-100 text-[var(--text-stone)]" />
                        </div>
                        {editingSection === 'philosophy' ? (
                            <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} onBlur={saveEdit} autoFocus className="w-full h-32 p-2 text-sm bg-white/50" />
                        ) : (
                            <p onClick={() => startEditing('philosophy')} className="text-sm text-[var(--text-stone)] leading-7 cursor-pointer hover:text-[var(--text-charcoal)] transition">{piece.narrativePhilosophy || defaultPhilosophy}</p>
                        )}
                    </div>

                    {/* Usage Scenario */}
                    <div className="group">
                         <div className="flex items-center gap-2 mb-3 cursor-pointer" onClick={() => startEditing('usageScenario')}>
                            <h4 className="text-xs font-bold uppercase text-[var(--text-charcoal)] tracking-widest">Usage</h4>
                            <Pencil size={12} className="opacity-0 group-hover:opacity-100 text-[var(--text-stone)]" />
                        </div>
                        {editingSection === 'usageScenario' ? (
                            <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} onBlur={saveEdit} autoFocus className="w-full h-32 p-2 text-sm bg-white/50" />
                        ) : (
                            <p onClick={() => startEditing('usageScenario')} className="text-sm text-[var(--text-stone)] leading-7 cursor-pointer hover:text-[var(--text-charcoal)] transition">{piece.usageScenario || defaultUsage}</p>
                        )}
                    </div>
                    
                    {/* Script - Elegant Quote Box */}
                    <div className="md:col-span-2 bg-white p-10 shadow-sm border border-[var(--border-light)] relative group mt-4">
                        <div className="absolute top-4 right-4 text-[var(--text-gold)] opacity-20 text-6xl font-serif-display">”</div>
                        <div className="cursor-pointer" onClick={() => startEditing('script')}>
                             {editingSection === 'script' ? (
                                <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} onBlur={saveEdit} autoFocus className="w-full h-24 p-2 text-lg italic font-serif-display bg-transparent" />
                            ) : (
                                <p className="font-serif-display italic text-2xl text-[var(--text-charcoal)] leading-relaxed text-center hover:text-[var(--accent-gold)] transition">
                                    {piece.scriptPreview || defaultScript}
                                </p>
                            )}
                        </div>
                    </div>
                    
                    {/* Key Cuts */}
                    <div className="md:col-span-2 mt-8">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-stone)] mb-6 border-b border-[var(--border-light)] pb-2">Visual Moodboard</h4>
                        <div className="grid grid-cols-3 gap-6">
                            <input type="file" ref={keyCutInputRef} onChange={handleKeyCutUpload} className="hidden" accept="image/*" />
                            {(piece.keyCuts && piece.keyCuts.length > 0 ? piece.keyCuts : [1,2,3].map(() => placeholderImg)).slice(0, 3).map((cutUrl, index) => (
                                <div 
                                    key={index} 
                                    className="aspect-video bg-[var(--border-light)] cursor-pointer relative group overflow-hidden shadow-sm hover:shadow-md transition-all"
                                    onClick={() => triggerKeyCutUpload(index)}
                                >
                                    <img src={cutUrl} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" alt="" />
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};