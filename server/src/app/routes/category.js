const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

// Check  xem users login chuwa
// Access  public
// router.post('/sendmail', authController.sendMail);
router.get('/all', categoryController.getCategories);

module.exports = router;
