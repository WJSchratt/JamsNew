import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all">
          Jams
        </Link>
        
        <div className="flex gap-2">
          <Link 
            to="/" 
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              location.pathname === '/' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Landing
          </Link>
          <Link 
            to="/library" 
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              location.pathname === '/library' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Library
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col">
        <Navigation />
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/library" element={<Library />} />
            <Route path="/album/:slug" element={<Album />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
