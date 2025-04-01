require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const animalRoutes = require('./routes/animal');
const areaRoutes = require('./routes/area');

// 1. Primero creamos la aplicación Express
const app = express();

// 2. Configuramos middlewares
app.use(express.json());

// 3. Configuramos las rutas ANTES de la conexión a la DB
app.use('/api/animals', animalRoutes); // Rutas de animales
app.use('/api/areas', areaRoutes);     // Rutas de áreas

// 4. Conexión a MongoDB
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

// 5. Verificación de conexión
mongoose.connection.on('connected', () => {
  console.log('Conectado a la DB:', mongoose.connection.db.databaseName);
  mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) return console.error(err);
    console.log('Colecciones existentes:', collections.map(c => c.name));
  });
});

// 6. Iniciamos la conexión y el servidor
connectDB().then(() => {
  app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
  });
});

//http://localhost:3000/api/animals