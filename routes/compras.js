const express = require('express');
const { createCompra, getAllCompras } = require('../controllers/compraController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, createCompra);
router.get('/', authenticateToken, getAllCompras);

module.exports = router;