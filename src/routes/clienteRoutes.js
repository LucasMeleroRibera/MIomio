const express = require("express");
const router = express.Router();
const Cliente = require("../database/models/Cliente");

// Todos los clientes
router.get("/", async (req, res) => {
  const clientes = await Cliente.findAll();
  if (!clientes.length) {
    return res.status(404).json({
      error: "No se encontraron clientes",
    });
  }
  res.status(200).json({
    message: "Listado de clientes",
    data: clientes,
  });
});

// Cliente por id (debe ir al final para evitar conflictos con rutas específicas)
router.get("/listado/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id, {
      attributes: [
        "nombre_cli",
        "direccion_cli",
        "telefono_cli",
        "fechanac_cli",
      ],
    });
    if (!cliente) {
      return res.status(404).json({
        error: `No se encontró cliente con id ${id}`,
      });
    }
    res.status(200).json({
      message: `Cliente con id ${id}`,
      data: cliente,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error en el servidor",
      detalles: error.message,
    });
  }
});

//Listado de todos los clientes ordenados alfabéticamente por nombre ascendentemente. Mostraremos  Nombre, dirección
router.get("/listado", async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      attributes: ["nombre_cli", "direccion_cli"],
      order: [["nombre_cli", "ASC"]],
    });
    // Mejor comprobar array vacio, sp devuelve array aunque no haya datos
    if (!clientes.length) {
      return res.status(404).json({
        error: "No se encontraron clientes",
      });
    }
    res.status(200).json({
      message: "Listado clientes ordenado por nombre",
      data: clientes,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error en el servidor",
      detalles: error.message,
    });
  }
});

//Listado de todos los clientes ordenados alfabéticamente por nombre ascendentemente y por fecha ascendentemente. Mostraremos  Nombre, telefono y fecha de nacimiento
router.get("/listado-fecha", async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      attributes: ["nombre_cli", "telefono_cli", "fechanac_cli"],
      order: [
        ["nombre_cli", "ASC"],
        ["fechanac_cli", "ASC"],
      ],
    });
    // Mejor comprobar array vacio, sp devuelve array aunque no haya datos
    if (!clientes.length) {
      return res.status(404).json({
        error: "No se encontraron clientes",
      });
    }
    res.status(200).json({
      message: "Listado clientes ordenado por nombre y fecha de nacimiento",
      data: clientes,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error en el servidor",
      detalles: error.message,
    });
  }
});

// Clientes por nombre, necesitamos Nombre, dirección y teléfono
router.get("/nombre/:nombre", async (req, res) => {
  const { nombre } = req.params;
  try {
    const clientes = await Cliente.findAll({
      where: {
        nombre_cli: nombre,
      },
      attributes: ["nombre_cli", "direccion_cli", "telefono_cli"],
    });
    // Mejor comprobar array vacio, sp devuelve array aunque no haya datos
    if (!clientes.length) {
      return res.status(404).json({
        error: `No se encontraron clientes con nombre ${nombre}`,
      });
    }
    res.status(200).json({
      message: `Clientes con nombre ${nombre}`,
      data: clientes,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error en el servidor",
      detalles: error.message,
    });
  }
});

// Nuevo cliente
router.post("/", async (req, res) => {
  try {
    const { nombre_cli, direccion_cli, telefono_cli, fechanac_cli } = req.body;

    const nuevoCliente = await Cliente.create({
      nombre_cli,
      direccion_cli,
      telefono_cli,
      fechanac_cli,
    });
    if (!nuevoCliente) {
      return res.status(500).json({
        error: "No se pudo crear el cliente",
      });
    }
    res.status(201).json({
      message: "Cliente creado",
      data: nuevoCliente,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((error) => error.message);
      return res.status(400).json({ error: "Error de validación", errores });
    }
    res.status(500).json({
      error: "Error en el servidor",
      detalles: error.message,
    });
  }
});

// Modificar cliente existente por id
const { Op } = require("sequelize");

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre_cli, direccion_cli, telefono_cli, fechanac_cli } = req.body;
  try {
    // Validación estricta de fecha antes de actualizar
    if (fechanac_cli) {
      const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
      if (!regexFecha.test(fechanac_cli)) {
        return res.status(400).json({
          error: "El formato de la fecha de nacimiento debe ser YYYY-MM-DD",
        });
      }
      const fecha = new Date(fechanac_cli);
      if (isNaN(fecha.getTime())) {
        return res.status(400).json({
          error: "La fecha de nacimiento no es válida en el calendario",
        });
      }
    }

    // Usar directamente req.body para actualizar los campos enviados... 
    const camposActualizar = req.body;

    const [numActualizados] = await Cliente.update(camposActualizar, {
      where: { id },
    });
    if (numActualizados === 0) {
      return res.status(404).json({
        error: `No se encontró cliente con id ${id}`,
      });
    }
    // Obtener el cliente actualizado
    const clienteActualizado = await Cliente.findByPk(id);
    res.status(200).json({
      message: `Cliente con id ${id} actualizado`,
      data: clienteActualizado,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((error) => error.message);
      return res.status(400).json({ error: "Error de validación", errores });
    }
    res.status(500).json({
      error: "Error en el servidor",
      detalles: error.message,
    });
  }
});

/* await User.update(
  {
    isActive: false,
    lastName: "Actualizado",
  },
  {
    where: {
      age: { [Op.gt]: 18, [Op.lt]: 65 },
      createdAt: {
        [Op.between]: [new Date("2024-01-01"), new Date("2024-12-31")],
      },
      email: { [Op.like]: "%gmail.com%" },
    },
  },
); */

// Modificar cliente existente por fecha de nacimiento en un rango de fechas
router.put("/fechanac/:inicio/:fin", async (req, res) => {
  const { fechaInicio, fechaFin, nuevosDatos } = req.body;
  try {
    const [numActualizados] = await Cliente.update(nuevosDatos, {
      where: {
        fechanac_cli: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
    });
    if (numActualizados === 0) {
      return res.status(404).json({
        error: "No se encontraron clientes en el rango de fechas proporcionado",
      });
    }
    res.status(200).json({
      message: `Clientes actualizados en el rango de fechas ${fechaInicio} - ${fechaFin}`,
      cantidad: numActualizados,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((error) => error.message);
      return res.status(400).json({ error: "Error de validación", errores });
    }
    res.status(500).json({
      error: "Error en el servidor",
      detalles: error.message,
    });
  }
});

// Eliminar cliente por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({
        error: `No se encontró cliente con id ${id}`,
      });
    }
    await cliente.destroy();
    res.status(200).json({
      message: `Cliente con id ${id} eliminado correctamente`,
      data: { id },
    });
  } catch (error) {
    res.status(500).json({
      error: "Error en el servidor",
      detalles: error.message,
    });
  }
});

module.exports = router;
