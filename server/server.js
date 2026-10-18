
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const app = express();

// Middleware

app.use(cors({
    origin: [//updated one 
        "http://localhost:5173",
        "http://localhost:5174"
    ]
}));


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Netflix Clone Backend is Running!");
});

// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Netflix Clone backend is running!",
    });
});

// Start server after MongoDB connects
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
