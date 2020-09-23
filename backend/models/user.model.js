const sql = require('./db');
const { post } = require('../routes/user');

//constructor
const User = function(user) {
    this.surname = user.surname,
    this.firstname = user.firstname,
    this.image = user.image,
    this.email = user.email,
    this.password = user.password,
    this.birthday = user.birthday
};

//Création d'un utilisateur
User.create = (newUser, result) => {
    sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('Utilisateur ajouté !');
        result(null, {id: res.id, ...newUser});
    })
};

//Récupération d'un utilisateur d'après son adresse email pour le login
User.getOne = (email, result) => {
    sql.query(`SELECT * FROM Users WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res[0]);
    })
}

//Récupération d'un utilisateur d'après son id pour l'affichage du profil
User.getOneId = (id, result) => {
    sql.query(`SELECT * FROM Users WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Utilisateur trouvé:', res[0]);
            result(null, res[0]);
            return;
        }

        //pas trouvé avec l'id
        result({ kind: 'not_found' }, null);
    })
}

//Mise à jour d'un utilisateur après requête.
User.update = (id, user, result) => {
    sql.query (
        "UPDATE Users SET surname = ?, firstname = ?, image = ?, email = ?, birthday = ? WHERE id = ?",
        [user.surname, user.firstname, user.image, user.email, user.birthday, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: 'not_found'}, null);
                return;
            }
            console.log('Utilisateur mis à jour !');
            result(null, {id: id, ...user});
        }
    );
};
module.exports = User;