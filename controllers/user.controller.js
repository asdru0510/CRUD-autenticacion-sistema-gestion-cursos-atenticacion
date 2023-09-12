const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { User } = require("../models/user.models");
const { Bootcamp } = require("../models/bootcamp.models");
require("../models/index");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  verifyEmail,
  verifyToken,
  mySession,
} = require("../middlewares/middlewares.js");

require("dotenv").config({ path: "./.env" });

//Encuentra un usuario por Id
const findUserById = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Bootcamp,
        through: "user_bootcamp",
      },
    });
    if (user) {
      console.log(
        `Se ha encontrado el usuario: ${JSON.stringify(user, null, 2)}`
      );
      res.json({ message: "Usuario Encontrado", user: user });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log(
      "Error al obtener los bootcamps del usuario con id: " + userId,
      error
    );
    res
      .status(500)
      .json({ error: "Error comuniquese con el área de soporte de la APP" });
  }
};

//Traer todos los usuarios
const findAll = async function (req, res) {
  try {
    const findAllUsers = await User.findAll({
      include: {
        model: Bootcamp,
        through: "user_bootcamp",
      },
    });
    console.log(
      `Se han encontrado todos los usuario: ${JSON.stringify(
        findAllUsers,
        null,
        2
      )}`
    );
    res.json({ usuarios: findAllUsers });
  } catch (error) {
    console.log("Error al obtener todos los bootcamps de los usuarios.", error);
    res
      .status(500)
      .json({ error: "Error comuniquese con el área de soporte de la APP" });
  }
};
//Actualizar un usuario, según su Id
const updateUserById = async (req, res) => {
  try {
    // 1. Recuperamos el Id del usuario
    const userId = parseInt(req.query.params); //para pillar por la ruta de la forma /api/users?id=1
    // 2. Recuperamos el nombre y el balance
    const { firstName, lastName, email,password } = req.body;

    //2.1 hasheamos la password

    let passwordHashed = await bcrypt.hash(password, 10); //Hasheamos la pass
    // 3. Actualizamos la base de datos
    const [affectedRows] = await User.update(
      {
        firstName,
        lastName,
        email,
        password:passwordHashed
      },
      { where: { id: userId } }
    );

    // 4.Obtener el usuario actualizado
    if (affectedRows > 0) {
      const updatedUser = await User.findByPk(userId);
      console.log(
        `Usuario actualizado: ${JSON.stringify(updatedUser, null, 2)}`
      );
      res.json({ message: "Usuario actualizado:", user: updatedUser });
    } else {
      res.json({ message: "Ningún usuario actualizado." });
    }
  } catch (error) {
    console.log("Error al actualizar el usuario.", error);
    res
      .status(500)
      .json({ error: "Error comuniquese con el área de soporte de la APP" });
  }
};

//Borrar el usuario, según Id
const deleteUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Obtener información del usuario antes de eliminarlo
    const userToDelete = await User.findByPk(id);

    // Eliminar el usuario
    const userDestroyed = await User.destroy({
      where: {
        id: id,
      },
    });

    if (userDestroyed > 0) {
      console.log(
        `Usuario eliminado: ${JSON.stringify(userToDelete, null, 2)}`
      );
      res.json({ message: "Usuario eliminado:", user: userToDelete });
    } else {
      res.json({ message: "Ningún usuario eliminado." });
    }
  } catch (error) {
    console.log("Error al eliminar el usuario.", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Para crear un JWT
const login = async (req, res) => {
  //1. Recibo los parametros del form
  const { email, password } = req.body;

  //2. Verificamos que el usuario este en "BBDD"
  const userAct = await User.findOne({ where: { email } });
  console.log(userAct);
  if (userAct === null) {
    return res
      .status(404)
      .json({ error: "Email ingresado no está registrado" });
  }

  //3. Verificamos que la contraseña sea al correcta
  const match = await bcrypt.compare(password, userAct.password); //comparamos pass con el pass codificado en DB

  if (match) {
    //si matchean renderizamos para un login correcto
    //3.1 Variable con duracion del token descomentar para tiempo a usar

    const time = Math.floor(new Date() / 1000) + 3600 * 24; //1 dia
    //const time = Math.floor(new Date() / 1000) + 3600; // 1 hora
    //const time = Math.floor(new Date() / 1000) + 300; // 5 minutos

    //4. Creo el token
    const token = jwt.sign(
      {
        exp: time,
        data: {
          id: userAct.id,
          name: userAct.first,
          email: userAct.email,
        },
      },
      process.env.SECRET_KEY
    );

    //5. Le retorno el token al cliente
    console.log("token: ", token);
    res.json(token);
  } else {
    //Sino renderizamos para pass incorrecto
    return res.status(404).json({ error: "Contraseña incorrecta" });
  }
  const mySession = async (req, res) => {
    const data = req.data;
    console.log(data);
    res.json(data);
  };
  mySession;
};

const signup = async (req, res) => {
  //1. Recibo los parametros del form
  const { firstName, lastName, email, password } = req.body;

  //2. Verificamos que los 4 campos existan
  if (!firstName || !email || !password || !lastName) {
    return res.status(400).json({
      error: "Debe ingresar todos los campos",
    });
  }

  //3. Creamos el usuario en la base de datos
  let newUser;
  try {
    let passwordHashed = await bcrypt.hash(password, 10); //Hasheamos la pass
    newUser = await User.create({
      //Creamos usuario
      firstName,
      lastName,
      email,
      password: passwordHashed,
    });

    //4. Genero el nuevo token y se lo envío al usuario
    //Variable con duracion del token descomentar para tiempo a usar
    //const time = Math.floor(new Date() / 1000) + 3600*24; //1 dia
    //const time = Math.floor(new Date() / 1000) + 3600; // 1 hora
    const time = Math.floor(new Date() / 1000) + 300; // 5 minutos

    //4.1 Creo el token
    const token = jwt.sign(
      {
        exp: time,
        data: {
          id: newUser.id,
          name: newUser.firstName,
          email: newUser.email,
        },
      },
      process.env.SECRET_KEY
    );

    //4.2 Le retorno el token al cliente
    res.json(token);
  } catch (error) {
    console.error(error);
    res.status(401).send("Error al crear usuario");
  }

  const mySession = async (req, res) => {
    const data = req.data;
    res.json(data);
  };
  mySession;
};

//Rutas Auth
router.post("/signup", verifyEmail, signup);
router.post("/signin", login);

// Rutas Users
router.get("/users/:id", verifyToken, findUserById);
router.get("/users", verifyToken, findAll);
router.put("/users/:id", verifyToken, updateUserById);
router.delete("/users/:id", deleteUserById);

// Exportamos
module.exports = {
  router, // Exporta el enrutador
  mySession
};
