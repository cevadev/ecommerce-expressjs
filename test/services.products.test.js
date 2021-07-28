const assert = require("assert");
const proxyquire = require("proxyquire");

// mock de servicios
const {
  MongoLibMock,
  getAllStub,
  createStub,
} = require("../utils/mocks/mongoLib");

// mock de products
const {
  productsMock,
  filteredProductsMock,
} = require("../utils/mocks/products");

// Tests
describe("services - products", function () {
  // cuando ProductServices ubicado en ../services/products requiera el archivo ..lib/mongo.js cargará el archivo
  // MongoLibMock ubicado en ../utils/mocks/mongoLib.js
  const ProductsService = proxyquire("../services/products", {
    "../lib/mongo": MongoLibMock,
  });

  const productsService = new ProductsService();

  describe("when getProducts method is called", async function () {
    // Test 1.
    it(" should call the getAll MongoLib method", async function () {
      await productsService.getProducts({});
      assert.strictEqual(getAllStub.called, true);
    });

    // Test2. cuando se llama a getProducts debe retornar un array de products
    it("should return an array of products", async function () {
      const result = await productsService.getProducts({});
      const expected = productsMock;
      assert.deepStrictEqual(result, expected);
    });
  });

  // Cuando llamamos a products con tags
  describe("when getProducts method is called with tags", async function () {
    it("should all the getAll MongoLib method with tags args", async function () {
      // cuando llamamos a getProducts() con un tag se debe llamar al getAllStub
      await productsService.getProducts({ tags: ["expensive"] });
      const tagQuery = { tags: { $in: ["expensive"] } };
      assert.strictEqual(getAllStub.calledWith("products", tagQuery), true);
    });

    it("should return an array of products filtered by the tag", async function () {
      const result = await productsService.getProducts({ tags: ["expensive"] });
      const expected = filteredProductsMock("expensive");
      assert.deepEqual(result, expected);
    });
  });
});
