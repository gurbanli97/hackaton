const express = require("express");
const router = express.Router();
const passport = require("passport")
const {forwardAuthenticated} = require("../auth/auth")

router.get("/", forwardAuthenticated,  function (req, res) {
  return res.render("login", {
    layout: "empty"
  });
});

router.post("/", forwardAuthenticated, function(req,res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next)
})

module.exports = router;
