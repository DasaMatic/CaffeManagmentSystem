var express = require('express');
var router = express.Router();

// Require controller modules
var orderItem_controller = require('../controllers/orderItemController');

/* ORDER_ITEMS ROUTES */

router.post('/insert/:tableID', orderItem_controller.go_to_insert_page);

//GET route for insert new order_item
router.get('/insert/:tableID/:product/:quantity/:orderID', orderItem_controller.insert);

module.exports = router;