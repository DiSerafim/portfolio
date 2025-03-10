const express = require("express");
const router = express.Router();
const ufmsController = require('../models/UfmsModel');

router.post('/', async (req, res) => {
    try {
        const ufms = new ufmsController(req.body);
        await ufms.save();
        res.status(200).json({ message: 'Postagem feita com sucesso!', ufms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar postagem' });        
    }
});