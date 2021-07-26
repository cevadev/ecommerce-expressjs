const Joi = require("@hapi/joi");

function validate(data, schema) {
  // llamamos a la funcion validate de Joi que valida un determinado schema
  const { error } = schema.validate(data);
  return error;
}

function validationHandler(schema, check = "body") {
  // funcion middleware
  return function (req, res, next) {
    // funcion  validate retorna un error
    const error = validate(req[check], schema);
    // error === true llamamos un error de lo contrario llamamos al siguiente middleware que serian
    // nuestros errorsHandlers
    error ? next(new Error(error)) : next();
  };
}

module.exports = validationHandler;
