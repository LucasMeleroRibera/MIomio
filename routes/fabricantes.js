const express = require('express');
const { createFabricante, getVehiculosByFabricante } = require('../controllers/fabricanteController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, createFabricante);
router.get('/:id/vehiculos', authenticateToken, getVehiculosByFabricante);

module.exports = router;