# 📼 CINEHUB

<div align="center">

![CineHub Logo](https://readme-typing-svg.herokuapp.com?font=VT323&size=60&duration=3000&pause=500&color=ff4500&center=true&vCenter=true&multiline=true&width=800&height=100&lines=CINEHUB;RETRO+VHS+MOVIE+DISCOVERY)

[![Live Demo](https://img.shields.io/badge/�-LIVE_DEMO-ff4500?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgMTNMMTQgOEwxIDEzVjFaTTEgMXYxMkgxNFYxSDFaIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+&logoColor=white)](https://sam97300.github.io/Cine-Hub/)
[![GitHub stars](https://img.shields.io/github/stars/Sam97300/Cine-Hub?style=for-the-badge&logo=github&color=ffb700)](https://github.com/Sam97300/Cine-Hub)
[![React](https://img.shields.io/badge/REACT-19.2.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/VITE-7.2.4-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

---

*A nostalgic movie discovery experience with retro VHS aesthetics*

</div>

## 🌟 Overview

CineHub is a vintage-inspired movie discovery platform that brings back the nostalgia of VHS era with modern web technologies. Dive into a universe of cinema through a beautifully crafted interface featuring:

- 🎭 **Trending Movies Stream** - Real-time trending data from TMDB
- 🔍 **Smart Search Autocomplete** - Instant movie discovery
- 📊 **Detailed Analytics** - Movie statistics and insights
- 👤 **Personal Profiles** - Track your watchlist and preferences
- 📼 **Retro VHS UI** - Vintage design with tracking effects and artifacts

## 🚀 Live Experience

> **🔗 [**LIVE DEMO**](https://sam97300.github.io/Cine-Hub/)**
> 
> Experience the full retro VHS movie discovery journey

---

## ✨ Features

### 🎬 **Movie Discovery**
- **Trending Data Stream** - Real-time movie trends with animated loading states
- **Advanced Search** - Intelligent autocomplete with instant results
- **Detailed Views** - Comprehensive movie information including cast, crew, and statistics

### 📼 **Retro VHS Design**
- **Tracking Effects** - Authentic VHS tracking lines and distortion
- **Glass Morphism** - Modern glass panels with backdrop blur
- **Vintage Color Scheme** - Orange accent (#ff4500) with warm highlights
- **Smooth Animations** - Hover effects, transitions, and micro-interactions

### 📱 **Modern Architecture**
- **Progressive Web App** - PWA capabilities with offline support
- **Responsive Design** - Optimized for all devices
- **Performance Optimized** - Built with Vite for lightning-fast loading

---

## 🛠️ Tech Stack

```mermaid
%%{init: {
  'theme': 'dark',
  'themeVariables': {
    'primaryColor': '#ff4500',
    'primaryTextColor': '#eaeaea',
    'primaryBorderColor': '#ffb700',
    'lineColor': '#ffb700',
    'sectionBkgColor': '#0b0b0b',
    'altSectionBkgColor': '#121212'
  }
}}%%
graph LR
    A[React 19.2.0] --> B[Vite 7.2.4]
    B --> C[TailwindCSS]
    C --> D[TMDB API]
    D --> E[Lucide Icons]
    E --> F[Chart.js]
```

### Core Technologies
- **Frontend**: React 19.2.0 with modern hooks
- **Build Tool**: Vite 7.2.4 for optimal development experience
- **Styling**: TailwindCSS with custom cyberpunk theme
- **API**: TMDB (The Movie Database) for movie data
- **Icons**: Lucide React for consistent iconography
- **Charts**: Chart.js for movie statistics visualization

---

## 🎯 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Sam97300/Cine-Hub.git
cd Cine-Hub

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Deploy to GitHub Pages
```

---

## 🎨 Design System

### Color Palette
```css
:root {
  --bg: #0b0b0b;        /* Deep black background */
  --panel: rgba(18, 18, 18, 0.6);  /* Glass panels */
  --accent: #ff4500;    /* VHS orange */
  --cyan: #ffb700;      /* Vintage yellow */
  --text: #eaeaea;      /* Light text */
  --muted: #9a9a9a;     /* Muted text */
}
```

### Typography
- **Display**: VT323 (retro terminal font)
- **Body**: Inter (modern, clean sans-serif)

### Effects
- **Tracking Lines**: Authentic VHS tracking effect
- **Grain**: Subtle noise texture
- **Glass Morphism**: Backdrop blur with transparency
- **Hover Animations**: Smooth transitions and transforms

---

## 📸 Screenshots

<div align="center">

![CineHub Interface](https://readme-typing-svg.herokuapp.com?font=VT323&size=20&duration=2000&pause=1000&color=ffb700&center=true&vCenter=true&lines=📼+RETRO+VHS+MOVIE+DISCOVERY;🎬+VINTAGE+INTERFACE;✨+MODERN+WEB+TECHNOLOGIES)

</div>

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### TMDB API Setup
1. Visit [TMDB](https://www.themoviedb.org/)
2. Create an account and request an API key
3. Add the API key to your environment variables

---

## 🚀 Deployment

### GitHub Pages
The project is configured for automatic deployment to GitHub Pages:

```bash
# Deploy to GitHub Pages
npm run deploy
```

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy the dist folder to your hosting provider
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Ensure all animations are smooth and performant
- Test responsive behavior on multiple devices
- Maintain the retro VHS aesthetic consistency

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **TMDB** for providing the movie database API
- **React Team** for the amazing framework
- **Vite Team** for the lightning-fast build tool
- **TailwindCSS** for the utility-first CSS framework

---

<div align="center">

![CineHub](https://readme-typing-svg.herokuapp.com?font=VT323&size=24&duration=4000&pause=1000&color=ff4500&center=true&vCenter=true&lines=📼+CINEHUB+📼;RETRO+VHS+MOVIE+DISCOVERY;THANKS+FOR+VISITING!)

[![Back to top](https://img.shields.io/badge/BACK_TO_TOP-ff4500?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTJMMTMgN0w4IDJMMyA3TDggMTJaIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+&logoColor=white)](#-cinehub)

</div>
