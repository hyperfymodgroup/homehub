
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { LinkCardData } from '../lib/data';

interface CardModalProps {
  card: LinkCardData | null;
  isOpen: boolean;
  onClose: () => void;
}

const CardModal = ({ card, isOpen, onClose }: CardModalProps) => {
  if (!card) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-cyber-black border border-cyber-turquoise/30 max-w-4xl w-[90vw] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-cyber-turquoise/20">
          <DialogTitle className="text-cyber-turquoise">{card.title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {card.description}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-[70vh] bg-white">
          <iframe 
            src={card.url} 
            title={card.title}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups"
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
