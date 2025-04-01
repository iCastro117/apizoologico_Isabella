require('dotenv').config();
const express = require('express'); // Añade esta línea
const mongoose = require('mongoose');

// Crea la aplicación Express
const app = express(); // Añade esta línea

// Middleware para parsear JSON
app.use(express.json()); // Añade esta línea

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Conexión a MongoDB exitosa');
  } catch (err) {
    console.error('❌ Error de conexión a MongoDB:', err.message);
    process.exit(1);
  }
};

// Ruta de ejemplo para probar
app.post('/api/animals', (req, res) => { // Añade esta ruta
  console.log(req.body);
  res.json({
    ...req.body,
    _id: "62447d182ef5e09ee06f4932",
    __v: 0
  });
});

connectDB();

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});