import React, { useState, useEffect } from 'react';
import { searchMovies, getTrendingMovies } from './services/tmdb';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import PersonDetail from './components/PersonDetail';
import Profile from './components/Profile';
import SearchAutocomplete from './components/SearchAutocomplete';
import { Search, Film, User } from 'lucide-react';



function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    setLoading(true);
    try {
      const results = await getTrendingMovies();
      setMovies(results);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId);
    setShowProfile(false);
  };

  const goHome = () => {
    setSelectedMovieId(null);
    setSelectedPersonId(null);
    setShowProfile(false);
    loadTrending();
  };


  return (
    <div className="min-h-screen text-text font-body selection:bg-accent selection:text-black">
      <div className="scanlines"></div>
      <div className="grain"></div>

      {/* Header */}
      {!selectedMovieId && !selectedPersonId && !showProfile && (
        <header className="sticky top-0 z-50 py-4 backdrop-blur-md border-b border-white/5 bg-black/50">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div
              className="flex items-center gap-2 font-display text-3xl text-accent cursor-pointer group"
              onClick={goHome}
            >
              <Film className="group-hover:rotate-12 transition-transform" />
              <span className='tracking-widest'>CINEHUB</span>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <SearchAutocomplete onSelectMovie={handleMovieSelect} />

              <button
                onClick={() => setShowProfile(true)}
                className="px-4 py-2 border border-white/10 text-muted hover:border-cyan hover:text-cyan transition-all flex items-center gap-2 font-display text-sm tracking-wider"
                title="View Profile"
              >
                <User size={18} />
                <span className="hidden md:inline">PROFILE</span>
              </button>
            </div>
          </div>
        </header>
      )}


      <main className="container mx-auto px-4 py-8 relative z-10">
        {showProfile ? (
          <Profile
            onBack={() => setShowProfile(false)}
            onSelectMovie={handleMovieSelect}
          />
        ) : selectedPersonId ? (
          <PersonDetail
            personId={selectedPersonId}
            onBack={() => setSelectedPersonId(null)}
            onSelectMovie={(id) => {
              setSelectedPersonId(null);
              setSelectedMovieId(id);
            }}
          />
        ) : selectedMovieId ? (
          <MovieDetail
            movieId={selectedMovieId}
            onBack={() => setSelectedMovieId(null)}
            onSelectPerson={(id) => setSelectedPersonId(id)}
          />
        ) : (
          <>
            <div className="flex items-center gap-2 mb-8">
              <div className="h-1 w-1 bg-accent rounded-full animate-ping"></div>
              <h2 className="font-display text-2xl text-muted tracking-wider">
                TRENDING_DATA_STREAM
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="aspect-[2/3] glass-panel animate-pulse bg-white/5"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => setSelectedMovieId(movie.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
