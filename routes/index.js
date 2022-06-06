const express = require('express');
const router = express.Router();

router.use('/youtube', require('./youtube'));
router.use('/product', require('./product'));

module.exports = router;
