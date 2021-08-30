const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const { isLoggedIn, forwardAuthenticated } = require('../config/auth');

// Login route
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Handling  Register logic 
router.post('/register',forwardAuthenticated, (req, res) => {
    const { fname, email, password, confirm_password } = req.body;
    
    let errors = [];

    if (!fname || !email || !password || !confirm_password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != confirm_password) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 8) {
        errors.push({ msg: 'Password must be at least 8 characters' });
    }

    let special_char = 0;
    let uppercase = 0;
    let lowercase = 0;
    let digit = 0;
    for(let i = 0; i<password.length; i++)
    {
      let char = password[i];
      if(char == '@' || char == '#' || char == '$' || char == '%' || char == '^' || char == '&')
        special_char++;
      if(char <= 'Z' && char >= 'A')
        uppercase++;
      if(char <= 'z' && char >= 'a')
        lowercase++;
      if(char <= '9' && char >= '0')
        digit++;
    }

    if(!special_char)
      errors.push({ msg: 'Password must contain atleast one special charecter. [@ # $ % ^ & *]' });
    else if(!uppercase)
      errors.push({ msg: 'Password must contain atleast one uppercase letter.' });
    else if(!lowercase)
      errors.push({ msg: 'Password must contain atleast one lowercase letter.' });
    else if(!digit)
      errors.push({ msg: 'Password must contain atleast one digit.' });

    if (errors.length > 0) {
        res.render('login', {
            errors,
            fname,
            email,
            password,
            confirm_password
        });
    } else {
        User.findOne({ email: email }).then(user => {
        if (user) {
            res.json({error_msg: 'Email already exists' });
        } else {
            const newUser = new User({
                fname: fname.trim(),
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
                        res.json({redirect: '/homepage'});
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
