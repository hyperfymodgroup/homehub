
import { useEffect, RefObject } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

interface HotkeyOptions {
  isEnabled?: boolean;
  preventDefault?: boolean;
}

export function useHotkeys(
  keys: string | string[],
  callback: KeyHandler,
  options: HotkeyOptions = {}
) {
  const { isEnabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!isEnabled) return;

    const keysArray = Array.isArray(keys) ? keys : [keys];

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey;
      const alt = event.altKey;
      const shift = event.shiftKey;
      const meta = event.metaKey;

      for (const keyCombo of keysArray) {
        const parts = keyCombo.toLowerCase().split('+');
        const mainKey = parts[parts.length - 1];
        const hasCtrl = parts.includes('ctrl');
        const hasAlt = parts.includes('alt');
        const hasShift = parts.includes('shift');
        const hasMeta = parts.includes('meta');

        const isMatch = 
          key === mainKey &&
          ctrl === hasCtrl &&
          alt === hasAlt &&
          shift === hasShift &&
          meta === hasMeta;

        if (isMatch) {
          if (preventDefault) {
            event.preventDefault();
          }
          callback(event);
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keys, callback, isEnabled, preventDefault]);
}

// A specialized hook for arrow key navigation
export function useArrowNavigation(
  gridRef: RefObject<HTMLDivElement>,
  itemSelector: string,
  options: { 
    onSelect?: (element: HTMLElement) => void,
    wrap?: boolean
  } = {}
) {
  const { onSelect, wrap = true } = options;

  useEffect(() => {
    if (!gridRef.current) return;

    const grid = gridRef.current;
    let focusedElement: HTMLElement | null = null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) {
        return;
      }

      e.preventDefault();

      const items = Array.from(grid.querySelectorAll(itemSelector)) as HTMLElement[];
      if (items.length === 0) return;

      // If no element is focused, focus the first one
      if (!focusedElement || !document.activeElement || !grid.contains(document.activeElement as Node)) {
        focusedElement = items[0];
        focusedElement.focus();
        return;
      }

      const currentIndex = items.indexOf(focusedElement);
      let nextIndex = currentIndex;

      // Get number of columns (items per row)
      const firstItemRect = items[0].getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      const columnsPerRow = Math.max(1, Math.floor(gridRect.width / firstItemRect.width));

      switch (e.key) {
        case 'ArrowRight':
          nextIndex = currentIndex + 1;
          if (nextIndex >= items.length) {
            nextIndex = wrap ? 0 : items.length - 1;
          }
          break;
        case 'ArrowLeft':
          nextIndex = currentIndex - 1;
          if (nextIndex < 0) {
            nextIndex = wrap ? items.length - 1 : 0;
          }
          break;
        case 'ArrowDown':
          nextIndex = currentIndex + columnsPerRow;
          if (nextIndex >= items.length) {
            nextIndex = wrap ? nextIndex % items.length : currentIndex;
          }
          break;
        case 'ArrowUp':
          nextIndex = currentIndex - columnsPerRow;
          if (nextIndex < 0) {
            nextIndex = wrap ? items.length + nextIndex : currentIndex;
          }
          break;
        case 'Enter':
          if (onSelect && focusedElement) {
            onSelect(focusedElement);
          }
          return;
      }

      if (nextIndex !== currentIndex && items[nextIndex]) {
        focusedElement = items[nextIndex];
        focusedElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [gridRef, itemSelector, onSelect, wrap]);
}
