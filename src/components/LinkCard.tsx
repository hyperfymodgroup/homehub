import React, { forwardRef } from 'react';
import { LinkCardData } from '../lib/data';

interface LinkCardProps {
  card: LinkCardData;
  actionType: 'modal' | 'newTab'; // New prop to specify action type
  onClick: (card: LinkCardData) => void; // Optional prop for modal action
}

const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(({ card, actionType, onClick }, ref) => {
  const handleClick = () => {
    if (actionType === 'modal' && onClick) {
      onClick(card);
    } else if (actionType === 'newTab') {
      window.open(card.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      ref={ref}
      className="cyber-card p-4 h-full flex flex-col justify-between group cursor-pointer"
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="z-10 relative">
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyber-turquoise transition-colors duration-200">
          {card.title}
        </h3>
        <p className="text-sm text-gray-300 mb-3">
          {card.description}
        </p>
      </div>
    </div>
  );
});

LinkCard.displayName = 'LinkCard';

export default LinkCard;