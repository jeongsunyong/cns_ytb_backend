const express = require('express');
const router = express.Router();

const youtubeFunction = require('../../functions/youtube');

router.get('/getContents',youtubeFunction.getContentsByProduct)
router.get('/getComments',youtubeFunction.getCommentsByKeyword)


module.exports = router;