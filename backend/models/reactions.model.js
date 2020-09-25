const sql = require('./db');
const { post } = require('../routes/user');
const e = require('express');

//constructor
const Reaction = function(reaction) {
    this.userId = reaction.userId,
    this.postId = reaction.postId,
    this.reaction = reaction.reaction
};

Reaction.like = (reaction, result) => {
    sql.query ("INSERT INTO reactions SET ?", reaction, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            } else {
                console.log('Réaction postée !');
                result(null, {...reaction});
            }
        }
    )
};

Reaction.cancel = (req, result) => {
    console.log(req.body);
    sql.query (`DELETE FROM reactions WHERE userId= ? AND postId= ?;`, [req.body.userId, req.body.postId] , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log('réaction supprimée');
        result(null, res);
    });
};

Reaction.getLikes = (postId, result) => {

    sql.query(`SELECT * FROM reactions WHERE reaction = 1 and postId= ${postId}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        result(null, res);
    })
};

Reaction.getDislikes = (postId, result) => {

    sql.query(`SELECT * FROM reactions WHERE reaction = 2 and postId= ${postId}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        result(null, res);
    })
};

module.exports = Reaction;
