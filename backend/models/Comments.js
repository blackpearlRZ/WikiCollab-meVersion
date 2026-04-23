const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type : {
      type: String,
      enum: ["global", "line"],
      required: true,
    },
    lineNumber: {
      type: Number,
      default: null, // only used if type = "line"
    }, // Only used for line comments
  },
  { timestamps: true }
);

// Validate that lineNumber is provided if type is "line"
commentSchema.pre("validate", function (next) {
  if (this.type === "line" && this.lineNumber === null) {
    return next(new Error("lineNumber is required for line comments"));
  }
  next();
});

module.exports = mongoose.model("Comment", commentSchema);