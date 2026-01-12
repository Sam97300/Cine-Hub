import React, { useEffect, useState } from 'react';
import { getImageUrl, getMovieDetails } from '../services/tmdb';
import { Play, ArrowLeft, Star, Clock, Calendar, ExternalLink, Bookmark, Check, X, Heart } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';



const MovieDetail = ({ movieId, onBack, onSelectPerson }) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    const { toggleWatchlist, isInWatchlist, toggleWatched, isMovieWatched, toggleFavorite, isFavorite } = useMovieContext();

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
    const watched = isMovieWatched(movie.id);
    const favorited = isFavorite(movie.id);

    const watchProviders = movie['watch/providers']?.results?.US?.flatrate || [];

    const getCast = () => movie.credits?.cast?.slice(0, 3) || [];
    const getCrew = (job) => movie.credits?.crew?.filter(c => c.job === job) || [];


    return (
        <div className="animate-in fade-in duration-700 relative z-10 w-full min-h-screen">
            {/* Backdrop Header - Letterboxd Style */}
            <div className="absolute top-0 left-0 w-full h-[85vh] -z-10 overflow-hidden opacity-60 mask-image-gradient">
                <img
                    src={getImageUrl(movie.backdrop_path, 'original')}
                    alt="Backdrop"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b]/80 via-transparent to-[#0b0b0b]/80"></div>
                {/* Grain overlay for texture */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
            </div>

            <div className="container mx-auto px-6 py-8 max-w-7xl pt-[30vh]">
                <button
                    onClick={onBack}
                    className="mb-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors font-display text-xl backdrop-blur-sm px-4 py-2 rounded-full bg-black/20 hover:bg-black/40 border border-white/10"
                >
                    <ArrowLeft size={20} /> RETURN
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-end mb-16">
                    {/* Poster Section */}
                    <div className="hidden lg:block relative group w-full shrink-0">
                        <div className="absolute -inset-2 bg-gradient-to-br from-amber-600 to-indigo-900 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity"></div>
                        <img
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                            className="relative w-full rounded-sm shadow-2xl shadow-black/80 border border-white/10"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col justify-end">
                        <h1 className="font-display text-6xl md:text-8xl tracking-tight text-white mb-4 drop-shadow-lg leading-none">
                            {movie.title.toUpperCase()}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-white/80 mb-8 font-mono text-sm tracking-wider">
                            <span className='flex items-center gap-2 bg-white/10 px-3 py-1 rounded'><Calendar size={14} /> {movie.release_date?.split('-')[0]}</span>

                            <div className="flex gap-2">
                                {movie.genres?.map((g, i) => {
                                    // Earthy/Royal Palette Assignment
                                    const colors = [
                                        'bg-emerald-900/80 border-emerald-700/50 text-emerald-100', // Earthy Green
                                        'bg-amber-900/80 border-amber-700/50 text-amber-100',     // Royal Gold/Brown
                                        'bg-indigo-900/80 border-indigo-700/50 text-indigo-100',   // Royal Blue
                                        'bg-rose-900/80 border-rose-700/50 text-rose-100',       // Deep Red
                                        'bg-slate-800/80 border-slate-600/50 text-slate-200'      // Neutral
                                    ];
                                    const style = colors[i % colors.length];
                                    return (
                                        <span key={g.id} className={`px-3 py-1 rounded border ${style} backdrop-blur-md`}>
                                            {g.name}
                                        </span>
                                    );
                                })}
                            </div>

                            <span className='flex items-center gap-2 bg-white/10 px-3 py-1 rounded'><Clock size={14} /> {movie.runtime} MIN</span>
                        </div>

                        {/* Action Buttons Row */}
                        <div className="flex flex-wrap gap-4 mb-4">
                            {trailerKey && (
                                <button
                                    onClick={() => setShowTrailer(!showTrailer)}
                                    className="px-6 py-3 bg-white text-black font-display text-xl hover:bg-gray-200 transition-all duration-300 flex items-center gap-3 rounded-sm"
                                >
                                    {showTrailer ? <X size={20} /> : <Play size={20} className="fill-current" />}
                                    {showTrailer ? 'CLOSE' : 'TRAILER'}
                                </button>
                            )}

                            <button
                                onClick={() => toggleWatchlist(movie)}
                                className={`px-6 py-3 border font-display text-xl transition-all duration-300 flex items-center gap-3 rounded-sm ${inWatchlist
                                    ? 'bg-amber-500 border-amber-500 text-black hover:bg-amber-400'
                                    : 'bg-black/40 border-white/20 text-white hover:bg-white/10 backdrop-blur-md'
                                    }`}
                            >
                                <Bookmark size={20} className={inWatchlist ? 'fill-current' : ''} />
                                {inWatchlist ? 'WATCHLISTED' : 'WATCHLIST'}
                            </button>

                            <button
                                onClick={() => toggleWatched(movie)}
                                className={`px-6 py-3 border font-display text-xl transition-all duration-300 flex items-center gap-3 rounded-sm ${watched
                                    ? 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-500'
                                    : 'bg-black/40 border-white/20 text-white hover:bg-white/10 backdrop-blur-md'
                                    }`}
                            >
                                <Check size={20} />
                                {watched ? 'WATCHED' : 'LOG'}
                            </button>

                            <button
                                onClick={() => toggleFavorite(movie)}
                                className={`px-4 py-3 border font-display text-xl transition-all duration-300 flex items-center justify-center gap-3 rounded-sm ${favorited
                                    ? 'bg-rose-600 border-rose-600 text-white hover:bg-rose-500'
                                    : 'bg-black/40 border-white/20 text-white hover:bg-white/10 backdrop-blur-md'
                                    }`}
                            >
                                <Heart size={20} className={favorited ? 'fill-current' : ''} />
                            </button>
                        </div>

                        <div className="flex items-end gap-2 font-display mb-8 opacity-80">
                            <span className="text-amber-500 text-2xl">TMDB</span>
                            <span className="text-3xl text-white">{movie.vote_average?.toFixed(1)}</span>
                            <span className="text-lg text-white/50 pb-1">/ 10</span>
                        </div>

                        <div className="prose prose-invert max-w-3xl">
                            <p className="text-white/80 text-lg leading-relaxed font-serif tracking-wide text-pretty">
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/10">
                    {/* Key Staff & Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-display text-xl text-amber-500/80 mb-3 tracking-widest">DIRECTOR</h3>
                            <div className="flex flex-wrap gap-2">
                                {getCrew('Director').map(c => (
                                    <span key={c.id} onClick={() => onSelectPerson(c.id)} className="text-white hover:text-amber-400 cursor-pointer transition-colors border-b border-transparent hover:border-amber-400">
                                        {c.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-display text-xl text-amber-500/80 mb-3 tracking-widest">CAST</h3>
                            <div className="flex flex-col gap-2">
                                {getCast().map(c => (
                                    <span key={c.id} onClick={() => onSelectPerson(c.id)} className="text-white/80 hover:text-amber-400 cursor-pointer transition-colors truncate">
                                        {c.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-display text-xl text-amber-500/80 mb-3 tracking-widest">SPECS</h3>
                            <div className="space-y-1 text-sm text-white/60">
                                <p>Language: {movie.original_language?.toUpperCase()}</p>
                                <p>Status: {movie.status}</p>
                            </div>
                        </div>
                    </div>

                    {/* Media & Clips Section */}
                    <div className="md:col-span-2 space-y-12">
                        {/* Embedded Trailer Player */}
                        {showTrailer && trailerKey && (
                            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-white/20 shadow-2xl">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                                    title="Movie Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        {/* Clips Row */}
                        {movie.videos?.results?.length > 0 && (
                            <div>
                                <h3 className="font-display text-2xl text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-amber-500"></span>
                                    MEDIA_CLIPS
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {movie.videos.results.slice(0, 6).map(video => (
                                        <div key={video.id} className="group relative aspect-video bg-black/50 rounded overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all cursor-pointer">
                                            <img
                                                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                                alt={video.name}
                                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                            />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                                                <Play size={32} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                                                <p className="text-xs text-white/90 truncate font-mono">{video.type}</p>
                                            </div>
                                            {/* Clicking this would ideally play the video - simplified for now */}
                                            <a href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank" rel="noreferrer" className="absolute inset-0 z-10"></a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Watch Providers */}
                        {watchProviders.length > 0 && (
                            <div>
                                <h3 className="font-display text-2xl text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-emerald-500"></span>
                                    STREAMING_ON
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {watchProviders.map(provider => (
                                        <div key={provider.provider_id} className="relative group" title={provider.provider_name}>
                                            <img
                                                src={getImageUrl(provider.logo_path)}
                                                alt={provider.provider_name}
                                                className="w-12 h-12 rounded-lg border border-white/10 group-hover:border-emerald-500 group-hover:scale-110 transition-all cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
