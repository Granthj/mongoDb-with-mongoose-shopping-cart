const express = require('express');
const router = express.Router();

const { createOrder, deleteOrder } = require('../Controller/order');

router.post('/create', createOrder);
router.delete('/delete', deleteOrder);

module.exports = router;