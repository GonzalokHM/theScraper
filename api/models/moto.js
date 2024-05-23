const mongoose = require("mongoose");

const motoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: false },
    // stock: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: true,
    collection: "motos",
  }
);

const Moto = mongoose.model("motos", motoSchema, "motos");
module.exports = Moto;