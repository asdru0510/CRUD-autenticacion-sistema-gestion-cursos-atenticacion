const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");

async function verifyEmail(req, res, next) {
  const email = req.body.email;
  const oldUser = await User.findOne({ where: { email } });
  if (oldUser) {
    return res
      .status(404)
      .json({ error: "Ese email ya se encuentra registrado" });
  }
  next();
}

function verifyToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(403)
      .json({ error: "Un token es requerido para la autorización" });
  }

  let decoded;
  try {
    decoded = jwt.verify(authorization, process.env.SECRET_KEY);
    console.log(decoded);
  } catch (error) {
    console.log("error en la decodificacion", error);
    res
      .status(400)
      .json({ error: "Un token es requerido para la autorización" });
  }
  //Verificamos que el token aún no ha expirado
  const now = new Date() / 1000;
  if (now > decoded.exp) {
    console.log({ now }, { exp: decoded.exp });
    res.status(401).json({ error: "Tu token expiró" });
  }
  //Guardamos el usuario en el objeto request
  req.data = decoded.data;

  next();
}

const mySession = async (req, res) => {
  const data = req.data;
  res.json(data);
};

module.exports = { verifyEmail, verifyToken, mySession };
