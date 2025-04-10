const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("access_token");

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado. Token no proporcionado" });
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Token inválido o expirado" });
    }
};

module.exports = verifyToken;