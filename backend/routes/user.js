const express = require('express');
const router = express.Router();
const bouncer = require('express-bouncer')(500, 900000);

const admincheck = require('../middleware/admincheck');

//Importation des logiques métier pour les routes
const userCtrl = require('../controllers/user');

//Importation du middleware de configuration de multer
const multer = require('../middleware/multer-config');

//Importation du middleware verifyPassword pour la vérification de la complexité du mot de passe
const verifyPassword = require('../middleware/verifyPassword');

//Route POST pour l'inscription d'un utilisateur
router.post('/signup', verifyPassword, userCtrl.signup);

//Route POST pour la connexion d'un utilisateur
router.post('/login', userCtrl.login);

//Route GET pour la recherche d'un utilisateur (affichage du profil)
router.get('/profile/:id', userCtrl.getOneUser);

//Route GET pour la récupération des commentaires de l'utilisateur 
router.get('/profile/comments/:id', userCtrl.getUserComments);

//Route GET pour la récupération des réactions de l'utilisateur 
router.get('/profile/reactions/:id', userCtrl.getUserReactions);

//Route PUT pour la modification d'un utilisateur 
router.put('/:id', multer, userCtrl.update);

//Route DELETE pour la suppression d'un utilisateur
router.delete('/:id', admincheck, multer, userCtrl.deleteUser);

module.exports = router;