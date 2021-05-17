const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    login: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    cart: {
     type: Array
    }
  },
  {
    timestamps: true,
  }
);
schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", schema);