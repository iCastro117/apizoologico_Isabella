# apizoologico_isabella
# apizoologico_isabella



npm install dotenv express mongoose

npm init -y

npm install mongoose express dotenv

npm install nodemon --save-dev


npm run dev

node src/index.js


//http://localhost:3000/api/animals



// GET: Obtener todos los animales
// URL: http://localhost:3000/api/animals



// POST: Crear un nuevo animal
// URL: http://localhost:3000/api/animals
/* Body (JSON):
{
  "nombre": "Tigre",
  "edad": 7,
  "tipo": "Felino",
  "codigo": "T001"
}
*/




// PUT: Actualizar un animal existente
// URL: http://localhost:3000/api/animals/67f587ce96d3e3905a2df222
/* Body (JSON):
{
  "nombre": "Tigre de Bengala",
  "edad": 8,
  "tipo": "Felino",
  "codigo": "T001-B"
}
*/



// DELETE: Eliminar un animal
// URL: http://localhost:3000/api/animals/67f587ce96d3e3905a2df222
