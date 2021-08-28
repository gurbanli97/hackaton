const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../auth/auth");
const { Appointment } = require("../db_config/models").default;

router.get("/", ensureAuthenticated, function (req, res) {
  res.render("appointment");
});

router.post("/check", ensureAuthenticated, async function (req, res) {
  var hours = [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
  ];
  const { choosenDay } = req.body;
  var reservations = await Appointment.find({
    date: choosenDay,
  });

  var array = []

  reservations.forEach(res => {array.push(res.time)})
  var availableTime = hours.filter((hour) => {return !array.includes(hour)});

  res.json(availableTime);
});

router.post("/", ensureAuthenticated, async function (req, res) {
  const { date, doctor, time } = req.body;
  await Appointment.create({
    patientId: req.user._id,
    date: date,
    doctor: doctor,
    time: time,
  });
  res.send("OK");
});

module.exports = router;
