var Product = require('../models/product');
var User = require('../models/user');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


// Display list of articles
exports.product_list = function(req, res, next) {
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
				Product.find({id: {$ne: 0}})
				.exec(function(err, list_products) {
					if (err) { return next(err); }
					res.json(list_products);
				});
			}
        }
    });
}

// Find product by id
exports.product_with_id = function(req, res, next) {
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
				Product.find( { id: req.params.id } )
				.exec(function(err, product) {
					if (err) { return next(err); }
					res.send(product);
				});
			}
        }
    });
}


// Insert new product without id
exports.insert_product = function(req, res, next) {
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
				Product.findOne().sort({id: -1}).exec(function(err, lastProduct) {
					var newID = lastProduct.id + 1;
					var product = new Product({
						_id: new mongoose.Types.ObjectId(),
						id: newID,
						name: req.params.name,
						price: req.params.price
					});
				
					product.save(function (err, newProduct) {
						if(err){ return next(err); }
						res.json(newProduct);
					});
				});
			}
        }
    });
}

// Delete product with id
exports.delete_product = function(req, res, next) {
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
				Product.deleteOne({ id: req.params.id }, function (err) {
					if (err) return next(err);
					res.send("Product with id=" + req.params.id + " is deleted!");
				});
			}
        }
    });
}

// Update product with id
exports.update_product = function(req, res, next) {
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
				Product.update({ 
					id: req.params.id 
				}, { 
					$set: {
						name: req.params.name,
						price: req.params.price
						}
				}, function (err, numAffected) {
					if (err) return next(err);
					res.send("Product with id=" + req.params.id + " is updated!");
				});	
			}
        }
    });
}

// Update product with id
exports.product_api = function(req, res, next) {
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
				res.render('product_api');
			}
        }
    });
}
