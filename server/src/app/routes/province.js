const express = require('express');
const router = express.Router();

const provinceController = require('../controllers/provinceController');

// Check  xem users login chuwa
// Access  public
// router.post('/sendmail', authController.sendMail);
router.get('/all', provinceController.getProvince);

module.exports = router;
