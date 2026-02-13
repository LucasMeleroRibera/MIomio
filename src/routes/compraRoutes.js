const express = require("express");
const router = express.Router();

const Compra = require("../database/models/Compra");
const Cliente = require("../database/models/Cliente");
const Vehiculo = require("../database/models/Vehiculo");
const Fabricante = require("../database/models/Fabricante");

// nombre del cliente, vehiculos comprados, fecha de compra, precio de compra
router.get("/", async (req, res) => {
  try {
    const compras = await Compra.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["nombre_cli"],
        },
        {
          model: Vehiculo,
          attributes: ["nombre_veh"],
        },
      ],
      attributes: ["fecha_compra", "precio_compra"],
    });
   
    res.json(compras);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las compras", detalle: error.message });
  }
});

//Nueva compra
router.post("/", async (req, res) => {
  const { clienteId, vehiculoId, fecha_compra, precio_compra } = req.body;
  try {
    const nuevaCompra = await Compra.create({
      clienteId,
      vehiculoId,
      fecha_compra,
      precio_compra,
    });
    res.status(201).json(nuevaCompra);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear la compra", detalle: error.message });
  } 
});

// Mostrar las compras de un cliente, del que nos van a introducir el id. Los datos que vamos amostrar son el  nombre del cliente, el nombre de los vehículos comprados, la fecha de compra y el precio de compra, así como el nombre del fabricante del vehículo.
router.get("/cliente/:clienteId", async (req, res) => {
  const { clienteId } = req.params;
  try {
    const compras = await Compra.findAll({
      where: { clienteId },
      include: [
        {
          model: Cliente,
          attributes: ["nombre_cli"],
        },
        {
          model: Vehiculo,
          attributes: ["nombre_veh"],
          include: [
            {
              model: Fabricante,
              attributes: ["nombre_fab"],
            },
          ],
        },
      ],
      attributes: ["fecha_compra", "precio_compra"],
    });
    res.json(compras);
  }
    catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener las compras del cliente", detalle: error.message });
    }
});

// Mostrar las compras de un vehículo, del que nos van a introducir el id. Los datos que vamos amostrar son el nombre del cliente, el nombre de los vehículos comprados, la fecha de compra y el precio de compra, así como el nombre del fabricante del vehículo. 

router.get("/vehiculo/:vehiculoId", async (req, res) => {
  const { vehiculoId } = req.params;
  try {
    const compras = await Compra.findAll({
      where: { vehiculoId },
      include: [
        {
          model: Cliente,
          attributes: ["nombre_cli"],
        },
        {
          model: Vehiculo,
          attributes: ["nombre_veh"],
          include: [
            {
              model: Fabricante,
              attributes: ["nombre_fab"],
            },
          ],
        },
      ],
      attributes: ["fecha_compra", "precio_compra"],
    });
    res.json(compras);
  }
    catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener las compras del vehículo", detalle: error.message });
    }
});

// 

module.exports = router;
