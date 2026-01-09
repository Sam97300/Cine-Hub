import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GenrePieChart = ({ genreStats }) => {
    if (!genreStats || Object.keys(genreStats).length === 0) {
        return (
            <div className="glass-panel p-8 text-center">
                <p className="text-muted font-mono">NO_GENRE_DATA_AVAILABLE</p>
                <p className="text-sm text-muted/60 mt-2">Watch some movies to see your genre preferences!</p>
            </div>
        );
    }

    const genres = Object.keys(genreStats);
    const counts = Object.values(genreStats);

    // Retro neon color palette
    const colors = [
        'rgba(255, 69, 0, 0.8)',    // accent (orange-red)
        'rgba(255, 183, 0, 0.8)',   // cyan (gold)
        'rgba(0, 255, 255, 0.8)',   // cyan
        'rgba(255, 0, 255, 0.8)',   // magenta
        'rgba(0, 255, 0, 0.8)',     // green
        'rgba(255, 105, 180, 0.8)', // hot pink
        'rgba(138, 43, 226, 0.8)',  // blue violet
        'rgba(255, 215, 0, 0.8)',   // gold
        'rgba(0, 191, 255, 0.8)',   // deep sky blue
        'rgba(255, 20, 147, 0.8)',  // deep pink
    ];

    const borderColors = colors.map(color => color.replace('0.8', '1'));

    const data = {
        labels: genres,
        datasets: [
            {
                label: 'Movies Watched',
                data: counts,
                backgroundColor: colors.slice(0, genres.length),
                borderColor: borderColors.slice(0, genres.length),
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#eaeaea',
                    font: {
                        family: 'monospace',
                        size: 12,
                    },
                    padding: 15,
                    generateLabels: (chart) => {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                            return data.labels.map((label, i) => {
                                const value = data.datasets[0].data[i];
                                const percentage = ((value / total) * 100).toFixed(1);
                                return {
                                    text: `${label}: ${value} (${percentage}%)`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    strokeStyle: data.datasets[0].borderColor[i],
                                    lineWidth: 2,
                                    hidden: false,
                                    index: i,
                                };
                            });
                        }
                        return [];
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                titleColor: '#ff4500',
                bodyColor: '#eaeaea',
                borderColor: '#ff4500',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} movies (${percentage}%)`;
                    }
                }
            },
        },
    };

    return (
        <div className="glass-panel p-6">
            <h3 className="font-display text-2xl text-accent mb-6 tracking-widest text-center">
                GENRE_DISTRIBUTION
            </h3>
            <div className="max-w-2xl mx-auto">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default GenrePieChart;
