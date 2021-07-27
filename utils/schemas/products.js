const Joi = require("joi");

// schema que valida que los tags sean un array de strings
const productTagSchema = Joi.array().items(Joi.string().max(10));
// Schema que valida el ID para mongo de producto
const productIdSchema = Joi.object({
  productId: Joi.string().pattern(new RegExp("^[0-9a-fA-F]{24}$")),
});

//const productIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
//const productTagSchema = Joi.array().items(Joi.string().max(10));

// schema que valida la creacion de producto
const createProductSchema = Joi.object({
  name: Joi.string().max(50),
  price: Joi.number().min(1).max(1000000),
  image: Joi.string(),
  tags: productTagSchema,
});

// schema que valida la actualizacion de producto
const updateProductSchema = Joi.object({
  name: Joi.string().max(50),
  price: Joi.number().min(1).max(1000000),
  image: Joi.string(),
  tags: productTagSchema,
});

/*const createProductSchema = {
  name: Joi.string().max(50),
  price: Joi.number().min(1).max(1000000),
  image: Joi.string(),
  tags: productTagSchema,
};*/

/*const updateProductSchema = {
  name: Joi.string().max(50),
  price: Joi.number().min(1).max(1000000),
  image: Joi.string(),
  tags: productTagSchema,
};*/

module.exports = {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
};
