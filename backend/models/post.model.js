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
    sql.query("INSERT INTO Posts SET ?", newPost, (err, res) => {
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
    sql.query("SELECT * FROM Posts", (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
      
        console.log("Posts: ", res);
        result(null, res);
    });
};

//Récupération d'un post d'après l'userId pour l'affichage des posts de l'utilisateur actif - NON FONCTIONNEL
Post.getFromUser = (userId, result) => {

    sql.query(`SELECT * FROM Posts WHERE userId = ${userId}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
      
        console.log("Posts: ", res);
        result(null, res);
    });
};

//Récupération d'un post d'après son identifiant
Post.getOne = (postId, result) => {
    sql.query(`SELECT * FROM Posts WHERE id = ${postId}`, (err, res) => {
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
        "UPDATE Posts SET postTitle = ?, content = ?, image = ? WHERE id = ?",
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
    sql.query("DELETE FROM Posts WHERE id = ?", id, (err, res) => {
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