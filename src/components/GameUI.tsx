interface GameUIProps {
  score: number;
}

const GameUI = ({ score }: GameUIProps) => {
  return (
    <div className="absolute top-4 right-4 text-white text-2xl font-bold z-10">
      Score: {Math.floor(score / 10)}
    </div>
  );
};

export default GameUI;