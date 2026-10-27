const express = require('express');
const router = express.Router();

const addProduct = require('../Controller/addProduct');

router.post('/add', addProduct.addProduct); 

module.exports = router;
