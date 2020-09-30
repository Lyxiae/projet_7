const express = require('express');
const router = express.Router();

//Importation des controllers
const postsCtrl = require('../controllers/posts');

//Importation du middleware de configuration de multer
const multer = require('../middleware/multer-config');

// Route POST, pour poster un message
router.post('/', multer, postsCtrl.createPost);

// Route POST pour les likes/dislikes
router.post('/:id/like', postsCtrl.likeSystem);

// Route POST pour les likes/dislikes
router.get('/:id/like', postsCtrl.getReactions);

// Route POST pour poster un commentaire
router.post('/:id', postsCtrl.createComment);

// Route PUT pour modifier un post créé
router.put('/:id', multer, postsCtrl.modifyPost);

//Route DELETE pour supprimer un post créé (et ses commentaires)
router.delete('/:id', postsCtrl.deletePost);

// Route GET pour afficher la liste des messages
router.get('/', postsCtrl.getAllPosts);

// Route GET pour afficher la liste des messages postés par un utilisateur
router.get('/user/:userId', postsCtrl.getUserPosts);

//Route GET pour afficher un post et ses commentaires
router.get('/:id', postsCtrl.getOnePost);

//Route GET pour afficher les commentaires d'un post
router.get('/:id/comments', postsCtrl.getComments);

//Route DELETE pour supprimer un post créé (et ses commentaires)
router.delete('/:postId/comments/:id', postsCtrl.deleteComment);

module.exports = router;