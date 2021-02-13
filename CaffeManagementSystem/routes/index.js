var express = require('express');
var router = express.Router();

var User = require('../models/user');

// Require controller modules
var main_controller = require('../controllers/mainController');

/* LOGIN AND LOGOUT ROUTES */

// GET login page
router.get('/', main_controller.get_login_page);

// GET admin page menu
router.get('/menu', main_controller.get_admin_index_page);

// GET index page
router.get('/index', main_controller.get_index_page);

// POST request fot checking login information
router.post('/', main_controller.login_information_check);

// Get request for logout
router.get('/logout', main_controller.logout);

module.exports = router;
