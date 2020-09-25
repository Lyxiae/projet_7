const sql = require('./db');
const { post } = require('../routes/user');

//constructor
const Comment = function(comment) {
    this.userId = comment.userId,
    this.postId = comment.postId,
    this.content = comment.content
};

//Récupération d'un post d'après son identifiant
Comment.getComments = (postId, result) => {
    sql.query(`SELECT comments.content, comments.date_posted, comments.id, comments.userId, Users.surname, Users.firstname FROM comments JOIN Users ON Users.id = comments.userId WHERE comments.postId = ${postId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            ;
        }

        // console.log("Commentaires: ", res);
        result(null, res);
    })
}

Comment.create = (comment, result) => {

    sql.query("INSERT INTO comments SET ?", comment, (err, res) => {
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