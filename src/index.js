require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Verifica que la variable esté cargada
console.log('URI de MongoDB:', process.env.MONGODB_URI); // Agrega esto para debug
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el paquete cors
const animalRoutes = require('./routes/animal');
const areaRoutes = require('./routes/area');


// 1. Crear la aplicación Express
const app = express();


// 2. Configurar middlewares
app.use(express.json());


// 3. Configurar CORS
app.use(cors({
    origin: 'http://localhost:4200', // Permitir solicitudes desde tu aplicación Angular
    methods: 'GET,POST,PUT,DELETE', // Permitir métodos HTTP específicos
    allowedHeaders: 'Content-Type,Authorization' // Permitir headers específicos
}));

// 4. Configurar rutas
app.use('/api/animals', animalRoutes);
app.use('/api/areas', areaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API del Zoológico funcionando');
});

// 5. Conexión a MongoDB
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Conexión a MongoDB exitosa');
        return true;
    } catch (err) {
        console.error('❌ Error de conexión a MongoDB:', err.message);
        return false;
    }
};

// 6. Verificación de conexión
mongoose.connection.on('connected', () => {
    console.log('Conectado a la DB:', mongoose.connection.db.databaseName);
    mongoose.connection.db.listCollections().toArray((err, collections) => {
        if (err) return console.error(err);
        console.log('Colecciones existentes:', collections.map(c => c.name));
    });
});

// 7. Iniciar la aplicación
const startServer = async() => {
    const isConnected = await connectDB();
    if (!isConnected) {
        console.log('No se pudo conectar a la base de datos. Saliendo...');
        process.exit(1);
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
};

startServer();