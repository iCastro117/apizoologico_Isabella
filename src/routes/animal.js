const express = require("express");
const router = express.Router();
const Animal = require("../models/animal");

// Ruta POST para crear nuevo animal (CORREGIDO)
router.post("/", async (req, res) => {  // Cambiado de "/animals" a "/"
  try {
    const animalData = {
      ...req.body,
      fecha: req.body.fecha || new Date()
    };

    // Validación adicional
    if (!animalData.nombre || !animalData.edad || !animalData.tipo) {
      return res.status(400).json({ 
        message: "Todos los campos (nombre, edad, tipo) son requeridos" 
      });
    }

    const animal = new Animal(animalData);
    const savedAnimal = await animal.save();
    
    console.log("Animal guardado en MongoDB:", savedAnimal);
    res.status(201).json({
      success: true,
      data: savedAnimal
    });
    
  } catch (error) {
    console.error("Error al guardar animal:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al crear animal",
      error: error.message 
    });
  }
});

// GET para obtener todos los animales
router.get("/", async (req, res) => {
  try {
    const animales = await Animal.find();
    res.json({
      success: true,
      data: animales
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener animales"
    });
  }
});

module.exports = router;