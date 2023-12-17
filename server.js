const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// Configurar conexão
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '2015',
    database: 'portfolio_db'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao Servidor MySQL.');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/projects', (req, res) => {
    let sqlQuery = 'SELECT * FROM projects';

    db.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.json(results, { message: "Portifolio Server is Running" });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});