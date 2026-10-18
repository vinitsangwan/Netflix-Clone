
const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        movieId: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        posterPath: {
            type: String,
            default: ""
        },
        releaseDate: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

watchlistSchema.index(
    { user: 1, movieId: 1 },
    { unique: true }
);

module.exports = mongoose.model("Watchlist", watchlistSchema);
