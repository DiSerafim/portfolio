const mongoose = require("mongoose");

const fundamentalsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, content: {
        type: String,
        required: true,
    }, images: {
        type: [String],
        default: [],
    }, links: {
        type: [String],
        default: []
    }, codes: {
        type: [String],
        default: [],
    }, createdAt: {
        type: Date,
        default: Date.now,
    }, previousVersion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fundamentals",
        default: null
    },
});

module.exports = mongoose.model("Fundamentals", fundamentalsSchema);