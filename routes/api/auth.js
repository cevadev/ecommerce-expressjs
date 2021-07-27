const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const api = express.Router();

const { config } = require("../../config");

// Basic strategy
require("../../utils/auth/strategies/basic");

// Endpoint para obtener el token
api.post("/token", async function (req, res, next) {
  // invocamos a la estrategia de autenticacion basic ya implementada
  passport.authenticate("basic", function (error, user) {
    try {
      // verificamos que el user exista
      if (error || !user) {
        next(boom.unauthorized());
      }

      // hacemos login y session false
      req.login(user, { session: false }, async function (error) {
        if (error) {
          next(error);
        }

        // creamos el payload del Json web token
        const payload = { sub: user.username, email: user.email };
        // firmamos el Json web token
        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: "15m",
        });

        return res.status(200).json({ access_token: token });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

module.exports = api;
