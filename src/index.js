require('dotenv').config();

const mongoose = require('mongoose');
require('dotenv').config(); // Asegúrate de cargar el archivo .env

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conexión a MongoDB exitosa');
})
.catch((err) => {
  console.error('Error al conectar con MongoDB:', err);
});
