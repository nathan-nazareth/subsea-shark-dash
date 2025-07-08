
interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver = ({ score, onRestart }: GameOverProps) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-gradient-to-b from-blue-800 to-blue-900 p-8 rounded-lg border-4 border-blue-400 text-center text-white shadow-2xl">
        <h2 className="text-4xl font-bold mb-4 text-red-400">Game Over!</h2>
        <div className="mb-6">
          <p className="text-xl mb-2">You were caught by a shark!</p>
          <p className="text-3xl font-bold text-yellow-400">Final Score: {score}</p>
        </div>
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-3 rounded-lg text-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Play Again
        </button>
        <p className="text-sm mt-4 opacity-75">Press SPACE to start a new game</p>
      </div>
    </div>
  );
};

export default GameOver;
