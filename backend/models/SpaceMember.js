const mongoose = require("mongoose");

const spaceMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      required: true,
    },
    role : {
        type: String,
        enum: ["owner","member", "admin"],
        default: "member",
    }
  },
  { timestamps: true }
);
spaceMemberSchema.index({ user: 1, space: 1 }, { unique: true });

module.exports = mongoose.model("SpaceMember", spaceMemberSchema);