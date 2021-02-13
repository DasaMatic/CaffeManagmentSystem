var express = require('express');
var router = express.Router();

// Require controller modules
var user_controller = require('../controllers/userController');

/* USER ROUTES */

// GET request for list of all Users 
router.get('/', user_controller.user_list);

// GET users insert page
router.get('/insert', user_controller.get_user_insert_page);

// POST request user insert
router.post('/insert', user_controller.user_insert);

// Page for update user 
router.get('/updatee/:username', user_controller.user_updatee);

// POST request user update page
router.post('/updatee', user_controller.get_user_updatee);

// Update user
router.get('/update/:username/:first_name/:last_name/:address/:phone', user_controller.user_update);

// POST request user update
router.post('/update/', user_controller.get_user_update);

// POST request user delete
router.post('/delete/', user_controller.get_user_delete);

// Delete user with username
router.get('/delete/:username', user_controller.user_delete);



module.exports = router;
