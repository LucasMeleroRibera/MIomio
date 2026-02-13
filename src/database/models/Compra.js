const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

// heredamos de Model
class Compra extends Model {}

//definimos el modelo
Compra.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    
    id_vehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    // isDate valida el formato de fecha, notNull y notEmpty aseguran que el campo esté presente y no vacío.
    fecha_compra: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      validate: {
        isDate: {
          args: true,
          msg: "La fecha de compra debe tener un formato de fecha válido (AAAA-MM-DD)",
        },
        notNull: {
          msg: "La fecha de compra es obligatoria",
        },
        notEmpty: {
          msg: "La fecha de compra no debe estar vacía",
        },
        isAfter: {
          args: "2000-01-01",
          msg: "La fecha de compra debe ser posterior al año 2000",
        },
        isBefore: {
          args: new Date().toISOString().split("T")[0],
          msg: "La fecha de compra debe ser anterior a la fecha actual",
        },
      },
    },

    // DECIMAL(10, 2) almacena números decimales con precisión exacta (por ejemplo, para dinero: 12345.67), mientras que FLOAT almacena números en punto flotante, lo que puede causar pequeñas imprecisiones por redondeo. Para precios, cantidades monetarias o valores donde la precisión es importante, siempre es mejor usar DECIMAL(10, 2) en vez de FLOAT.
    precio_compra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        is: {
          args: /^\d{1,8}(\.\d{2})?$/,
          msg: "El precio debe tener hasta 8 dígitos en la parte entera y 2 decimales",
        },
        min: {
          args: 0,
          msg: "El precio de compra no puede ser negativo",
        },
        max: {
          args: 1000000,
          msg: "El precio de compra no puede ser mayor a 1,000,000",
        },
        notNull: {
          msg: "El precio de compra es obligatorio",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "compras",
    timestamps: false,
  },
);

module.exports = Compra;
