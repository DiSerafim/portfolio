const mongoose = require("mongoose");

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then((data) => {
            console.log(`Mongodb Conectado com o Servidor: ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(err, "ERRO AQUI!!!");
        });
};

module.exports = connectDB;