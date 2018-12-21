var express = require('express');
var router = express.Router();
const CategoryController = require('../controlers/categoryController');
const UserController = require('../controlers/userController');
const PostController = require('../controlers/postController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/categories', CategoryController.getCategories);
router.post('/sign-in', UserController.signIn);

router.post('/post', PostController.createPost);
router.get('/posts/:limit?/:offset?', PostController.getPosts);
router.get('/post/:id', PostController.getPost);
router.get('/post/category/:category_id/:limit?/:offset?', PostController.getCategoryPosts);
router.get('/post/tag/:tag/:limit?/:offset?', PostController.getTagPosts);

module.exports = router;
