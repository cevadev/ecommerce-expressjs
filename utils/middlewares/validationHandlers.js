const Joi = require("joi");
const boom = require("@hapi/boom");

function validate(data, schema) {
  // llamamos a la funcion validate de Joi que valida un determinado schema
  const { error } = schema.validate(data); //Joi.object(schema).validate(data);
  return error;
}

function validationHandler(schema, check = "body") {
  return function (req, res, next) {
    const error = validate(req[check], schema);

    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;
