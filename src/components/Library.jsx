import { Link } from 'react-router-dom';
import albumData from '../data/albums';

function Library() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          songs



          
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {albumData.map((album, index) => (
            <Link 
              key={index} 
              to={`/album/${album.slug}`}
              className="group"
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-2xl overflow-hidden border border-purple-500/20 shadow-lg transition-all">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={album.albumCover} 
                    alt={album.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white font-semibold">Play Now</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1 truncate">
                    {album.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {album.artist}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {album.songs.length} songs
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Library;
