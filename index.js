const express = require("express");
const path = require("path");
const boom = require("@hapi/boom");
const debug = require("debug")("app:server");
const helmet = require("helmet");

const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");

const authApiRouter = require("./routes/api/auth");

//middleware de errores
const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler,
} = require("./utils/middlewares/errorsHandlers");

const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi");

// inicializamos la app de express
const app = express();

// middleware bodyparse
app.use(helmet()); // agregamos las reglas de seguridad por defecto de helmet
app.use(express.json());

// middleware para trabajar con archivos estaticos
app.use("/static", express.static(path.join(__dirname, "public")));

// especificamos donde se encontraran las vistas de nuestro engine (las vistas estan en la carpeta view)
// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use("/products", productsRouter);
productsApiRouter(app);
//app.use("/api/products", productsApiRouter);
app.use("/api/auth", authApiRouter);

// middleware route handler que redirecciona a la route http://localhost:3000/api/products cuando se
// ingrese http://localhost:3000/ hace un redirect
app.get("/", function (req, res) {
  res.redirect("/api/products");
});

// middleware que maneja las paginas 404
app.use(function (req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload },
    } = boom.notFound();

    res.status(statusCode).json(payload);
  }

  res.status(404).render("404");
});

// los middleware de erro handler se llaman al final de las rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const server = app.listen(3000, function () {
  debug(`Listening port http://localhost:${server.address().port}`);
});
