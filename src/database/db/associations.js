const Cliente = require("../models/Cliente");
const Compra = require("../models/Compra");
const Fabricante = require("../models/Fabricante");
const Vehiculo = require("../models/Vehiculo");
const User = require("../models/User");

// Un fabricante puede tener muchos vehículos 1:M
Fabricante.hasMany(Vehiculo, { foreignKey: "id_fabricante" });
Vehiculo.belongsTo(Fabricante, { foreignKey: "id_fabricante" });

// Asociación ternaria para Compra con Vendedor
// const Vendedor = require("../models/Vendedor");
Cliente.hasMany(Compra, { foreignKey: "id_cliente" });
Compra.belongsTo(Cliente, { foreignKey: "id_cliente" });
Vehiculo.hasMany(Compra, { foreignKey: "id_vehiculo" });
Compra.belongsTo(Vehiculo, { foreignKey: "id_vehiculo" });

// Asociación ternaria para Compra con Vendedor
// Vendedor.hasMany(Compra, { foreignKey: "id_vendedor" });
// Compra.belongsTo(Vendedor, { foreignKey: "id_vendedor" });

