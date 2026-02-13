const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = Usuario;