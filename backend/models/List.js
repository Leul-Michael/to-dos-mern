const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add a name."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);
