const express = require("express");
const router = express.Router();
const Area = require("../models/area");

// POST para crear nueva área (versión corregida)
router.post("/", async (req, res) => {
  try {
    // Validar datos de entrada
    if (!req.body.nombre || !req.body.descripcion || !req.body.capacidad) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const areaData = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      capacidad: req.body.capacidad
    };

    // Crear y guardar el área (usando await)
    const nuevaArea = await Area.create(areaData); // Versión más moderna que new + save()
    
    res.status(201).json({
      message: "Área creada exitosamente",
      data: nuevaArea
    });

  } catch (error) {
    console.error("Error al crear área:", error);
    res.status(500).json({ 
      message: "Error al crear área",
      error: error.message 
    });
  }
});

module.exports = router;