const Joi = require("@hapi/joi");

// schema que valida que los tags sean un array de strings
const productTagSchema = Joi.array().items(Joi.string().max(10));
// Schema que valida el ID para mongo de producto
const productIdSchema = Joi.object({
  productId: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
});

// schema que valida la creacion de producto
const createProductSchema = Joi.object({
  name: Joi.string().max(50).required(),
  price: Joi.number().min(1).max(1000000),
  image: Joi.string().required(),
  tags: productTagSchema,
});

// schema que valida la actualizacion de producto
const updateProductSchema = Joi.object({
  name: Joi.string().max(50),
  price: Joi.number().min(1).max(1000000),
  image: Joi.string(),
  tags: productTagSchema,
});

module.exports = {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
};
