const express = require("express");
const handlebars = require("express-handlebars");
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const {router, adminBro} = require("./admin/admin")
const { connection } = require("./db_config/models")

var app = express();

app.use("/static", express.static("public"))

app.use(
  session({
    name: "adamyoxlayan",
    store: MongoStore.create({
      mongoUrl: connection._connectionString,
      ttl: 60 * 60 * 24 * 1
    }),
    secret: "mmW={}A8$<5E^@~Y*]]lF(DwKI>=a~",
    resave: true,
    saveUninitialized: true
  })
)

app.use(adminBro.options.rootPath, router)

// view engine
app.engine(".hbs", handlebars({extname: ".hbs"}));
app.set("view engine", ".hbs");

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// passport
require("./auth/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/login", require("./routers/login"))
app.use("/register", require("./routers/register"))
app.use("/dashboard", require("./routers/dashboard"))
app.use("/appointment", require("./routers/appointment"))

app.get("/", (req,res) => {
  res.render("index")
})

const port = 4000;
app.listen(port, function () {
  console.log("app listeting on port " + port);
  console.log("testing  " + port);
});
