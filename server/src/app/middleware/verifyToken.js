const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    let accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
        return res.status(401).json({
            err: 1,
            msg: 'missing authorization',
        });
    } else {
        jwt.verify(accessToken, process.env.SECRET_KEY, (err, decodeUser) => {
            if (err) {
                return res.status(401).json({
                    err: 1,
                    msg: 'token het han',
                });
            }
            // else {
            req.user = decodeUser;
            next();
            // }
        });
    }
};

module.exports = verifyToken;
