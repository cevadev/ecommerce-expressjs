const express = require("express");
const router = express.Router();
const productMocks = require("../../utils/mocks/products");

// cuando se hace una get al / listamos los products
router.get("/", function (req, res) {
  const { query } = req.query;

  console.log(productMocks);

  // respondemos codigo 200 en formato json
  res.status(200).json({
    // data contiene el listado de products mocks
    data: productMocks,
    message: "products listed",
  });
});

// enviamos como parametro el id delproduct
router.get("/:productId", function (req, res) {
  // obtenemos el id del product desde el request que la barra de direcciones donde ingresa datos el usuario
  const { productId } = req.params;

  res.status(200).json({
    data: productMocks[0],
    message: "product retrieved",
  });
});

router.post("/", function (req, res) {
  res.status(201).json({
    data: productMocks[0],
    message: "products listed",
  });
});

router.put("/:productId", function (req, res) {
  res.status(200).json({
    data: productMocks,
    message: "products updated",
  });
});

router.delete("/", function (req, res) {
  res.status(200).json({
    data: productMocks[0],
    message: "products deleted",
  });
});

module.exports = router;
