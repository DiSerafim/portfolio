const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - software que se encontra entre o sistema operacional e os aplicativos nele executados
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Adiciona o cabeçalho CSP
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-eval';" // Permite que scripts sejam carregados apenas do próprio domínio
  );
  next();
});

// Conexão com o MongoDB
connectDB();

// Rotas
const sequencesRoutes = require("./routes/sequences");
const fundamentalsRoutes = require("./routes/fundamentals");

app.use("/api/sequences", sequencesRoutes);
app.use("/api/fundamentals", fundamentalsRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
