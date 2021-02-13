var express = require('express');
var router = express.Router();

// Require controller modules
var product_controller = require('../controllers/productController');

/* PRODUCT ROUTES */

// GET request for list of all Products
router.get('/', product_controller.product_list);

// GET request select producth with id from route
router.get('/id/:id', product_controller.product_with_id);

// GET request for inserting new product with parameters from route without id
router.get('/insert/:name/:price', product_controller.insert_product);

// GET request for deleting product with id from route
router.get('/delete/:id', product_controller.delete_product);

// GET request for updating product with id from route with new name and price
router.get('/update/:id/:name/:price', product_controller.update_product);

// GET request for product api page
router.get('/api', product_controller.product_api);

module.exports = router;