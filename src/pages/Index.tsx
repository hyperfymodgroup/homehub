
import React, { useState } from 'react';
import { Search, Cpu } from 'lucide-react';
import { useSearch } from '../lib/hooks/useSearch';
import { useHotkeys } from '../lib/hooks/useHotkeys';
import { linkCards } from '../lib/data';
import SearchBar from '../components/SearchBar';
import CardGrid from '../components/CardGrid';

const Index = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    searchVisible, 
    setSearchVisible,
    toggleSearch,
    closeSearch,
    filteredItems 
  } = useSearch(linkCards);

  // Ctrl+K hotkey for search
  useHotkeys('ctrl+k', () => {
    toggleSearch();
  });

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-turquoise/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyber-turquoise animate-pulse-glow" />
            <h1 className="text-2xl font-bold text-white">
              Cyber<span className="text-cyber-turquoise">Link</span>
            </h1>
          </div>
          
          <button 
            onClick={toggleSearch}
            className="cyber-button flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
            <kbd className="ml-2 px-1 py-0.5 text-xs bg-cyber-gray rounded border border-cyber-turquoise/30">
              Ctrl+K
            </kbd>
          </button>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        visible={searchVisible}
        onClose={closeSearch}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4">
        <div className="py-6">
          <h2 className="text-xl font-semibold text-white mb-1">Dashboard</h2>
          <p className="text-gray-400 mb-6">
            Navigate with arrow keys or use Ctrl+K to search
          </p>
          
          {/* Card Grid */}
          <CardGrid cards={filteredItems} />
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500 mt-auto">
        <p>
          <span className="text-cyber-turquoise">Cyber</span>Link Dashboard &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Index;
