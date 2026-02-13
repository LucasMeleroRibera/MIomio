const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Fabricante = require('./Fabricante');

const Vehiculo = sequelize.define('Vehiculo', {
  id_veh: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_vehiculo',
  },
  nombre_veh: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre_veh',
  },
  unidades_veh: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'unidades_veh',
  },
  precio_veh: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'precio_veh',
  },
  id_fab: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_fabricante',
    references: {
      model: Fabricante,
      key: 'id_fabricante',
    },
  },
}, {
  tableName: 'vehiculos',
  timestamps: false,
});

Vehiculo.belongsTo(Fabricante, { foreignKey: 'id_fab', targetKey: 'id_fab' });
Fabricante.hasMany(Vehiculo, { foreignKey: 'id_fab' });

module.exports = Vehiculo;