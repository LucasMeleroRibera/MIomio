const express = require('express');
const { createVehiculo, getAllVehiculos, getVehiculoByNombre, updateVehiculo, deleteVehiculo } = require('../controllers/vehiculoController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, createVehiculo);
router.get('/', authenticateToken, getAllVehiculos);
router.get('/:nombre', authenticateToken, getVehiculoByNombre);
router.put('/:id', authenticateToken, updateVehiculo);
router.delete('/:id', authenticateToken, deleteVehiculo);

module.exports = router;