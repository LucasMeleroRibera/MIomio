const { Fabricante, Vehiculo } = require('../models');

const createFabricante = async (req, res) => {
  try {
    const { nombre_fab, direccion_fab, telefono_fab } = req.body;

    if (!nombre_fab || !direccion_fab || !telefono_fab) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    const newFabricante = await Fabricante.create({
      nombre_fab,
      direccion_fab,
      telefono_fab,
    });

    res.status(201).json({ message: 'Fabricante creado exitosamente.', fabricante: newFabricante });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear fabricante.', details: error.message });
  }
};

const getVehiculosByFabricante = async (req, res) => {
  try {
    const { id } = req.params;
    const fabricante = await Fabricante.findByPk(id);
    if (!fabricante) {
      return res.status(404).json({ error: 'Fabricante no encontrado.' });
    }

    const vehiculos = await Vehiculo.findAll({
      where: { id_fab: id },
      attributes: ['nombre_veh', 'precio_veh', 'unidades_veh'],
    });

    res.json({
      fabricante: fabricante.nombre_fab,
      vehiculos,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vehículos del fabricante.', details: error.message });
  }
};

module.exports = {
  createFabricante,
  getVehiculosByFabricante,
};