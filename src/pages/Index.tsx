
import Submarine from '../components/Submarine';
import GameOver from '../components/GameOver';
import GameUI from '../components/GameUI';
import StartScreen from '../components/StartScreen';
import CreatureRenderer from '../components/CreatureRenderer';
import { useGameState } from '../hooks/useGameState';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useCollisionDetection } from '../hooks/useCollisionDetection';
import { useGameLoop } from '../hooks/useGameLoop';

const Index = () => {
  const gameState = useGameState();
  const { checkCollision } = useCollisionDetection();
  const keys = useKeyboardControls(gameState.gameStarted, gameState.gameOver, gameState.startGame);
  
  useGameLoop({
    gameStarted: gameState.gameStarted,
    gameOver: gameState.gameOver,
    keys,
    submarineY: gameState.submarineY,
    gameLoopRef: gameState.gameLoopRef,
    sharkIdRef: gameState.sharkIdRef,
    setSubmarineY: gameState.setSubmarineY,
    setCreatures: gameState.setCreatures,
    setScore: gameState.setScore,
    setGameOver: gameState.setGameOver,
    checkCollision
  });

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
        {gameState.gameStarted && <GameUI score={gameState.score} />}

        {/* Submarine */}
        {gameState.gameStarted && <Submarine y={gameState.submarineY} />}

        {/* Sea Creatures */}
        <CreatureRenderer creatures={gameState.creatures} />

        {/* Start screen */}
        {!gameState.gameStarted && !gameState.gameOver && <StartScreen />}

        {/* Game over screen */}
        {gameState.gameOver && <GameOver score={Math.floor(gameState.score / 10)} onRestart={gameState.resetGame} />}
      </div>
    </div>
  );
};

export default Index;
