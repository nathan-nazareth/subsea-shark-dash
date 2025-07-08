
interface SharkProps {
  x: number;
  y: number;
}

const Shark = ({ x, y }: SharkProps) => {
  return (
    <div 
      className="absolute z-10"
      style={{ left: x, top: y }}
    >
      <div className="relative">
        {/* Main shark body */}
        <div className="w-16 h-8 bg-gradient-to-r from-gray-500 to-gray-700 relative">
          {/* Shark head (triangular) */}
          <div className="absolute left-0 top-0 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-gray-600 transform -translate-x-2"></div>
          
          {/* Dorsal fin */}
          <div className="absolute top-0 left-6 w-0 h-0 border-l-3 border-r-3 border-b-6 border-transparent border-b-gray-600 transform -translate-y-6"></div>
          
          {/* Tail fin */}
          <div className="absolute right-0 top-1 w-0 h-0 border-t-3 border-b-3 border-l-6 border-transparent border-l-gray-600 transform translate-x-6"></div>
          
          {/* Pectoral fins */}
          <div className="absolute left-4 bottom-0 w-0 h-0 border-l-2 border-r-4 border-t-3 border-transparent border-t-gray-600 transform translate-y-3 -rotate-12"></div>
          
          {/* Eye */}
          <div className="absolute left-2 top-1 w-2 h-2 bg-red-500 rounded-full">
            <div className="w-1 h-1 bg-black rounded-full ml-0.5 mt-0.5"></div>
          </div>
          
          {/* Teeth */}
          <div className="absolute left-0 top-2 w-1 h-1 bg-white transform -translate-x-1 rotate-45"></div>
          <div className="absolute left-0 top-3 w-1 h-1 bg-white transform -translate-x-1 rotate-45"></div>
          <div className="absolute left-0 top-4 w-1 h-1 bg-white transform -translate-x-1 rotate-45"></div>
        </div>
        
        {/* Swimming animation effect */}
        <div className="absolute inset-0 animate-pulse opacity-50">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Shark;
