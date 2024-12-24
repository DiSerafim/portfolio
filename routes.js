const express = require('express');
const router = express.Router();

// Rota para listar todos os projetos
router.get('/projects', (req, res) => {
    const query = 'SELECT * FROM projects';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Rota para adicionar um novo projeto
router.post('/projects', (req, res) => {
    const newProject = req.body;
    const query = "INSERT INTO projects SET ?";
    db.query(query, newProject, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newProject });
    });
});

// Rota para deletar um projeto
router.delete('/projects/:id', (req, res) => {})

module.exports = router;