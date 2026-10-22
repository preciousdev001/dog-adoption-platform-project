const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Dog name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A dog must have an owner"],
    },
    status: {
      type: String,
      enum: ["available", "adopted"],
      default: "available",
    },
    adopter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    thankYouMessage: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Dog = mongoose.model("Dog", dogSchema);

modules.exports = Dog;
