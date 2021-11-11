const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
const Product = require('../models/product');
const User = require('../models/user');
const { isLoggedIn, forwardAuthenticated } = require('../config/auth');

router.get('/login', forwardAuthenticated, async (req, res) => {
    res.render('admin/login');
});

router.post('/login', forwardAuthenticated, async (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            if (user && user.roles && user.roles.indexOf('create') != -1) {
              passport.authenticate('local', {
                successRedirect: '/admin/listing/new',
                failureRedirect: '/admin',
                failureFlash: true
              })(req, res, next);
            } else {
                req.flash("error_msg", "Invalid username or password");
                res.redirect("back");
            }
        }
      });
});

router.get('/listing/new', isLoggedIn, async (req, res) => {
    if(req.user.roles.indexOf('create') != -1) {
        res.render('admin/product');
    } else {
        res.send("Permission Denied");
    }
        
});

var uploadMultiple = upload.fields(
    [
        { name: 'images[0]', maxCount: 5 }, 
        { name: 'images[1]', maxCount: 5 },
        { name: 'images[2]', maxCount: 5 }
    ]
);

router.post('/listing/new', [uploadMultiple, isLoggedIn], async (req, res) => {
    if(req.user.roles.indexOf('create') != -1) {
        // cloudinary folder name
        let folder = "/clothing-app/listings/" + req.body.gender + "/" + req.body.category + "/";

        // Upload images to cloudinary
        let images = [], k;
        for(let i=0; i<10; i++) {
            if(!req.files['images['+i+']']) {
                k = i;
                break;
            }
            images.push(req.files['images['+i+']']);
        }
        
        let stocks = [];
        for(let i=0; i<k; i++) {
            let col = {
                colour: req.body.colour[i],
                _s: Number(req.body._s[i]),
                _m: Number(req.body._m[i]),
                _l: Number(req.body._l[i]),
                _xl: Number(req.body._xl[i]),
                images: []
            }
            for(let j=0; j<images[i].length; j++) {
                let result = await cloudinary.uploader.upload(images[i][j].path, {folder} );
                col.images.push(result.secure_url);
            }
            stocks.push(col);
        }

        let new_product = {
            name: req.body.name,
            description: req.body.description,
            gender: req.body.gender,
            category: req.body.category,
            price: Number(req.body.price),
            stocks: stocks
        }
        // console.log(new_product);

        // add to database
        let result = await Product.create(new_product);
        // console.log(result.stocks[0].images);
        res.send("Done!");
    }
});

// Handling Logout 
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/admin/login');
});

module.exports = router;