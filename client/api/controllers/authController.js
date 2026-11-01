// This controller is responsible for handling user registration and login requests.
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DEFAULT_JWT_SECRET =
    "450ff43b521991f698b67b008148da4010f5969cd61cfc1931b307befdbda207";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid name, email, and password"
            });
        }

        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedName || !normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        //this block of code checks if a user with the provided email already exists in the database. If an existing user is found, it returns a 409 Conflict response indicating that the email is already registered. If no existing user is found, it proceeds to hash the password and create a new user in the database.
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        //this line hashes the user's password using bcrypt with a salt factor of 12. The hashed password is then stored in the database instead of the plain text password, enhancing security by protecting user credentials from being easily compromised in case of a data breach.
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: normalizedName,
            email: normalizedEmail,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }
//this block of code handles validation errors that may occur during the registration process. If a validation error is detected (e.g., missing required fields, invalid data formats), it returns a 400 Bad Request response with a message prompting the user to check their registration details. For any other unexpected errors, it logs the error message to the console and returns a 500 Internal Server Error response indicating a server-side issue during registration.
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Please check the registration details"
            });
        }

        console.error("Registration error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

  //normalizes the email by trimming whitespace and converting it to lowercase to ensure consistency when checking against stored user records in the database.
        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const jwtSecret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;

        const token = jwt.sign(
            { userId: user._id.toString() },
            jwtSecret,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};
