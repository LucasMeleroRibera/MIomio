const express = require('express');
const router = express.Router();

// Aquí se importarán y usarán los routers de cada modelo
const clienteRoutes = require('./clienteRoutes');
const compraRoutes = require('./compraRoutes');
const fabricanteRoutes = require('./fabricanteRoutes');
const userRoutes = require('./userRoutes');
const vehiculoRoutes = require('./vehiculoRoutes');

router.use('/clientes', clienteRoutes);
router.use('/compras', compraRoutes);
router.use('/fabricantes', fabricanteRoutes);
router.use('/users', userRoutes);
router.use('/vehiculos', vehiculoRoutes);

module.exports = router;
