
const express = require("express");
const Watchlist = require("../models/Watchlist");
const UserPreference = require("../models/UserPreference");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

// Get the logged-in user's watchlist
router.get("/", async (req, res) => {
    try {
        const movies = await Watchlist.find({
            user: req.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not fetch watchlist"
        });
    }
});

// Add a movie
router.post("/", async (req, res) => {
    try {
        const { movieId, title, posterPath, releaseDate } = req.body;

        if (
            !Number.isSafeInteger(movieId) ||
            movieId <= 0 ||
            typeof title !== "string" ||
            !title.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "A valid movieId and title are required"
            });
        }

        const movie = await Watchlist.create({
            user: req.userId,
            movieId,
            title: title.trim(),
            posterPath,
            releaseDate
        });

        // Update UserPreference (+3 points for watchlist action)
        try {
            const genreIds = Array.isArray(req.body.genreIds) ? req.body.genreIds : [];
            let preference = await UserPreference.findOne({ user: req.userId });
            if (!preference) {
                preference = new UserPreference({
                    user: req.userId,
                    genreScores: {},
                    searchedMovies: [],
                    excludedMovieIds: []
                });
            }

            if (!preference.excludedMovieIds.includes(movieId)) {
                preference.excludedMovieIds.push(movieId);
            }

            // Award +3 score for each genre
            genreIds.forEach((gid) => {
                const key = String(gid);
                const currentScore = preference.genreScores.get(key) || 0;
                preference.genreScores.set(key, currentScore + 3);
            });

            await preference.save();
        } catch (prefErr) {
            console.error("Preference update error on watchlist add:", prefErr.message);
        }

        res.status(201).json({
            success: true,
            message: "Movie added to watchlist",
            movie
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Movie already exists in watchlist"
            });
        }

        res.status(500).json({
            success: false,
            message: "Could not add movie"
        });
    }
});

// Remove a movie by its database ID
router.delete("/:movieId", async (req, res) => {
    try {
        const movie = await Watchlist.findOneAndDelete({
            _id: req.params.movieId,
            user: req.userId
        });

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found in your watchlist"
            });
        }

        // Clean up excludedMovieIds in UserPreference
        try {
            await UserPreference.updateOne(
                { user: req.userId },
                { $pull: { excludedMovieIds: movie.movieId } }
            );
        } catch (cleanErr) {
            console.error("Clean excluded movie error:", cleanErr.message);
        }

        res.status(200).json({
            success: true,
            message: "Movie removed from watchlist"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid movie ID"
        });
    }
});

module.exports = router;
