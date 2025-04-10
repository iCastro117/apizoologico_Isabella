const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// Registro (Signup)
router.post("/signup", async(req, res) => {
    try {
        const { usuario, correo, clave } = req.body;

        // Validar campos
        if (!usuario || !correo || !clave) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Crear usuario
        const user = new User({ usuario, correo, clave });
        await user.save();

        // Generar token JWT (expira en 24h)
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "24h" });

        res.status(201).json({
            success: true,
            token,
            message: "Usuario registrado exitosamente"
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "El usuario o correo ya existe" });
        }
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// Login
router.post("/login", async(req, res) => {
    try {
        const { correo, clave } = req.body;

        // Validar campos
        if (!correo || !clave) {
            return res.status(400).json({ error: "Correo y clave son obligatorios" });
        }

        // Buscar usuario
        const user = await User.findOne({ correo });
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        // Comparar contraseñas
        const claveValida = await user.compareClave(clave);
        if (!claveValida) return res.status(400).json({ error: "Clave incorrecta" });

        // Generar token
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "24h" });

        res.json({
            success: true,
            token,
            message: "Inicio de sesión exitoso"
        });

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

module.exports = router;