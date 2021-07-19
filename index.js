const express = require("express");
const path = require("path");
const app = express();

const productsRouter = require("./routes/products");

// especificamos donde se encontraran las vistas de nuestro engine (las vistas estan en la carpeta view)
// las vistas deben ser .jsx
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// ruta /products
app.use("/products", productsRouter);

const server = app.listen(3000, function () {
  console.info(`Listening port http://localhost:${server.address().port}`);
});
