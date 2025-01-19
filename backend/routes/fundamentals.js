const express = require("express");
const Fundamentals = require("../models/Fundamentals");
const router = express.Router();

// Cria uma Postagem
router.post("/", async (req, res) => {
    try {
        const fundamentals = new Fundamentals(req.body);
        const savedFundamentals = await fundamentals.save();
        res.status(201).json(savedFundamentals)
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});

// Mostra Todas as Postagens
router.get("/", async (req, res) => {
    try {
        const fundamentals = await Fundamentals.find();
        res.status(200).json(fundamentals);

    } catch(err) {
        res.status(500).json({ error: "Erro ao buscar postagens: " + err.message });
    }
});

// Mostra Postagem com Filtro
router.get("/search", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;

    // Ordena e filtra
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "desc" ? -1 : 1;
    const title = req.query.title || "";

    try {
        const skip = (page - 1) * limit;
        const total = await Fundamentals.countDocuments({ title: new RegExp(title, "i") });
        const fundamentals = await Fundamentals.find({ title: new RegExp(title, "i") })
        .sort({ [sort]: order }) // Ordenação
        .skip(skip) // Paginação
        .limit(limit); // Limite de páginas

        res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: fundamentals,

        });

    } catch(err) {
        res.status(500).json({ error: "Erro ao buscar postagens: " + err.message });
    }
});

module.exports = router;