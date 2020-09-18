const sql = require('./db');
const { post } = require('../routes/user');

//constructor
const Comment = function(comment) {
    this.userId = comment.userId,
    this.postId = comment.postId,
    this.content = comment.content
};



Comment.create = (comment, result) => {

    sql.query("INSERT INTO Comments SET ?", comment, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('Posté !');
        result(null, {id: res.id, ...comment});
    })
};

Comment.getLikes = (postId, result) => {

    sql.query(`SELECT * FROM Reactions WHERE reaction = 1 and postId= ${postId}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        result(null, res);
    })
};

Comment.getDislikes = (postId, result) => {

    sql.query(`SELECT * FROM Reactions WHERE reaction = 2 and postId= ${postId}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        result(null, res);
    })
};

module.exports = Comment;