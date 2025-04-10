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

//PUT: http://localhost:3000/api/animals/67f587ce96d3e3905a2df222

// GET: http://localhost:3000/api/animals

//POST: GET http://localhost:3000/api/animals
/*{
  "nombre": "Tigre",
  "edad": 7,
  "tipo": "Felino",
  "codigo": "T001"
}
  */

 // DELETE: http://localhost:3000/api/animals/67f587ce96d3e3905a2df222

