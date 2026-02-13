const express = require("express");
const router = express.Router();

const Fabricante = require("../database/models/Fabricante");
const Vehiculo = require("../database/models/Vehiculo");
const Compra= require("../database/models/Compra");
const Cliente = require("../database/models/Cliente");

const { Op } = require("sequelize");
const sequelize = require("../database/db/db");

//Dado un fabricante, a partir de su id, mostrar los vehículos que tenemos de ese fabricante. Del fabricante vamos a mostrar su nombre y de los vehículos vamos a mostrar el nombre, el precio y las unidades.
router.get("/:id", async (req, res) => {
  try {
    const fabricante = await Fabricante.findByPk(req.params.id, {
      include: {
        model: Vehiculo,
        attributes: ["nombre_veh", "precio_veh", "unidades_veh"],
      },
      attributes: ["nombre_fab"],
    });

    res.json(fabricante);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el fabricante",
      detalle: error.message,
    });
  }
});



// Mostrar los datos de los fabricantes que tengan mas de tres vehículos. De cada fabricante mostrar su nombre y el número de vehículos que tiene.
router.get("/", async (req, res) => {
  try {
    const fabricantes = await Fabricante.findAll({
      attributes: [
        "nombre_fab",
        [
          sequelize.fn("COUNT", sequelize.col("Vehiculos.id_vehiculo")),
          "num_vehiculos",
        ],
      ],
      include: [
        {
          model: Vehiculo,
          attributes: [],
          required: true,
        },
      ],
      group: ["Fabricante.id_fabricante"],
      having: sequelize.literal("COUNT(Vehiculos.id_vehiculo) > 3"),
    });

    res.json(fabricantes);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los fabricantes",
      detalle: error.message,
    });
  }
});

// Dado un fabricante y un precio, mostrar los vehículos de ese fabricante que tengan un precio superior al indicado. De cada vehículo mostrar su nombre, su precio y las unidades disponibles.
router.get("/:id/vehiculos", async (req, res) => {
  const { id } = req.params;
  const { precio } = req.query;

  try {
    const vehiculos = await Vehiculo.findAll({
      where: {
        fabricanteId: id,
        precio_veh: { [Op.gt]: precio },
      },
      attributes: ["nombre_veh", "precio_veh", "unidades_veh"],
    });

    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los vehículos del fabricante",
      detalle: error.message,
    });
  }
});

// Dado un fabricante, del que introduciremos su nombre, mostrar las ventas de todos sus vehículos. De cada venta mostrar el nombre del cliente, el nombre del vehículo comprado, la fecha de compra y el precio de compra, así como el nombre del fabricante del vehículo.
router.get("/:nombre/ventas", async (req, res) => {
  const { nombre } = req.params;
  try {
    const ventas = await Compra.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["nombre_cli"],
        },
        {
          model: Vehiculo,
          attributes: ["nombre_veh"],
          required: true,
          include: [
            {
              model: Fabricante,
              attributes: ["nombre_fab"],
              where: { nombre_fab: nombre },
              required: true,
            },
          ],
        },
      ],
      attributes: ["fecha_compra", "precio_compra"],
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las ventas del fabricante",
      detalle: error.message,
    });
  }
});

module.exports = router;
