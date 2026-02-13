const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  id_cli: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_cliente',
  },
  nombre_cli: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre_cli',
  },
  direccion_cli: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'direccion_cli',
  },
  fechanac_cli: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'fechanac_cli',
  },
  telefono_cli: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'telefono_cli',
  },
}, {
  tableName: 'clientes',
  timestamps: false,
});

module.exports = Cliente;