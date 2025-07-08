import { useState, useEffect, useCallback } from 'react';

export const useKeyboardControls = (gameStarted: boolean, gameOver: boolean, startGame: () => void) => {
  const [keys, setKeys] = useState({ up: false, down: false });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      setKeys(prev => ({ ...prev, up: true }));
      if (!gameStarted && !gameOver) {
        startGame();
      }
    }
    if (e.code === 'ArrowDown') {
      e.preventDefault();
      setKeys(prev => ({ ...prev, down: true }));
    }
  }, [gameStarted, gameOver, startGame]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      setKeys(prev => ({ ...prev, up: false }));
    }
    if (e.code === 'ArrowDown') {
      setKeys(prev => ({ ...prev, down: false }));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return keys;
};