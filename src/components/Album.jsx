import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import albumData from '../data/albums';
import PlayerBar from './PlayerBar';

function Album() {
  const { slug } = useParams();
  const audioRef = useRef(new Audio());
  
  const album = albumData.find(album => album.slug === slug);
  
  const [currentSong, setCurrentSong] = useState(album.songs[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(album.songs[0].duration);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredSong, setHoveredSong] = useState(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = album.songs[0].audioSrc;
    audio.volume = 0.5;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.pause();
      audio.src = null;
    };
  }, [album]);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const setSong = (song) => {
    audioRef.current.src = song.audioSrc;
    setCurrentSong(song);
  };

  const handleSongClick = (song) => {
    const isSameSong = currentSong === song;
    if (isPlaying && isSameSong) {
      pause();
    } else {
      if (!isSameSong) setSong(song);
      play();
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handlePrevious = () => {
    const currentIndex = album.songs.findIndex(song => currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    setSong(album.songs[newIndex]);
    if (isPlaying) play();
  };

  const handleNext = () => {
    const currentIndex = album.songs.findIndex(song => currentSong === song);
    const newIndex = Math.min(album.songs.length - 1, currentIndex + 1);
    setSong(album.songs[newIndex]);
    if (isPlaying) play();
  };

  const handleSeek = (percentage) => {
    const newTime = audioRef.current.duration * percentage;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (newVolume) => {
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "-:--";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="min-h-screen pb-56 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Album Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <img 
            src={album.albumCover} 
            alt={album.title}
            className="w-full md:w-80 h-80 object-cover rounded-2xl shadow-2xl"
          />
          
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {album.title}
            </h1>
            <h2 className="text-3xl text-gray-300 mb-2">{album.artist}</h2>
            <p className="text-gray-500">{album.releaseInfo}</p>
            <p className="text-gray-500 mt-2">{album.songs.length} songs</p>
          </div>
        </div>

        {/* Song List */}
        <div className="bg-slate-800/30 rounded-2xl overflow-hidden border border-purple-500/20">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="text-left p-4 text-gray-400 font-semibold">Title</th>
                <th className="text-right p-4 text-gray-400 font-semibold w-24">Time</th>
              </tr>
            </thead>
            <tbody>
              {album.songs.map((song, index) => (
                <tr 
                  key={index}
                  onClick={() => handleSongClick(song)}
                  onMouseEnter={() => setHoveredSong(song)}
                  onMouseLeave={() => setHoveredSong(null)}
                  className={`cursor-pointer transition-colors relative ${
                    currentSong === song 
                      ? 'bg-purple-900/30' 
                      : 'hover:bg-slate-700/30'
                  }`}
                >
                  <td className="p-4 relative overflow-hidden">
                    {/* Progress bar background - only shows for current song */}
                    {currentSong === song && (
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-400/30 transition-all duration-300"
                        style={{ 
                          width: `${(currentTime / duration) * 100}%`,
                          left: 0
                        }}
                      />
                    )}
                    {/* Song title text - stays on top */}
                    <span className={`relative z-10 ${
                      currentSong === song ? 'text-purple-400 font-semibold' : 'text-gray-300'
                    }`}>
                      {song.title}
                    </span>
                  </td>
                  <td className="p-4 text-right text-gray-500">
                    {formatTime(song.duration)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PlayerBar
        audioRef={audioRef}
        currentSong={{
          ...currentSong,
          artist: album.artist,
          albumCover: album.albumCover
        }}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
}

export default Album;