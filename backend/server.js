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
app.use(cors({
  origin: true,
  credentials: true
}));

// Preflight requests support sin usar "*" que rompe Express moderno
app.options(/.*/, cors());

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
