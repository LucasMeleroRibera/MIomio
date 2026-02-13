const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fabricante = sequelize.define('Fabricante', {
  id_fab: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_fabricante',
  },
  nombre_fab: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre_fab',
  },
  direccion_fab: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'direccion_fab',
  },
  telefono_fab: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'telefono_fab',
  },
}, {
  tableName: 'fabricantes',
  timestamps: false,
});

module.exports = Fabricante;