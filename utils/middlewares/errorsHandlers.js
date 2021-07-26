const { config } = require("../../config");
const isRequestAjaxOrApi = require("../isRequestAjaxOrApi");

const boom = require("@hapi/boom");

//funcionalidad de ayuda
function withErrorStack(error, stack) {
  //si estamos en modo dev retornamos el error y el stack trace
  if (config.dev) {
    //hcemos un spread operator del error ya que error trae otras propiedades aparte del mensaje
    return { ...error, stack };
  }
  //de lo contrario retornamos el error
  return error;
}

// Middlewares para el manejo de errores
function logErrors(err, req, res, next) {
  console.log(err.stack);
  // llamamos al middleware nativo de manejo de errores de expresss
  next(err);
}

// si desde el cliente ocurre un error, mostramos el error en formato Json
function clientErrorHandler(err, req, res, next) {
  const {
    // destructuring del objeto output que entrag boom
    output: { statusCode, payload },
  } = err;

  // catch errors for AJAX request or if an error ocurrs while streaming
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

//es posible que en algun punto del codigo puede llegarnos un error que no es de tipo boom
function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

// middleware por defecto
function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode);
  res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler,
};
