var express = require('express');
var router = express.Router();

// Require controller modules
var statistic_controller = require('../controllers/statisticController');

/* STATISTIC ROUTES */

// GET statistics page
router.get('/', statistic_controller.get_statistics_page);

// GET report1 page - Daily amount comparation 2017/2018
router.get('/report1', statistic_controller.get_report1_page);

// GET report2 page - Weekly amount comparation 2017/2018
router.get('/report2', statistic_controller.get_report2_page);

// GET report3 page - Ranking list of waiters
router.get('/report3', statistic_controller.get_report3_page);

// GET report4 page - Best-selling products
router.get('/report4', statistic_controller.get_report4_page);

// GET user-rank page for waiters
router.get('/user-rank', statistic_controller.get_user_rank_page);

module.exports = router;
