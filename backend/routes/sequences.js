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

module.exports = router;