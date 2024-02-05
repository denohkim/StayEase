const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

exports.registerPage = (req, res) => res.render('register');

exports.register = (req, res) => {
    const { fname,lname, email, password } = req.body;
    
    // Simple check: if any field is empty
    if (!fname || !lname || !email || !password) {
        req.flash('error_msg', 'Please fill in all fields');
        res.redirect('/auth/register');
        return;
    }

    User.findOne({ email: email }).then(user => {
        if (user) {
            // User exists
            req.flash('error_msg', 'Email is already registered');
            res.redirect('/auth/register');
        } else {
            const newUser = new User({
                fname,
                lname,
                email,
                password
            });

            // Hash Password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered');
                            res.redirect('/auth/login');
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
};

exports.loginPage = (req, res) => res.render('login');

// exports.login = (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/student-dashboard',
//         failureRedirect: '/users/login',
//         failureFlash: true
//     })(req, res, next);
// };

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash('error_msg', 'That email is not registered');
            return res.redirect('/auth/login');
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            
            // Role-based redirection
            req.flash('success_msg', 'You are successfully logged in');
            if(user.role === 'admin') {
                return res.redirect('/admin-dashboard'); 
            } else {
                return res.redirect('/student-dashboard');
            }
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) { 
            // Handle error
            console.error(err);
            req.flash('error_msg', 'Logout failed');
            return res.redirect('/dashboard');
        }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/auth/login');
    });
};

