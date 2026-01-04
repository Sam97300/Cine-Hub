/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: '#0b0b0b',
                accent: '#ff4500',
                cyan: '#ffae00',
                text: '#eaeaea',
                muted: '#9a9a9a',
                border: 'rgba(255, 255, 255, 0.1)',
                panel: 'rgba(18, 18, 18, 0.6)',
            },
            fontFamily: {
                display: ['VT323', 'monospace'],
                body: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
