const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
        const userId = decodedToken.userId;
        console.log('UserID')
        console.log(userId);
        if (req.body.userId && req.body.userId > 0 && req.body.userId !== userId ) {
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }
};