
import React, { useState, useRef, useEffect } from 'react';
import { LinkCardData } from '../lib/data';
import LinkCard from './LinkCard';
import CardModal from './CardModal';
import { useArrowNavigation } from '../lib/hooks/useHotkeys';

interface CardGridProps {
  cards: LinkCardData[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<LinkCardData | null>(null);

  // Use arrow navigation
  useArrowNavigation(gridRef, 'div.cyber-card', {
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

  const handleCardClick = (card: LinkCardData) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
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
            <LinkCard card={card} onClick={handleCardClick} />
          </div>
        ))}
      </div>

      <CardModal 
        card={selectedCard} 
        isOpen={selectedCard !== null} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default CardGrid;
