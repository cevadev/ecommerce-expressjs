const { config } = require("../../config");

// Middlewares para el manejo de errores
function logErrors(err, req, res, next) {
  console.log(err.stack);
  // llamamos al middleware nativo de manejo de errores de expresss
  next(err);
}

// si desde el cliente ocurre un error, mostramos el error en formato Json
function clientErrorHandler(err, req, res, next) {
  // catch errors for AJAX request (XMLHttpRequest)
  if (req.xhr) {
    res.status(500).json({ err: err.message });
  } else {
    next(err);
  }
}

// middleware por defecto
function errorHandler(err, req, res, next) {
  // catch erros while streaming
  if (res.headersSent) {
    next(err);
  }

  // preguntamos si la configura es de desarrollo
  if (!config.dev) {
    delete err.stack;
  }

  res.status(err.status || 500);
  res.render("error", { error: err });
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler,
};
