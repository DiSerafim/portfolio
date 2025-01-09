const express = require("express");
const Sequence = require("../models/Sequence");
const router = express.Router();

// Obtém todas as Sequências
router.get("/", async (req, res) => {
    try {
        const sequences = await Sequence.find();
        res.json(sequences);
    } catch(err) {
        res.status(500).json({ message: err.message });
    };
});

// Cria uma nova sequência
router.post("/", async (req, res) => {
    const { numbers } = req.body;

    try {
        const newSequence = new Sequence({ numbers });
        await newSequence.save();
        res.status(201).json(newSequence);
    } catch(err) {
        res.status(400).json({ message: err.message });
    };
});

// Edita uma sequência
router.put("/:id", async (req, res) => {
    try {
        const sequence = await Sequence.findById(req.params.id);
        if (!sequence) {
            return res.status(404).json({ message: "Sequência não encontrada" });
        }
        
        sequence.numbers = req.body.numbers;
        const updatedSequence = await sequence.save();

        res.json(updatedSequence);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// Deletar uma sequência
router.delete("/:id", async (req, res) => {
    try {
        await Sequence.findByIdAndDelete(req.params.id);
        res.json({ message: "Sequência apagada com sucesso." });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Verifica se a sequência existe
router.get('/check', async (req, res) => {
    try {
        // Verifica se numbers está definido e é uma string
        const { numbers } = req.query;

        if (!numbers || typeof numbers !== "string") {
            return res.status(400).json({ error: "Parâmetro 'numbers' é obrigatório e deve ser uma string." });
        };

        // Processa os números recebidos
        const numbersArray = numbers.split(", ").map(num => parseInt(num.trim()));
        const sequenceExists = await Sequence.exists({ numbers: { $all: numbersArray } });

        res.json({ exists: sequenceExists });
    } catch (err) {
        res.status(500).json({ error: "Erro ao verificar a sequência." + err.message });
    }
});


module.exports = router;