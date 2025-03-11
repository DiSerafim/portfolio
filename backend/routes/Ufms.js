const express = require("express");
const router = express.Router();
const Ufms = require("../models/Ufms"); // Importando corretamente o modelo

// Criar postagem
router.post("/", async (req, res) => {
  try {
    const ufms = new Ufms(req.body); // Criando uma nova instância do modelo
    await ufms.save(); // Salvando no MongoDB

    res.status(201).json({ message: "Postagem feita com sucesso!", ufms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar postagem" });
  }
});

// Mostrar todas postagens


module.exports = router;
