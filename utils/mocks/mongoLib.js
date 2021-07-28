const { productsMock, filteredProductsMock } = require("./products");
// sinon nos permite crear mocks y stubs
const sinon = require("sinon");

// creamos un stub
const getAllStub = sinon.stub();
const tagQuery = { tags: { $in: ["expensive"] } };

// cuando a getAllStubs cuando se pase con argumento products debe resolver con los products
getAllStub.withArgs("products").resolves(productsMock);
// cuando se le pase products y el tagquery, debe resolver con los products filtrados
getAllStub
  .withArgs("products", tagQuery)
  .resolves(filteredProductsMock("expensive"));

// cremos un stub que simula resolver con uns ID de tipo que mongo retorna
const createStub = sinon.stub().resolves("6bedb1267d1ca7f3053e2875");

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock,
};
