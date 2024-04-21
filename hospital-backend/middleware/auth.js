// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv')
// require('dotenv').config();
// const SECRET = process.env.SECRET;

// const authenticateJwt = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (authHeader) {
//         const token = authHeader.split(' ')[1]; // Use space (' ') to split the header
//         jwt.verify(token, SECRET, (err, user) => {
//             if (err) {
//                 res.sendStatus(403);
//             } else {
//                 // console.log("Decoded user:", user);
//                 req.user = user;
//                 next();
//             }
//         });
//     } else {
//         res.sendStatus(401);
//         console.log("Token doesn't exist");
//     }
// };

// module.exports={
//     authenticateJwt,
//     SECRET
// }
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();

const adminSecret = process.env.ADMIN_SECRET; // Load admin secret from environment variables
const userSecret = process.env.USER_SECRET; // Load user secret from environment variables

const authenticateJwt = (secret) => (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Use space (' ') to split the header
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        res.sendStatus(401);
        console.log("Token doesn't exist");
    }
};

module.exports = {
    authenticateAdminJwt: authenticateJwt(adminSecret), // Middleware for admin authentication
    authenticateUserJwt: authenticateJwt(userSecret), // Middleware for user authentication
    adminSecret,
    userSecret
};

