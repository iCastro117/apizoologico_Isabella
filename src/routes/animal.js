const express = require("express");
const router = express.Router();
const Animal = require("../models/animal");
const verifyToken = require("./validate_token");

// Crear animal (POST) - Protegido
router.post("/", verifyToken, async(req, res) => {
    try {
        if (!req.body.nombre || !req.body.edad || !req.body.tipo || !req.body.codigo) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos (nombre, edad, tipo, codigo) son requeridos"
            });
        }

        const animal = new Animal(req.body);
        const savedAnimal = await animal.save();

        res.status(201).json({
            success: true,
            data: savedAnimal
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "El código del animal ya existe"
            });
        }
        res.status(500).json({
            success: false,
            message: "Error al crear animal",
            error: error.message
        });
    }
});

// Obtener todos los animales (GET) - Protegido
router.get("/", verifyToken, async(req, res) => {
    try {
        const animales = await Animal.find();
        res.json({
            success: true,
            data: animales
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener animales",
            error: error.message
        });
    }
});

// Obtener un animal por ID (GET) - Protegido
router.get("/:id", verifyToken, async(req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({
                success: false,
                message: "Animal no encontrado"
            });
        }
        res.json({
            success: true,
            data: animal
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el animal",
            error: error.message
        });
    }
});

// Actualizar animal (PUT) - Protegido
router.put("/:id", verifyToken, async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, edad, tipo, codigo } = req.body;

        if (codigo) {
            const existingAnimal = await Animal.findOne({ codigo, _id: { $ne: id } });
            if (existingAnimal) {
                return res.status(400).json({
                    success: false,
                    message: "El código ya está en uso por otro animal"
                });
            }
        }

        const updatedAnimal = await Animal.findByIdAndUpdate(
            id, { nombre, edad, tipo, codigo }, { new: true, runValidators: true }
        );

        if (!updatedAnimal) {
            return res.status(404).json({
                success: false,
                message: "Animal no encontrado"
            });
        }

        res.json({
            success: true,
            data: updatedAnimal
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el animal",
            error: error.message
        });
    }
});

// Eliminar animal (DELETE) - Protegido
router.delete("/:id", verifyToken, async(req, res) => {
    try {
        const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
        if (!deletedAnimal) {
            return res.status(404).json({
                success: false,
                message: "Animal no encontrado"
            });
        }
        res.json({
            success: true,
            data: deletedAnimal,
            message: "Animal eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el animal",
            error: error.message
        });
    }
});

module.exports = router;