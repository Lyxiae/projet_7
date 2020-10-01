const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
        const userId = decodedToken.userId;
        const reqId = parseInt(req.body.userId, 10);
        if (req.body.userId && reqId !== userId) {
            throw 'User ID non valable';
        } 
        
        if (req.body.userId && req.body.userId == userId) {
            next();
        }

        else {
            next();
        }
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }
};