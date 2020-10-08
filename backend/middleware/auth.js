const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
        const userId = decodedToken.userId;
        const roleId = decodedToken.roleId;
        let reqId = req.body.userId;
        console.log('UserID')
        console.log(userId);
        console.log(decodedToken);
        if (typeof req.body.userId === 'string') {
            reqId = parseInt(reqId, 10);
        }
        if (req.body.userId && req.body.userId > 0 && req.body.userId !== userId ) {
            throw 'User ID non valable';
        } 
        else {
            next();
        }
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }
};