const User = require('../database/models/User');

// Como la validación la realizamos sobre el modelo, ya que utilizamos las reglas de Sequelize, lo vamos a realizar en el servicio.
// Esta función construye una instancia temporal del modelo User y ejecuta la validación definida en Sequelize.
const validateUserModel = async (email, password) => {
  // Aquí se valida el email y la contraseña según las reglas del modelo User
  await User.build({ email_user: email, password_user: password }).validate();
};

// Busca un usuario por su email en la base de datos.
const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email_user: email } });
};

// Crea un nuevo usuario en la base de datos con el email y la contraseña hasheada.
const createUser = async (email, passwordHash) => {
  return await User.create({
    email_user: email,
    password_user: passwordHash,
  });
};

module.exports = {
  validateUserModel,
  findUserByEmail,
  createUser,
};
