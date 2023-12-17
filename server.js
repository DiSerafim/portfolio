const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Portifolio Server is Running');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server running on PORT ${PORT}');
});