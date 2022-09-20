const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    sku: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    sale_price: {
        type: Number,
        require: true
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref:"Brand",
        require: false
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref:"Category",
        require: false
    },
    image: {
        type: String,
        require: false
    }
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;