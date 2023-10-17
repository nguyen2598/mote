const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { createPricesAndAreas } = require('../../insert');
// Check  xem users login chuwa
// Access  public
// router.post('/sendmail', authController.sendMail);
router.get('/all', postController.getPosts);
router.get('/new-post', postController.getNewPost);
router.get('/test', postController.getPostByXToY);

router.get('/', postController.getPostsLimit);

router.post('/set', createPricesAndAreas);

module.exports = router;
