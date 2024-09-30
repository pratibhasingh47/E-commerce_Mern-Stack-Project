const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    // console.log("Request Headers:", req.headers);

    const token = req.header('Authorization')?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: "Access denied: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error("Invalid token:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
