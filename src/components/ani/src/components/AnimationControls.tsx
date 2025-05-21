import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface AnimationControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  resetAnimation: () => void;
}

const AnimationControls: React.FC<AnimationControlsProps> = ({ 
  isPlaying, 
  togglePlay, 
  resetAnimation 
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/10 backdrop-blur-md p-2 rounded-full shadow-lg flex gap-2">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button
        onClick={resetAnimation}
        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        aria-label="Reset animation"
      >
        <RotateCcw size={20} />
      </button>
    </div>
  );
};

export default AnimationControls;