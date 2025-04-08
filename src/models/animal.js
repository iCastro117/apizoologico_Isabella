const mongoose = require("mongoose");

const animalSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  codigo: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Animal", animalSchema);