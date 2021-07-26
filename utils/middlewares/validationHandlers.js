const Joi = require("@hapi/joi");
const boom = require("@hapi/boom");

function validate(data, schema) {
  // llamamos a la funcion validate de Joi que valida un determinado schema
  const { error } = Joi.validate(data, schema);
  return error;
}

function validationHandler(schema, check = "body") {
  // funcion middleware
  return function (req, res, next) {
    // funcion  validate retorna un error
    const error = validate(req[check], schema);
    // error === true llamamos un error de lo contrario llamamos al siguiente middleware que serian
    // nuestros errorsHandlers
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;
