const sql = require('./db');
const { post } = require('../routes/user');

//constructor
const Post = function(post) {
    this.userId = post.userId,
    this.postTitle = post.postTitle,
    this.content = post.content,
    this.image = post.image
};

//Création d'un post
Post.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('Posté !');
        result(null, {id: res.id, ...newPost});
    })
};



//Récupération de tous les posts
Post.getAll = result => {
    sql.query("SELECT posts.id, posts.postTitle, posts.userId, posts.content, posts.image, posts.date_posted, Users.surname, Users.firstname FROM posts JOIN Users ON Users.id = posts.userId", (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
      
        console.log("posts: ", res);
        result(null, res);
    });
};

//Récupération de tous les posts
Post.getLast = result => {
    sql.query("(SELECT `posts`.`id` AS `postId`, NULL AS `commentId`, `posts`.`postTitle`, `posts`.`date_posted` AS `postDate`, `users`.`id` AS `userId`, `users`.`surname`, `users`.`firstname` FROM `posts` INNER JOIN `users` ON `users`.`id` = `posts`.`userId`) UNION (SELECT `comments`.`postId` AS `postId`, `comments`.`id` AS `commentId`, NULL AS `postTitle`,`comments`.`date_posted`,  `users`.`id` AS `userId`, `users`.`surname` AS `commentSurname`, `users`.`firstname` AS `commentFirstname` FROM `comments` INNER JOIN `users` ON `users`.`id` = `comments`.`userId`) ORDER BY `postDate` DESC;", (err, res) => { 
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
      
        console.log("posts: ", res);
        result(null, res);
    });
};

//Récupération d'un post d'après l'userId pour l'affichage des posts de l'utilisateur actif - NON FONCTIONNEL
Post.getFromUser = (userId, result) => {
    sql.query(`SELECT posts.id, posts.postTitle, posts.userId, posts.content, posts.image, posts.date_posted, Users.surname, Users.firstname FROM posts JOIN Users ON Users.id = posts.userId WHERE userId = ${userId}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
      
        console.log("posts: ", res);
        result(null, res);
    });
};

//Récupération d'un post d'après son identifiant
Post.getOne = (postId, result) => {
    sql.query(`SELECT posts.id, posts.postTitle, posts.userId, posts.content, posts.image, posts.date_posted, Users.surname, Users.firstname FROM posts JOIN Users ON Users.id = posts.userId WHERE posts.id = ${postId}`, (err, res) => {
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



//Mise à jour d'un post
Post.update = (id, post, result) => {
    sql.query (
        "UPDATE posts SET postTitle = ?, content = ?, image = IFNULL(?, image) WHERE id = ?",
        [post.postTitle, post.content, post.image, id],
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
            console.log('Post mis à jour !');
            result(null, {id: id, ...post});
        }
    );
};

//Suppression d'un post
Post.delete = (id, result) => {
    sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
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

        console.log('Post supprimé');
        result(null, res);
    });
};



module.exports = Post;