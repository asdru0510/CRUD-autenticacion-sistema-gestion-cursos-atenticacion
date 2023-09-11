const express = require("express"); // Importamos express
const userControllers = require("./controllers/user.controller"); //Importamos los controllers
const bootcampControllers = require("./controllers/bootcamp.controller"); //Importamos los controllers

const app = express(); //Envolvemos express en la variable 'app'

require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT;

// Middleware para analizar datos en formato JSON
app.use(express.json());

// Middleware para analizar datos de formulario
app.use(express.urlencoded({ extended: false }));

//Uso de rutas
app.use("/api", userControllers.router);
app.use("/api", bootcampControllers.router);

//Corremos el servidor
app.listen(PORT, () => {
  console.log(`Listening in the port ${PORT}`);
});
