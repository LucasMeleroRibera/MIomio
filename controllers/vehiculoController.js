const { Vehiculo, Fabricante } = require('../models');

const createVehiculo = async (req, res) => {
  try {
    const { nombre_veh, unidades_veh, precio_veh, id_fab } = req.body;

    if (!nombre_veh || !unidades_veh || !precio_veh || !id_fab) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    const fabricante = await Fabricante.findByPk(id_fab);
    if (!fabricante) {
      return res.status(400).json({ error: 'Fabricante no encontrado.' });
    }

    const newVehiculo = await Vehiculo.create({
      nombre_veh,
      unidades_veh,
      precio_veh,
      id_fab,
    });

    res.status(201).json({ message: 'Vehículo creado exitosamente.', vehiculo: newVehiculo });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear vehículo.', details: error.message });
  }
};

const getAllVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll({
      include: [{ model: Fabricante, attributes: ['nombre_fab'] }],
    });
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vehículos.', details: error.message });
  }
};

const getVehiculoByNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const vehiculo = await Vehiculo.findOne({
      where: { nombre_veh: nombre },
      include: [{ model: Fabricante, attributes: ['nombre_fab'] }],
    });

    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado.' });
    }

    res.json(vehiculo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vehículo.', details: error.message });
  }
};

const updateVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_veh, unidades_veh, precio_veh, id_fab } = req.body;

    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado.' });
    }

    // Actualizar con datos nuevos, elegir algunos
    await vehiculo.update({
      nombre_veh: nombre_veh || vehiculo.nombre_veh,
      unidades_veh: unidades_veh || vehiculo.unidades_veh,
      precio_veh: precio_veh || vehiculo.precio_veh,
      id_fab: id_fab || vehiculo.id_fab,
    });

    res.json({ message: 'Vehículo actualizado exitosamente.', vehiculo });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar vehículo.', details: error.message });
  }
};

const deleteVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado.' });
    }

    await vehiculo.destroy();
    res.json({ message: 'Vehículo eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar vehículo.', details: error.message });
  }
};

module.exports = {
  createVehiculo,
  getAllVehiculos,
  getVehiculoByNombre,
  updateVehiculo,
  deleteVehiculo,
};