const mongoose = require("mongoose");

const areaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  capacidad: {
    type: Number,
    required: true
  },
  animales: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal'
  }]
});

module.exports = mongoose.model("Area", areaSchema);