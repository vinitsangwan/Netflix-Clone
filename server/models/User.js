
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(//user schema for the database -it is the structure of the user data that will be stored in the database
    
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 8
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
