var Order = require('../models/order');
var OrderItem = require('../models/order_item');
var User = require('../models/user');
var Product = require('../models/product');
var mongoose = require('mongoose');

// Get statistics page
exports.get_statistics_page = function(req, res, next) {
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
                res.render('statistics', {title: "Statistics"});
            }
        }
    });
}

// Get report1 page
exports.get_report1_page = function(req, res, next) {
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
                Order.aggregate([
                    {
                        $match: {
                            storn: false
                        }
                    },
                    {
                        $group: {
                            _id: '$date',
                            amount: { $sum: '$sumValue' }                  
                        }
                    },
                    {
                        $sort: { _id: 1 }
                    }
                ], function (err, orderAgregation) {
                    if (err) {
                        next(err);
                    } else {
                        res.render('report1', {title: "Daily amount comparation", orders: orderAgregation});
                    }
                });
            }
        }
    });
}

// Get report2 page
exports.get_report2_page = function(req, res, next) {
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
                Order.aggregate([
                    {
                        $match: {
                            storn: false,
                            datum: {$ne: '2017-01-01'}
                        }
                    },
                    {
                        $group: {
                            _id: '$date',
                            amount: { $sum: '$sumValue' }                  
                        }
                    },
                    {
                        $sort: { _id: 1 }
                    }
                ], function (err, orderAgregation) {
                    if (err) {
                        next(err);
                    } else {
                        //console.log(orderAgregation);
                        res.render('report2', {title: "Weekly amount comparation", orders: orderAgregation});
                    }
                });
            }
        }
    });
}

// Get report3 page
exports.get_report3_page = function(req, res, next) {
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
                Order.aggregate([
                    {
                        $match: {
                            storn: false,
                            userId: {$ne: null}
                        }
                    },
                    {
                        $group: {
                            _id: '$userId',
                            amount: { $sum: '$sumValue' },
                            numOrders: { $sum: 1 }               
                        }
                    },
                    {
                        $sort: { amount: -1 }
                    }
                ], function (err, usersAmounts) {
                    if (err) {
                        next(err);
                    } else {                        
                        User.find().exec(function (error, users) {
                            res.render('report3', {usersAmounts: usersAmounts, users: users}); 
                        });                                           
                    }
                });
            }
        }
    });
}

// Get report4 page
exports.get_report4_page = function(req, res, next) {
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
                OrderItem.aggregate([
                    {
                        $match: {
                            id: {$ne: 0}
                        }
                    },
                    {
                        $group: {
                            _id: '$product',
                            quantity: { $sum: '$quantity' }               
                        }
                    },
                    {
                        $sort: { quantity: -1 }
                    },
                    { 
                        $limit : 10
                    }
                ], function (err, productsQuantity) {
                    if (err) {
                        next(err);
                    } else {                        
                        Product.find().exec(function (error, products) {
                            res.render('report4', {productsQuantity: productsQuantity, products: products}); 
                        });                                           
                    }
                });
            }
        }
    });
}

// Get user-rank page
exports.get_user_rank_page = function(req, res, next) {
    User.findById(req.session.userId)
    .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null || user.flag !== 'waiter') {
                var err = new Error('Not authorized, you must log in first! Go back!');
                err.status = 400;
                return res.send(err.message);
            } else {
                Order.aggregate([
                    {
                        $match: {
                            storn: false,
                            userId: {$ne: null}
                        }
                    },
                    {
                        $group: {
                            _id: '$userId',
                            amount: { $sum: '$sumValue' },
                            numOrders: { $sum: 1 },             
                        }
                    },
                    {
                        $sort: { amount: -1 }
                    }
                ], function (err, usersAmounts) {
                    if (err) {
                        next(err);
                    } else {                        
                        User.find().exec(function (error, users) {
                            res.render('user_rank_list', {usersAmounts: usersAmounts, users: users}); 
                        });                                           
                    }
                });
            }
        }
    });
}