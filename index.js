const express = require("express");
const path = require("path");

const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");

//middleware de errores
const {
  logErrors,
  clientErrorHandler,
  errorHandler,
} = require("./utils/middlewares/errorsHandlers");

// inicializamos la app de express
const app = express();
// middleware bodyparse
app.use(express.json());

// middleware para trabajar con archivos estaticos
app.use("/static", express.static(path.join(__dirname, "public")));

// especificamos donde se encontraran las vistas de nuestro engine (las vistas estan en la carpeta view)
// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

// middleware route handler que redirecciona a la route http://localhost:3000/api/products cuando se
// ingrese http://localhost:3000/
app.get("/", function (req, res) {
  res.redirect("/api/products");
});

// los middleware de error se llaman al final de las rutas
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const server = app.listen(3000, function () {
  console.info(`Listening port http://localhost:${server.address().port}`);
});
