const mongoose = require("mongoose")

const spaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Space", spaceSchema)