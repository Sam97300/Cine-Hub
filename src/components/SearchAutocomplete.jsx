import React, { useState, useEffect, useRef } from 'react';
import { searchMoviesAutocomplete } from '../services/tmdb';
import { getImageUrl } from '../services/tmdb';
import { Search } from 'lucide-react';

const SearchAutocomplete = ({ onSelectMovie }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setLoading(true);
                try {
                    const results = await searchMoviesAutocomplete(query);
                    setSuggestions(results);
                    setShowDropdown(true);
                } catch (error) {
                    console.error('Autocomplete search failed:', error);
                    setSuggestions([]);
                }
                setLoading(false);
            } else {
                setSuggestions([]);
                setShowDropdown(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [query]);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e) => {
        if (!showDropdown || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                    handleSelect(suggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setSelectedIndex(-1);
                break;
            default:
                break;
        }
    };

    const handleSelect = (movie) => {
        setQuery('');
        setSuggestions([]);
        setShowDropdown(false);
        setSelectedIndex(-1);
        onSelectMovie(movie.id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
            handleSelect(suggestions[selectedIndex]);
        } else if (suggestions.length > 0) {
            handleSelect(suggestions[0]);
        }
    };

    return (
        <div className="relative w-full md:w-96" ref={dropdownRef}>
            <form onSubmit={handleSubmit} className="relative group">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="SEARCH_DATABASE..."
                    className="w-full bg-black/40 border border-white/10 rounded-none px-4 py-2 pl-10 font-mono text-sm text-cyan focus:outline-none focus:border-cyan focus:shadow-[0_0_15px_rgba(0,255,225,0.2)] transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-cyan w-4 h-4" />
            </form>

            {/* Autocomplete Dropdown */}
            {showDropdown && (suggestions.length > 0 || loading) && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-panel border border-cyan/30 max-h-[400px] overflow-y-auto z-50 shadow-[0_0_20px_rgba(0,255,225,0.2)]">
                    {loading ? (
                        <div className="p-4 text-center text-muted font-mono text-sm">
                            SEARCHING...
                        </div>
                    ) : (
                        suggestions.map((movie, index) => (
                            <div
                                key={movie.id}
                                onClick={() => handleSelect(movie)}
                                className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-b border-white/5 last:border-b-0 ${index === selectedIndex
                                        ? 'bg-cyan/20 border-l-2 border-l-cyan'
                                        : 'hover:bg-white/5 border-l-2 border-l-transparent'
                                    }`}
                            >
                                <img
                                    src={getImageUrl(movie.poster_path)}
                                    alt={movie.title}
                                    className="w-12 h-16 object-cover border border-white/10"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-display text-sm truncate">
                                        {movie.title}
                                    </h4>
                                    <p className="text-muted text-xs font-mono">
                                        {movie.release_date?.split('-')[0] || 'UNKNOWN'}
                                    </p>
                                    {movie.vote_average > 0 && (
                                        <p className="text-accent text-xs font-mono">
                                            ★ {movie.vote_average.toFixed(1)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchAutocomplete;
