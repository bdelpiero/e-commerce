const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = require("./db/db");
const { User } = require("./db/models");

const app = express();
const routes = require("./routes");
// this.express.use(cors({
//   origin: [
//     'http://localhost:8080',
//     'https://localhost:8080'
//   ],
//   credentials: true,
//   exposedHeaders: ['set-cookie']
// }));

// app.use(cors());
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
app.use(session({ secret: "bootcamp" })); // popula req.session
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

// How we save the user
passport.serializeUser(function (user, done) {
  console.log("serialize");
  done(null, user.id);
});

// How we look for the user
passport.deserializeUser(function (id, done) {
  console.log("deserialize");
  User.findByPk(id).then((user) => done(null, user));
});

app.use("/api", routes); //todas las rutas empiezan con api
app.use("/", (req, res, next) => res.redirect("/api")); // me aseguro que si o si vaya para /api si entraste en otra ruta

db.sync({ force: false }).then(() =>
  app.listen(1337, (req, res, next) => {
    console.log("API on port 1337");
  })
);
