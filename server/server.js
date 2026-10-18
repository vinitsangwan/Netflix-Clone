
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

const app = express();

app.use(
    cors({
        origin: true,
        credentials: true
    })
);

app.use(express.json());

app.use(async (req, res, next) => {
    const p = req.path || req.url || "";
    if (p === "/" || p === "/api/health") {
        return next();
    }

    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("MongoDB connection error:", error.message);

        return res.status(503).json({
            success: false,
            message: "Database temporarily unavailable: " + error.message
        });
    }
});

app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/watchlist", watchlistRoutes);

app.get("/", (req, res) => {
    res.send("Netflix Clone Backend is Running!");
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Netflix Clone backend is running!"
    });
});

app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

module.exports = app;

// Start a persistent local server only when run directly.
if (require.main === module) {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
