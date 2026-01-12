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
    getGenreStats,
    getFavorites,
    addToFavorites as addToFavoritesStorage,
    removeFromFavorites as removeFromFavoritesStorage,
    isFavorite as isFavoriteStorage
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
    const [favorites, setFavorites] = useState([]);

    // Load data from localStorage on mount
    useEffect(() => {
        setWatchlist(getWatchlist());
        setWatchedMovies(getWatchedMovies());
        setFavorites(getFavorites());
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

    const addToFavorites = (movie) => {
        const updated = addToFavoritesStorage(movie);
        setFavorites(updated);
    };

    const removeFromFavorites = (movieId) => {
        const updated = removeFromFavoritesStorage(movieId);
        setFavorites(updated);
    };

    const toggleFavorite = (movie) => {
        if (isFavoriteStorage(movie.id)) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
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
        isMovieWatched: isWatchedStorage,
        getGenreStats,
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite: isFavoriteStorage
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
