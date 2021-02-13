var User = require('../models/user');
var bcrypt = require('bcrypt');
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');


// Display list of users
exports.user_list = function(req, res, next) {
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
                User.find({flag: {$ne: 'admin'}})
                .exec(function(err, list_users) {
                    if (err) { return next(err); }
                    // Successful, so render
                    res.render('user_list', {user_list: list_users});
                });
            }
        }
    });
}



// Get page for inserting users
exports.get_user_insert_page = function(req, res, next) {
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
                res.render('user_insert');
            }
        }
    });
}

// Insert user
exports.user_insert = function(req, res, next){
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
                // confirm that user typed same password twice

                if(req.body.password.length < 6){
                    return res.send("Passwords length must be at least 6 characters!");
                }

                if (req.body.password !== req.body.password_confirm) {
                    return res.send("Passwords do not match.");
                }              

                if (req.body.first_name && req.body.last_name && req.body.address && req.body.phone
                    && req.body.username && req.body.password && req.body.password_confirm) {

                    var userData = {
                        _id: new mongoose.mongo.ObjectId(),
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        address: req.body.address,
                        phone: req.body.phone,
                        username: req.body.username,
                        password: req.body.password
                    }
/*
                    upload(req, res, (err) => {
                        if(err){
                            var err = new Error('You must select img! Go back!');
                            err.status = 400;
                            return res.send(err.message);
                        } else {
                            if(req.file == undefined){
                                var err = new Error('You must select img! Go back!');
                                err.status = 400;
                                return res.send(err.message);
                            } else {
                            userData.file = `uploads/${req.file.filename}`;
                            
                            }
                        }
                        });
                        */

                    User.create(userData, function(error, user) {
                        if (error) {
                            return next(error);
                        } else {
                            //return res.send('New user successfully created!');
                            //req.session.userId = user._id;
                            return res.redirect('/users');
                        }
                    });

                } else {
                    var err = new Error('You need to fill in all the fields!');
                    err.status = 400;
                    return next(err);
                }
            }
        }
    });
}

// Get page for updating users
exports.get_user_updatee = function(req, res, next) {
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
                if (!req.body.username) { return res.send('First you must get from options or type username! Go step back.'); }		
                    res.redirect('/users/updatee/' + req.body.username);
            }
        }
    });
}

// Update user page
exports.user_updatee = function(req, res, next) {
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
                if (!req.params.username) { return res.send('First you must get from options or type username! Go step back.'); }
                User.find({username: req.params.username})
                .exec(function(err, user) {
                    if (err) { return next(err); }
                    res.render('user_update', {user: user[0]});
                });
            }
        }
    });
}

exports.get_user_update = function(req, res, next) {
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
	            res.redirect('/users/update/' + req.body.username + '/' + req.body.first_name + '/' + req.body.last_name + '/' + req.body.address + '/' + req.body.phone);
            }
        }
    });
}


// Update user
exports.user_update = function(req, res, next) {
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
                User.update({ 
                    username: req.params.username
                }, { 
                    $set: {
                        first_name: req.params.first_name,
                        last_name: req.params.last_name,
                        address: req.params.address,
                        phone: req.params.phone
                        }
                }, function (err, numAffected) {
                    if (err) return next(err);
                    //res.send("User with username=" + req.params.username + " is updated!");
                    res.redirect('/users');
                });	
            }
        }
    });
}

// Get page for updating users
exports.get_user_delete = function(req, res, next) {
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
                if (!req.body.username2) { return res.send('First you must select or type username! Go step back.'); }		
                res.redirect('/users/delete/' + req.body.username2);
            }
        }
    });
}

// Delete user
exports.user_delete = function(req, res, next) {
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
                User.deleteOne({ username: req.params.username }, function (err) {
                    if (err) return next(err);
                    //res.send("User with username=" + req.params.username + " is deleted!");
                    res.redirect('/users');
                });
            }
        }
    });
}