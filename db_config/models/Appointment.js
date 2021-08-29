"use strict";
module.exports = (mongoose) => {
  const newSchema = new mongoose.Schema(
    {
      fullname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      place: {
        type: String,
        required: true,
      },
      message: {
        type: String,
      },
      isVaccinated: {
        type: Boolean,
        default: false
      }
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  const Appointment = mongoose.model("Appointment", newSchema);
  return Appointment;
};
