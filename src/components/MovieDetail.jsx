import React, { useEffect, useState } from 'react';
import { getImageUrl, getMovieDetails } from '../services/tmdb';
import { Play, ArrowLeft, Star, Clock, Calendar, ExternalLink, Bookmark, Check, X } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';



const MovieDetail = ({ movieId, onBack, onSelectPerson }) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    const { toggleWatchlist, isInWatchlist, toggleWatched, isWatched } = useMovieContext();

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setShowTrailer(false); // Reset trailer when changing movies
            try {
                const data = await getMovieDetails(movieId);
                setMovie(data);
            } catch (error) {
                console.error("Failed to fetch movie details", error);
            }
            setLoading(false);
        };
        fetchDetails();
    }, [movieId]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-display text-4xl text-accent animate-pulse">
                LOADING METADATA...
            </div>
        );
    }

    if (!movie) return null;

    const trailer = movie.videos?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer');
    const trailerKey = trailer?.key;

    const inWatchlist = isInWatchlist(movie.id);
    const watched = isWatched(movie.id);

    const getCast = () => movie.credits?.cast?.slice(0, 3) || [];
    const getCrew = (job) => movie.credits?.crew?.filter(c => c.job === job) || [];


    return (
        <div className="animate-in fade-in duration-700 container mx-auto px-4 py-8 max-w-6xl relative z-10">
            <button
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-muted hover:text-cyan transition-colors font-display text-xl"
            >
                <ArrowLeft size={20} /> RETURN_TO_GRID
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">
                {/* Poster Section - REDUCED SIZE (md:max-w-xs) */}
                <div className="relative group md:max-w-xs mx-auto md:mx-0 w-full">
                    <div className="absolute -inset-1 bg-gradient-to-br from-accent to-cyan opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
                    <img
                        src={getImageUrl(movie.poster_path)}
                        alt={movie.title}
                        className="relative w-full border border-border glass-panel pointer-events-none"
                    />
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-start pt-4">
                    <h1 className="font-display text-6xl md:text-7xl tracking-wide text-white mb-2 relative" style={{ textShadow: '0 0 10px rgba(255, 69, 0, 0.5)' }}>
                        {movie.title.toUpperCase()}
                    </h1>

                    <div className="flex items-center gap-6 text-muted mb-8 font-mono text-sm tracking-wider flex-wrap">
                        <span className='flex items-center gap-2'><Calendar size={14} /> {movie.release_date?.split('-')[0]}</span>
                        <span>•</span>
                        <span>{movie.genres?.map(g => g.name).join(' / ')}</span>
                        <span>•</span>
                        <span className='flex items-center gap-2'><Clock size={14} /> {movie.runtime} MIN</span>
                    </div>

                    <div className="flex items-end gap-2 mb-8 font-display">
                        <span className="text-accent text-3xl">RATING:</span>
                        <span className="text-4xl text-cyan">{movie.vote_average?.toFixed(1)}</span>
                        <span className="text-xl text-muted pb-1">/ 10</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {trailerKey && (
                            <button
                                onClick={() => setShowTrailer(!showTrailer)}
                                className="px-8 py-3 border border-accent text-accent font-display text-xl hover:bg-accent hover:text-black hover:shadow-[0_0_20px_var(--accent)] transition-all duration-300 flex items-center gap-3 group"
                            >
                                {showTrailer ? <X size={20} /> : <Play size={20} className="fill-current" />}
                                {showTrailer ? 'CLOSE_TRAILER' : 'PLAY_TRAILER'}
                            </button>
                        )}

                        <button
                            onClick={() => toggleWatchlist(movie)}
                            className={`px-6 py-3 border font-display text-xl transition-all duration-300 flex items-center gap-3 ${inWatchlist
                                ? 'border-cyan text-cyan hover:bg-cyan hover:text-black'
                                : 'border-white/30 text-white hover:border-cyan hover:text-cyan'
                                }`}
                        >
                            <Bookmark size={20} className={inWatchlist ? 'fill-current' : ''} />
                            {inWatchlist ? 'IN_WATCHLIST' : 'ADD_TO_WATCHLIST'}
                        </button>

                        <button
                            onClick={() => toggleWatched(movie)}
                            className={`px-6 py-3 border font-display text-xl transition-all duration-300 flex items-center gap-3 ${watched
                                ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-black'
                                : 'border-white/30 text-white hover:border-green-500 hover:text-green-500'
                                }`}
                        >
                            <Check size={20} />
                            {watched ? 'WATCHED' : 'MARK_AS_WATCHED'}
                        </button>
                    </div>

                    {/* Embedded Trailer */}
                    {showTrailer && trailerKey && (
                        <div className="mb-8 glass-panel p-2 border border-cyan/50 shadow-[0_0_30px_rgba(0,255,225,0.3)]">
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                                    title="Movie Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 glass-panel p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent/50"></div>
                        <h3 className="font-display text-2xl text-accent mb-4 tracking-widest">PLOT_SUMMARY</h3>
                        <p className="text-muted leading-relaxed max-w-2xl text-lg">
                            {movie.overview}
                        </p>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                <div className="glass-panel p-5 hover:bg-white/5 transition-colors border-l border-border hover:border-l-accent">
                    <h4 className="text-xs text-accent tracking-widest mb-2 font-bold uppercase">Director</h4>
                    <div className="flex flex-col gap-1">
                        {getCrew('Director').map(c => (
                            <span
                                key={c.id}
                                onClick={() => onSelectPerson(c.id)}
                                className="text-white hover:text-cyan cursor-pointer transition-colors"
                            >
                                {c.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-5 hover:bg-white/5 transition-colors border-l border-border hover:border-l-accent">
                    <h4 className="text-xs text-accent tracking-widest mb-2 font-bold uppercase">Cast</h4>
                    <div className="flex flex-col gap-1">
                        {getCast().map(c => (
                            <span
                                key={c.id}
                                onClick={() => onSelectPerson(c.id)}
                                className="text-white hover:text-cyan cursor-pointer transition-colors"
                            >
                                {c.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-5 border-l border-border hover:border-l-accent">
                    <h4 className="text-xs text-accent tracking-widest mb-2 font-bold max-w-full">ORIGINAL LANGUAGE</h4>
                    <p className="text-white">{movie.original_language?.toUpperCase()}</p>
                </div>
                <div className="glass-panel p-5 border-l border-border hover:border-l-accent">
                    <h4 className="text-xs text-accent tracking-widest mb-2 font-bold">STATUS</h4>
                    <p className="text-white">{movie.status?.toUpperCase()}</p>
                </div>
            </div>

            <div className="mt-20 text-center font-display text-xl text-muted tracking-[0.2em] opacity-50">
                ⌁ ARCHIVED IN NEON MEMORY ⌁
            </div>
        </div>
    );
};

export default MovieDetail;
