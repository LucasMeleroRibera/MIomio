const express = require("express");
const router = express.Router();

const Vehiculo = require("../database/models/Vehiculo");
const Fabricante = require("../database/models/Fabricante");

const { Op } = require("sequelize");

// Todos los vehiculos con el nombre del fabricante al que pertenecen, unidades y precio
router.get("/", async (req, res) => {
  try {
    const data = await Vehiculo.findAll({
      attributes: ["nombre_veh", "unidades_veh", "precio_veh"],
      include: [{ model: Fabricante, attributes: ["nombre_fab"] }],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los vehículos",
      detalle: error.message,
    });
  }
});

// Nobmre del vehículos, unidades precio de los vehículos cuyo precio sea mayor a 15000, ordenador de forma descendente por unidades
router.get("/mayor", async (req, res) => {
  try {
    const data = await Vehiculo.findAll({
      attributes: ["nombre_veh", "unidades_veh", "precio_veh"],
      order: [["unidades_veh", "DESC"]],
      where: {
        precio_veh: {
          [Op.gt]: 15000,
        },
      },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los vehículos",
      detalle: error.message,
    });
  }
});

// Nombre del vehículo, unidades, precio y nombre del fabricante de los vehículos cuyo nombre contenga la letra "a" y tengan más de 10 unidades
router.get("/filtro", async (req, res) => {
  try {
    const data = await Vehiculo.findAll({
      attributes: ["nombre_veh", "unidades_veh", "precio_veh"],
      where: {
        nombre_veh: { [Op.like]: "%a%" },
        unidades_veh: { [Op.gt]: 10 },
      },
      include: [{ model: Fabricante, attributes: ["nombre_fab"] }],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los vehículos",
      detalle: error.message,
    });
  }
});

// Nombre del vehículos, unidades precio de los vehículos cuyo precio sea mayor a 12000 o tengamos mas de 10 unidades, de aquellos vehículos que haya fabricado Ford
router.get("/precio_o_unidades", async (req, res) => {
  const data = await Vehiculo.findAll({
    attributes: ["nombre_veh", "unidades_veh", "precio_veh"],
    where: {
      [Op.or]: {
        precio_veh: {
          [Op.gte]: 18000,
        },
        unidades_veh: {
          [Op.lt]: 10,
        },
      },
    },
    include: {
      model: Fabricante,
      attributes: ["nombre_fab"],
      where: {
        nombre_fab: { [Op.like]: "%Ford%" },
      },
    },
  });
  res.json(data);
});

// Mostrar la media del precio de todos vehículos de cada fabricante. De cada fabricante mostrar su nombre y la media del precio de sus vehículos.
router.get("/media_precio", async (req, res) => {
  try {
    const data = await Vehiculo.findAll({ 
      attributes: [
        [Vehiculo.sequelize.fn("AVG", Vehiculo.sequelize.col("precio_veh")), "precio_medio"],
      ],
      include: {
        model: Fabricante,
        attributes: ["nombre_fab"],
      },
      group: ["Fabricante.id_fabricante"],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los vehículos",
      detalle: error.message,
    });
  }
});

// Mostrar la media del precio de todos vehículos de cada fabricante. De cada fabricante mostrar su nombre y la media del precio de sus vehículos. Para aquelos fabricantes que tengan más de 3 vehículos.
router.get("/media_precio_mas_3", async (req, res) => {
  try {
    const data = await Vehiculo.findAll({
      attributes: [
        [Vehiculo.sequelize.fn("AVG", Vehiculo.sequelize.col("precio_veh")), "precio_medio"],
      ],
      include: {
        model: Fabricante,
        attributes: ["nombre_fab"],
      },
      group: ["Fabricante.id_fabricante"],
      having: Vehiculo.sequelize.literal("COUNT(id_vehiculo) > 3"),
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los vehículos",    
      detalle: error.message,
    });
  }
});


module.exports = router;
