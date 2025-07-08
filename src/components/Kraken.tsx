interface KrakenProps {
  x: number;
  y: number;
}

const Kraken = ({ x, y }: KrakenProps) => {
  return (
    <div 
      className="absolute z-10"
      style={{ left: x, top: y }}
    >
      <div className="relative">
        {/* Main body */}
        <div className="w-16 h-12 bg-gradient-to-r from-purple-700 to-purple-900 rounded-full relative">
          {/* Eyes */}
          <div className="absolute left-2 top-2 w-3 h-3 bg-red-600 rounded-full">
            <div className="w-2 h-2 bg-black rounded-full ml-0.5"></div>
          </div>
          <div className="absolute right-2 top-2 w-3 h-3 bg-red-600 rounded-full">
            <div className="w-2 h-2 bg-black rounded-full ml-0.5"></div>
          </div>
          
          {/* Beak */}
          <div className="absolute left-6 top-6 w-4 h-3 bg-yellow-600 transform rotate-45 rounded-sm"></div>
        </div>
        
        {/* Tentacles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 bg-gradient-to-b from-purple-600 to-purple-800 rounded-full"
            style={{
              height: `${20 + Math.random() * 10}px`,
              left: `${(i % 4) * 4 + 2}px`,
              top: i < 4 ? '12px' : '8px',
              transform: `rotate(${(i - 3.5) * 15 + Math.sin(Date.now() * 0.005 + i) * 10}deg)`,
              transformOrigin: 'top center'
            }}
          >
            {/* Suction cups */}
            <div className="absolute left-0 top-2 w-2 h-1 bg-purple-400 rounded-full opacity-60"></div>
            <div className="absolute left-0 top-4 w-2 h-1 bg-purple-400 rounded-full opacity-60"></div>
            <div className="absolute left-0 top-6 w-2 h-1 bg-purple-400 rounded-full opacity-60"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kraken;