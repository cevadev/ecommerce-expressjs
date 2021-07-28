const assert = require("assert");
const proxyquire = require("proxyquire");

// obtenemos mocks
const {
  productsMock,
  ProductsServiceMock,
} = require("../utils/mocks/products");

// obtenemos nuestra utilidad server test (servidor de pruebas)
const testServer = require("../utils/testServer");

// Sentencias de Test
// Test ruta de products
describe("routes - api - products", function () {
  // Iniciamos nuestro server de pruebas
  // proxyquire construimos nuestra ruta test ../routes/api/products
  // Para la ruta ..services/products proxiquiere utilizara ProductsServiceMock
  // como estamos haciendo test de los endpoints o rutas no nos interesa las llamadas al servidor de Mongo
  const route = proxyquire("../routes/api/products", {
    "../../services/products": ProductsServiceMock,
  });

  // enviamos al testServer la ruta a testear
  const request = testServer(route);

  // probamos la ruta cuando se haga un GET y que responda con un status code 200
  describe("GET /products", function () {
    it("should respond with status 200", function (done) {
      request.get("/api/products").expect(200, done);
    });

    // verificamos que la respuesta sea de tipo Json
    it("should respond with content type json", function (done) {
      request.get("/api/products").expect("Content-type", /json/, done);
    });

    it("should respond with not error", function (done) {
      request.get("/api/products").end((err, res) => {
        assert.strictEqual(err, null);
        done();
      });
    });

    // verificamos que la respuesta del body sea una lista de products
    it("should respond with the list of products", function (done) {
      request.get("/api/products").end((err, res) => {
        assert.deepEqual(res.body, {
          data: productsMock,
          message: "products listed",
        });
        done();
      });
    });
  });
});
