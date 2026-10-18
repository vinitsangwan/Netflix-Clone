
const mongoose = require("mongoose");

const DEFAULT_MONGO_URI =
    "mongodb+srv://netflix:netflix1234@cluster0.7bb3kd4.mongodb.net/netflix_clone?retryWrites=true&w=majority";

let connectionPromise;

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    const uri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(uri, {
                serverSelectionTimeoutMS: 10000,
                connectTimeoutMS: 10000,
            })
            .catch((error) => {
                connectionPromise = null;
                throw error;
            });
    }

    return connectionPromise;
};

module.exports = connectDB;
