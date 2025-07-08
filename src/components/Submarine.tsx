
interface SubmarineProps {
  y: number;
}

const Submarine = ({ y }: SubmarineProps) => {
  return (
    <div 
      className="absolute left-20 transition-all duration-150 ease-out z-10"
      style={{ top: y }}
    >
      <div className="relative">
        {/* Main submarine body */}
        <div className="w-20 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full relative shadow-xl">
          {/* Conning tower */}
          <div className="absolute top-0 left-8 w-6 h-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-t-lg transform -translate-y-2"></div>
          
          {/* Periscope */}
          <div className="absolute top-0 left-10 w-1 h-6 bg-gray-800 transform -translate-y-6"></div>
          
          {/* Propeller */}
          <div className="absolute right-0 top-3 w-4 h-4 transform translate-x-2">
            <div className="w-full h-full border-2 border-yellow-400 rounded-full animate-spin"></div>
          </div>
          
          {/* Porthole */}
          <div className="absolute left-4 top-2 w-6 h-6 bg-blue-200 rounded-full border-2 border-gray-900 opacity-80">
            <div className="w-full h-full bg-gradient-to-br from-cyan-200 to-blue-400 rounded-full"></div>
          </div>
          
          {/* Depth rudders */}
          <div className="absolute top-0 right-4 w-3 h-2 bg-gray-700 transform -translate-y-1 rotate-12"></div>
          <div className="absolute bottom-0 right-4 w-3 h-2 bg-gray-700 transform translate-y-1 -rotate-12"></div>
        </div>
        
        {/* Bubble trail */}
        <div className="absolute -right-8 top-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full animate-pulse"
              style={{
                left: i * 8,
                top: i * 2,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Submarine;
