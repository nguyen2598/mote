const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

// Check  xem users login chuwa
// Access  public
// router.post('/sendmail', authController.sendMail);
// router.use(verifyToken); //  nếu token gửi về họp lệ mới chạy tiếp
router.get('/get-current', verifyToken, userController.getCurrent);

module.exports = router;
