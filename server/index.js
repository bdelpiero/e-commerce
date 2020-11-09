const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");

// facebook
const FacebookStrategy = require("passport-facebook").Strategy;
const facebookRouter = require("./routes/facebook");

const db = require("./db/db");
const { User } = require("./db/models");

const app = express();
const routes = require("./routes");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost:3000"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
//
// }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser()); // popula req.cookie
// agregué dos opciones más a session, parece no estar rompiendo nada
app.use(session({ secret: "bootcamp", resave: true, saveUninitialized: true })); // popula req.session
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false); // user not found
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false); // invalid password
            }
            done(null, user); // success :D
          });
        })
        .catch(done);
    }
  )
);

// facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: "980021759176462",
      clientSecret: "db3a75c779174cba77b8cda102631c7e",
      callbackURL: "http://localhost:1337/auth/facebook/callback",
      profileFields: ["id", "emails", "name"], //This
    },
    function (accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;
      const userName = profile.name.givenName;
      // const id = profile.id.substring(0, 5);
      User.findOrCreate({
        where: { userName: userName, email: email },
      })
        .then((user) => {
          if (!user) {
            return done(null, false); // user not found
          }
          done(null, user);
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function (user, done) {
  // modifiqué por lo de facebook. Parece no romper nada
  console.log("serialize");
  const id = user.id ? user.id : user[0].dataValues.id;
  done(null, id);
});

passport.deserializeUser(function (id, done) {
  console.log("deserialize");
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

// facebook
app.use("/auth", facebookRouter);

app.use("/api", routes); //todas las rutas empiezan con api
app.use("/", (req, res, next) => res.redirect("/api")); // me aseguro que si o si vaya para /api si entraste en otra ruta

db.sync({ force: false }).then(() =>
  app.listen(1337, (req, res, next) => {
    console.log("API on port 1337");
  })
);
