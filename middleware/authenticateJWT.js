const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log('JWT Verification Error:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateJWT;
