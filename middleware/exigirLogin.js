// middleware/exigirLogin.js
module.exports = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return next();       // logado: segue para o controller
    }
    res.redirect('/login');  // não logado: volta para o login
};
