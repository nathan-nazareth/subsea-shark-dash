
import { useState, useEffect, useRef, useCallback } from 'react';
import Submarine from '../components/Submarine';
import Shark from '../components/Shark';
import SeaSerpent from '../components/SeaSerpent';
import Kraken from '../components/Kraken';
import Jellyfish from '../components/Jellyfish';
import GameOver from '../components/GameOver';

interface CreatureType {
  id: number;
  x: number;
  y: number;
  type: 'shark' | 'serpent' | 'kraken' | 'jellyfish';
}

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [submarineY, setSubmarineY] = useState(300);
  const [creatures, setCreatures] = useState<CreatureType[]>([]);
  const [keys, setKeys] = useState({ up: false, down: false });
  
  const gameLoopRef = useRef<number>();
  const sharkIdRef = useRef(0);
  const gameSpeed = 4;
  const submarineSpeed = 3;

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
  }, [gameStarted, gameOver]);

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

  const checkCollision = (submarineX: number, submarineY: number, sharkX: number, sharkY: number) => {
    const submarineWidth = 80;
    const submarineHeight = 40;
    const sharkWidth = 60;
    const sharkHeight = 30;
    
    return (
      submarineX < sharkX + sharkWidth &&
      submarineX + submarineWidth > sharkX &&
      submarineY < sharkY + sharkHeight &&
      submarineY + submarineHeight > sharkY
    );
  };

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
  }, [gameStarted, gameOver, keys, submarineY]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 overflow-hidden relative">
      {/* Ocean floor */}
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-amber-800 to-amber-600"></div>
      
      {/* Floating particles/bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white bg-opacity-30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Game area */}
      <div className="relative w-full h-screen">
        {/* Score */}
        {gameStarted && (
          <div className="absolute top-4 right-4 text-white text-2xl font-bold z-10">
            Score: {Math.floor(score / 10)}
          </div>
        )}

        {/* Submarine */}
        {gameStarted && <Submarine y={submarineY} />}

        {/* Sea Creatures */}
        {creatures.map(creature => {
          switch (creature.type) {
            case 'shark':
              return <Shark key={creature.id} x={creature.x} y={creature.y} />;
            case 'serpent':
              return <SeaSerpent key={creature.id} x={creature.x} y={creature.y} />;
            case 'kraken':
              return <Kraken key={creature.id} x={creature.x} y={creature.y} />;
            case 'jellyfish':
              return <Jellyfish key={creature.id} x={creature.x} y={creature.y} />;
            default:
              return null;
          }
        })}

        {/* Start screen */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-6xl font-bold mb-8 text-shadow-lg">Submarine Adventure</h1>
              <p className="text-2xl mb-4">Navigate through shark-infested waters!</p>
              <p className="text-lg mb-8">Use SPACE or ↑↓ arrows to move up and down</p>
              <p className="text-xl animate-pulse">Press SPACE to start</p>
            </div>
          </div>
        )}

        {/* Game over screen */}
        {gameOver && <GameOver score={Math.floor(score / 10)} onRestart={resetGame} />}
      </div>
    </div>
  );
};

export default Index;
