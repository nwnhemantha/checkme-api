var express = require('express');
var router = express.Router();
const CategoryController = require('../controlers/categoryController');
const UserController = require('../controlers/userController');
const PostController = require('../controlers/postController');
const ReactionController = require('../controlers/ReactionController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/categories', CategoryController.getCategories);
router.post('/sign-in', UserController.signIn);

router.post('/post', PostController.createPost);
router.post('/like', ReactionController.createLike);
router.post('/comment', ReactionController.createComment);
router.post('/share', ReactionController.createShare);
router.get('/posts/all/:limit?/:offset?', PostController.getPosts);
router.get('/post/:id', PostController.getPost);
router.get('/posts/category/:category_id/:limit?/:offset?', PostController.getCategoryPosts);
router.get('/posts/tag/:tag/:limit?/:offset?', PostController.getTagPosts);

module.exports = router;
