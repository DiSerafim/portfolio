const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

const routes = require('./routes');
app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});