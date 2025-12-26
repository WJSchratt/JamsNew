import { useRef, useEffect } from 'react';

function PlayerBar({ 
  audioRef, 
  currentSong, 
  isPlaying, 
  currentTime, 
  duration, 
  volume,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange
}) {
  const seekBarRef = useRef(null);
  
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeekBarClick = (e) => {
    const bar = seekBarRef.current;
    const clickPosition = (e.clientX - bar.getBoundingClientRect().left) / bar.offsetWidth;
    onSeek(clickPosition);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-purple-500/30 shadow-2xl z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Song Info & Controls */}
        <div className="flex items-center gap-6 mb-4">
          {/* Album Art */}
          {currentSong && (
            <img 
              src={currentSong.albumCover} 
              alt="Album"
              className="w-16 h-16 rounded-lg shadow-lg"
            />
          )}
          
          {/* Song Details */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-semibold text-lg truncate">
              {currentSong ? currentSong.title : 'No song selected'}
            </h4>
            <p className="text-gray-400 text-sm truncate">
              {currentSong ? currentSong.artist : ''}
            </p>
          </div>

          {/* Playback Controls */}
            <div className="flex items-center gap-4">
            <button
              onClick={onPrevious}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-semibold"
              aria-label="Previous"
            >
              Previous
            </button>

            <button
              onClick={onPlayPause}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button
              onClick={onNext}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-semibold"
              aria-label="Next"
            >
              Next
            </button>
            </div>
          {/* Volume Control */}
          <div className="hidden md:flex items-center gap-3 w-32">
            <i className="ion-ios-volume-high text-gray-400 text-xl"></i>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        {/* Seek Bar */}
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          
          <div 
            ref={seekBarRef}
            onClick={handleSeekBarClick}
            className="flex-1 h-2 bg-gray-700 rounded-full cursor-pointer relative overflow-hidden"
          >
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-gray-400 text-sm min-w-[40px] text-right">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlayerBar;
