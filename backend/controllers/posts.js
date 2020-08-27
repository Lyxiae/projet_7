const Post = require('../models/post.model');

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

    //Création du post
    const post = new Post({
        userId:req.body.userId,
        postTitle:req.body.postTitle,
        content:req.body.content,
        image:req.body.image
    });
    console.log(post);
    console.log(req.body.userId);
    console.log(req.body.postTitle);
    //Sauvegarde dans la base de données
    Post.create(post, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Une erreur est apparue lors de la création du post'
        });
        else res.send(data);
    });
};

//Logique métier pour addLikeDislike

exports.addLikeDislike = (req, res, next) => {
    console.log('avis donné');
};

//Logique métier pour deletePost
exports.deletePost = (req, res, next) => {
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
        } else res.send(data);
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
    

    Post.update(req.params.id, new Post(req.body), (err, data) => {
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
        } else res.send(data);
    });
};