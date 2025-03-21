
import React, { forwardRef } from 'react';
import { LinkCardData } from '../lib/data';
import { ExternalLink } from 'lucide-react';

interface LinkCardProps {
  card: LinkCardData;
}

const LinkCard = forwardRef<HTMLAnchorElement, LinkCardProps>(({ card }, ref) => {
  return (
    <a 
      href={card.url}
      ref={ref}
      className="cyber-card p-4 h-full flex flex-col justify-between group"
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={0}
    >
      <div className="z-10 relative">
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyber-turquoise transition-colors duration-200">
          {card.title}
        </h3>
        <p className="text-sm text-gray-300 mb-3">
          {card.description}
        </p>
        {card.tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {card.tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-0.5 rounded-full bg-cyber-blue/30 text-cyber-turquoise-light border border-cyber-turquoise/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-end mt-3 z-10 relative">
        <ExternalLink className="w-4 h-4 text-cyber-turquoise opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
    </a>
  );
});

LinkCard.displayName = 'LinkCard';

export default LinkCard;
