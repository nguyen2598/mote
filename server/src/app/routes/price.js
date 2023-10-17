const express = require('express');
const router = express.Router();

const priceController = require('../controllers/priceController');

// Check  xem users login chuwa
// Access  public
// router.post('/sendmail', authController.sendMail);
router.get('/all', priceController.getPrices);

module.exports = router;
