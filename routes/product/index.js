const express = require('express');
const router = express.Router();

const productFunction = require('../../functions/product');

router.get('/getProduct',productFunction.getProductList)
router.post('/addProduct',productFunction.addProduct)
router.post('/removeProduct',productFunction.removeProduct)


module.exports = router;