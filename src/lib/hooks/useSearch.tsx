
import { useState, useEffect, useMemo } from 'react';
import { LinkCardData } from '../data';

export function useSearch(items: LinkCardData[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  // Toggle search visibility
  const toggleSearch = () => {
    setSearchVisible(prev => !prev);
    if (!searchVisible) {
      // Reset search when opening
      setSearchTerm('');
    }
  };

  // Close search
  const closeSearch = () => {
    setSearchVisible(false);
  };

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    
    const searchLower = searchTerm.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }, [items, searchTerm]);

  // Listen for Ctrl+K to toggle search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      } else if (e.key === 'Escape' && searchVisible) {
        closeSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchVisible]);

  return {
    searchTerm,
    setSearchTerm,
    searchVisible, 
    setSearchVisible,
    toggleSearch,
    closeSearch,
    filteredItems
  };
}
