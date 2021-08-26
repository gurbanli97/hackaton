const express = require("express");
const router = express.Router();
const passport = require("passport")
const {forwardAuthenticated} = require("../auth/auth")

router.get("/", forwardAuthenticated,  function (req, res) {
  res.render("login");
});

router.post("/", forwardAuthenticated, function(req,res, next) {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next)
})

module.exports = router;
