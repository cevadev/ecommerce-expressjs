const express = require("express");

const passport = require("passport");
//const productMocks = require("../../utils/mocks/products");

const ProductsService = require("../../services/products");

// Importamos los schemas a validar
const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
} = require("../../utils/schemas/products");

const validation = require("../../utils/middlewares/validationHandlers");

// JWT strategy
require("../../utils/auth/strategies/jwt");

// funcion donde aplicamos la inversion del control
function productsApi(app) {
  const router = express.Router();
  app.use("/api/products", router);
  const productsService = new ProductsService();

  // cuando se hace una get al / listamos los products
  router.get("/", async function (req, res, next) {
    const { tags } = req.query;
    console.info("objeto request query: ", { tags });

    try {
      // throw new Error("This is an error from the api");
      // recibimos los productos
      const products = await productsService.getProducts({ tags });

      // respondemos codigo 200 en formato json
      res.status(200).json({
        // data contiene el listado de products mocks
        data: products,
        message: "products listed",
      });
    } catch (err) {
      next(err);
    }
  });

  // enviamos como url params el id del product
  router.get("/:productId", async function (req, res, next) {
    // obtenemos el id del product desde el request que la barra de direcciones donde ingresa datos el usuario
    const { productId } = req.params;
    console.info("objeto request with params: ", req.params);

    try {
      const product = await productsService.getProduct({ productId });

      res.status(200).json({
        data: product,
        message: "product retrieved",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/",
    validation(createProductSchema, "params"),
    async function (req, res, next) {
      // obtenemos el product que envia el usuario. aplicamos un alias al bodys
      const { body: product } = req;
      console.info("objeto request body: ", req.body);

      try {
        const productCreated = await productsService.createProduct({ product });

        res.status(201).json({
          data: productCreated,
          message: "products listed",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // validamos el productId sea correcto
  // validamos el schema del product a actualizar
  router.put(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    validation(productIdSchema, "params"),
    validation(updateProductSchema),
    async function (req, res, next) {
      const { productId } = req.params;
      const { body: product } = req;

      console.info("objeto request with params: ", req.params);
      console.info("objeto request body: ", req.body);

      try {
        const productUpdated = await productsService.updateProduct({
          productId,
          product,
        });

        res.status(200).json({
          data: productUpdated,
          message: "products updated",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      const { productId } = req.params;
      console.info("objeto request with params: ", req.params);
      try {
        const productDeleted = productsService.deleteProduct({ productId });

        res.status(200).json({
          data: productDeleted,
          message: "products deleted",
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = productsApi;
