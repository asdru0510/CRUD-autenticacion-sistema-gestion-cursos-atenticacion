const { DataTypes: dt } = require("sequelize");
const db = require("../config/db.config");

//Definimos el modelo Bootcamp
const User = db.define(
  "users",
  {
    firstName: {
      type: dt.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El Campo del nombre es requerido",
        },
      },
    },
    lastName: {
      type: dt.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El Campo del apellido es requerido",
        },
      },
    },
    email: {
      type: dt.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "el correo electronico es requerido",
        },
        isEmail: {
          args: true,
          msg: "Formato de correo invalido",
        }, // Validación para asegurar que el valor sea un correo electrónico válido
      },
    },
    password: {
      type: dt.STRING,
      allowNull: false
    },
  },
  { timestamps: true }
);
//Sincronizamos con la DB
try {
  User.sync();
} catch (err) {
  console.error("Something went wrong with the SYNC of the table User", err);
}
//Exportamos User
module.exports = { User };
