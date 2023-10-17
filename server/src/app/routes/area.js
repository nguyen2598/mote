const express = require('express');
const router = express.Router();

const areaController = require('../controllers/areaController');

// Check  xem users login chuwa
// Access  public
// router.post('/sendmail', authController.sendMail);
router.get('/all', areaController.getAreas);

module.exports = router;
