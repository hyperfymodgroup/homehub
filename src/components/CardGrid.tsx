
import React, { useRef, useEffect } from 'react';
import { LinkCardData } from '../lib/data';
import LinkCard from './LinkCard';
import { useArrowNavigation } from '../lib/hooks/useHotkeys';

interface CardGridProps {
  cards: LinkCardData[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Use arrow navigation
  useArrowNavigation(gridRef, 'a.cyber-card', {
    onSelect: (element) => {
      // Trigger click on Enter key
      element.click();
    },
    wrap: true
  });

  // Handle no results state
  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-400">
        <div className="text-cyber-turquoise mb-2 text-4xl">404</div>
        <p>No matching links found</p>
      </div>
    );
  }

  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4"
    >
      {cards.map((card, index) => (
        <div 
          key={card.id} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <LinkCard card={card} />
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
