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

module.exports = router;