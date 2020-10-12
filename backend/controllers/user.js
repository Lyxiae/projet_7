const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Importation du schéma/modèle User
const User = require('../models/user.model.js');

//Importation du système de gestion de fichiers file system de Node
const fs = require('fs');

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
                image: req.body.image,
            });
            //Enregistre l'objet user avec renvoi d'erreur si ça ne fonctionne pas, et statut 201 de création si ça fonctionne
            User.create(user, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || 'Une erreur est apparue lors de la création du user'
                    });
                    return;
                }
                res.send(data)
            });
        })
        //Renvoi d'erreur 500 si le hash ne fonctionne pas
        .catch(error => res.status(500).json({ error }));
};

//Connexion
exports.login = (req, res, next) => {
    User.getOne(req.body.email, (err, result) => {
        if (!result) {
            console.log("Utilisateur non trouvé");
            res.status(404).send({
                message: "Utilisateur non trouvé"
            });
            return;
        } else {
            bcrypt.compare(req.body.password, result.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    let userId = result.id
                    const payload = {
                        "userId": userId,
                        "roleId": result.roleId
                    }
                    res.status(200).json({
                        userId: result.id,
                        roleId: result.roleId,
                        token: jwt.sign(
                            payload,
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
    User.getOneId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Cet utilisateur n'existe pas ou plus.`
                });
            } else {
                res.status(500).send({
                    message: err.message || 'Erreur lors de la réception du user'
                });
            }
        } else {
            res.send(data);
        }
    })
};

//Logique métier pour updateUser
exports.update = (req, res, next) => {
    // Validation de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne doit pas être vide !'
        });
    }
    const user = new User({
        surname: req.body.surname,
        firstname: req.body.firstname,
        email: req.body.email,
        birthday: req.body.birthday
    });
    if (req.file) {
        User.getOneId(req.params.id, (err, data) => {
            if (data.image) {
                const filename = data.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) throw err;
                });
            }
        });
        user.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    User.update(req.params.id, user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Cet utilisateur n'existe pas ou plus.`
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

//Logique métier pour deletePost
exports.deleteUser = (req, res, next) => {
    User.getOneId(req.params.id, (err, data) => {
        const filename = data.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            User.delete(req.params.id, (err, data) => {
                if (err) {
                    if (err, kind === "not_found") {
                        res.status(404).send({
                            message: `L'utilisateur n'existe pas ou plus.`
                        });
                    } else {
                        res.status(500).send({
                            message: 'Suppression impossible'
                        });
                    }
                } else res.send({ message: `L'utilisateur a été supprimé !` });
            });
        })
    })
};

exports.getUserComments = (req, res, next) => {
    User.getUserComments(req.params.id, (err, data) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        res.send(data);
    });

}

exports.getUserReactions = (req, res, next) => {
    User.getUserReactions(req.params.id, (err, data) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        res.send(data);
    });
}