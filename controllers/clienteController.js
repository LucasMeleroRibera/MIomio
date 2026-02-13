const { Cliente } = require('../models');

const createCliente = async (req, res) => {
  try {
    const { nombre_cli, direccion_cli, fechanac_cli, telefono_cli } = req.body;

    if (!nombre_cli || !direccion_cli || !fechanac_cli || !telefono_cli) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    const newCliente = await Cliente.create({
      nombre_cli,
      direccion_cli,
      fechanac_cli,
      telefono_cli,
    });

    res.status(201).json({ message: 'Cliente creado exitosamente.', cliente: newCliente });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente.', details: error.message });
  }
};

const getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes.', details: error.message });
  }
};

module.exports = {
  createCliente,
  getAllClientes,
};