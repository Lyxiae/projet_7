const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
        const role = decodedToken.roleId;
        if (role == 1) {
            next();
        } else {
            res.status(403).json('Utilisateur non autorisé à effectuer cette requête !');
        }
};