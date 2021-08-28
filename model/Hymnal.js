const mongoose = require("mongoose");

const HymnalSchema = mongoose.Schema({
  HymneNo: {
    type: String,
    required: "true",
  },
  title: {
    type: String,
    required: "true",
  },
  body: {
    type: String,
    required: "true",
  },
  category: {
    type: String,
    required: "true",
    enum: ["offatory"],
    default: "offatory",
  },

  Date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("TODO", HymnalSchema);
