const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../db_config/models").default;
const {forwardAuthenticated} = require("../auth/auth")

router.get("/",forwardAuthenticated, function (req, res) {
  res.render("register");
});

router.post("/",forwardAuthenticated, async function (req, res) {
  await User.create({
    fullname: req.body.fullname,
    email: req.body.email,
    dob: req.body.dob,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  return res.json(req.body);
});

module.exports = router;
