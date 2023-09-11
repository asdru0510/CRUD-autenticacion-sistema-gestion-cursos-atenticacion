const { DataTypes: dt } = require("sequelize"); //Importamos DataTypes
const db = require("../config/db.config");

//Definimos el modelo Bootcamp
const Bootcamp = db.define(
  "bootcamps",
  {
    title: {
      type: dt.STRING,
      allowNull: false,
    },
    cue: {
      type: dt.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 5,
        max: 10,
      },
    },
    description: {
      type: dt.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

try {
  Bootcamp.sync();
} catch (err) {
  console.error(
    "Something went wrong with the SYNC of the table Bootcamp",
    err
  );
}
//Exportamos Bootcamp
module.exports = { Bootcamp };
