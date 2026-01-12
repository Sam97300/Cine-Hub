import React from 'react';
import { getImageUrl } from '../services/tmdb';
import { Bookmark } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

const MovieCard = ({ movie, onClick }) => {
    const { toggleWatchlist, isInWatchlist } = useMovieContext();
    const inWatchlist = isInWatchlist(movie.id);

    const handleWatchlistClick = (e) => {
        e.stopPropagation();
        toggleWatchlist(movie);
    };

    return (
        <div
            onClick={() => onClick(movie)}
            className="glass-panel group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,46,46,0.3)]"
        >
            <div className="aspect-[2/3] w-full relative">
                <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-accent font-display text-xl tracking-widest">VIEW DATA</span>
                </div>

                {/* Watchlist Button */}
                <button
                    onClick={handleWatchlistClick}
                    className={`absolute top-2 right-2 p-2 backdrop-blur-md border transition-all duration-300 ${inWatchlist
                        ? 'bg-cyan/20 border-cyan text-cyan'
                        : 'bg-black/40 border-white/20 text-white/60 hover:border-cyan hover:text-cyan'
                        }`}
                    title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                >
                    <Bookmark size={18} className={inWatchlist ? 'fill-current' : ''} />
                </button>
            </div>

            <div className="p-4">
                <h3 className="font-display text-xl leading-tight text-white mb-1 truncate">{movie.title}</h3>
                <p className="text-sm text-muted">{movie.release_date?.split('-')[0] || 'UNKNOWN'}</p>
            </div>
        </div>
    );
};

export default MovieCard;
