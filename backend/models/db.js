const mysql = require('mysql');
const dbConfig = require('../config/db.config');

//Crée une connection pour la database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//Ouverture de la connection MySQL
connection.connect(error => {
    if (error) throw error;
    console.log('Connexion à la base de données réussie !')
});

module.exports = connection;