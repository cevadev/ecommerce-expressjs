const express = require("express");
const router = express.Router();

const { config } = require("../../config");
const ProducstService = require("../../services/products");
const productsService = new ProducstService();

// const productMocks = require("../utils/mocks/products");

/* const products = [
  {
    name: "Red shoes",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8aes77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e44599932dce6b8440e26fb91e10a69&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Sport shoes",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e44599932dce6b8440e26fb91e10a69&auto=format&fit=crop&w=800&q=60",
  },
]; */

// cuando cargue la app se llamara a los products
router.get("/", async function (req, res, next) {
  const { tags } = req.query;
  try {
    // throw new Error("This is an error");
    const products = await productsService.getProducts({ tags });
    // mode indica si es modo dev or production
    res.render("products", { products, dev: config.dev });
  } catch (err) {
    next(err);
  }
});

// exportamos la ruta
module.exports = router;
