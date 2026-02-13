const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const registerUser = async (userData) => {
  const { nombre_user, apellidos_user, email_user, password_user } = userData;

  if (!nombre_user || !apellidos_user || !email_user || !password_user) {
    throw new Error('Todos los campos son requeridos.');
  }

  const existingUser = await Usuario.findOne({ where: { email_user } });
  if (existingUser) {
    throw new Error('El email ya está registrado.');
  }

  const hashedPassword = await bcrypt.hash(password_user, 10);

  const newUser = await Usuario.create({
    nombre_user,
    apellidos_user,
    email_user,
    password_user: hashedPassword,
  });

  return { id: newUser.id_user, nombre: newUser.nombre_user, email: newUser.email_user };
};

const loginUser = async (credentials) => {
  const { email_user, password_user } = credentials;

  if (!email_user || !password_user) {
    throw new Error('Email y contraseña son requeridos.');
  }

  const user = await Usuario.findOne({ where: { email_user } });
  if (!user) {
    throw new Error('Credenciales inválidas.');
  }

  const isPasswordValid = await bcrypt.compare(password_user, user.password_user);
  if (!isPasswordValid) {
    throw new Error('Credenciales inválidas.');
  }

  const token = jwt.sign({ id: user.id_user, email: user.email_user }, process.env.JWT_SECRET, { expiresIn: '8h' });

  return token;
};

module.exports = {
  registerUser,
  loginUser,
};