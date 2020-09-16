const sql = require('./db');
const { post } = require('../routes/user');

//constructor
const User = function(user) {
    this.surname = user.surname,
    this.firstname = user.firstname,
    this.avatarUrl = user.avatarUrl,
    this.email = user.email,
    this.password = user.password,
    this.birthday = user.birthday
};

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

User.getOne = (email, result) => {
    sql.query(`SELECT * FROM Users WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Utilisateur trouvé:', res[0]);
            
            return res[0];
        }

        //pas trouvé avec l'id
        result({ kind: 'not_found' }, null);
    })
}

User.getOneId = (id, result) => {
    sql.query(`SELECT * FROM Users WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Post trouvé:', res[0]);
            result(null, res[0]);
            return;
        }

        //pas trouvé avec l'id
        result({ kind: 'not_found' }, null);
    })
}

User.update = (id, user, result) => {
    sql.query (
        "UPDATE Users SET surname = ?, firstname = ?, avatarUrl = ?, email = ? WHERE id = ?",
        [user.surname, user.firstname, user.avatarUrl, user.email, id],
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