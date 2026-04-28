/**
 * backend/server.js
 * Servidor Express de NitroGames.
 * Conecta con MongoDB Atlas y expone la API REST.
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ── CORS ──────────────────────────────────────────────────────────────────────
// Permite peticiones desde el frontend en desarrollo y producción
const allowedOrigins = [
  'http://localhost:5173',               // Vite dev server
  'http://localhost:4173',               // Vite preview
  'https://nitrogames.netlify.app',      // Producción Netlify (cambiar si el nombre difiere)
  /\.netlify\.app$/,                     // Cualquier subdominio de Netlify
  /\.onrender\.com$/                     // Render previews
];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (Postman, curl, etc.)
    if (!origin) return callback(null, true);

    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );

    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origen no permitido → ${origin}`));
    }
  },
  credentials: true
}));

app.use(express.json());

// ── DB connection ─────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => {
    console.error('❌ Error de conexión MongoDB:', err.message);
    console.warn('⚠️  El servidor continúa, pero las rutas de DB fallarán.');
  });

// ── Routes ────────────────────────────────────────────────────────────────────
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.path}` });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Error global]', err.message);
  res.status(500).json({ message: err.message || 'Error interno del servidor' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 NitroGames API corriendo en http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});
