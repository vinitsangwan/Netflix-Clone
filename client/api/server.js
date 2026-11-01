
require("dotenv").config();// This line loads environment variables from a .env file into process.env, allowing the application to access sensitive information like database connection strings and secret keys without hardcoding them into the source code.
const express = require("express");// This line imports the Express framework, which is used to create the server and handle HTTP requests and responses.
const cors = require("cors");// This line imports the CORS middleware, which allows the server to handle cross-origin requests from different domains, enabling the frontend and backend to communicate seamlessly.
const connectDB = require("./config/db");//this line imports a custom module that handles the connection to the MongoDB database, ensuring that the server can interact with the database for data storage and retrieval.
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
