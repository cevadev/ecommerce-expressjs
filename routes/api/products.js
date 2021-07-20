const express = require("express");
const router = express.Router();
//const productMocks = require("../../utils/mocks/products");

const ProductsService = require("../../services/products");
const productsService = new ProductsService();

// cuando se hace una get al / listamos los products
router.get("/", async function (req, res, next) {
  const { tags } = req.query;
  try {
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

// enviamos como parametro el id delproduct
router.get("/:productId", async function (req, res, next) {
  // obtenemos el id del product desde el request que la barra de direcciones donde ingresa datos el usuario
  const { productId } = req.params;
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

router.post("/", async function (req, res, next) {
  // obtenemos el product que envia el usuario. aplicamos un alias al bodys
  const { body: product } = req;

  try {
    const productCreated = await productsService.createProduct({ product });

    res.status(201).json({
      data: productCreated,
      message: "products listed",
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", async function (req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;

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
});

router.delete("/:productId", async function (req, res, next) {
  const { productId } = req.params;
  try {
    const productDeleted = productsService.deleteProduct({ productId });

    res.status(200).json({
      data: productDeleted,
      message: "products deleted",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
