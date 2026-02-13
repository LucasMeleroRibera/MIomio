const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');
const Vehiculo = require('./Vehiculo');

const Compra = sequelize.define('Compra', {
  id_cli: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id_cliente',
    references: {
      model: Cliente,
      key: 'id_cliente',
    },
  },
  id_veh: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id_vehiculo',
    references: {
      model: Vehiculo,
      key: 'id_vehiculo',
    },
  },
  fecha_compra: {
    type: DataTypes.DATE,
    primaryKey: true,
    allowNull: false,
    field: 'fecha_compra',
  },
  precio_compra: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'precio_compra',
  },
}, {
  tableName: 'compras',
  timestamps: false,
});

Compra.belongsTo(Cliente, { foreignKey: 'id_cli', targetKey: 'id_cli' });
Compra.belongsTo(Vehiculo, { foreignKey: 'id_veh', targetKey: 'id_veh' });
Cliente.hasMany(Compra, { foreignKey: 'id_cli' });
Vehiculo.hasMany(Compra, { foreignKey: 'id_veh' });

module.exports = Compra;