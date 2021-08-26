const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../auth/auth")

router.get("/", ensureAuthenticated, function (req, res) {
  res.send(`ok girish eledin , xosh geldin, ${req.user.fullname}`);
});



module.exports = router;
