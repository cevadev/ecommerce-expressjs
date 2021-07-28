const { config } = require("../config");

function cacheResponse(res, seconds) {
  // si la configuraciom es diferente a desarrollo
  if (!config.dev) {
    // modificamos el response
    res.set("Cache-Control", `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;
