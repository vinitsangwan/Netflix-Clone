// this middleware function is used to protect routes that require authentication. It checks for a valid JWT token in the request headers and verifies it. If the token is valid, it allows the request to proceed; otherwise, it returns an error response.
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

    //this block of code is responsible for verifying the JWT token. It uses the jwt.verify method to decode the token and check its validity. If the token is valid, it extracts the userId from the decoded token and attaches it to the request object (req.userId) for further use in subsequent middleware or route handlers. If the token is invalid or expired, it returns a 401 Unauthorized response with an appropriate error message.
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
