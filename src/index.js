const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// conexión con mysql
const sequelize = require("./database/db/db");
// asociaciones
require("./database/db/associations");

// Conversión a json datos que nos envína para post, put, patch...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Las rutas deben ir depues del middleware de bodyparser
const apiroutes = require("./routes/index");
app.use("/concesionario", apiroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor eschando en http://localhost:${PORT}`);

  sequelize
    .sync({ force: false })
    .then(() => console.log("tablas sincronizadas"));
});
