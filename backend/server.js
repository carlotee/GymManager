const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt"); // <-- Agregado para encriptar contraseñas
const crypto = require("crypto"); // <-- Agregado para generar el código QR (viene nativo en Node)
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta base de prueba que ya tienes
app.get("/", (req, res) => {
    res.json({ mensaje: "API funcionando" });
});

// Ruta de los planes que consultará tu base de datos
app.get('/api/planes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM planes WHERE estado = true');
        res.json(rows);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// ==========================================
// NUEVA RUTA: REGISTRO DE USUARIOS
// ==========================================
app.post('/api/registro', async (req, res) => {
    // Extraemos los datos que nos enviará Angular en el body
    const { nombre, apellido, email, password } = req.body;

    try {
        // 1. Encriptar la contraseña (10 salt rounds)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Generar un código QR único para este cliente
        const codigoQr = crypto.randomUUID();

        // 3. Insertar en la base de datos (Asignamos rol_id = 2 para CLIENTE)
        const query = `
            INSERT INTO usuarios (rol_id, nombre, apellido, email, password, codigo_qr) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        await pool.query(query, [2, nombre, apellido, email, hashedPassword, codigoQr]);

        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });

    } catch (error) {
        console.error("Error al registrar:", error);
        // Manejamos el error si el email ya existe en la base de datos
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: 'Este correo ya está registrado' });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});