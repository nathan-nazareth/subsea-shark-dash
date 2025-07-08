
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
        {/* Main shark body - more streamlined */}
        <div className="w-20 h-10 bg-gradient-to-r from-slate-600 to-slate-800 relative rounded-l-full rounded-r-lg">
          {/* Shark head (more pointed) */}
          <div className="absolute left-0 top-2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[12px] border-transparent border-r-slate-700 transform -translate-x-3"></div>
          
          {/* Dorsal fin - larger and more prominent */}
          <div className="absolute top-0 left-8 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[10px] border-transparent border-b-slate-700 transform -translate-y-8"></div>
          
          {/* Tail fin - more realistic */}
          <div className="absolute right-0 top-0 w-0 h-0 border-t-[5px] border-b-[5px] border-l-[8px] border-transparent border-l-slate-700 transform translate-x-8"></div>
          <div className="absolute right-0 top-6 w-0 h-0 border-t-[3px] border-b-[3px] border-l-[6px] border-transparent border-l-slate-700 transform translate-x-8"></div>
          
          {/* Pectoral fins */}
          <div className="absolute left-6 bottom-0 w-0 h-0 border-l-[3px] border-r-[5px] border-t-[4px] border-transparent border-t-slate-700 transform translate-y-4 -rotate-12"></div>
          
          {/* Gills */}
          <div className="absolute left-4 top-2 w-[1px] h-6 bg-slate-800 opacity-60"></div>
          <div className="absolute left-5 top-2 w-[1px] h-6 bg-slate-800 opacity-60"></div>
          <div className="absolute left-6 top-2 w-[1px] h-6 bg-slate-800 opacity-60"></div>
          
          {/* Eye - more menacing */}
          <div className="absolute left-3 top-2 w-3 h-3 bg-yellow-400 rounded-full border border-black">
            <div className="w-2 h-2 bg-black rounded-full ml-0.5 mt-0.5"></div>
          </div>
          
          {/* Mouth and teeth */}
          <div className="absolute left-0 top-4 w-2 h-2 bg-red-900 transform -translate-x-2 rounded-b-full"></div>
          <div className="absolute left-0 top-3 w-[2px] h-[3px] bg-white transform -translate-x-2 rotate-45"></div>
          <div className="absolute left-0 top-4 w-[2px] h-[3px] bg-white transform -translate-x-2 rotate-45"></div>
          <div className="absolute left-0 top-5 w-[2px] h-[3px] bg-white transform -translate-x-2 rotate-45"></div>
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
