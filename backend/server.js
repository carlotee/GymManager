const express = require("express");
const cors = require("cors");
// 1. Importas tu base de datos (asegúrate de haber creado el archivo config/db.js)
const pool = require('./config/db'); 

const app = express();

app.use(cors());
app.use(express.json());

// Ruta base de prueba que ya tienes
app.get("/", (req, res) => {
    res.json({ mensaje: "API funcionando" });
});

// 2. Agregas la ruta de los planes que consultará tu base de datos
app.get('/api/planes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM planes WHERE estado = true');
        res.json(rows);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});