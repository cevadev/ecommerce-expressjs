function isRequestAjaxOrApi(req) {
  //validamos: si el request no acepta html
  return !req.accepts("html") || req.xhr;
}

module.exports = isRequestAjaxOrApi;
