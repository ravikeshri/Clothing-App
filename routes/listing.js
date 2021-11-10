const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Authentication middleware
const { isLoggedIn, forwardAuthenticated } = require('../config/auth');

// product
router.get('/product/:id', isLoggedIn, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        res.render('product', {product, user: req.user});
    } catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
});

// Listing : category
router.get('/category/:category', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find({category: req.params.category});
        res.render('listing', {products, user: req.user});
    } catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
});

// listing : gender and category
router.get('/gender/:gender/category/:category', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find({category: req.params.category, gender : req.params.gender});
        res.render('listing', {products, user: req.user});
    } catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
});

module.exports = router;
