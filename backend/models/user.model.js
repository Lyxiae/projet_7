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

module.exports = User;