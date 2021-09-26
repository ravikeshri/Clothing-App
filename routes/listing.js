const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Authentication middleware
const { isLoggedIn, forwardAuthenticated } = require('../config/auth');

// Listing
router.get('/', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find({category: 'tshirt'});
        res.render('listing', {products, user: req.user});
    } catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
});

// all t-shirts
router.get('/tshirts', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find({category: 'tshirt'});
        res.render('listing', {products, user: req.user});
    } catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
});

// Listing
router.get('/shirts', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find({category: 'shirt'});
        res.render('listing', {products, user: req.user});
    } catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
});

// Listing
router.get('/outerwears', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find({category: 'outerwear'});
        res.render('listing', {products, user: req.user});
    } catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
});

// Listing
router.get('/bottoms', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find({category: 'bottoms'});
        res.render('listing', {products, user: req.user});
    } catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
});

// Listing
router.get('/knitwears', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find({category: 'knitwear'});
        res.render('listing', {products, user: req.user});
    } catch(err) {
        console.error(err);
        res.status(404).send(err);
    }
});

// Listing
router.get('/accessories', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find({category: 'accessories'});
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