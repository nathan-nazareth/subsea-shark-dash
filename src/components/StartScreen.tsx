const StartScreen = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-8 text-shadow-lg">Submarine Adventure</h1>
        <p className="text-2xl mb-4">Navigate through shark-infested waters!</p>
        <p className="text-lg mb-8">Use SPACE or ↑↓ arrows to move up and down</p>
        <p className="text-xl animate-pulse">Press SPACE to start</p>
      </div>
    </div>
  );
};

export default StartScreen;