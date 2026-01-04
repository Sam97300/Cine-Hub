import React, { useState, useEffect } from 'react';
import { searchMovies, getTrendingMovies } from './services/tmdb';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import PersonDetail from './components/PersonDetail';
import { Search, Film } from 'lucide-react';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return loadTrending();

    setLoading(true);
    setSelectedMovieId(null);
    setSelectedPersonId(null);
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const goHome = () => {
    setSelectedMovieId(null);
    setSelectedPersonId(null);
    setQuery('');
    loadTrending();
  };

  return (
    <div className="min-h-screen text-text font-body selection:bg-accent selection:text-black">
      <div className="scanlines"></div>
      <div className="grain"></div>

      {/* Header */}
      {!selectedMovieId && !selectedPersonId && (
        <header className="sticky top-0 z-50 py-4 backdrop-blur-md border-b border-white/5 bg-black/50">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div
              className="flex items-center gap-2 font-display text-3xl text-accent cursor-pointer group"
              onClick={goHome}
            >
              <Film className="group-hover:rotate-12 transition-transform" />
              <span className='tracking-widest'>CINEHUB</span>
            </div>

            <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH_DATABASE..."
                className="w-full bg-black/40 border border-white/10 rounded-none px-4 py-2 pl-10 font-mono text-sm text-cyan focus:outline-none focus:border-cyan focus:shadow-[0_0_15px_rgba(0,255,225,0.2)] transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-cyan w-4 h-4" />
            </form>
          </div>
        </header>
      )}

      <main className="container mx-auto px-4 py-8 relative z-10">
        {selectedPersonId ? (
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
                {query ? `RESULTS_FOR: "${query.toUpperCase()}"` : 'TRENDING_DATA_STREAM'}
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
