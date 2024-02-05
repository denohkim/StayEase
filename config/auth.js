// Authentication middleware to protect routes
module.exports = {
ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/auth/login');
},
ensureAdmin: function(req, res, next) {
    // Check if the authenticated user is an admin
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    req.flash('error_msg', 'Unauthorized Access ');
    res.redirect('/auth/login'); 
}
};