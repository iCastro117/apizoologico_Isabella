const express = require("express");
const router = express.Router();
const Area = require("../models/area"); // Asegúrate de tener este modelo

// Obtener un área por ID
router.get("/:id", async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    
    if (!area) {
      return res.status(404).json({ message: "Área no encontrada" });
    }
    
    res.json(area);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener el área",
      error: error.message 
    });
  }
});

module.exports = router;