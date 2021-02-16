var User = require('../models/user');
var Session = require('../models/session');
var expressSession = require('express-session');
var mongoose = require('mongoose');

var Order = require('../models/order');
var Product = require('../models/product');
var OrderItem = require('../models/order_item');
var Table = require('../models/table');

// Create new order
exports.create_new_order = function(req, res, next) {
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
                    Table.find().exec(function(err, list_tables) {
                        if (err) { return next(err); }
                        res.render('order_new', {table_list: list_tables, title: "New order"});
                    }); 
                }
            }
        });        
}


// Make new order with table_id from parameters
exports.get_new_order = function(req, res, next) {
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
                    Product.find({id: {$ne: 0}})
                    .exec(function(err, list_products) {
                        if (err) { return next(err); }
                        Order.findOne().sort({id: -1}).exec(function(err, lastOrder) {
                            var newID = lastOrder.id + 1;
                            var order = new Order({
                                id: newID,
                                date: new Date(),
                                tableId: req.params.tableID
                            });
                            order.save(function (err, newOrder) {
                                if(err){ return next(err); }
                                OrderItem.find({order: 0})
                                .populate('product')
                                .exec(function(err, list_orderItems) {
                                    res.render('order_insert', {tableID: req.params.tableID, product_list: list_products, order_items: list_orderItems, orderID: newOrder.id});
                                });
                            });
                        });
                    });
                }
            }
        });
}

// Add order_item in collection with order_id, when user insert new order_item on order form
exports.refresh_order = function(req, res, next){
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
                Product.find({id: {$ne: 0}})
                .exec(function(err, list_products) {
                    if (err) { return next(err); }
                    //Order.findOne({id: req.params.orderID}).exec(function(err, lastOrder) {
                        OrderItem.find({order: req.params.orderID})
                        .populate('product')
                        .exec(function(err, list_orderItems){
                            res.render('order_insert', {tableID: req.params.tableID, product_list: list_products, order_items: list_orderItems, orderID: req.params.orderID});
                        });
                    //});
                });
            }
        }
    });
}

//Finalizing order - update userID and 
exports.finalize = function(req, res, next){
    User.findById(req.session.userId)
    .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized, you must log in first! Go back!');
                err.status = 400;
                return res.send(err.message);
            } else {
                Order.update({ 
                    id: req.params.orderID
                }, { 
                    $set: {
                        sumValue: req.params.amount,
                        userId: req.session.userId,
                        finalize: true
                        }
                }, function (err, numAffected) {
                    if (err) return next(err);
                    res.redirect('/index'); 
                });	
            }
        }
    });
}

// Return all orders
exports.get_all_orders = function(req, res, next){
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
                Order.find({id: {$ne: 0}, finalize: true})
                .populate('userId')
                .exec(function(err, orders){
                    if(err) { return next(err); }                       
                    Table.find().exec(function(err, tables){
                        if(err) { next(err); }
                        res.render('order_list', {orders: orders, tables: tables});
                    });                        
                });
            }
        }
    });
}

// Return all orders for user which is logged in
exports.get_user_orders = function(req, res, next){
    User.findById(req.session.userId)
    .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized, you must log in first! Go back!');
                err.status = 400;
                return res.send(err.message);
            } else {
                Order.find({id: {$ne: 0}, userId: req.session.userId})
                .populate('userId')
                .exec(function(err, orders){
                    if(err) { return next(err); }                       
                    Table.find().exec(function(err, tables){
                        if(err) { return next(err); }
                        res.render('orders_for_user', {orders: orders, tables: tables});
                    });                        
                });
            }
        }
    });
}

// Create new order
exports.existing_order = function(req, res, next) {
    User.findById(req.session.userId)
    .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized, you must log in first! Go back!');
                err.status = 400;
                return res.send(err.message);
            } else {
                Table.find().exec(function(err, tables){
                    res.render('order_get_existing', {tables: tables});
                });
            }
        }
    });
}

// Create new order
exports.get_existing_order = function(req, res, next) {
    User.findById(req.session.userId)
    .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized, you must log in first! Go back!');
                err.status = 400;
                return res.send(err.message);
            } else {
                Order.find({tableId: req.body.tableID, finalize: false}).sort({id: -1}).exec(function(err, orders){
                    if(err) { return next(err); }
                    if(orders[0] == null) {
                        var err = new Error('The order on the selected table is finalize! Go back!');
                        err.status = 400;
                        return res.send(err.message);
                     }
                    res.redirect('/orders/new/' + req.body.tableID + '/' + orders[0].id);
                });
            }
        }
    });
}

// Delete order item from order
exports.delete_orderItem = function(req, res, next) {
    User.findById(req.session.userId)
    .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized, you must log in first! Go back!');
                err.status = 400;
                return res.send(err.message);
            } else {
                OrderItem.deleteOne({ id: req.params.orderItem_id }, function (err) {
					if (err) return next(err);
					res.redirect('/orders/new/' + req.body.table_id + '/' + req.body.order_id);
				});
            }
        }
    });
}

// Delete order with id from parameters
exports.delete_order_with_id = function(req, res, next) {
    User.findById(req.session.userId)
    .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized, you must log in first! Go back!');
                err.status = 400;
                return res.send(err.message);
            } else {
                Order.deleteOne({ id: req.body.ordID }, function (err) {
                    if (err) return next(err, order);
                    OrderItem.deleteMany({order: req.body.ordID }).exec(function(err, orderItem){
                        if(err){ return next(err); }
                        res.redirect('/index');
                    });
				});
            }
        }
    });
}

