import React, { useEffect, useState } from 'react';
import { getPersonDetails, getImageUrl } from '../services/tmdb';
import { ArrowLeft, Star, Film } from 'lucide-react';

const PersonDetail = ({ personId, onBack, onSelectMovie }) => {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const data = await getPersonDetails(personId);
                setPerson(data);
            } catch (error) {
                console.error("Failed to fetch person details", error);
            }
            setLoading(false);
        };
        fetchDetails();
    }, [personId]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-display text-4xl text-accent animate-pulse">LOADING PROFILE...</div>;

    if (!person) return null;

    // Filter credits to unique movies, sorted by popularity
    const credits = person.combined_credits?.cast
        ?.filter((c, index, self) =>
            c.media_type === 'movie' &&
            c.poster_path &&
            self.findIndex(t => t.id === c.id) === index
        )
        .sort((a, b) => b.popularity - a.popularity) || [];

    return (
        <div className="animate-in fade-in duration-700 container mx-auto px-4 py-8 max-w-6xl relative z-10">
            <button
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-muted hover:text-cyan transition-colors font-display text-xl"
            >
                <ArrowLeft size={20} /> RETURN
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-br from-accent to-cyan opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
                    <img
                        src={getImageUrl(person.profile_path)}
                        alt={person.name}
                        className="relative w-full border border-border glass-panel pointer-events-none object-cover aspect-[2/3]"
                    />
                </div>

                <div>
                    <h1 className="font-display text-5xl md:text-6xl text-white mb-4 shadow-neon">{person.name.toUpperCase()}</h1>

                    <div className="flex flex-wrap gap-4 text-sm font-mono text-muted mb-8">
                        {person.birthday && <span>BORN: {person.birthday}</span>}
                        {person.place_of_birth && <span>• {person.place_of_birth.toUpperCase()}</span>}
                        <span>• KNOWN FOR: {person.known_for_department.toUpperCase()}</span>
                    </div>

                    <div className="glass-panel p-6 relative">
                        <h3 className="font-display text-xl text-accent mb-4">BIOGRAPHY</h3>
                        <p className="text-muted leading-relaxed max-w-3xl whitespace-pre-line text-sm md:text-base">
                            {person.biography || "No biography available."}
                        </p>
                    </div>
                </div>
            </div>

            <h2 className="font-display text-3xl text-white mt-16 mb-8 flex items-center gap-3">
                <Film className="text-cyan" /> FILMOGRAPHY
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {credits.map(cast => (
                    <div
                        key={cast.id}
                        onClick={() => onSelectMovie(cast.id)}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[2/3] overflow-hidden border border-white/10 mb-2">
                            <img
                                src={getImageUrl(cast.poster_path)}
                                alt={cast.title}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <h4 className="font-display text-lg text-white leading-none truncate group-hover:text-cyan">{cast.title}</h4>
                        <p className="text-xs text-muted font-mono">{cast.release_date?.split('-')[0]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonDetail;
