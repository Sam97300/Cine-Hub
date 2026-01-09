// LocalStorage utility functions for CineHub

const WATCHLIST_KEY = 'cinehub_watchlist';
const WATCHED_KEY = 'cinehub_watched';

// Watchlist functions
export const getWatchlist = () => {
    try {
        const watchlist = localStorage.getItem(WATCHLIST_KEY);
        return watchlist ? JSON.parse(watchlist) : [];
    } catch (error) {
        console.error('Error reading watchlist:', error);
        return [];
    }
};

export const addToWatchlist = (movie) => {
    try {
        const watchlist = getWatchlist();
        // Check if movie already exists
        if (watchlist.some(m => m.id === movie.id)) {
            return watchlist;
        }
        const updatedWatchlist = [...watchlist, { ...movie, addedAt: new Date().toISOString() }];
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
        return updatedWatchlist;
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        return getWatchlist();
    }
};

export const removeFromWatchlist = (movieId) => {
    try {
        const watchlist = getWatchlist();
        const updatedWatchlist = watchlist.filter(m => m.id !== movieId);
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
        return updatedWatchlist;
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        return getWatchlist();
    }
};

export const isInWatchlist = (movieId) => {
    const watchlist = getWatchlist();
    return watchlist.some(m => m.id === movieId);
};

// Watched movies (journal) functions
export const getWatchedMovies = () => {
    try {
        const watched = localStorage.getItem(WATCHED_KEY);
        return watched ? JSON.parse(watched) : [];
    } catch (error) {
        console.error('Error reading watched movies:', error);
        return [];
    }
};

export const addToWatched = (movie) => {
    try {
        const watched = getWatchedMovies();
        // Check if movie already exists
        if (watched.some(m => m.id === movie.id)) {
            return watched;
        }
        const updatedWatched = [...watched, { ...movie, watchedAt: new Date().toISOString() }];
        localStorage.setItem(WATCHED_KEY, JSON.stringify(updatedWatched));
        return updatedWatched;
    } catch (error) {
        console.error('Error adding to watched:', error);
        return getWatchedMovies();
    }
};

export const removeFromWatched = (movieId) => {
    try {
        const watched = getWatchedMovies();
        const updatedWatched = watched.filter(m => m.id !== movieId);
        localStorage.setItem(WATCHED_KEY, JSON.stringify(updatedWatched));
        return updatedWatched;
    } catch (error) {
        console.error('Error removing from watched:', error);
        return getWatchedMovies();
    }
};

export const isWatched = (movieId) => {
    const watched = getWatchedMovies();
    return watched.some(m => m.id === movieId);
};

// Get genre statistics from watched movies
export const getGenreStats = () => {
    const watched = getWatchedMovies();
    const genreCount = {};

    watched.forEach(movie => {
        if (movie.genres) {
            movie.genres.forEach(genre => {
                genreCount[genre.name] = (genreCount[genre.name] || 0) + 1;
            });
        }
    });

    return genreCount;
};
