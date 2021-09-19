const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Authentication middleware
const { isLoggedIn, forwardAuthenticated } = require('../config/auth');

// Listing
router.get('/', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find();
        res.render('listing', {products, user: req.user});
    } catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
});

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

module.exports = router;