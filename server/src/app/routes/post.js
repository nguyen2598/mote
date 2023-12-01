const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const postController = require('../controllers/postController');
const insertService = require('../../insert');
// , createPricesAndAreas
// Check  xem users login chuwa
// Access  public
// router.post('/sendmail', authController.sendMail);
router.get('/all', postController.getPosts);
router.get('/new-post', postController.getNewPost);
router.get('/test', postController.getPostByXToY);
// cao du lieu
router.get('/init', insertService.createPricesAndAreas);

router.get('/limit', postController.getPostsLimit);

router.use(verifyToken);
router.post('/create-post', postController.createNewPost);
router.get('/limit-admin', postController.getPostLimitAdmin);
router.get('/limit-admin-search', postController.getPostLimitAdminSearch);
router.post('/delete-post', postController.deletePost);

module.exports = router;
