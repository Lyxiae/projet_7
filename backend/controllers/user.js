const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Importation du schéma/modèle User
const User = require('../models/user.model.js');

//Inscription
exports.signup = (req, res, next) => {
    //Hash le mot de passe à partir du password donné dans la requête, effectue l'opération 10 fois
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        //Crée l'objet user d'après le modèle User avec l'email dela requête et la version hash du password
        const user = new User({
            surname: req.body.surname,
            firstname: req.body.firstname,
            email: req.body.email,
            birthday: req.body.birthday,
            password: hash,
            avatarUrl: req.body.avatarUrl,
        });
        //Enregistre l'objet user avec renvoi d'erreur si ça ne fonctionne pas, et statut 201 de création si ça fonctionne
        User.create(user, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Une erreur est apparue lors de la création du user'
                });
                return;
            }
            res.send(data);
        });
    })
    //Renvoi d'erreur 500 si le hash ne fonctionne pas
    .catch(error => res.status(500).json({ error }));
};

//Connexion
exports.login = (req, res, next) => {
    User.getOne(req.body.email, (err, data) => {
        if (!data) {
            res.status(404).send({
                message: err.message || "Utilisateur non trouvé"
            });
            return;
        } else {
            bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
            }
            res.status(200).json({
                userId: user.userId,
                token: jwt.sign(
                    { userId: user.userId },
                    `${process.env.JWT_KEY}`,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
        }
    })
    
}

//Logique métier pour getOne
exports.getOneUser = (req, res, next) => {
    User.getOneId(req.body.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Cet utilisateur n'existe pas ou plus.`
                });
            } else {
                res.status(500).send({
                    message: err.message || 'Erreur lors de la réception du post'
                });
            }
        } else {
             res.send(data);
        }
    })
};

//Logique métier pour modifyPost
exports.update = (req, res, next) => {
    // Validation de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne doit pas être vide !'
        });
    }
    

    User.update(req.params.id, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message:  `Cet utilisateur n'existe pas ou plus.`
                });
            } else {
                res.status(500).send({
                    message: 'Erreur lors de la modification utilisateur'
                });
            }
        } else {
            res.send(data);
        }
    });
};