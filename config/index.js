// llamamos a la dependencia dotenv para leer automaticamente el archivo .env
// copia la informacion y las mueve a las variables de entorno respectivas
// las variables de entorno son variables que solo existen dentro del servidor donde corre nuestra app
require("dotenv").config();

// exportamos el objeto config como una propiedad del modulo
const config = {
  // leemos las variables de entorno
  dev: process.env.NODE_ENV !== "production",

  // variables de conexion a la BD
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,

  authAdminUsername: process.env.AUTH_ADMIN_USERNAME,
  authAdminPassword: process.env.AUTH_ADMIN_PASSWORD,
  authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = { config };
