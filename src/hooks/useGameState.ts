import { useState, useRef } from 'react';

interface CreatureType {
  id: number;
  x: number;
  y: number;
  type: 'shark' | 'serpent' | 'kraken' | 'jellyfish';
}

export const useGameState = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [submarineY, setSubmarineY] = useState(300);
  const [creatures, setCreatures] = useState<CreatureType[]>([]);
  
  const gameLoopRef = useRef<number>();
  const sharkIdRef = useRef(0);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setSubmarineY(300);
    setCreatures([]);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setSubmarineY(300);
    setCreatures([]);
  };

  return {
    gameStarted,
    gameOver,
    score,
    submarineY,
    creatures,
    gameLoopRef,
    sharkIdRef,
    setGameStarted,
    setGameOver,
    setScore,
    setSubmarineY,
    setCreatures,
    startGame,
    resetGame
  };
};