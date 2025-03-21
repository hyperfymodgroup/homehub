
import React from 'react';
import { Search, Cpu, Clock, Github } from 'lucide-react';
import { useSearch } from '../lib/hooks/useSearch';
import { useHotkeys } from '../lib/hooks/useHotkeys';
import { linkCards } from '../lib/data';
import SearchBar from '../components/SearchBar';
import CardGrid from '../components/CardGrid';
import TimeZoneDropdown from '../components/TimeZoneDropdown';
import CarbonLogoDiscord from '../components/icons/CarbonLogoDiscord';
import CarbonLogoGithub from '../components/icons/CarbonLogoGithub';

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
              ~/&nbsp;<span className="text-cyber-turquoise">hub</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-turquoise transition-colors">
              <CarbonLogoGithub className="w-5 h-5" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-turquoise transition-colors">
              <CarbonLogoDiscord className="w-5 h-5" />
            </a>
            <TimeZoneDropdown />
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
          <h2 className="text-xl font-semibold text-white mb-6">Welcome ~/</h2>

          {/* Card Grid */}
          <CardGrid cards={filteredItems} />
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500 mt-auto">
        <p>
          <span className="text-cyber-turquoise">~/</span>hub
        </p>
      </footer>
    </div>
  );
};

export default Index;
