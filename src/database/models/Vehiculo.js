const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
class Vehiculo extends Model {}

//definimos el modelo
Vehiculo.init(
  {
    id_vehiculo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    nombre_veh: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: "El nombre del vehículo debe tener entre 1 y 100 caracteres",
        },
        // La validación notNull verifica que el valor no sea nulo (null), es decir, que el campo esté presente en la petición. La validación notEmpty verifica que el valor no sea una cadena vacía ("").
        notNull: {
          msg: "El nombre del vehículo es obligatorio",
        },
        notEmpty: {
          msg: "El nombre del vehículo no debe estar vacío",
        },
      },
    },

    unidades_veh: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: "Las unidades del vehículo deben ser un número entero",
        },
        min: {
          args: 0,
          msg: "Las unidades del vehículo no pueden ser negativas",
        },
        max: {
          args: 10000,
          msg: "Las unidades del vehículo no pueden ser mayores a 10000",
        },
        // Para strings, puedo utilizar ambos (notNull y notEmpty). Para números, solo notNull, ya que notEmpty no se aplica con valores numéricos.
        notNull: {
          msg: "El campo unidades del vehículo es obligatorio",
        },
      },
    },

    precio_veh: {
      // DECIMAL(10, 2) almacena números decimales con precisión exacta (por ejemplo, para dinero: 12345.67), mientras que FLOAT almacena números en punto flotante, lo que puede causar pequeñas imprecisiones por redondeo. Para precios, cantidades monetarias o valores donde la precisión es importante, siempre es mejor usar DECIMAL(10, 2) en vez de FLOAT.

      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        //isDecimal solo validará que el valor sea decimal, pero no controlará la cantidad de dígitos en la parte entera ni que tenga exactamente dos decimales, para eso usamos la validación is con expresión regular.
        // isDecimal: {
        //   args: true,
        //   msg: "El precio del vehículo debe ser un número decimal",
        // },

        // En MySQL, si defines un campo como DECIMAL(10,2):
        // Si insertas un valor sin decimales (por ejemplo, 123), la base de datos lo almacena como 123.00.
        // Si insertas un valor con un solo decimal (por ejemplo, 123.4), lo almacena como 123.40.
        // Si insertas más de dos decimales (por ejemplo, 123.456), redondea y almacena como 123.46.
        is: {
          args: /^\d{1,8}(\.\d{2})?$/,
          msg: "El precio debe tener hasta 8 dígitos en la parte entera y 2 decimales",
        },
        min: {
          args: 0,
          msg: "El precio del vehículo no puede ser negativo",
        },
        max: {
          args: 1000000,
          msg: "El precio del vehículo no puede ser mayor a 1,000,000",
        },
        notNull: {
          msg: "El campo precio del vehículo es obligatorio",
        },
      },
    },

    id_fabricante: {
      type: DataTypes.INTEGER,
      allowNull: false,
    /*   references: {
        model: 'fabricantes',
        key: 'id_fabricante'
      }, */
      validate: {
        notNull: {
          msg: "El campo id_fabricante es obligatorio"
        },
        isInt: {
          args: true,
          msg: "El id_fabricante debe ser un número entero"
        }
      }
    },
  },
  {
    sequelize,
    tableName: "vehiculos",
    timestamps: false,
  },
);

module.exports = Vehiculo;
