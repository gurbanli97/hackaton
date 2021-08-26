"use strict";
module.exports = (mongoose) => {
  const newSchema = new mongoose.Schema(
    {
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      date: {
        type: Date,
        required: true,
      },
      doctor: {
        type: String,
        required: true,
      },
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
