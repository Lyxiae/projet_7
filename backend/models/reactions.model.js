const sql = require('./db');
const { post } = require('../routes/user');
const e = require('express');

//constructor
const Reaction = function(reaction) {
    this.userId = reaction.userId,
    this.postId = reaction.postId,
    this.reaction = reaction.reactionId
};

Reaction.like = (reaction, result) => {
    sql.query ("INSERT INTO Reactions SET ?", reaction, (err, res) => {
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
    console.log(req);
    sql.query (`DELETE FROM Reactions WHERE userId=${req.body.userId} AND postId=${req.body.postId};`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log('réaction supprimée');
        result(null, res);
    });
};

module.exports = Reaction;
