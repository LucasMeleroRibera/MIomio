const { Compra, Cliente, Vehiculo, Fabricante } = require('../models');
const { Op } = require('sequelize');

const createCompra = async (req, res) => {
  try {
    const { id_cli, id_veh, fecha_compra, precio_compra } = req.body;

    if (!id_cli || !id_veh || !fecha_compra || !precio_compra) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    const cliente = await Cliente.findByPk(id_cli);
    if (!cliente) {
      return res.status(400).json({ error: 'Cliente no encontrado.' });
    }

    const vehiculo = await Vehiculo.findByPk(id_veh);
    if (!vehiculo) {
      return res.status(400).json({ error: 'Vehículo no encontrado.' });
    }

    const newCompra = await Compra.create({
      id_cli,
      id_veh,
      fecha_compra,
      precio_compra,
    });

    res.status(201).json({ message: 'Compra creada exitosamente.', compra: newCompra });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear compra.', details: error.message });
  }
};

const getAllCompras = async (req, res) => {
  try {
    const compras = await Compra.findAll({
      include: [
        { model: Cliente, attributes: ['nombre_cli'] },
        { model: Vehiculo, attributes: ['nombre_veh'], include: [{ model: Fabricante, attributes: ['nombre_fab'] }] },
      ],
    });

    const result = compras.map(compra => ({
      nombre_vehiculo: compra.Vehiculo.nombre_veh,
      nombre_fabricante: compra.Vehiculo.Fabricante.nombre_fab,
      nombre_cliente: compra.Cliente.nombre_cli,
      fecha_compra: compra.fecha_compra,
      precio_compra: compra.precio_compra,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener compras.', details: error.message });
  }
};

module.exports = {
  createCompra,
  getAllCompras,
};