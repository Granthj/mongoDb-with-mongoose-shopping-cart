const express = require('express');
const router = express.Router();

const { addCart, removeCart } = require('../Controller/cartProduct');

router.post('/add', addCart);
router.post('/remove', removeCart); 

module.exports = router;