const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Cliente = require('./Cliente');
const Fabricante = require('./Fabricante');
const Vehiculo = require('./Vehiculo');
const Compra = require('./Compra');

module.exports = {
  sequelize,
  Usuario,
  Cliente,
  Fabricante,
  Vehiculo,
  Compra,
};