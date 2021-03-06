const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const modcheck = require('../middleware/modcheck');
const creatorRoleCheck = require('../middleware/creatorRoleCheck');

//Importation des controllers
const postsCtrl = require('../controllers/posts');

//Importation du middleware de configuration de multer
const multer = require('../middleware/multer-config');

// Route POST, pour poster un message
router.post('/', auth, multer, postsCtrl.createPost);

// Route POST pour les likes/dislikes
router.post('/:id/like', auth, postsCtrl.likeSystem);

// Route GET pour les likes/dislikes
router.get('/:id/like', postsCtrl.getReactions);

// Route POST pour poster un commentaire
router.post('/:id', auth, postsCtrl.createComment);

// Route PUT pour modifier un post créé
router.put('/:id', auth, creatorRoleCheck, multer, postsCtrl.modifyPost);

//Route DELETE pour supprimer un post créé (et ses commentaires)
router.delete('/:id', auth, creatorRoleCheck, postsCtrl.deletePost);

// Route GET pour afficher la liste des messages
router.get('/', postsCtrl.getAllPosts);

// Route GET pour afficher la liste des messages
router.get('/mod', postsCtrl.getLastPosts);

// Route GET pour afficher la liste des messages postés par un utilisateur
router.get('/user/:userId', postsCtrl.getUserPosts);

//Route GET pour afficher un post et ses commentaires
router.get('/:id', postsCtrl.getOnePost);

//Route GET pour afficher les commentaires d'un post
router.get('/:id/comments', postsCtrl.getComments);

//Route DELETE pour supprimer un commentaire créé
router.delete('/:postId/comments/:id', auth, modcheck, postsCtrl.deleteComment);

module.exports = router;