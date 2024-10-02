// const jwt = require('jsonwebtoken');

// // const authMiddleware = (req, res, next) => {
// //     const token = req.headers.authorization?.split(" ")[1];

// //     if (!token) {
// //         return res.status(401).json({ message: "No token provided" });
// //     }

// //     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// //         if (err) {
// //             if (err.name === "TokenExpiredError") {
// //                 return res.status(401).json({ message: "Token expired, please login again" });
// //             }
// //             return res.status(403).json({ message: "Invalid token" });
// //         }

// //         req.user = decoded; 
// //         next();
// //     });
// // };


// const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "No token provided" });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             if (err.name === "TokenExpiredError") {
//                 return res.status(401).json({ message: "Token expired, please login again" });
//             }
//             return res.status(403).json({ message: "Invalid token" });
//         }

//         req.user = decoded; // decoded contains id, email, and role
//         next();
//     });
// };




// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Adjust the path as necessary

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers

        if (!token) {
            return res.status(401).json({ message: 'Authentication token is required.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach decoded user information to req.user

        // Optional: fetch user details from the database if necessary
        const user = await User.findById(decoded.id).select('email'); // Only fetch email
        req.user.email = user.email; // Attach user email to req.user

        next(); // Proceed to the next middleware
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
