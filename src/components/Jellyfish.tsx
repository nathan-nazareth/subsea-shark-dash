interface JellyfishProps {
  x: number;
  y: number;
}

const Jellyfish = ({ x, y }: JellyfishProps) => {
  return (
    <div 
      className="absolute z-10"
      style={{ left: x, top: y }}
    >
      <div className="relative">
        {/* Bell/Umbrella */}
        <div className="w-12 h-8 bg-gradient-to-b from-cyan-300 to-cyan-500 rounded-t-full relative opacity-80">
          {/* Bioluminescent glow */}
          <div className="absolute inset-0 bg-cyan-200 rounded-t-full animate-pulse opacity-50"></div>
          
          {/* Pattern on bell */}
          <div className="absolute top-2 left-2 w-8 h-4 border-2 border-cyan-400 rounded-full opacity-60"></div>
          <div className="absolute top-3 left-3 w-6 h-3 border border-cyan-300 rounded-full opacity-40"></div>
        </div>
        
        {/* Tentacles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-b from-cyan-400 to-transparent rounded-full opacity-70"
            style={{
              width: '1px',
              height: `${15 + Math.random() * 10}px`,
              left: `${i * 2 + 2}px`,
              top: '8px',
              transform: `translateX(${Math.sin(Date.now() * 0.003 + i) * 3}px)`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
        
        {/* Longer main tentacles */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`long-${i}`}
            className="absolute bg-gradient-to-b from-cyan-500 to-transparent rounded-full opacity-60"
            style={{
              width: '2px',
              height: `${25 + Math.random() * 15}px`,
              left: `${i * 3 + 1}px`,
              top: '8px',
              transform: `translateX(${Math.sin(Date.now() * 0.002 + i) * 5}px)`,
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Jellyfish;