const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../auth/auth");
const { Appointment } = require("../db_config/models").default;

router.get("/", ensureAuthenticated, function (req, res) {
  res.render("appointment");
});

router.post("/", ensureAuthenticated, async function (req, res, next) {
  const { date, doctor } = req.body;
  await Appointment.create({
    patientId: req.user._id,
    date: date,
    doctor: doctor
  })
  res.send("OK");
});

module.exports = router;
