const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/vehiculos', require('./routes/vehiculos'));
app.use('/api/fabricantes', require('./routes/fabricantes'));
app.use('/api/compras', require('./routes/compras'));

// Conectar a la base de datos y sincronizar
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
    return sequelize.sync({ alter: true }); // Sincronizar modelos con la DB
  })
  .then(() => {
    console.log('Modelos sincronizados.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });