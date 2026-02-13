const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

// heredamos de Model
class Cliente extends Model {}

//definimos el modelo
Cliente.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre_cli: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: "El nombre del cliente debe tener entre 1 y 100 caracteres",
        },
        // La validación notNull verifica que el valor no sea nulo (null), es decir, que el campo esté presente en la petición. La validación notEmpty verifica que el valor no sea una cadena vacía ("").
        notNull: {
          msg: "El nombre del cliente es obligatorio",
        },
        notEmpty: {
          msg: "El nombre del cliente no debe estar vacío",
        },
      },
    },

    direccion_cli: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: {
          args: [1, 200],
          msg: "La dirección del cliente debe tener entre 1 y 200 caracteres",
        },
        notNull: {
          msg: "La dirección del cliente es obligatoria",
        },
        notEmpty: {
          msg: "La dirección del cliente no debe estar vacía",
        },
      },
    },

    telefono_cli: {
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
          msg: "El teléfono del cliente es obligatorio",
        },
        notEmpty: {
          msg: "El teléfono del cliente no debe estar vacío",
        },
      },
    },

    fechanac_cli: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "La fecha de nacimiento debe tener un formato de fecha válido (AAAA-MM-DD)",
        },
        isFormatoCorrecto(value) {
          const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!fechaRegex.test(value)) {
            throw new Error("La fecha de nacimiento debe tener formato AAAA-MM-DD");
          }
        },
        notNull: {
          msg: "La fecha de nacimiento del cliente es obligatoria",
        },
        notEmpty: {
          msg: "La fecha de nacimiento del cliente no debe estar vacía",
        },
        isAfter: {
          args: "1900-01-01",
          msg: "La fecha de nacimiento debe ser posterior a 1900-01-01",
        },
        isBefore: {
          args: new Date().toISOString().split("T")[0],
          msg: "La fecha de nacimiento debe ser anterior a la fecha actual",
        },
      },
    },

  },
  {
    sequelize,
    tableName: "clientes",
    timestamps: false,
  },
);

module.exports = Cliente;
