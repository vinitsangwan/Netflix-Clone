const mongoose = require("mongoose");

const userPreferenceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true
        },
        // Map of TMDB Genre ID (as string) to numerical preference score
        // e.g. { "878": 12, "28": 6 }
        genreScores: {
            type: Map,
            of: Number,
            default: {}
        },
        // Log of movies searched by this user
        searchedMovies: [
            {
                movieId: { type: Number },
                title: { type: String, trim: true },
                genreIds: [{ type: Number }],
                query: { type: String, trim: true },
                searchedAt: { type: Date, default: Date.now }
            }
        ],
        // Quick reference array of watched / watchlisted movie IDs to prevent re-recommending
        excludedMovieIds: [
            {
                type: Number
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("UserPreference", userPreferenceSchema);
