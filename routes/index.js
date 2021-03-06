const express = require('express');
const router = express.Router();

// Authentication middleware
const { isLoggedIn, forwardAuthenticated } = require('../config/auth');

// Landing
router.get('/', forwardAuthenticated, (req, res) => res.send('A landing page!'));

// Homepage
router.get('/homepage', isLoggedIn, (req, res) => {
    res.render('homepage', {user: req.user});
});

module.exports = router;
