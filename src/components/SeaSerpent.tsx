interface SeaSerpentProps {
  x: number;
  y: number;
}

const SeaSerpent = ({ x, y }: SeaSerpentProps) => {
  return (
    <div 
      className="absolute z-10"
      style={{ left: x, top: y }}
    >
      <div className="relative">
        {/* Serpent body segments */}
        <div className="flex items-center">
          {/* Head */}
          <div className="w-8 h-6 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-l-full relative">
            {/* Eyes */}
            <div className="absolute left-1 top-1 w-2 h-2 bg-red-500 rounded-full">
              <div className="w-1 h-1 bg-black rounded-full ml-0.5"></div>
            </div>
            {/* Fangs */}
            <div className="absolute left-0 top-3 w-1 h-2 bg-white transform -translate-x-1"></div>
            <div className="absolute left-1 top-3 w-1 h-2 bg-white transform -translate-x-1"></div>
          </div>
          
          {/* Body segments */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-4 bg-gradient-to-b from-emerald-500 to-emerald-700 relative"
              style={{
                transform: `translateY(${Math.sin(Date.now() * 0.01 + i) * 2}px)`,
                borderRadius: i === 5 ? '0 50% 50% 0' : '0'
              }}
            >
              {/* Scales */}
              <div className="absolute inset-0 bg-emerald-400 opacity-30 rounded-full transform scale-75"></div>
            </div>
          ))}
        </div>
        
        {/* Fins along the body */}
        <div className="absolute top-0 left-4 w-0 h-0 border-l-2 border-r-2 border-b-3 border-transparent border-b-emerald-600 transform -translate-y-3"></div>
        <div className="absolute top-0 left-8 w-0 h-0 border-l-2 border-r-2 border-b-3 border-transparent border-b-emerald-600 transform -translate-y-3"></div>
      </div>
    </div>
  );
};

export default SeaSerpent;