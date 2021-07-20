const express = require("express");
const path = require("path");
const app = express();

const productsRouter = require("./routes/products");
const productsApiRouter = require("./routes/api/products");

// middleware para trabajar con archivos estaticos
app.use("/static", express.static(path.join(__dirname, "public")));

// especificamos donde se encontraran las vistas de nuestro engine (las vistas estan en la carpeta view)
// las vistas deben ser .jsx
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// ruta /products
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

const server = app.listen(3000, function () {
  console.info(`Listening port http://localhost:${server.address().port}`);
});
