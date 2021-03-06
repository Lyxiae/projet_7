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
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, {id: res.id, ...newUser});
        }
        
    })
};

//Récupération d'un utilisateur d'après son adresse email pour le login
User.getOne = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
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
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
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

//Récupération d'un utilisateur d'après son id pour l'affichage du profil
User.getUserReactions = (id, result) => {
    sql.query(`SELECT * FROM reactions WHERE userId = ${id}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
      
        console.log("Reactions: ", res);
        result(null, res);
    })
}

//Récupération d'un utilisateur d'après son id pour l'affichage du profil
User.getUserComments = (id, result) => {
    sql.query(`SELECT * FROM comments WHERE userId = ${id}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
      
        console.log("Commentaires: ", res);
        result(null, res);
    })
}

//Mise à jour d'un utilisateur après requête.
User.update = (id, user, result) => {
    sql.query (
        "UPDATE users SET surname = ?, firstname = ?, email = ?, birthday = ?, image = IFNULL(?, image) WHERE id = ?",
        [user.surname, user.firstname, user.email, user.birthday, user.image, id],
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

//Suppression d'un post
User.delete = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0){
            //Post non trouvé avec l'id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log('Utilisateur supprimé');
        result(null, res);
    });
};
module.exports = User;