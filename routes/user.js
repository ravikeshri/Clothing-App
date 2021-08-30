const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const { isLoggedIn, forwardAuthenticated } = require('../config/auth');

// Login route
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register route
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Handling  Register logic 
router.post('/register',forwardAuthenticated, (req, res) => {
    const { fname, lname, email, password, confirm_password } = req.body;
    
    let errors = [];

    if (!fname || !email || !password || !confirm_password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != confirm_password) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            fname,
            lname,
            email,
            password,
            confirm_password
        });
    } else {
        User.findOne({ email: email }).then(user => {
        if (user) {
            errors.push({ msg: 'Email already exists' });
            res.render('register', {
            errors,
            fname,
            lname,
            email,
            password,
            confirm_password,
            
            });
        } else {
            const newUser = new User({
                fname: fname.trim(),
                lname: lname.trim(),
                email: email.trim(),
                password: password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => {
                        req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                        );
                        res.redirect('/user/login');
                    })
                    .catch(err => console.log(err));
                });
            });
        }
        });
    }
});

// Handling Login Authentication 
router.post('/login', forwardAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/homepage',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});

// Handling Logout 
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/user/login');
});

module.exports = router;
