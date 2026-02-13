const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

// heredamos de Model
class Fabricante extends Model {}

//definimos el modelo

Fabricante.init(
  {
    id_fabricante: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre_fab: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: "El nombre del fabricante debe tener entre 1 y 100 caracteres",
        },
        // La validación notNull verifica que el valor no sea nulo (null), es decir, que el campo esté presente en la petición. La validación notEmpty verifica que el valor no sea una cadena vacía ("").
        notNull: {
          msg: "El nombre del fabricante es obligatorio",
        },
        notEmpty: {
          msg: "El nombre del fabricante no debe estar vacío",
        },
      },
    },

    direccion_fab: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: {
          args: [1, 200],
          msg: "La dirección del fabricante debe tener entre 1 y 200 caracteres",
        },
        notNull: {
          msg: "La dirección del fabricante es obligatoria",
        },
        notEmpty: {
          msg: "La dirección del fabricante no debe estar vacía",
        },
      },

      telfono_fab: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
          is: {
            args: [/^(\+34)?[\s-]*[6789]\d{2}[\s-]*\d{3}[\s-]*\d{3}$/],
            msg: "El teléfono debe tener 9 dígitos, empezar por 6, 7, 8 o 9 y puede llevar el prefijo +34 opcionalmente",
          },
          len: {
            args: [9, 12],
            msg: "El teléfono debe tener entre 9 y 12 caracteres (incluyendo prefijo, espacios o guiones)",
          },
          notNull: {
            msg: "El teléfono del fabricante es obligatorio",
          },
          notEmpty: {
            msg: "El teléfono del fabricante no debe estar vacío",
          },
        },
      },
    },
  },
  {
    sequelize,
    tableName: "fabricantes",
    timestamps: false,
  },
);
module.exports = Fabricante;
