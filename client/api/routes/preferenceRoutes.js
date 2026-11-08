const express = require("express");
const UserPreference = require("../models/UserPreference");
const Watchlist = require("../models/Watchlist");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const TMDB_API_KEY =
    process.env.TMDB_API_KEY ||
    process.env.VITE_TMDB_API_KEY ||
    "88fcbb61ad08fc744b8f88563821f332";

// Map of standard TMDB Genre IDs to English names
const GENRE_MAP = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
};

// Protect all preference routes with JWT
router.use(protect);

/**
 * POST /api/preferences/search
 * Track when an authenticated user searches for a movie
 */
router.post("/search", async (req, res) => {
    try {
        const { query, movieId, title, genreIds } = req.body;

        if (!query && !movieId && !title) {
            return res.status(400).json({
                success: false,
                message: "Search query or movie details required"
            });
        }

        let preference = await UserPreference.findOne({ user: req.userId });
        if (!preference) {
            preference = new UserPreference({
                user: req.userId,
                genreScores: {},
                searchedMovies: [],
                excludedMovieIds: []
            });
        }

        const validGenreIds = Array.isArray(genreIds) ? genreIds : [];

        // Add to search history log
        preference.searchedMovies.unshift({
            movieId: movieId || null,
            title: title || query || "",
            genreIds: validGenreIds,
            query: query || title || "",
            searchedAt: new Date()
        });

        // Keep last 50 searches
        if (preference.searchedMovies.length > 50) {
            preference.searchedMovies = preference.searchedMovies.slice(0, 50);
        }

        // Award +1 point to each matched genre
        validGenreIds.forEach((gid) => {
            const key = String(gid);
            const currentScore = preference.genreScores.get(key) || 0;
            preference.genreScores.set(key, currentScore + 1);
        });

        await preference.save();

        res.status(200).json({
            success: true,
            message: "Search activity recorded",
            genreScores: Object.fromEntries(preference.genreScores)
        });
    } catch (error) {
        console.error("Record search preference error:", error);
        res.status(500).json({
            success: false,
            message: "Could not record search preference"
        });
    }
});

/**
 * GET /api/preferences/recommendations (and GET /api/recommendations)
 * Generates user-specific recommendations based on Watchlist + Search activity
 */
router.get("/recommendations", async (req, res) => {
    try {
        const userId = req.userId;

        // 1. Fetch user's preference record and current watchlist
        const [preference, watchlistItems] = await Promise.all([
            UserPreference.findOne({ user: userId }),
            Watchlist.find({ user: userId }).sort({ createdAt: -1 }).limit(10)
        ]);

        const excludedIds = new Set(
            preference?.excludedMovieIds || []
        );
        watchlistItems.forEach((w) => excludedIds.add(w.movieId));

        // 2. Identify top genres from genreScores
        const genreScoresMap = preference?.genreScores
            ? Object.fromEntries(preference.genreScores)
            : {};

        const sortedGenres = Object.entries(genreScoresMap)
            .map(([gid, score]) => ({ gid: Number(gid), score }))
            .filter((g) => g.score > 0)
            .sort((a, b) => b.score - a.score);

        const topGenreId = sortedGenres[0]?.gid || null;
        const topGenreName = topGenreId ? GENRE_MAP[topGenreId] || "Your Favorite Genre" : null;

        // Check if user is a brand-new cold-start user (no watchlist & no search scores)
        const isColdStart = watchlistItems.length === 0 && sortedGenres.length === 0;

        if (isColdStart) {
            // Fetch TMDB Trending movies for new user
            const trendingRes = await fetch(
                `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
            );
            const trendingData = await trendingRes.json();

            return res.status(200).json({
                success: true,
                coldStart: true,
                message: "Explore and add movies to your watchlist or search to get custom recommendations!",
                basedOnWatchlist: [],
                basedOnSearch: [],
                recommendedForYou: (trendingData.results || []).slice(0, 15)
            });
        }

        // 3. Row 1: Recommendations Based On Watchlist (using TMDB /recommendations for up to 3 watchlist items)
        let basedOnWatchlist = [];
        if (watchlistItems.length > 0) {
            const sampleWatchlist = watchlistItems.slice(0, 3);
            const watchlistRecPromises = sampleWatchlist.map(async (item) => {
                try {
                    const r = await fetch(
                        `https://api.themoviedb.org/3/movie/${item.movieId}/recommendations?api_key=${TMDB_API_KEY}&language=en-US`
                    );
                    if (!r.ok) return [];
                    const d = await r.json();
                    return d.results || [];
                } catch {
                    return [];
                }
            });

            const recResults = await Promise.all(watchlistRecPromises);
            const seen = new Set();
            recResults.flat().forEach((m) => {
                if (!excludedIds.has(m.id) && !seen.has(m.id) && m.poster_path) {
                    seen.add(m.id);
                    basedOnWatchlist.push(m);
                }
            });
        }

        // 4. Row 2: Recommendations Based On Searches (using TMDB discover with topGenreId)
        let basedOnSearch = [];
        if (topGenreId) {
            try {
                const discoverRes = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${topGenreId}&sort_by=popularity.desc&vote_count.gte=100&language=en-US`
                );
                if (discoverRes.ok) {
                    const dData = await discoverRes.json();
                    const seenSearch = new Set();
                    (dData.results || []).forEach((m) => {
                        if (!excludedIds.has(m.id) && !seenSearch.has(m.id) && m.poster_path) {
                            seenSearch.add(m.id);
                            basedOnSearch.push(m);
                        }
                    });
                }
            } catch (err) {
                console.error("TMDB Discover error:", err.message);
            }
        }

        // 5. Row 3: "Recommended For You" (Hybrid combination ranked by user genre scores + TMDB vote average)
        const combinedPool = [...basedOnWatchlist, ...basedOnSearch];
        const uniquePoolMap = new Map();

        combinedPool.forEach((m) => {
            if (!uniquePoolMap.has(m.id)) {
                // Calculate hybrid score:
                // Sum genre scores for all genres this movie belongs to
                let userGenreWeight = 0;
                (m.genre_ids || []).forEach((gid) => {
                    userGenreWeight += genreScoresMap[String(gid)] || 0;
                });

                const voteAvg = m.vote_average || 0;
                const finalRankScore = userGenreWeight * 0.6 + voteAvg * 0.4;

                uniquePoolMap.set(m.id, {
                    ...m,
                    rankScore: finalRankScore
                });
            }
        });

        const recommendedForYou = Array.from(uniquePoolMap.values())
            .sort((a, b) => b.rankScore - a.rankScore)
            .slice(0, 20);

        res.status(200).json({
            success: true,
            coldStart: false,
            topGenreName: topGenreName || "Popular",
            topGenreId,
            basedOnWatchlist: basedOnWatchlist.slice(0, 15),
            basedOnSearch: basedOnSearch.slice(0, 15),
            recommendedForYou: recommendedForYou.length > 0 ? recommendedForYou : basedOnWatchlist.slice(0, 15)
        });
    } catch (error) {
        console.error("Generate recommendations error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate recommendations"
        });
    }
});

module.exports = router;
