const Post = require('../models/post.model');
const Reaction = require('../models/reactions.model');
const Comment = require('../models/comment.model');

//Importation du système de gestion de fichiers file system de Node
const fs = require('fs');

//Logique métier pour createPost
exports.createPost = (req, res, next) => {
    //Vérification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne doit pas être vide !'
        });
    }
    console.log(req);
    console.log(req.body);
    console.log(req.file);
    //Création du post
    const post = new Post({
        userId:req.body.userId,
        postTitle:req.body.postTitle,
        content:req.body.postContent,
    });
    if (req.file) {
        post.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    console.log(post);
    //Sauvegarde dans la base de données
    Post.create(post, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Une erreur est apparue lors de la création du post'
            });
            return;
        }
        res.send(data);
    });
};

//Logique métier pour createPost
exports.createComment = (req, res, next) => {
    //Vérification de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne doit pas être vide !'
        });
    }
    //Création du post
    const comment = new Comment({
        postId:req.body.postId,
        userId:req.body.userId,
        content:req.body.content,
    });

    //Sauvegarde dans la base de données
    Comment.create(comment, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Une erreur est apparue lors de la création du commentaire'
            });
            return;
        }
        res.send(data);
    });
};

//Logique métier pour deletePost
exports.deletePost = (req, res, next) => {
    Post.getOne(req.params.id, (err, data) => {
        if (req.body.image) {
                    const filename = data.image.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err) => {
                    if (err) {
                        res.status(500).send({
                            message: err
                        })
                        };
            });
        }
        Post.delete(req.params.id, (err, data) => {
                if (err) {
                    if (err,kind === "not_found") {
                        res.status(404).send({
                            message: `Le post n'existe pas ou plus.`
                        });
                    } else {
                        res.status(500).send({
                            message: 'Suppression impossible'
                        });
                    }
                } else res.send({ message: `Le post a été supprimé !`});
            });
    })
};

//Logique métier pour getAllPosts
exports.getAllPosts = (req, res, next) => {
    Post.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Erreur lors de la réception des posts'
        });
        else res.send(data);
        })
    };

    //Logique métier pour getComments
exports.getComments = (req, res, next) => {
    Comment.getComments(req.params.id, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Erreur lors de la réception des commentaires'
        });
        else res.send(data);
        })
    };

        //Logique métier pour getAllPosts
exports.getReactions = (req, res, next) => {
        let likes = [];
        let dislikes = [];
        let reactions = {};
    Reaction.getLikes(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Erreur lors de la réception des likes'
            });
        }
        
        else {
            likes.push(data);
        console.log("data likes ajoutée");
        console.log(likes);
        return likes
        } 

    })

    Reaction.getDislikes(req.params.id, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Erreur lors de la réception des dislikes'
        });
        else {
            dislikes.push(data);
            console.log("data dislikes ajoutée");
            console.log(dislikes);
            reactions.likes = likes.flat(1);
            reactions.dislikes = dislikes.flat(1);
            console.log(reactions);
            res.send(reactions);
        } 
    })
    };

    //Logique métier pour deletePost
exports.deleteComment = (req, res, next) => {
    Comment.delete(req.params.id, (err, data) => {
        if (err) {
            if (err,kind === "not_found") {
                res.status(404).send({
                    message: `Le commentaire n'existe pas ou plus.`
                });
            } else {
                res.status(500).send({
                    message: 'Suppression impossible'
                });
            }
        } else res.send({ message: `Le commentaire a été supprimé !`});
    });
};

//Logique métier pour getUserPosts
exports.getUserPosts = (req, res, next) => {
    Post.getFromUser(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Ce post n'existe pas ou plus.`
                });
            } else {
                res.status(500).send({
                    message: err.message || 'Erreur lors de la réception du post'
                });
            }
        } else {
             res.send(data);
            }
        })
    };

//Logique métier pour getOnePost
exports.getOnePost = (req, res, next) => {
    Post.getOne(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Ce post n'existe pas ou plus.`
                });
            } else {
                res.status(500).send({
                    message: err.message || 'Erreur lors de la réception du post'
                });
            }
        } else {
             res.send(data);
        }
    })
};

//Logique métier pour modifyPost
exports.modifyPost = (req, res, next) => {
    // Validation de la requête
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne doit pas être vide !'
        });
    }
    const post = new Post({
        userId:req.body.userId,
        postTitle:req.body.postTitle,
        content:req.body.postContent,
        
    });
    if (req.file) {
        Post.getOne(req.params.id, (err, data) => {
            console.log(data);
            if (data.image) {
                const filename = data.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, (err) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    })
                    };
            });
            }
        });
        post.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    
    Post.update(req.params.id, post, (err, data) => {
        console.log(post);
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message:  `Ce post n'existe pas ou plus.`
                });
            } else {
                res.status(500).send({
                    message: 'Erreur lors de la modification du post'
                });
            }
        } else {
            res.send(data);
        }
    });
};

//Logique métier pour likeSystem

exports.likeSystem = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Le contenu de la requête ne doit pas être vide !'
        });
    };
    if (req.body.reaction === 1 || req.body.reaction === 2) {
        Reaction.like(new Reaction(req.body), (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message:  `Ce post n'existe pas ou plus.`
                    });
                } else {
                    res.status(500).send({
                        message: 'Erreur lors de la création de réaction'
                    });
                }
            } else {
                res.send(data);
            }
        })
    }

    if (req.body.reaction === 3) {
        Reaction.cancel(req, (err, data) => {
            if (err) {
                if (err,kind === "not_found") {
                    res.status(404).send({
                        message: `Le post n'existe pas ou plus.`
                    });
                } else {
                    res.status(500).send({
                        message: 'Suppression impossible'
                    });
                }
            } else res.send({ message: `La réaction a été supprimée !`});
        })
    }
}

