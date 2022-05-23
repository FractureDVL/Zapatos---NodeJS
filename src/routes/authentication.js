const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

/*Inicio de sesion*/
router.get('/inicio', (req, res) => {

    res.render('links/auth/inicio', { layout: 'full-width' });
});

router.post('/signin', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local.signin', {
        successRedirect: '/perfil',
        failureRedirect: '/inicio',
        failureFlash: true
    })(req, res, next);
});

/*Registro de usuario*/
router.get('/registro', (req, res) => {

    res.render('links/auth/registro', { layout: 'full-width' });
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/perfil', isLoggedIn, (req, res) => {

    res.render('links/Jinja/perfil');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.render('/inicio');
});


// passport.deserializeUser((usr, done)=>{
// })
module.exports = router;