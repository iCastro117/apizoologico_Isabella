const express = require("express");
const router = express.Router();
const Area = require("../models/area");
const Animal = require("../models/animal");

// Crear área (POST)
router.post("/", async (req, res) => {
  try {
    // Validar datos de entrada
    if (!req.body.nombre || !req.body.descripcion || !req.body.capacidad) {
      return res.status(400).json({ 
        message: "Faltan campos requeridos (nombre, descripción, capacidad)" 
      });
    }

    const nuevaArea = await Area.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      capacidad: req.body.capacidad,
      animales: req.body.animales || []
    });
    
    res.status(201).json({
      message: "Área creada exitosamente",
      data: nuevaArea
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Error al crear área",
      error: error.message 
    });
  }
});

// Obtener todas las áreas (GET)
router.get("/", async (req, res) => {
  try {
    const areas = await Area.find().populate('animales');
    res.json({
      success: true,
      data: areas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener áreas",
      error: error.message
    });
  }
});

// Obtener área por ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const area = await Area.findById(req.params.id).populate('animales');
    
    if (!area) {
      return res.status(404).json({ 
        message: "Área no encontrada" 
      });
    }
    
    res.json(area);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener el área",
      error: error.message 
    });
  }
});

// Actualizar área (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, capacidad } = req.body;

    const updatedArea = await Area.findByIdAndUpdate(
      id, 
      { nombre, descripcion, capacidad },
      { new: true, runValidators: true }
    );

    if (!updatedArea) {
      return res.status(404).json({
        success: false,
        message: "Área no encontrada"
      });
    }

    res.json({
      success: true,
      data: updatedArea
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar el área",
      error: error.message
    });
  }
});

// Agregar animal a área (PUT)
router.put("/:id/animales", async (req, res) => {
  try {
    const { id } = req.params;
    const { animalId } = req.body;

    // Verificar que el animal exista
    const animal = await Animal.findById(animalId);
    if (!animal) {
      return res.status(404).json({
        success: false,
        message: "Animal no encontrado"
      });
    }

    // Verificar que el área exista
    const area = await Area.findById(id);
    if (!area) {
      return res.status(404).json({
        success: false,
        message: "Área no encontrada"
      });
    }

    // Verificar si el animal ya está en el área
    if (area.animales.includes(animalId)) {
      return res.status(400).json({
        success: false,
        message: "El animal ya está en esta área"
      });
    }

    // Agregar el animal al área
    const updatedArea = await Area.findByIdAndUpdate(
      id,
      { $addToSet: { animales: animalId } },
      { new: true }
    ).populate('animales');

    res.json({
      success: true,
      data: updatedArea
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al agregar animal al área",
      error: error.message
    });
  }
});

// Eliminar animal de área (DELETE)
router.delete("/:id/animales/:animalId", async (req, res) => {
  try {
    const { id, animalId } = req.params;

    const updatedArea = await Area.findByIdAndUpdate(
      id,
      { $pull: { animales: animalId } },
      { new: true }
    ).populate('animales');

    if (!updatedArea) {
      return res.status(404).json({
        success: false,
        message: "Área no encontrada"
      });
    }

    res.json({
      success: true,
      data: updatedArea
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar animal del área",
      error: error.message
    });
  }
});

// Eliminar área (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedArea = await Area.findByIdAndDelete(req.params.id);
    
    if (!deletedArea) {
      return res.status(404).json({
        success: false,
        message: "Área no encontrada"
      });
    }
    
    res.json({
      success: true,
      data: deletedArea,
      message: "Área eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el área",
      error: error.message
    });
  }
});

module.exports = router;