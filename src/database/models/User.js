// importamos sequelize
const { Model, DataTypes } = require("sequelize");

// conexion a la base de datos
const sequelize = require("../db/db");

class User extends Model {}

//definimos el modelo
User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    email_user: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: "El email ya está registrado",
      },
      validate: {
        notNull: {
          msg: "El email es obligatorio",
        },
        notEmpty: {
          args: true,
          msg: "El email no puede estar vacío",
        },
        isEmail: {
          args: true,
          msg: "El formato del email no es válido",
        },
        len: {
          args: [6, 100],
          msg: "El email debe tener una longitud entre 5 y 100 caracteres",
        },
        // validación para comprobar que no tenga espacios ni dos puntos seguidos, ya que el validador isEmail los permite

        customEmailValidation(value) {
          if (value.includes(" ")) {
            throw new Error("El email no debe contener espacios");
          }
          if (value.includes("..")) {
            throw new Error("El email no debe contener dos puntos seguidos!!!");
          }
        },
      },
    },

    password_user: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: "La contraseña es obligatoria",
        },
        notEmpty: {
          msg: "La contraseña no puede estar vacía",
        },
        is: {
          // mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial.
          // Tener en cuent la ñ y Ñ para contraseña, esta expresión regular no las incluye
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
          msg: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.",
        },
      },
    },
  },

  {
    sequelize,
    tableName: "usuarios",
    timestamps: false,
  },
);

module.exports = User;
