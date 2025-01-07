const mongoose = require("mongoose");

const SequenceSchema = new mongoose.Schema({
    numbers: {
        type: [Number],
        required: true,
        validate: {
            validator: function (arr) {
                return arr.length === 6 && new Set(arr).size === 6;
            },
            message: "A sequência deve conter 6 números únicos.",
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Sequence", SequenceSchema);