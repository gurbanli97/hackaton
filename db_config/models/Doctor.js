"use strict";
module.exports = (mongoose) => {
  const newSchema = new mongoose.Schema(
    {
      fullname: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      dob: {
        type: Date,
      },
      password: {
        type: String,
        required: true,
      },
      doctorType: {
          type: String
      }
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  const Doctor = mongoose.model("Doctor", newSchema);
  return Doctor;
};
