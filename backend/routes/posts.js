const express = require('express');
const router = express.Router();

//IMportation des controllers
const postsCtrl = require('../controllers/posts');

// Route POST, pour poster un message
router.post('/', postsCtrl.createPost);

// Route POST pour les likes/dislikes
router.post('/:id/like', postsCtrl.likeSystem);

// Route PUT pour modifier un post créé
router.put('/:id', postsCtrl.modifyPost);

//Route DELETE pour supprimer un post créé (et ses commentaires)
router.delete('/:id', postsCtrl.deletePost);

// Route GET pour afficher la liste des messages
router.get('/', postsCtrl.getAllPosts);

// Route GET pour afficher la liste des messages postés par un utilisateur
router.get('/myposts/:userId', postsCtrl.getUserPosts);

//Route GET pour afficher un post et ses commentaires
router.get('/:id', postsCtrl.getOnePost);

module.exports = router;