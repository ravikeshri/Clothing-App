const   express         = require("express"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        flash           = require("express-flash"),
        Session         = require("express-session");

const app = express();

// PASSPORT CONFIG
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db)
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
        secret: "This is an ECommerce site",
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

// Start server
const PORT = 3000;
app.listen(PORT,  () => {
    console.log("App is running!");
});