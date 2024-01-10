let secetKey = "Temp_123456789Tested"

const jwt = require('jsonwebtoken');

// Generate JWT token
exports.generateToken = (payload) => {
    return jwt.sign(payload, secetKey, {
        expiresIn: '1d', // Token expires in 1 hour
    });
};

// Verify JWT token
exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secetKey, (err, decoded) => {
            if (err) {
                reject('Invalid token');
            } else {
                resolve(decoded);
            }
        });
    });
};
