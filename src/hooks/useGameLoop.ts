import { useEffect } from 'react';

interface CreatureType {
  id: number;
  x: number;
  y: number;
  type: 'shark' | 'serpent' | 'kraken' | 'jellyfish';
}

interface GameLoopProps {
  gameStarted: boolean;
  gameOver: boolean;
  keys: { up: boolean; down: boolean };
  submarineY: number;
  gameLoopRef: React.MutableRefObject<number | undefined>;
  sharkIdRef: React.MutableRefObject<number>;
  setSubmarineY: React.Dispatch<React.SetStateAction<number>>;
  setCreatures: React.Dispatch<React.SetStateAction<CreatureType[]>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  checkCollision: (submarineX: number, submarineY: number, sharkX: number, sharkY: number) => boolean;
}

export const useGameLoop = ({
  gameStarted,
  gameOver,
  keys,
  submarineY,
  gameLoopRef,
  sharkIdRef,
  setSubmarineY,
  setCreatures,
  setScore,
  setGameOver,
  checkCollision
}: GameLoopProps) => {
  const gameSpeed = 4;
  const submarineSpeed = 3;

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = () => {
      // Move submarine with smooth movement
      setSubmarineY(prev => {
        let newY = prev;
        if (keys.up) newY -= submarineSpeed;
        if (keys.down) newY += submarineSpeed;
        return Math.max(30, Math.min(window.innerHeight - 100, newY));
      });

      // Move creatures and check collisions
      setCreatures(prev => {
        const newCreatures = prev.map(creature => ({
          ...creature,
          x: creature.x - gameSpeed
        })).filter(creature => creature.x > -150);

        // Check collisions
        const submarineX = 100;
        for (const creature of newCreatures) {
          if (checkCollision(submarineX, submarineY, creature.x, creature.y)) {
            setGameOver(true);
            return newCreatures;
          }
        }

        return newCreatures;
      });

      // Spawn new creatures much more frequently
      if (Math.random() < 0.035) {
        const creatureTypes: CreatureType['type'][] = ['shark', 'serpent', 'kraken', 'jellyfish'];
        const randomType = creatureTypes[Math.floor(Math.random() * creatureTypes.length)];
        
        setCreatures(prev => [...prev, {
          id: sharkIdRef.current++,
          x: 1200,
          y: Math.random() * (window.innerHeight - 200) + 50,
          type: randomType
        }]);
      }

      // Update score
      setScore(prev => prev + 1);

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, keys, submarineY, gameSpeed, submarineSpeed, setSubmarineY, setCreatures, setScore, setGameOver, checkCollision, gameLoopRef, sharkIdRef]);
};