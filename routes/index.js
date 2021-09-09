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

// Listing
router.get('/listing', isLoggedIn, (req, res) => {
    res.render('listing', {user: req.user});
});

// product
router.get('/listing/product/:id', isLoggedIn, (req, res) => {
    res.render('product', {user: req.user});
});

module.exports = router;
