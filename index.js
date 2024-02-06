const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Config
const db = require('./config/database').mongoURI;

// Passport Config
require('./config/passport')(passport);

// MongoDB Connection
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("views"));
// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// After configuring the express-session
app.use(flash());

// Set global variables
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/rooms', require('./routes/rooms'));
app.use('/booking', require('./routes/booking'));
 


app.listen(PORT, function () {
  console.log(`Web server running at: http://localhost:${PORT}`);
  console.log("Type Ctrl+C to shut down the web server");
});

