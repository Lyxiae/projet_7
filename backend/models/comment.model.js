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

module.exports = Comment;