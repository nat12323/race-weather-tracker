const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        //Get token from the header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        //Extract the token (substring cuts Bearer_ off the front)
        const token = authHeader.substring(7);

        //Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Add user info to the request
        req.userId = decoded.userId;
        req.userEmail = decoded.email;

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Authentication failed' });
    }
}

module.exports = authenticateToken;