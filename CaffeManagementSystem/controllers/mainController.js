var User = require('../models/user');
var Session = require('../models/session');
var expressSession = require('express-session');

// Get login page
exports.get_login_page = function(req, res, next) {
    res.render('login');
};

// Get index page
exports.get_index_page = function(req, res, next) {
    
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized, you must log in first! Go back!');
                    err.status = 400;
                    return res.send(err.message);
                } else {
                    res.render('index', {title: "Main page", user: user});  
                }
            }
        });        
}

// Checking login information
exports.login_information_check =  function(req, res, next) {
    if (req.body.username && req.body.password) {
        User.authenticate(req.body.username, req.body.password, function(error, user) {
            if (error || !user) {
                var err = new Error('You entered an invalid username or password! Go a step back!');
                err.status = 400;
                return res.send(err.message);
            } else {
                req.session.userId = user._id;
                var newSession = new Session({
                    id: req.session._id,
                    session: req.session.session,
                    date: req.session.expires
                });
                newSession.save(function (err) {
                    if (err) return next(err);
                });

                if (user.flag == 'admin') {
                    res.redirect('/menu');
                } else{
                    //req.session.userId = user._id;
                    res.redirect('/index');
                }
                
            }
        });
    } else {
        var err = new Error('You need to enter username and password!');
        err.status = 400;
        return res.send(err.message);
    }
}

// Logout function
exports.logout = function(req, res, next) {
    if (req.session) {
        //session deleting
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                user = '';
                return res.redirect('/');
            }
        });
    }
}


// Get admin menu page
exports.get_admin_index_page = function(req, res, next) {
    User.findById(req.session.userId)
    .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null || user.flag !== 'admin') {
            var err = new Error('Not authorized, you must log in first! Go back!');
            err.status = 400;
            return res.send(err.message);
            } else {
                res.render('indexAdmin', {title: 'Main menu'});
            }
        }
    });
}

  


  