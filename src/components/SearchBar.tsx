
import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  visible: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, visible, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input when search becomes visible
  useEffect(() => {
    if (visible && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center pt-24 animate-fade-in">
      <div 
        ref={containerRef}
        className="w-full max-w-xl mx-4 cyber-card p-1 border-cyber-turquoise/50 animate-fade-in"
        style={{ animationDelay: '50ms' }}
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-cyber-gray rounded-md">
          <Search className="w-5 h-5 text-cyber-turquoise" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dashboard links... (Ctrl+K)"
            className="flex-1 bg-transparent border-none outline-none placeholder:text-gray-400 text-white"
            autoComplete="off"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="px-3 py-2 text-xs text-gray-400 flex justify-between">
          <span>Navigate with ↑↓ arrows</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
