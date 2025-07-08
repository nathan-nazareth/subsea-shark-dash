
import { useState, useEffect, useRef, useCallback } from 'react';
import Submarine from '../components/Submarine';
import Shark from '../components/Shark';
import GameOver from '../components/GameOver';

interface SharkType {
  id: number;
  x: number;
  y: number;
}

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [submarineY, setSubmarineY] = useState(300);
  const [sharks, setSharks] = useState<SharkType[]>([]);
  const [keys, setKeys] = useState({ up: false, down: false });
  
  const gameLoopRef = useRef<number>();
  const sharkIdRef = useRef(0);
  const gameSpeed = 4;
  const submarineSpeed = 5;

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setSubmarineY(300);
    setSharks([]);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setSubmarineY(300);
    setSharks([]);
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
      // Move submarine
      setSubmarineY(prev => {
        let newY = prev;
        if (keys.up) newY -= submarineSpeed;
        if (keys.down) newY += submarineSpeed;
        return Math.max(50, Math.min(550, newY));
      });

      // Move sharks and check collisions
      setSharks(prev => {
        const newSharks = prev.map(shark => ({
          ...shark,
          x: shark.x - gameSpeed
        })).filter(shark => shark.x > -100);

        // Check collisions
        const submarineX = 100;
        for (const shark of newSharks) {
          if (checkCollision(submarineX, submarineY, shark.x, shark.y)) {
            setGameOver(true);
            return newSharks;
          }
        }

        return newSharks;
      });

      // Spawn new sharks
      if (Math.random() < 0.007) {
        setSharks(prev => [...prev, {
          id: sharkIdRef.current++,
          x: 1200,
          y: Math.random() * 400 + 100
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

        {/* Sharks */}
        {sharks.map(shark => (
          <Shark key={shark.id} x={shark.x} y={shark.y} />
        ))}

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
