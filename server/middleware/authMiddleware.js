
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Not authorized. Token missing."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const jwtSecret =
            process.env.JWT_SECRET ||
            "450ff43b521991f698b67b008148da4010f5969cd61cfc1931b307befdbda207";

        const decoded = jwt.verify(
            token,
            jwtSecret
        );

        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

module.exports = protect;
