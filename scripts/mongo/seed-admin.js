const bcrypt = require("bcrypt");
const chalk = require("chalk");
const MongoLib = require("../../lib/mongo");
const { config } = require("../../config");

function buildAdminUser(password) {
  // retornamos un objeto con los datos del user
  return {
    password,
    username: config.authAdminUsername,
    email: config.authAdminEmail,
  };
}

async function hasAdminUser(mongoDB) {
  // buscamos en la collection users de la bd en mongo
  const adminUser = await mongoDB.getAll("users", {
    // pasamos como parametro el user name que proviene de las variables de entorno
    username: config.authAdminUsername,
  });

  // retorna true si adminUser === true y la coleccion tiene un elemento
  return adminUser && adminUser.length;
}

// creamos el user admin
async function createAdminUser(mongoDB) {
  // generamos un password para admin
  const hashedPassword = await bcrypt.hash(config.authAdminPassword, 10);
  // creamos el user admin
  const userId = await mongoDB.create("users", buildAdminUser(hashedPassword));
  return userId;
}

// funcion async que llama codigo async de mongo
async function seedAdmin() {
  try {
    const mongoDB = new MongoLib();
    // verificamos si en la bd ya existe un usuario admin
    if (await hasAdminUser(mongoDB)) {
      console.log(chalk.yellow("Admin user already exists"));
      return process.exit(1);
    }

    // si no existe admin, creamos el user
    const adminUserId = await createAdminUser(mongoDB);
    console.log(chalk.green("Admin user created with id:", adminUserId));
    return process.exit(0);
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
}

seedAdmin();
