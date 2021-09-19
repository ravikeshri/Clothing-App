const   express         = require("express"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        flash           = require("express-flash"),
        Session         = require("express-session");
        dotenv          = require('dotenv');

const app = express();
dotenv.config();

// PASSPORT CONFIG
require("./config/passport")(passport);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then( () => { console.log("MongoDB Connected") })
    .catch( (err) => { console.log(err) });

// EJS
app.set("view engine","ejs");

// Setup public folder
app.use(express.static(__dirname + "/public"));

// For body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Session
app.use(
    Session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// ===================================================
// Landing and user dashboard routes
app.use('/', require('./routes/index.js'));

// User routes includes authentication
app.use('/user', require('./routes/user.js'));

// Listing routes
app.use('/listing', require('./routes/listing.js'));

// Admin routes, (needs to be reconfigured)
// app.use('/admin', require('./routes/admin.js'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT,  () => {
    console.log(`Server started on port: ${PORT}`);
});