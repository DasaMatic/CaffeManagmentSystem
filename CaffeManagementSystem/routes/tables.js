var express = require('express');
var router = express.Router();

var Table = require('../models/table');

// Require controller modules
var table_controller = require('../controllers/tableController');

/* TABLE ROUTES */

// GET request for list of all tables
router.get('/', table_controller.table_list);

// GET request select table with id from route
router.get('/id/:id', table_controller.table_with_id);

// GET request for inserting new table with parameters from route without id
router.get('/insert/:position', table_controller.insert_table);

// GET request for deleting table with id from route
router.get('/delete/:id', table_controller.delete_table);

// GET request for updating table with id from route with new position
router.get('/update/:id/:position', table_controller.update_table);

// GET request for table api page
router.get('/api', table_controller.table_api);

module.exports = router;