import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import { getImageUrl } from '../services/tmdb';
import GenrePieChart from './GenrePieChart';
import { ArrowLeft, Bookmark, Clock, X, Heart } from 'lucide-react';

const Profile = ({ onBack, onSelectMovie }) => {
    const { watchlist, watchedMovies, favorites, removeFromWatchlist, removeFromWatched, removeFromFavorites, getGenreStats } = useMovieContext();

    const genreStats = getGenreStats();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Sort watched movies by date (most recent first)
    const sortedWatchedMovies = [...watchedMovies].sort((a, b) =>
        new Date(b.watchedAt) - new Date(a.watchedAt)
    );

    return (
        <div className="animate-in fade-in duration-700 container mx-auto px-4 py-8 max-w-7xl relative z-10">
            <button
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-muted hover:text-cyan transition-colors font-display text-xl"
            >
                <ArrowLeft size={20} /> RETURN_TO_GRID
            </button>

            <h1 className="font-display text-6xl tracking-wide text-accent mb-12 text-center" style={{ textShadow: '0 0 20px rgba(255, 69, 0, 0.5)' }}>
                USER_PROFILE
            </h1>

            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="glass-panel p-6 border-l-4 border-l-accent hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <Bookmark className="text-accent" size={24} />
                        <h3 className="font-display text-xl text-accent tracking-wider">WATCHLIST</h3>
                    </div>
                    <p className="text-5xl font-display text-white">{watchlist.length}</p>
                    <p className="text-sm text-muted font-mono mt-1">movies queued</p>
                </div>

                <div className="glass-panel p-6 border-l-4 border-l-pink-500 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <Heart className="text-pink-500" size={24} />
                        <h3 className="font-display text-xl text-pink-500 tracking-wider">FAVORITES</h3>
                    </div>
                    <p className="text-5xl font-display text-white">{favorites.length}</p>
                    <p className="text-sm text-muted font-mono mt-1">all time best</p>
                </div>

                <div className="glass-panel p-6 border-l-4 border-l-cyan hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <Clock className="text-cyan" size={24} />
                        <h3 className="font-display text-xl text-cyan tracking-wider">WATCHED</h3>
                    </div>
                    <p className="text-5xl font-display text-white">{watchedMovies.length}</p>
                    <p className="text-sm text-muted font-mono mt-1">movies completed</p>
                </div>

                <div className="glass-panel p-6 border-l-4 border-l-white/30 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-xl text-white tracking-wider">GENRES</h3>
                    </div>
                    <p className="text-5xl font-display text-white">{Object.keys(genreStats).length}</p>
                    <p className="text-sm text-muted font-mono mt-1">unique genres</p>
                </div>
            </div>

            {/* Genre Distribution Chart */}
            {watchedMovies.length > 0 && (
                <div className="mb-12">
                    <GenrePieChart genreStats={genreStats} />
                </div>
            )}

            {/* Favorites Section */}
            <section className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-1 bg-pink-500 rounded-full animate-ping"></div>
                    <h2 className="font-display text-3xl text-pink-500 tracking-wider">YOUR_FAVORITES</h2>
                </div>

                {favorites.length === 0 ? (
                    <div className="glass-panel p-12 text-center">
                        <Heart className="mx-auto mb-4 text-muted" size={48} />
                        <p className="text-muted font-mono text-lg">NO_FAVORITES_YET</p>
                        <p className="text-sm text-muted/60 mt-2">Heart your favorite movies to see them here!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {favorites.map((movie) => (
                            <div
                                key={movie.id}
                                className="glass-panel group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                            >
                                <div className="aspect-[2/3] w-full relative" onClick={() => onSelectMovie(movie.id)}>
                                    <img
                                        src={getImageUrl(movie.poster_path)}
                                        alt={movie.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <span className="text-pink-500 font-display text-sm tracking-widest">VIEW</span>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromFavorites(movie.id);
                                    }}
                                    className="absolute top-2 right-2 bg-black/80 p-2 border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black transition-all z-10"
                                    title="Remove from favorites"
                                >
                                    <X size={16} />
                                </button>

                                <div className="p-3">
                                    <h3 className="font-display text-sm leading-tight text-white mb-1 truncate">{movie.title}</h3>
                                    <p className="text-xs text-muted">{movie.release_date?.split('-')[0] || 'UNKNOWN'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Watchlist Section */}
            <section className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-1 bg-accent rounded-full animate-ping"></div>
                    <h2 className="font-display text-3xl text-accent tracking-wider">YOUR_WATCHLIST</h2>
                </div>

                {watchlist.length === 0 ? (
                    <div className="glass-panel p-12 text-center">
                        <Bookmark className="mx-auto mb-4 text-muted" size={48} />
                        <p className="text-muted font-mono text-lg">NO_MOVIES_IN_WATCHLIST</p>
                        <p className="text-sm text-muted/60 mt-2">Add movies to your watchlist to watch them later!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {watchlist.map((movie) => (
                            <div
                                key={movie.id}
                                className="glass-panel group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,46,46,0.3)]"
                            >
                                <div className="aspect-[2/3] w-full relative" onClick={() => onSelectMovie(movie.id)}>
                                    <img
                                        src={getImageUrl(movie.poster_path)}
                                        alt={movie.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <span className="text-accent font-display text-sm tracking-widest">VIEW</span>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromWatchlist(movie.id);
                                    }}
                                    className="absolute top-2 right-2 bg-black/80 p-2 border border-accent text-accent hover:bg-accent hover:text-black transition-all z-10"
                                    title="Remove from watchlist"
                                >
                                    <X size={16} />
                                </button>

                                <div className="p-3">
                                    <h3 className="font-display text-sm leading-tight text-white mb-1 truncate">{movie.title}</h3>
                                    <p className="text-xs text-muted">{movie.release_date?.split('-')[0] || 'UNKNOWN'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Watched Movies Timeline */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-1 bg-cyan rounded-full animate-ping"></div>
                    <h2 className="font-display text-3xl text-cyan tracking-wider">WATCH_JOURNAL</h2>
                </div>

                {watchedMovies.length === 0 ? (
                    <div className="glass-panel p-12 text-center">
                        <Clock className="mx-auto mb-4 text-muted" size={48} />
                        <p className="text-muted font-mono text-lg">NO_WATCHED_MOVIES</p>
                        <p className="text-sm text-muted/60 mt-2">Mark movies as watched to track your viewing history!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sortedWatchedMovies.map((movie, index) => (
                            <div
                                key={movie.id}
                                className="glass-panel p-4 hover:bg-white/5 transition-all border-l-4 border-l-cyan/50 hover:border-l-cyan group"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Timeline indicator */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 rounded-full bg-cyan border-2 border-black"></div>
                                        {index < sortedWatchedMovies.length - 1 && (
                                            <div className="w-0.5 h-16 bg-cyan/30 mt-1"></div>
                                        )}
                                    </div>

                                    {/* Movie poster */}
                                    <div
                                        className="w-16 h-24 flex-shrink-0 cursor-pointer"
                                        onClick={() => onSelectMovie(movie.id)}
                                    >
                                        <img
                                            src={getImageUrl(movie.poster_path)}
                                            alt={movie.title}
                                            className="w-full h-full object-cover border border-white/10 group-hover:border-cyan transition-colors"
                                        />
                                    </div>

                                    {/* Movie info */}
                                    <div className="flex-1 min-w-0">
                                        <h3
                                            className="font-display text-xl text-white mb-1 cursor-pointer hover:text-cyan transition-colors truncate"
                                            onClick={() => onSelectMovie(movie.id)}
                                        >
                                            {movie.title}
                                        </h3>
                                        <p className="text-sm text-muted font-mono">
                                            Watched on {formatDate(movie.watchedAt)}
                                        </p>
                                        {movie.vote_average > 0 && (
                                            <p className="text-sm text-accent font-mono mt-1">
                                                ★ {movie.vote_average.toFixed(1)} / 10
                                            </p>
                                        )}
                                    </div>

                                    {/* Remove button */}
                                    <button
                                        onClick={() => removeFromWatched(movie.id)}
                                        className="px-4 py-2 border border-muted text-muted hover:border-accent hover:text-accent transition-all font-mono text-sm"
                                        title="Remove from watched"
                                    >
                                        REMOVE
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <div className="mt-20 text-center font-display text-xl text-muted tracking-[0.2em] opacity-50">
                ⌁ YOUR CINEMATIC JOURNEY ⌁
            </div>
        </div>
    );
};

export default Profile;
