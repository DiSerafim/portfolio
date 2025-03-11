const express = require("express");
const router = express.Router();
const Ufms = require("../models/Ufms"); // Importando corretamente o modelo

// Criar postagem
router.post("/", async (req, res) => {
  try {
    const createFile = new Ufms(req.body); // Criando uma nova instância do modelo
    await createFile.save(); // Salvando no MongoDB

    res
      .status(201)
      .json({ message: "Postagem feita com sucesso!", createFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar postagem" });
  }
});

// Mostrar todas postagens
router.get("/", async (req, res) => {
  try {
    const getFiles = await Ufms.find().sort({ createdAt: -1 });
    res.json(getFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao procurar postagens" });
  }
});

// Mostrar postagem Única
router.get("/:id", async (req, res) => {
  try {
    const getFileById = await Ufms.findById(req.params.id);

    if (!getFileById) {
      res
        .status(400)
        .json({ message: "Pagina não encontrada e ou inexistente." });
    } else {
      res.json(getFileById);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao procurar postagem" });
  }
});

module.exports = router;
