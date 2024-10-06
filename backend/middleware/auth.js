// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

// module.exports = auth;



const jwt = require('jsonwebtoken');

// Middleware to verify the user token
const auth = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    // console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token verification error', error: err.message });
        }
        req.userId = decoded.id; // Make sure this matches your token payload
        next();
    });
};

module.exports = auth;
