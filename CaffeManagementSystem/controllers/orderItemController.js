var User = require('../models/user');
var mongoose = require('mongoose');

var OrderItem = require('../models/order_item');
var Order = require('../models/order');
var Product = require('../models/product');

// Display list of articles

exports.go_to_insert_page = function(req, res, next) {
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
				res.redirect('/order_items/insert/' + req.params.tableID + '/' + req.body.product + '/' + req.body.quantity + '/' + req.body.orderID);
			}
		}
	});
}

exports.insert = function(req, res, next) {
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
				Product.findOne({ name: req.params.product }).exec(function(err, product) {
					OrderItem.findOne().sort({id: -1}).exec(function(err, lastOrderItem) {
						var newID = lastOrderItem.id + 1;
						var order_item = new OrderItem({
							id: newID,
							quantity: req.params.quantity,
							product: product._id,
							order: req.params.orderID
						});
						order_item.save(function (err) {
							if (err) return next(err);
							Order.findOne({id: req.params.orderID}).exec(function(err, lastOrderItem) {
								res.redirect('/orders/new/' + req.params.tableID + '/' + req.params.orderID);
							});
						});
					});
				});
			}
        }
    });
}
