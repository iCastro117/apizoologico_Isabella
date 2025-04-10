const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    usuario: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    clave: { type: String, required: true }
});

// Encriptar contraseña antes de guardar
userSchema.pre("save", async function(next) {
    if (!this.isModified("clave")) return next();
    const salt = await bcrypt.genSalt(10);
    this.clave = await bcrypt.hash(this.clave, salt);
    next();
});

// Comparar contraseñas
userSchema.methods.compareClave = async function(clave) {
    return await bcrypt.compare(clave, this.clave);
};

module.exports = mongoose.model("User", userSchema);