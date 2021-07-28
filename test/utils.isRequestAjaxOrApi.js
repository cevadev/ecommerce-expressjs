const assert = require("assert");
const isRequestAjaxOrApi = require("../utils/isRequestAjaxOrApi");

describe("utils - isRequestAjaxOrApi", function () {
  describe("when req accepts html and is not an XMLHttpRequest", function () {
    it("should return false", function () {
      // request mockeado
      const req = {
        accepts: () => true,
        xhr: false,
      };

      const result = isRequestAjaxOrApi(req);
      const expected = false;

      assert.strictEqual(result, expected);
    });
  });

  // si el request no acepta hmtl es decir, pueden ser un Json y no acepta XMLHttpRequest retorna true
  describe("when req doesn't accept html and is not an XMLHttpRequest", function () {
    it("should return true", function () {
      const req = {
        accepts: () => false,
        xhr: false,
      };

      const result = isRequestAjaxOrApi(req);
      const expected = true;

      assert.strictEqual(result, expected);
    });
  });

  describe("when req accepts html and is an XMLHttpRequest", function () {
    it("should return true", function () {
      const req = {
        accepts: () => true,
        xhr: true,
      };

      const result = isRequestAjaxOrApi(req);
      const expected = true;

      assert.strictEqual(result, expected);
    });
  });
});
