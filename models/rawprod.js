const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rawProductSchema = Schema({
    productName: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    manufacturer: {
        type: String,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Raw Product", rawProductSchema);
