const express = require("express");
const handlebars = require("express-handlebars");
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")

var app = express();

app.use("/static", express.static("public"))

app.use(
  session({
    name: "adamyoxlayan",
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://root:bootcamp2021@cluster0.4hexy.mongodb.net/all?retryWrites=true&w=majority",
      ttl: 60 * 60 * 24 * 1
    }),
    secret: "mmW={}A8$<5E^@~Y*]]lF(DwKI>=a~",
    resave: true,
    saveUninitialized: true
  })
)

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
});
