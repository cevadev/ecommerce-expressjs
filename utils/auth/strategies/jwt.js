const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");
const { config } = require("../../../config");
const MongoLib = require("../../../lib/mongo");

// Estrategia de autenticacion Json web token
passport.use(
  new Strategy(
    // objeto de configuracion
    {
      // obtenemos nuestro secret del config
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      const mongoDB = new MongoLib();

      try {
        // obtenemos el user pasando el sub del payload a nuestro servicio de BD
        const [user] = await mongoDB.getAll("users", {
          username: tokenPayload.sub,
        });

        // si no existe dicho user, no autorizamos el ingreso
        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        // si el user existe, retornamos el user
        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    }
  )
);
