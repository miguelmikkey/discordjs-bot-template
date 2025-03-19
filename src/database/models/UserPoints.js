const mongoose = require("mongoose");

/*
 * Check https://mongoosejs.com/docs/guide.html#definition for more information about mongoose schemas
 * and https://mongoosejs.com/docs/schematypes.html for more information about mongoose schema types
 */

const UserPointsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.UserPoints || mongoose.model("UserPoints", UserPointsSchema);
