module.exports = (req, res, next) => {
    const role = req.query.role;
    
        // const role = new URLSearchParams(role);
        console.log(role);
        // console.log(req.params.role);
        if (role == 1 || role == 3) {
            next();
        } else {
            res.status(403).json('Utilisateur non autorisé à effectuer cette requête !');
        }
};