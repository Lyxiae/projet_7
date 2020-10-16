const passwordSchema = require('../constraints/Password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        console.log('mot de passe trop simple');
        res.status(400).json({error: "Votre mot de passe est trop simple. N'oubliez pas d'inclure des majuscules et des chiffres." });
    } else {
        next();
    }
};