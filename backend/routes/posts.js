const express = require('express');
const router = express.Router();

//IMportation des controllers
const postsCtrl = require('../controllers/posts');

// Route POST, pour poster un message
router.post('/', postsCtrl.createPost);

// Route POST pour les likes/dislikes
router.post('/:id/like', postsCtrl.addLikeDislike);

// Route PUT pour modifier un post créé
router.put('/:id', postsCtrl.modifyPost);

//Route DELETE pour supprimer un post créé (et ses commentaires)
router.delete('/:id', postsCtrl.deletePost);

// Route GET pour afficher la liste des messages
router.get('/', postsCtrl.getAllPosts);

//Route GET pour afficher un post et ses commentaires
router.get('/:id', postsCtrl.getOnePost);

// // simple route
// router.get("/", (req, res) => {
//     res.json({ message: "Route GET accomplie" });
//   });

module.exports = router;