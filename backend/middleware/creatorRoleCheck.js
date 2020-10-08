const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.params);
    const postUserId = req.params.postUserId;
    console.log("postUserId");
    console.log(postUserId);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
    const userId = decodedToken.userId;
    function isMod(role) {
        if (role == 1 || role == 3) {
            return true
        } else {
            return false
        }
    }
    if (userId == req.body.userId || userId == postUserId || isMod) {
        next();
    } else {
        res.status(403).json({error: error | 'Utilisateur non autorisé à effectuer cette requête !'});
    }
};