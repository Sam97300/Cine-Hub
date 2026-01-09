import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    getWatchlist,
    addToWatchlist as addToWatchlistStorage,
    removeFromWatchlist as removeFromWatchlistStorage,
    isInWatchlist,
    getWatchedMovies,
    addToWatched as addToWatchedStorage,
    removeFromWatched as removeFromWatchedStorage,
    isWatched as isWatchedStorage,
    getGenreStats
} from '../utils/localStorage';

const MovieContext = createContext();

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within MovieProvider');
    }
    return context;
};

export const MovieProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);

    // Load data from localStorage on mount
    useEffect(() => {
        setWatchlist(getWatchlist());
        setWatchedMovies(getWatchedMovies());
    }, []);

    const addToWatchlist = (movie) => {
        const updated = addToWatchlistStorage(movie);
        setWatchlist(updated);
    };

    const removeFromWatchlist = (movieId) => {
        const updated = removeFromWatchlistStorage(movieId);
        setWatchlist(updated);
    };

    const toggleWatchlist = (movie) => {
        if (isInWatchlist(movie.id)) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    const addToWatched = (movie) => {
        const updated = addToWatchedStorage(movie);
        setWatchedMovies(updated);
    };

    const removeFromWatched = (movieId) => {
        const updated = removeFromWatchedStorage(movieId);
        setWatchedMovies(updated);
    };

    const toggleWatched = (movie) => {
        if (isWatchedStorage(movie.id)) {
            removeFromWatched(movie.id);
        } else {
            addToWatched(movie);
        }
    };

    const value = {
        watchlist,
        watchedMovies,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isInWatchlist,
        addToWatched,
        removeFromWatched,
        toggleWatched,
        isWatched: isWatchedStorage,
        getGenreStats
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
