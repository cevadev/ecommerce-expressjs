/**
 * El servicio de productos se encargara de llamar a la biblioteca que retorna los datos de los productos.
 * El servicio de productos se conecta al mock de productos
 */
const productMocks = require("../utils/mocks/products");

const MongoLib = require("../lib/mongo");

class ProductsService {
  constructor() {
    this.collection = "products";
    // creamos una nueva instancia de nuestra biblioteca MongoLib
    this.mongoDB = new MongoLib();
  }

  // si getAll() retornara una promise tendriamos que colocar async getProducts(){}
  async getProducts({ tags }) {
    // construimos un query para MongoDb
    // preguntamos si existen tags, de ser true creamos el query
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongoDB.getAll(this.collection, query);

    return products || [];
  }

  async getProduct({ productId }) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct({ product }) {
    const createProductId = await this.mongoDB.create(this.collection, product);

    return createProductId;
  }

  async updateProduct({ productId, product }) {
    const updateProductId = await this.mongoDB.update(
      this.collection,
      productId,
      product
    );

    return updateProductId;
  }

  async deleteProduct({ productId }) {
    const deletedProductId = await this.mongoDB.delete(
      this.collection,
      productId
    );

    return deletedProductId;
  }
}

module.exports = ProductsService;
