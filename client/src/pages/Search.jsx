import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import '../App.css';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Fallback demo movies if API key is not yet set
const demoMovies = [
  {
    id: 1,
    title: 'Wednesday',
    overview: 'A sleuthing, supernaturally infused mystery charting Wednesday Addams’ years as a student at Nevermore Academy.',
    poster_path: '/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg',
    release_date: '2022-11-23',
    vote_average: 8.5,
  },
  {
    id: 2,
    title: 'Stranger Things',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    poster_path: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    release_date: '2016-07-15',
    vote_average: 8.6,
  },
  {
    id: 3,
    title: 'Squid Game',
    overview: 'Hundreds of cash-strapped players accept a strange invitation to compete in children’s games. Inside, a tempting prize awaits with deadly high stakes.',
    poster_path: '/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    release_date: '2021-09-17',
    vote_average: 7.8,
  },
  {
    id: 4,
    title: 'Money Heist',
    overview: 'To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose.',
    poster_path: '/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    release_date: '2017-05-02',
    vote_average: 8.2,
  },
  {
    id: 5,
    title: 'Dhurandhar',
    overview: 'An undercover Indian intelligence operative infiltrates Karachi’s underworld to dismantle an ISI-backed terror nexus targeting India.',
    poster_path: null,
    custom_poster: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Dhurandhar_poster.jpg',
    release_date: '2025-12-05',
    vote_average: 8.2,
  },
  {
    id: 6,
    title: 'Breaking Bad',
    overview: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family’s future.',
    poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    release_date: '2008-01-20',
    vote_average: 8.9,
  },
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(queryFromUrl);

    if (!queryFromUrl.trim()) {
      setMovies(demoMovies);
      return;
    }

    if (!TMDB_API_KEY) {
      // Filter demo movies if no API key is provided yet
      const filtered = demoMovies.filter((m) =>
        m.title.toLowerCase().includes(queryFromUrl.toLowerCase())
      );
      setMovies(filtered.length ? filtered : demoMovies);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            queryFromUrl
          )}&include_adult=false&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch from TMDB API');
        }
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [queryFromUrl]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  const getPosterUrl = (movie) => {
    if (movie.custom_poster) return movie.custom_poster;
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }
    return null;
  };

  return (
    <div className="search-page-wrapper">
      {/* Search Header / Navbar */}
      <header className="search-header">
        <Link to="/" className="brand" aria-label="Netflix home">
          <img
            src="/Netflixlogoproject1.png"
            alt="Netflix"
            className="netflix-logo"
          />
        </Link>

        <form className="search-page-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-page-input"
            placeholder="Search all movies, series, titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button type="submit" className="search-page-btn" aria-label="Search">
            🔍 Search
          </button>
        </form>

        <button
          type="button"
          className="back-home-btn"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
      </header>

      {/* API Key Notification if not set */}
      {!TMDB_API_KEY && (
        <div className="api-key-banner">
          <div className="api-key-banner-content">
            <strong>ℹ️ TMDB API Key Setup:</strong> Add your free API key to{' '}
            <code>client/.env</code> as <code>VITE_TMDB_API_KEY=your_key</code> to
            search 1,000,000+ live movies globally! Showing sample movies below.
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="search-main-container">
        <div className="search-title-bar">
          <h2>
            {queryFromUrl
              ? `Search Results for "${queryFromUrl}"`
              : 'Popular & Trending Titles'}
          </h2>
          <span className="results-count">
            {movies.length} {movies.length === 1 ? 'title' : 'titles'} found
          </span>
        </div>

        {loading && <div className="search-loading">Searching movies...</div>}

        {error && <div className="search-error">Error: {error}</div>}

        {!loading && movies.length === 0 && (
          <div className="search-empty">
            <h3>No movies found for "{queryFromUrl}"</h3>
            <p>Try checking the spelling or searching for another title.</p>
          </div>
        )}

        {/* Movie Results Grid */}
        <div className="search-results-grid">
          {movies.map((movie) => {
            const poster = getPosterUrl(movie);
            const year = movie.release_date
              ? movie.release_date.substring(0, 4)
              : '';
            const rating = movie.vote_average
              ? movie.vote_average.toFixed(1)
              : null;

            return (
              <article key={movie.id} className="movie-result-card">
                <div className="movie-poster-box">
                  {poster ? (
                    <img
                      src={poster}
                      alt={movie.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="poster-placeholder">
                      <span>🎬</span>
                      <p>{movie.title}</p>
                    </div>
                  )}
                  {rating && (
                    <span className="movie-rating-badge">★ {rating}</span>
                  )}
                </div>

                <div className="movie-info-box">
                  <h3 className="movie-title">{movie.title}</h3>
                  {year && <span className="movie-year">{year}</span>}
                  <p className="movie-overview">
                    {movie.overview || 'No synopsis available for this title.'}
                  </p>

                  {/* Watch on Streaming Providers Section */}
                  <div className="where-to-watch-container">
                    <span className="where-to-watch-label">
                      Stream / Watch on:
                    </span>
                    <div className="provider-badges">
                      <a
                        href={`https://www.netflix.com/search?q=${encodeURIComponent(
                          movie.title
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="provider-badge netflix-badge"
                        title={`Watch ${movie.title} on Netflix`}
                      >
                        Netflix
                      </a>
                      <a
                        href={`https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${encodeURIComponent(
                          movie.title
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="provider-badge prime-badge"
                        title={`Watch ${movie.title} on Prime Video`}
                      >
                        Prime Video
                      </a>
                      <a
                        href={`https://www.hotstar.com/in/explore?search_query=${encodeURIComponent(
                          movie.title
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="provider-badge hotstar-badge"
                        title={`Watch ${movie.title} on Disney+ Hotstar`}
                      >
                        Hotstar
                      </a>
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                          movie.title + ' movie'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="provider-badge youtube-badge"
                        title={`Find ${movie.title} on YouTube / Google TV`}
                      >
                        YouTube
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
