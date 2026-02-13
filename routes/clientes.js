const express = require('express');
const { createCliente, getAllClientes } = require('../controllers/clienteController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, createCliente);
router.get('/', authenticateToken, getAllClientes);

module.exports = router;