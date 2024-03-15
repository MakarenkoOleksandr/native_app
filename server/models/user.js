const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  token: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  confirmationCode: { type: String, unique: true },
  confirmed: { type: Boolean },
  loggined: { type: Boolean },
  metamask: { type: String },
  network: [
    {
      name: { type: String },
      token: { type: String },
      rpc: { type: String },
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
