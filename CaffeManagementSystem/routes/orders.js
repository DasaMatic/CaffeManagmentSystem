var express = require('express');
var router = express.Router();

// Require controller modules
var order_controller = require('../controllers/orderController');

/* ORDER ROUTES */

// GET route for creating new order
router.get('/new', order_controller.create_new_order);

// GET route for new order with table_id
router.get('/new/:tableID', order_controller.get_new_order);

// GET route for refreshing order when waiter add new ored_item
router.get('/new/:tableID/:orderID', order_controller.refresh_order);

// GET route for finalizing order
router.get('/finalize/:orderID/:amount', order_controller.finalize);

// GET route for all orders
router.get('/all', order_controller.get_all_orders);

// GET route for all orders for logged in user
router.get('/my-orders', order_controller.get_user_orders);

// GET route for existing order
router.get('/existing', order_controller.existing_order);

// POST route for finding existing order
router.post('/existing', order_controller.get_existing_order);

// POST route for deleting order_item from not finalized order
router.post('/order_item/delete/:orderItem_id', order_controller.delete_orderItem);

//GET route for deleting order with id from parameters
router.post('/delete', order_controller.delete_order_with_id);

module.exports = router;