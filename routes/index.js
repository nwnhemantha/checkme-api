var express = require('express');
var router = express.Router();
const CategoryController = require('../controlers/categoryController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/categories', CategoryController.getCategories);

module.exports = router;
