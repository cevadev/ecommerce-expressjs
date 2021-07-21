// dependencia para conectarno a mongodb
const { MongoClient } = require("mongodb");
// config una propiedad del modulo por lo que lo llamamos entre llaves {}
const { config } = require("../config");

// construccion de la mongo uri
// encodeURIComponent nos ayuda a manejar correctamente los caracteres especiales que pueden tener nuestras variables
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;
// const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`; // prettier-ignore

class MongoLib {
  constructor() {
    // creamos una instancia del MongoClient
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(async (err) => {
          if (err) {
            reject(err);
          }
          console.log("Connected succesfully to Mongo");
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  async getAll(collection, query) {
    try {
      const db = await this.connect();
      return await db.collection(collection).find(query).toArray();
    } catch (error) {
      console.log(error);
    }
  }

  /* getAll(collection, query, limit, offset) {
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .find(query)
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .sort({ name: 1 })
        .toArray();
    });
  } */

  // Version async/await
  /* async connect() {
    try {
      await this.client.connect();
      console.log("Connected successfully to mongo");
      return this.client.db(this.dbName);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(collection, query) {
    try {
      const db = await this.connect();
      return await db.collection(collection).find(query).toArray();
    } catch (error) {
      console.log(error);
    }
  } */

  /* connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((error) => {
        if (error) {
          reject(error);
        }

        console.log("Connected succesfully to mongo");
        resolve(this.client.db(this.dbName));
      });
    });
  }

  getAll(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).find(query).toArray();
    });
  } */
}

module.exports = MongoLib;
